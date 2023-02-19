# Learn--OpenGL

Reprend les cours de ... avec les améliorations suivantes :

- Moins de fautes de français
- Fonctionne sous tous les OS sans avoir rien à faire
- Pas de bugs
- Un setup un peu plus moderne, qui offre nottament un debug OpenGL grandement facilité
- De l'écriture inclusive !
- Mise à jour de qques infos out-of-date
- Les consignes de l'exercice "Dessiner un triangle blanc" sont garanties de vous donner un triangle blanc à la fin
- Pas besoin de relancer CMake a chaque fois que vous changez vos shaders

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
