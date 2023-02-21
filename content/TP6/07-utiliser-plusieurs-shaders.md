---
title: Utiliser plusieurs shaders
---

Là ça devient compliqué car chaque programme GPU (un programme = un vertex shader + un fragment shader) possède son propre ensemble de variables uniformes. Par exemple, si deux programmes utilise la variable uniforme `uMVPMatrix`, celle-ci peut avoir une location différente pour chacun des deux programmes. Il faudra donc récupérer deux fois sa location : une fois pour le premier programme et une fois pour le second programme.

Afin d'avoir un code à peu près propre, nous allons utiliser une structure pour représenter chaque programme. La structure `EarthProgram` contiendra le programme pour dessiner la Terre, ainsi que les locations de chacunes de ses variables uniformes. La structure `MoonProgram` contiendra la même chose mais pour le shader correspondant à la lune.

Voici un exemple de ces deux structure dans mon code :

```cpp
struct EarthProgram {
    p6::Shader m_Program;

    GLint uMVPMatrix;
    GLint uMVMatrix;
    GLint uNormalMatrix;
    GLint uEarthTexture;
    GLint uCloudTexture;

    EarthProgram()
        : m_Program{p6::load_shader("shaders/3D.vs.glsl", "shaders/multiTex3D.fs.glsl")}
    {
        uMVPMatrix    = glGetUniformLocation(m_Program.id(), "uMVPMatrix");
        uMVMatrix     = glGetUniformLocation(m_Program.id(), "uMVMatrix");
        uNormalMatrix = glGetUniformLocation(m_Program.id(), "uNormalMatrix");
        uEarthTexture = glGetUniformLocation(m_Program.id(), "uEarthTexture");
        uCloudTexture = glGetUniformLocation(m_Program.id(), "uCloudTexture");
    }
};

struct MoonProgram {
    p6::Shader m_Program;

    GLint uMVPMatrix;
    GLint uMVMatrix;
    GLint uNormalMatrix;
    GLint uTexture;

    MoonProgram()
        : m_Program{p6::load_shader("shaders/3D.vs.glsl", "shaders/tex3D.fs.glsl")}
    {
        uMVPMatrix    = glGetUniformLocation(m_Program.id(), "uMVPMatrix");
        uMVMatrix     = glGetUniformLocation(m_Program.id(), "uMVMatrix");
        uNormalMatrix = glGetUniformLocation(m_Program.id(), "uNormalMatrix");
        uTexture      = glGetUniformLocation(m_Program.id(), "uTexture");
    }
};
```

Puisque le shader `tex3D.fs.glsl` utilise une seule variable uniforme de texture, il n'y a qu'une seule variable membre pour stocker la location dans la structure `MoonProgram` (contrairement à la structure `EarthProgram` qui en contient deux).

Il faut voir chacune de ces structures comme la représentation CPU du programme GPU associé. Elles nous permettent de faire facilement l'interface entre CPU et GPU.

Ajoutez ces deux structures à votre code. Si besoin modifiez le nom des variables uniformes dans le constructeur ainsi que le nom de la variable membre associée.

Dans la fonction `main` du code C++, remplacez le chargement des shaders par une déclaration d'une variable pour chacune des structures :

```cpp
EarthProgram earthProgram{};
MoonProgram moonProgram{};
```

Puisque nous avons à présent deux programmes GPU, on ne peut plus faire un `.use()` global dans la partie initialisation comme on le faisait jusqu'à présent. Il va falloir, avant le dessin de chaque entité (Terre ou lune), changer le programme utilisé en utilisant la méthode `use()` sur la variable membre `m_Program` de la structure adaptée. De même pour modifier les variables uniformes. Voici par exemple mon code pour dessiner la Terre, dans la boucle de rendu :

```cpp
earthProgram.m_Program.use();

glUniform1i(earthProgram.uEarthTexture, 0);
glUniform1i(earthProgram.uCloudTexture, 1);

const glm::mat4 globalMVMatrix = glm::translate(glm::mat4{1.f}, {0.f, 0.f, -5.f});

const glm::mat4 earthMVMatrix = glm::rotate(globalMVMatrix, ctx.time(), {0.f, 1.f, 0.f});
glUniformMatrix4fv(earthProgram.uMVMatrix, 1, GL_FALSE, 
	glm::value_ptr(earthMVMatrix));
glUniformMatrix4fv(earthProgram.uNormalMatrix, 1, GL_FALSE, 
	glm::value_ptr(glm::transpose(glm::inverse(earthMVMatrix))));
glUniformMatrix4fv(earthProgram.uMVPMatrix, 1, GL_FALSE, 
	glm::value_ptr(projMatrix * earthMVMatrix));

glActiveTexture(GL_TEXTURE0);
glBindTexture(GL_TEXTURE_2D, earthTexture);
glActiveTexture(GL_TEXTURE1);
glBindTexture(GL_TEXTURE_2D, cloudTexture);

glDrawArrays(GL_TRIANGLES, 0, sphere_vertices.size());
```

On observe que j'utilise la variable `earthProgram` pour activer le bon programme et modifier les bonnes uniformes. Pour dessiner la lune il faut utiliser la variable `moonProgram`.

Modifiez votre code pour utiliser vos deux programmes séquentiellement.

Concernant l'appel à la méthode `use()` : celle-ci est assez coûteuse, on ne peut pas se permettre de changer de programme GPU à chaque dessin. C'est pourquoi avant cet exercice on le faisait en dehors de la boucle de rendu. Puisque vous dessinez plusieurs lunes, vous pourriez être tenté.e de faire l'appel `moonProgram.m_Program.use()` à chaque tour de la boucle qui dessine les lunes. La bonne solution est de faire cet appel avant cette boucle. Ainsi on ne fera pas :

```cpp
for(uint32_t i = 0; i < nbMoons; ++i) {
	moonProgram.m_Program.use();

	// Modification des uniformes ...

	glDrawArrays(...);
}
```

Mais plutôt :

```cpp
moonProgram.m_Program.use();
for(uint32_t i = 0; i < nbMoons; ++i) {
	// Modification des uniformes ...

	glDrawArrays(...);
}
```

Dans un vrai moteur, on regroupe les appels de dessin de manière à minimiser le nombre de changements de shaders. Si on dessinait 42 terres et 69 lunes, on dessinerait d'abord toutes les terres avec le programme GPU pour dessiner la Terre, puis ensuite toutes les lunes avec le programme GPU pour dessiner la lune. Cela permet de changer seulement deux fois de programme par tour de boucle de rendu.

Si au contraire on alternait dessin terre - dessin lune - dessin terre - dessin lune - etc. on devrait à chaque fois changer de programme, ce qui tuerait les performances (vous pouvez essayer si le cœur vous en dit !). 