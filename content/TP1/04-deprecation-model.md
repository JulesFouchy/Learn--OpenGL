---
title: Deprecation model
---

## Le deprecation model

Il est toujours possible en OpenGL 3+ de faire du rendu direct, ou d'utiliser le pipeline fixe (sans shaders). Mais ces méthodes sont maintenant **dépréciées**. Cela signifie qu'il est très déconseillé de les utiliser, car un jour elles pourraient ne plus être disponible. Cela a conduit au **deprecation model** OpenGL : une grosse partie des fonctions OpenGL sont marquées dépréciées et ne doivent plus être utilisées.

## Core profile vs. Compatibility profile

Comment savoir quelles fonctions on est en droit d'utiliser ? Pour cela les fonctions ont été classés. Une fonction n'est pas dépréciée si elle appartient au **Core Profile**. Le **Compatibility Profile** contient le Core Profile ainsi que toutes les autres fonctions.

Voici [un lien vers le SDK OpenGL](https://www.khronos.org/registry/OpenGL-Refpages/). Vous pouvez voir des liens vers les documentations des différentes version. Celles correspondant au Core Profile sont OpenGL 3.3 et plus. Il ne faut pas utiliser la documentation de OpenGL 2.1.

[Documentation de OpenGL 4.5 (contenant les versions antérieures)](https://www.khronos.org/registry/OpenGL-Refpages/gl4//)

La version 4 fait aussi partie du Core Profile puisqu'elle ne fait qu'ajouter des fonctionnalités. Vous pouvez ou ne pouvez pas l'utiliser à l'université cela dépendant des cartes graphiques installées sur les ordinateurs (aussi sur votre PC s'il est récent). Essayez, sous linux, la commande glxinfo dans un terminal.

Autre outil très interessant: **les quick reference cards** que vous pouvez imprimer. C'est un genre de memo de toutes les fonctions OpenGL. Attention néammoins à en utiliser une qui traite du Core Profile, par exemple [la carte de la version 4.2](https://www.opengl.org/sdk/docs/reference_card/opengl42-core-quick-reference-card.pdf) (la plupart des fonctions sont disponibles en 3.3).
