---
title: Préparer la suite
---

L'objectif des exercices suivants est d'apprendre à manipuler deux nouveaux concepts de GLSL : les variables **uniformes** et l'application de textures. Mais avant tout vous allez mettre en place la scène que nous utiliserons à présent, qui requiert d'avoir des coordonnées de texture pour chaque sommet.

La suite est à refaire "from scratch", c'est à dire sans copier-coller un des exercices précédents. Il faut simplement redessiner un triangle, mais en utilisant une structure de sommet différente.

Créez une nouvelle copie d'un dossier de TP.

Écrivez une structure `Vertex2DUV` contenant un `glm::vec2` pour la position (x, y) et un `glm::vec2` pour les coordonnées de texture (u, v).

Dans la fonction `main`, partie initialisation, créez un VBO que vous remplirez avec les 3 sommets d'un triangle : $P_1 = (-1, -1)$, $P_2 = (1, -1)$, $P_3 = (0, 1)$.

Vous devez utiliser votre structure `Vertex2DUV`. Pour le moment mettez u et v à 0 pour chacun des sommets.

Créez un VAO décrivant le VBO.

Créez deux nouveaux shaders `tex2D.vs.glsl` et `tex2D.fs.glsl` dans le répertoire des shaders. Codez-les de manière à afficher en 2D des sommets de couleur rouge. Attention : notre structure de sommet a changé ; par conséquent le vertex shader ne doit plus prendre en entrée la couleur du sommet mais ses coordonnées de texture, de type `vec2`.

Dans le `main`, chargez vos shaders et activez le programme GLSL associé.

Dans la boucle de rendu, dessinez votre triangle (utilisez `glDrawArrays` puisque l'on n'utilise pas d'IBO).

Enfin testez l'application, un triangle rouge devrait s'afficher. 