---
title: Un triangle qui tourne
---
 
Jusqu'ici nos scènes ont été statiques. Nous allons utiliser la notion de variable uniforme pour envoyer au shader le temps courant et faire tourner le triangle en fonction de ce temps.

## Les variables uniformes

Une variable uniforme est une variable d'entrée d'un shader **qui reste constante pour tous les sommets d'un appel de dessin (draw call)**.

Un draw call est simplement un appel à une fonction de la forme **glDraw***, comme par exemple `glDrawArrays` que vous utilisez dans votre boucle de rendu.

Lorsqu'on appelle une de ces fonctions, un ensemble de sommets est dessiné par la carte graphique sous la forme de primitives, en utilisant les shaders actifs.

Avant de faire un draw call, il est possible d'envoyer des valeurs à nos shaders à l'aide de variables uniformes. Ces valeurs resteront constantes pour tous les sommets dessinés par le draw call. Après le draw call, on peut modifier ces valeurs et faire un nouveau draw call pour dessiner un objet paramétré par les nouvelles valeurs.

L'exemple le plus courant est celui des transformations. Il est possible d'envoyer une matrice sous la forme de variable uniforme qui sera appliquée par nos shaders à tous les sommets. On peut ensuite dessiner plusieurs fois le même objet à des positions différentes simplement en changeant la matrice entre chaque appel de dessin.

Un autre exemple simple : les textures. On peut changer la ou les textures courantes avec des variables uniformes. Ainsi on peut dessiner le même objet plusieurs fois mais avec une apparence différente.

## Définir une variable uniforme

Dans votre vertex shader (`tex2D.vs.glsl`), ajoutez avant le `main` la ligne:

```glsl
uniform float uTime;
```

Cette ligne définit la variable uniforme `uTime`. Comme son nom l'indique, nous allons l'utiliser pour envoyer le temps écoulé depuis le début de l'application à notre shader.

Récupérez votre fonction `mat3 rotate(float a)` écrite pour les shaders du TP précédent. Dans le `main` du shader, utilisez cette fonction pour construire une matrice de rotation avec pour angle la valeur de la variable `uTime`. Utilisez ensuite cette matrice pour transformer le sommet en entrée du shader (référez vous au TP précédent si vous avez oubliez ces notions).

:::info
On préfixe les variables uniforme par un "u".
:::

## Modifier la variable uniforme depuis l'application

Placez-vous à présent dans le `main` de l'application (code C++).

Chaque variable uniforme définie dans un programme GLSL (vertex shader ou fragment shader) possède une **location**, qui est simplement un entier allant de 0 au nombre total de variables uniformes - 1.

Cette location doit être récupérée pour pouvoir modifier la valeur de la variable présente dans le shader. Pour cela il faut utiliser la fonction `glGetUniformLocation`.

Juste après l'activation du programme GLSL (ligne `shader.use()` normalement), utilisez la fonction `GLint glGetUniformLocation(GLuint program, const GLchar *name)` pour récupérer la location de votre variable uniforme. Le premier argument de cette fonction est l'identifiant OpenGL du programme, que vous pouvez obtenir en utilisant la méthode `id()` de la classe `p6::Shader`.

[glGetUniformLocation](https://www.khronos.org/registry/OpenGL-Refpages/gl4/html/glGetUniformLocation.xhtml)

Il est ensuite possible de modifier la valeur de la variable uniforme en utilisant les fonctions ayant la forme __glUniform*__. Il existe une fonction pour chaque type GLSL possible.

[glUniform](https://www.khronos.org/registry/OpenGL-Refpages/gl4/html/glUniform.xhtml)

Par exemple pour modifier une uniforme de type `float`, il faut utiliser la fonction `glUniform1f`. Pour le type `vec3`, il faut utiliser `glUniform3f`.

Avant d'appeler cette fonction, il faut avoir récupéré la location (car c'est le premier argument à passer à la fonction), et il faut que le programme définissant l'uniforme soit activé.

Dans un premier temps, avant le `main`, utilisez la fonction pour fixer l'uniforme `uTime` à la valeur 45. Essayez le programme, votre triangle devrait s'afficher tourné de 45°.

Si ça ne fonctionne pas, plusieurs choses à vérifier :

- La fonction `glGetUniformLocation` doit vous avoir renvoyé une valeur non-négative. Si ce n'est pas le cas, alors soit vous n'avez pas défini la variable `uTime` dans le vertex shader, soit vous ne l'utilisez pas.
- Vérifiez que vous appliquez bien la rotation à vos sommets dans le vertex shader.
- Vérifiez que le programme est bien activé (`shader.use()`) au moment de l'appel à `glUniform1f`.

## Tu tourne !

L'intérêt des variables uniformes, c'est de les changer à chaque tour de boucle. Il faut la changer avant l'appel à `glDrawArrays`, afin que la modification soit prise en compte.

En incrémentant une variable (de type `float`) à chaque tour de boucle, modifiez la valeur de la variable uniforme `uTime` avant l'appel de dessin (`glDrawArrays`). Testez votre programme, le triangle devrait s'animer et tourner sur lui-même.

:::caution
La vitesse de rotation est determinée par la valeur d'incrémentation appliquée à chaque tour de boucle. Si on voulait faire les choses proprement, on récupérerait le temps réel écoulé depuis le dernier tour et en fonction d'une valeur de vitesse spécifiée on modifierait l'angle.
:::