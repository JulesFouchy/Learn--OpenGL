---
title: Utiliser les buffers d'index
---

Les deux exercices précédents vous ont permis d'aborder le dessin de formes arbitraires via le découpage en triangle. Il s'avère que les triangles possèdent des sommets en commun. Or, en l'état actuel des choses, vous devez dupliquer ces sommets dans le VBO pour pouvoir dessiner tous les triangles. Cette duplication entraîne une perte d'espace mémoire qui peut s'avérer importante lors de l'affichage de grandes scenes.

Les buffers d'index, ou **Index Buffer Objects (IBO)**, permettent d'introduire un niveau d'indirection lors du dessin des triangles. En utilisant un IBO, on décrit les triangles par l'index de chacun de ses 3 sommets au lieu de donner les sommets directement. Cela permet d'avoir un seul exemplaire de chaque sommet dans le VBO mais plusieurs occurences de l'index des sommets dupliqués dans l'IBO. On remplace ainsi la duplication des sommets par une duplication de nombres entiers, ce qui consomme nettement moins d'espace mémoire.

Un IBO se créé avec les même fonctions que pour les VBOs (`glGenBuffers`, `glBufferData`, `glBindBuffer`, etc.). La différence est la cible de binding : on utilise `GL_ELEMENT_ARRAY_BUFFER` a la place de `GL_ARRAY_BUFFER`.

De plus l'IBO doit être enregistré dans le VAO, simplement en le bindant (sur `GL_ELEMENT_ARRAY_BUFFER` donc) après avoir bindé le VAO. Enfin, le dessin se fait avec la fonction `glDrawElements` à la place de `glDrawArrays`.

Plutot que de détailler chaque étape, voici le code source pour afficher le quad en utilisant un IBO (lire les commentaires préfixés par "=>" pour voir les changements par rapport au code de l'exercice du quad) :

```cpp
#include <p6/p6.h>
#include "glm/glm.hpp"

struct Vertex2DColor {
    glm::vec2 position;
    glm::vec3 color;
};

int main()
{
    auto ctx = p6::Context{{1280, 720, "TP OpenGL"}};
    ctx.maximize_window();

    const p6::Shader shader = p6::load_shader(
        "shaders/triangle.vs.glsl",
        "shaders/triangle.fs.glsl"
    );

    GLuint vbo;
    glGenBuffers(1, &vbo);

    glBindBuffer(GL_ARRAY_BUFFER, vbo);

    // => Tableau de sommets : un seul exemplaire de chaque sommet
    Vertex2DColor vertices[] = {
        Vertex2DColor{{-0.5f, -0.5f}, {1.f, 0.f, 0.f}}, // Sommet 0
        Vertex2DColor{{+0.5f, -0.5f}, {0.f, 1.f, 0.f}}, // Sommet 1
        Vertex2DColor{{+0.5f, +0.5f}, {0.f, 0.f, 1.f}}, // Sommet 2
        Vertex2DColor{{-0.5f, +0.5f}, {1.f, 1.f, 1.f}}, // Sommet 3
    };
    // => Penser à bien changer le nombre de sommets (4 au lieu de 6) :
    glBufferData(GL_ARRAY_BUFFER, 4 * sizeof(Vertex2DColor), vertices, GL_STATIC_DRAW);

    glBindBuffer(GL_ARRAY_BUFFER, 0);

    // => Creation du IBO
    GLuint ibo;
    glGenBuffers(1, &ibo);

    // => On bind sur GL_ELEMENT_ARRAY_BUFFER, cible reservée pour les IBOs
    glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, ibo);

    // => Tableau d'indices : ce sont les indices des sommets à dessiner
    // On en a 6 afin de former deux triangles
    // Chaque indice correspond au sommet correspondant dans le VBO
    uint32_t indices[] = {
        0, 1, 2,
        0, 2, 3};

    // => On remplit l'IBO avec les indices :
    glBufferData(GL_ELEMENT_ARRAY_BUFFER, 6 * sizeof(uint32_t), indices, GL_STATIC_DRAW);

    // => Comme d'habitude on debind avant de passer à autre chose
    glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, 0);

    GLuint vao;
    glGenVertexArrays(1, &vao);

    glBindVertexArray(vao);

    // => On bind l'IBO sur GL_ELEMENT_ARRAY_BUFFER; puisqu'un VAO est actuellement bindé,
    // cela a pour effet d'enregistrer l'IBO dans le VAO
    glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, ibo);

    static constexpr GLuint VERTEX_ATTR_POSITION = 3;
    static constexpr GLuint VERTEX_ATTR_COLOR    = 8;
    glEnableVertexAttribArray(VERTEX_ATTR_POSITION);
    glEnableVertexAttribArray(VERTEX_ATTR_COLOR);
    glBindBuffer(GL_ARRAY_BUFFER, vbo);
    glVertexAttribPointer(VERTEX_ATTR_POSITION, 2, GL_FLOAT, GL_FALSE, sizeof(Vertex2DColor), (const GLvoid*)offsetof(Vertex2DColor, position));
    glVertexAttribPointer(VERTEX_ATTR_COLOR, 3, GL_FLOAT, GL_FALSE, sizeof(Vertex2DColor), (const GLvoid*)offsetof(Vertex2DColor, color));
    glBindBuffer(GL_ARRAY_BUFFER, 0);

    glBindVertexArray(0);

    // Application loop :
    ctx.update = [&]() {
        glClear(GL_COLOR_BUFFER_BIT);

        glBindVertexArray(vao);
        shader.use();

        // => On utilise glDrawElements à la place de glDrawArrays
        // Cela indique à OpenGL qu'il doit utiliser l'IBO enregistré dans le VAO
        glDrawElements(GL_TRIANGLES, 6, GL_UNSIGNED_INT, 0);

        glBindVertexArray(0);
    };

    // Start the update loop
    ctx.start();

    // Cleanup once the window is closed
    glDeleteBuffers(1, &vbo);
    glDeleteVertexArrays(1, &vao);
}
```

En vous inspirant du code précédent, réécrivez le code de dessin du disque en utilisant un IBO afin d'éviter la duplication de sommets. Votre tableau de sommets doit alors contenir 1 + N sommets (1 pour le centre, N le nombre de triangles). Le tableau d'indices doit lui contenir 3 * N indices (de manière générale le tableau d'indices contient toujours le nombre de triangles multiplié par 3).

Voici le prototype de la fonction `glDrawElements` :

```cpp
glDrawElements(
    GLenum mode,
    GLsizei count,
    GLenum type,
    const GLvoid * indices)
```

Paramètres:

- `GLenum mode`: le type de primitives à dessiner (`GL_TRIANGLES`).
- `GLsizei count` : le nombre d'indices à dessiner (nombre de triangles * 3).
- `GLenum type` : une constante OpenGL correspondant au type des indices (`GL_UNSIGNED_INT`). Lorsqu'on utilise peu d'indices, il peut être plus efficace d'utiliser des indices de type `unsigned short` ou `unsigned char` afin de consommer encore moins de mémoire.
- `const GLvoid* indices` : encore un pointeur "piège". C'est en fait l'offset dans le tableau d'indices à partir duquel commencer. On passe 0 car on veut utiliser tous les indices.

[glDrawElements](https://registry.khronos.org/OpenGL-Refpages/gl4/html/glDrawElements.xhtml)