---
title: Lumière ponctuelle
---

Une lumière ponctuelle éclaire depuis une position donnée.

Ce type de lumière sera donc défini par deux propriétés : sa position (vecteur 3D) et son intensité (couleur).

Créez un nouveau fragment shader sur le modèle du précédent. Appelez le `pointLight.fs.glsl`.

Remplacez la variable uniforme `uLightDir_vs` par `uLightPos_vs`.

Il faut modifier la fonction `blinnPhong`. Tout d'abord le vecteur $w_i$ doit maintenant être calculé à partir de la position du fragment et de la position de la lumière (`normalize(uLightPos_vs - vPosition_vs)`). De plus $L_i$ doit s'atténuer en fonction de la distance $d$ à la lumière. On utilise généralement une atténuation quadratique (`uLightIntensity / (d * d)`). Pour calculer la distance vous pouvez utiliser la fonction GLSL du même nom.

Adaptez le code C++ pour envoyer au shader une lumière ponctuelle plutôt que directionnelle. Il faut multiplier la position par la View Matrix avant de l'envoyer. N'oubliez pas également de changer le chargement du shader.

Faites en sorte que la lumière se déplace en spirale dans la scène (appliquez à sa position une rotation et un scale dépendant du temps). L'objectif est de constater que la lumière ponctuelle affecte plus fortement les objets proches. 