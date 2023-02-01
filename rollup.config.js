import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import alias from '@rollup/plugin-alias';

export default {
  input: 'src/index.js',
  output: {
    file: "www/js/bundle.js",
    format: 'iife'
  },
  plugins: [
    /**
     * Recommended (but not required):
     *
     * alias allow us to use release builds in production
     * minified builds in PixiJS exclude verbose logs
     * and other non-critical debugging information.
     */
    ...process.env.BUILD === 'production' ? [alias({
      entries: [{
        find: /^(@pixi\/([^\/]+))$/,
        replacement: '$1/dist/esm/$2.min.js',
      }, {
        find: 'pixi.js',
        replacement: 'pixi.js/dist/esm/pixi.min.js',
      }]
    })] : [],
    /**
     * Required!
     *
     * `preferBuiltins` is required to not confuse Rollup with
     * the 'url' dependence that is used by PixiJS utils
     */
    resolve({
      preferBuiltins: false,
    }),
    /**
     * Required!
     *
     * PixiJS third-party dependencies use CommonJS exports
     * and do not have modules bundles available
     */
    commonjs(),
  ]
};

/*
import nodeResolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import replace from "rollup-plugin-replace";
import builtins from "rollup-plugin-node-builtins";
import copy from "rollup-plugin-copy";
import { terser } from "rollup-plugin-terser";


var _prod = process.env.NODE_ENV === "production";

console.log('------------ ROLLUP config for ' + process.env.NODE_ENV)

// const globals = {
//   "pixi.js": "PIXI",
//   "@pixi/core": "PIXI",
//   "@pixi/settings": "PIXI",
//   "@pixi/math": "PIXI",
//   "@pixi/utils": "PIXI.utils",
//   "@pixi/filter-alpha": "PIXI.filters",
//   "@pixi/filter-blur": "PIXI.filters",
//   "@pixi/constants": "PIXI",
//   "@pixi/display": "PIXI",
//   "@pixi/runner": "PIXI",
// };
// const external = Object.keys(globals);

export default {
  input: "src/index.js",
  output: {
    // globals,
    file: "www/js/bundle.js",
    format: "iife",
  },
  // external,
  plugins: [
    // copy({
    //   targets: [{ src: "node_modules/pixi.js/dist/*", dest: "www/js/pixi/" }],
    // }),
    builtins(),
    nodeResolve({}),
    replace({
      "process.env.NODE_ENV": _prod === true ? "'production'" : "'dev'",
    }),
    commonjs({
      namedExports: {
        "resource-loader": ["Resource"],
      },
    }),
    _prod === true ? terser() : false,
  ],
};
*/