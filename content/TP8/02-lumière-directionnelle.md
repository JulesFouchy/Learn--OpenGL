---
title: Lumière directionnelle
---

Une lumière directionnelle éclaire depuis l'infini dans une unique direction tous les objets de la scène. On peut utiliser ce type de lumière pour simuler des sources très lointaines comme le Soleil par exemple.

Ce type de lumière sera donc défini par deux propriétés : sa direction incidente (vecteur 3D) et son intensité (couleur).

Créez un nouveau fragment shader sur le modèle de celui utilisé pour les textures (même variables "in", supprimez la texture). Appelez-le `directionalLight.fs.glsl`.

Ajoutez les variables uniformes `vec3 uKd`, `vec3 uKs` et `float uShininess` qui nous serviront à représenter le matériau de l'objet en cours de dessin.

Ajoutez les variables uniformes `vec3 uLightDir_vs` et `vec3 uLightIntensity` qui nous serviront à passer les informations sur la lumière au shader. Notez le suffixe `_vs` sur la direction : cela indique que nous allons travailler dans le view space ; il faudra donc multiplier la direction de la lumière par la View Matrix avant de l'envoyer au shader.

Toujours dans le shader, écrivez la fonction `vec3 blinnPhong()` qui calcule et renvoie la couleur du fragment en fonction des paramètres de matériau et d'éclairage. Il faut pour cela implanter la formule vue précédemment. $\vec{w_i}$ correspond simplement à `uLightDir_vs` normalisé. $L_i$ correspond à `uLightIntensity`. Pour calculer $\vec{halfVector}$ il faut d'abord calculer $\vec{w_o}$ qui est le vecteur pointant vers la caméra. Or l'avantage d'avoir les positions dans le View Space est que la position de la caméra est à l'origine du repère. Par conséquent $\vec{w_o}$ est simplement l'opposé de la position du fragment normalisée (`normalize(-vPosition_vs)`). N'oubliez pas d'utiliser la fonction `dot` pour les produits scalaires et `pow` pour l'élévation à la puissance.

Dans le `main` du shader, utilisez votre fonction `blinnPhong` pour calculer la couleur finale `fFragColor`.

Il faut à présent écrire le code C++ correspondant.

Reprenez le code des planètes (avec caméra) en supprimant le chargement et le binding des textures.

Chargez votre nouveau shader.

Récupérez les locations des nouvelles variables uniformes (fonction `glGetUniformLocation`).

Dans la boucle de rendu, envoyez les valeurs des variables uniformes (rappel : en utilisant les fonctions de la forme `glUniformXf`). Pour la direction de la lumière, utilisez $(1, 1, 1)$ mais n'oubliez pas de multiplier par la View Matrix avant d'envoyer au shader. Pour les coefficients de matériaux essayez différentes valeurs.

Faites en sorte que chaque sphère soit dessinée avec un matériau aléatoire.

Faites en sorte que la lumière tourne autour de la scène (pour cela appliquez une rotation dépendant du temps au vecteur $(1, 1, 1)$ avant de multiplier par la View Matrix).