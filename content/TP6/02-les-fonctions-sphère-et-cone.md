---
title: Les fonctions sphère et cône
---

Ces fonctions sont fournies avec le template, dans le dossier `src-common/glimac` partagé entre les TPs. Elles vous permettent de créer des tableaux de sommets contenant des triangles pour dessiner des sphères et des cônes.

Par exemple :

```cpp
const std::vector<glimac::ShapeVertex> vertices = glimac::sphere_vertices(1.f, 32, 16);
```

construit une sphère de rayon 1 et discrétisée selon 32 segments sur la latitude et 16 sur la longitude. Un fonction similaire existe pour les cônes.

Ensuite vous pouvez récupérer le nombre de sommets avec `vertices.size()` et un pointeur vers le tableau de sommets avec `vertices.data()`. Ces méthodes devront être utilisées pour envoyer les données à OpenGL (construction du VBO et du VAO).

Le type de sommets utilisé est défini dans `common.hpp` :

```cpp
struct ShapeVertex {
    glm::vec3 position;
    glm::vec3 normal;
    glm::vec2 texCoords;
};
```

Ce type devra être utilisé conjointement avec `sizeof` et `offsetof` pour construire le VAO (comme nous faisions avec les classes `Vertex2DColor` et `Vertex2DUV`).