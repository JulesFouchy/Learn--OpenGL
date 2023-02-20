---
title: Les classes Sphere et Cone
---

Ces classes sont fournies avec le template, dans le dossier `src-common` partagé entre les TPs. Elles vous permettent de créer des tableaux de sommets contenant des triangles pour dessiner des sphères et des cônes.

Par exemple :

```cpp
glimac::Sphere sphere{1.f, 32, 16};
```

Construit une sphère de rayon 1 et discrétisée selon 32 segments sur la latitude et 16 sur la longitude. Un constructeur similaire existe pour `Cone`.

Ensuite la méthode `getVertexCount()` permet de récupérer le nombre de sommets et `getDataPointer()` renvoie un pointeur vers le tableau de sommets. Ces méthodes devront être utilisées pour envoyer les données à OpenGL (construction du VBO et du VAO).

Le type de sommets utilisé est défini dans `common.hpp` :

```cpp
struct ShapeVertex {
    glm::vec3 position;
    glm::vec3 normal;
    glm::vec2 texCoords;
};
```

Ce type devra être utilisé conjointement avec `sizeof` et `offsetof` pour construire le VAO (comme nous faisions avec les classes `Vertex2DColor` et `Vertex2DUV`).