// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const math = require('remark-math');
const katex = require('rehype-katex');

const organizationName = "JulesFouchy";
const projectName = "Learn--OpenGL";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Learn OpenGL',
  tagline: 'Learn OpenGL',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: `https://${organizationName}.github.io`,
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: `/${projectName}/`,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName, // Usually your GitHub org/user name.
  projectName, // Usually your repo name.
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
            path: "content",
            routeBasePath: "/",
            sidebarPath: require.resolve('./sidebars.js'),
            remarkPlugins: [math],
            rehypePlugins: [katex],
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
  
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/opengl_logo.png',
      navbar: {
        title: '',
        logo: {
          alt: 'OpenGL Logo',
          src: 'img/opengl_logo.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'TP1/intro',
            position: 'left',
            label: 'TP1',
          },
          {
            type: 'doc',
            docId: 'TP2/telecharger-le-template',
            position: 'left',
            label: 'TP2',
          },
          {
            type: 'doc',
            docId: 'TP3/le-code-de-base',
            position: 'left',
            label: 'TP3',
          },
          {
            type: 'doc',
            docId: 'TP4/shaders-kesako',
            position: 'left',
            label: 'TP4',
          },
          {
            type: 'doc',
            docId: 'TP5/intro',
            position: 'left',
            label: 'TP5',
          },
          {
            type: 'doc',
            docId: 'TP6/intro',
            position: 'left',
            label: 'TP6',
          },
          {
            type: 'doc',
            docId: 'TP7/intro',
            position: 'left',
            label: 'TP7',
          },
          {
            type: 'doc',
            docId: 'TP8/intro',
            position: 'left',
            label: 'TP8',
          },
          {
            type: 'doc',
            docId: 'ressources',
            position: 'left',
            label: 'Ressources',
          },
          {
            href: 'https://github.com/JulesFouchy/Learn--OpenGL',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        copyright: `Les sujets de TP (dont les blagues et le style jeune cool) ont été rédigés par <a href=http://laurentnoel.fr/>Laurent NOËL</a>.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
