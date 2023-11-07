import * as nodePath from "path";
const rootFoulder = nodePath.basename(nodePath.resolve());

const buildFoulder = `../public`;
const srcFoulder = `./src`;

export const path = {
  build: {
    img: `${buildFoulder}/images/`,
    js: `${buildFoulder}/js/`,
    css: `${buildFoulder}/css/`,
    html: `${buildFoulder}/`,
    files: `${buildFoulder}/files/`,
  },
  src: {
    img: `${srcFoulder}/images/*.*`,
    svg: `${srcFoulder}/images/*.svg`,
    js: `${srcFoulder}/js/main.js`,
    scss: `${srcFoulder}/scss/style.scss`,
    html: `${srcFoulder}/*.html`, //pug
    files: `${srcFoulder}/files/**/*.*`,
  },
  watch: {
    img: `${srcFoulder}/images/**/*.*`,
    js: `${srcFoulder}/js/**/*.js`,
    scss: `${srcFoulder}/scss/**/*.scss`,
    html: `${srcFoulder}/**/*.html`, //pug
    files: `${srcFoulder}/files/**/*.*`,
  },
  clean: buildFoulder,
  buildFoulder: buildFoulder,
  srcFoulder: srcFoulder,
  rootFoulder: rootFoulder,
  ftp: ``,
};
