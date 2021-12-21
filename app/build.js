const { build } = require("esbuild");
const { sassPlugin } = require("esbuild-sass-plugin");
const inlineImage = require("esbuild-plugin-inline-image");

(async () => {
  const res = await build({
    entryPoints: ["./index.ts"],
    bundle: true,
    minify: true,
    watch: true,
    platform: "browser",
    target: ["es2015", "safari11"],
    // target: ["es6", "safari11"],
    outfile: "../assets/bundled.min.js",
    publicPath: "https://southwinnipegcc.ca/wp-content/themes/swcc/assets",
    plugins: [sassPlugin(), inlineImage()],
  });
})();
