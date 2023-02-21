---
title: Multi-Texturing
---

Il est possible d'utiliser plusieurs textures à la fois dans un même shader. C'est ce qu'on appelle le **Multi-texturing**. L'utilisation la plus courante est l'application de matériaux : on a généralement une texture pour chaque type de réflexion (diffuse, spéculaire, ...). Nous verrons cette application lors du TP sur les lumières. Pour le moment nous allons ajouter une couche de nuages à la Terre, representée par une nouvelle texture.

Téléchargez le fichier [CloudMap.jpg](https://igm.univ-mlv.fr/~biri/Enseignement/IMAC2/opengl-TPs/resources/CloudMap.jpg) et placez-le dans votre répertoire de textures.

Copiez le code source du TP précédent et renommez-le.

Dans le code source, partie initialisation, chargez la nouvelle image et créez un texture object à partir de cette dernière.

Créez un nouveau shader `multiTex3D.fs.glsl`. Reprenez le code du shader `tex3D.fs.glsl` et ajoutez une nouvelle variable uniforme de type `sampler2D` pour la deuxième texture. Dans le `main`, lisez la couleur de chacune des textures. Additionnez[^1] les deux couleurs et placez le résultat dans la couleur de sortie. 

[^1]: NB : ce n'est pas comme ça qu'on fait du blending de textures proprement, mais ça sera plus simple pour l'instant.

Modifiez le code C++ pour charger votre nouveau shader.

Pour pouvoir utiliser plusieurs textures en même temps, il faut les binder sur des **unités de texture** différentes. Une unité de texture est représentée par une constante de la forme `GL_TEXTUREi`. Par exemple `GL_TEXTURE0` représente l'unité de texture 0, `GL_TEXTURE1` l'unité de texture 1, etc. À noter qu'on peut aussi utiliser `GL_TEXTURE0 + 1` pour obtenir `GL_TEXTURE1`.

Pour binder sur une unité de texture particulière, il faut l'activer avec la fonction `glActiveTexture`.

Voici un exemple de code :

```cpp
glActiveTexture(GL_TEXTURE0);
glBindTexture(GL_TEXTURE2D, earthTexture); // la texture earthTexture est bindée sur l'unité GL_TEXTURE0
glActiveTexture(GL_TEXTURE1);
glBindTexture(GL_TEXTURE2D, cloudTexture); // la texture cloudTexture est bindée sur l'unité GL_TEXTURE1
```

Les textures restent bindées sur les unités de texture tant qu'on ne les débind pas. Voici un exemple de débinding correspondant au code précédent :

```cpp
glActiveTexture(GL_TEXTURE0);
glBindTexture(GL_TEXTURE2D, 0); // débind sur l'unité GL_TEXTURE0
glActiveTexture(GL_TEXTURE1);
glBindTexture(GL_TEXTURE2D, 0); // débind sur l'unité GL_TEXTURE1
```

Lorsqu'une texture est bindée sur une unité de texture, les shaders peuvent l'utiliser même si l'unité n'est plus "active" au sens d'OpenGL (le nom de la fonction `glActiveTexture` est assez mal choisi selon moi).

Il faut alors associer chaque variable uniforme de texture présente dans les shaders à une unité de texture. Pour cela on utilise la fonction `glUniform1i` en lui passant l'index de l'unité de texture sur laquelle on souhaite lire. Voici un exemple :

```cpp
// Récupère la location de la première texture dans le shader
GLint uEarthTexture = glGetUniformLocation(shader.id(), "uEarthTexture");
// Récupère la location de la deuxième texture dans le shader
GLint uCloudTexture = glGetUniformLocation(shader.id(), "uCloudTexture");
// Indique à OpenGL qu'il doit aller chercher sur l'unité de texture 0 
// pour lire dans la texture uEarthTexture
glUniform1i(uEarthTexture, 0);
// Indique à OpenGL qu'il doit aller chercher sur l'unité de texture 1
// pour lire dans la texture uCloudTexture
glUniform1i(uCloudTexture, 1);
```

Vous noterez que pour les variables uniforme, on n'utilise pas les constantes `GL_TEXTUREi` mais directement l'index `i`.

Dans votre code C++, récupérez la location des variables uniformes correspondant à vos deux textures et utilisez `glUniform1i` comme indiqué dans l'exemple pour aller lire sur les unités de texture 0 et 1.

Dans votre boucle de rendu, bindez les textures sur les bonnes unités afin de pouvoir utiliser les deux textures. Dans le cas du dessin de la Terre on utilise la texture de Terre et la texture de nuage. Dans le cas du dessin de la lune on utilise la texture de lune et la texture de nuage. Voici un exemple de code pour dessiner la terre :

```cpp
 // Les transformations viennent avant...
glActiveTexture(GL_TEXTURE0);
glBindTexture(GL_TEXTURE_2D, earthTexture);
glActiveTexture(GL_TEXTURE1);
glBindTexture(GL_TEXTURE_2D, cloudTexture);

glDrawArrays(GL_TRIANGLES, 0, sphere_vertices.size());
```

Voici une image du résultat attendu :

![](img/multitexturing.jpg)

## Retirer les nuages des lunes

Avoir des nuages sur les lunes, ce n'est pas très logique. On a deux solutions pour les retirer :

- Solution simple mais peu générique : débinder la texture située sur l'unité de texture 1. En faisant ça, le shader essaiera de lire sur une unité de texture ne contenant aucune texture. Dans ce cas le comportement par défaut est de renvoyer la couleur noire (`vec3(0.)`). On additionnera donc la couleur de la lune à `vec3(0.)`, ce qui affichera simplement la lune sans nuages.
- Solution un poil plus compliquée mais plus souple : on utilise deux shaders, un pour dessiner la Terre et un pour dessiner les lunes.

Essayez la première solution.

Comme on aime les choses compliquées, et surtout qu'il est important de savoir utiliser plusieurs shaders pour dessiner différents objets de manière différente, nous allons également coder la deuxième solution dans l'exercice suivant. 