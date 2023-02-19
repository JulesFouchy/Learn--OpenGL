---
title: Utiliser une structure de vertex
---

Jusqu'à présent nous avons envoyé nos sommets comme des sauvages sous la forme de flottants. Nous allons maintenant utiliser une structure pour représenter un vertex, ce qui permettra d'avoir un code plus clair à lire. Dupliquez le dossier TP1_exo2_triangle_couleur.cpp et renommez le TP1_exo3_structure_vertex.cpp puis codez dedans. Il vous faudra aussi ajouter ce nouveau dossier à la fin du `CMakeLists.txt`:

```cmake
add_exercise(TP1_exo3_structure_vertex)
```

## Définir la structure

Ajoutez l'include du fichier `glm/glm.hpp`. Ce fichier permet d'utiliser la bibliothèque de maths GLM qui nous permettra d'avoir des types vecteur, matrice et toutes les opérations associées.

Avant la fonction main, définir la structure `Vertex2DColor` possédant deux champs : `glm::vec2 position` et `glm::vec3 color`.

## Modifier le tableau de sommet

Modifiez le tableau de vertex pour utiliser votre structure à la place des floats :

```cpp
GLfloat vertices[] = { 
    -0.5f, -0.5f, 1.f, 0.f, 0.f, // Premier sommet
     0.5f, -0.5f, 0.f, 1.f, 0.f, // Deuxième sommet
     0.0f,  0.5f, 0.f, 0.f, 1.f  // Troisième sommet
};
```

devient :

```cpp
Vertex2DColor vertices[] = { 
    Vertex2DColor{{-0.5f, -0.5f}, {1.f, 0.f, 0.f}}, // Premier sommet
    Vertex2DColor{{ 0.5f, -0.5f}, {0.f, 1.f, 0.f}}, // Deuxième sommet
    Vertex2DColor{{ 0.0f,  0.5f}, {0.f, 0.f, 1.f}}  // Troisième sommet
};
```

Modifiez l'appel à `glBufferData` afin d'utiliser `3 * sizeof(Vertex2DColor)` à la place de `15 * sizeof(GLfloat)`. Il se trouve que c'est la même chose, mais `3 * sizeof(Vertex2DColor)` c'est plus clair, on comprend mieux qu'on a 3 sommets.

## Clarifier la spécification des sommets

Il est possible d'améliorer les appels à `glVertexAttribPointer` en utilisant notre structure. En effet, pour chacun des deux appels le paramètre `stride` est `5 * sizeof(GLfloat)`, ce qui correspond à `sizeof(Vertex2DColor)` (car notre structure est composée d'un vec2 et d'un vec3, soit 2 + 3 = 5 floats).

De plus le paramètre `pointer` correspond à l'offset de chaque attribut par rapport au début du tableau. Cela correspond également à l'offset de chaque champ dans la structure. La macro `offsetof` de la bibliothèque standard C++ permet de calculer cee offset automatiquement en spécifiant le nom de la structure et le champ.

Ainsi, `offsetof(Vertex2DColor, position)` vaut 0, soit l'offset de l'attribut position. `offsetof(Vertex2DColor, color)` vaut `2 * sizeof(GLfloat)`, soit l'offset de l'attribut color.

Modifiez vos deux appels à `glVertexAttribPointer` comme indiqué ci-dessus. Il se peut que vous ayez à inclure le header `cstddef` pour utiliser la macro `offsetof`. 