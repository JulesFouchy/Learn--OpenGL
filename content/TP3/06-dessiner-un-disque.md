---
title: Dessiner un disque
---

Après le quad, le disque ! Plus difficile, avec un nombre arbitraire de triangles pour approximer le disque.

Sur papier, identifez une manière de découper un disque en
triangles. Sachant que l'équation paramétrique du cercle est $(x, y) = (r\times\cos(\theta), r\times\sin(\theta))$ (où $(x, y)$ sont des points sur le cercle, $r$ le rayon du cercle et $\theta$ un angle variant de $0$ à $2\pi$), identifiez la position de chacun des sommets des triangles en fonction du nombre de triangle $N$, du rayon $r$ et de l'index du sommet sur le cercle (grosses maths en perspective !).

Modifiez le code pour dessiner un disque découpé en $N$ triangles (définissez $N$ comme une variable dans le code). Pour le tableau de vertex vous pouvez à présent utiliser un `std::vector<Vertex2DColor>` qui vous permet de définir un tableau de taille variable. À nouveau il faut modifier l'appel à `glBufferData` pour prendre en compte la taille du tableau et passer le pointeur vers les données brutes (en utilisant la méthode `data()` du `std::vector`). Il faut également modifier l'appel à `glDrawArrays` pour dessiner tous les vertex (nombre de triangles multiplié par 3).

:::tip
Vous aurez sans doute besoin d'utiliser la valeur de $\pi$ et les fonctions $\cos$ et $\sin$. $\pi$ peut être obtenu en utilisant `glm::pi<float>()`. $\cos$ et $\sin$ peuvent être calculés en utilisant les fonction `glm::cos()` et `glm::sin`.
:::
