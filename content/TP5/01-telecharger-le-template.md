---
title: Télécharger le template
---
import ToDo from "@site/src/components/ToDo"

Vous n'en aurez pas besoin car tout est expliqué dans les TPs au fur et à mesure, mais si jamais, vous pouvez retrouver la documentation de la bibliothèque p6 [ici](https://julesfouchy.github.io/p6-docs/).

<ToDo/> Télécharger l'archive de code en choisissant dans les versions suivantes :

    GLImac-Template.tar.gz : la version classique SDL sur laquelle les TD sont construits.
    GLImac-Template-GLEW_inside.tgz : la version classique SDL sur laquelle les TD sont construits mais avec la bibliothèque GLEW incluse.
    GLImac-Template-GLFW.tgz : une version exploitant GLFW, une bibliothèque plus simple à instaler sur Mac et Windows. Attention la suite des TD n'est pas fondée sur cette implémentation Un grand merci à Jules Fouchy

Le template de code va vous permettre de commencer rapidement à coder en OpenGL. C'est un projet CMake que j'ai ecrit pour gérer proprement les différent TPs en conservant le code de chaque scéance.

Sans trop entrer dans les détails, CMake est un outil permettant de gérer plus ou moins facilement des projets multi-plateforme. Sous Unix il génère des Makefile pour compiler le projet, sous windows il peut générer un projet visual studio, etc. 