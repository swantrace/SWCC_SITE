const { build } = require("esbuild");
const { sassPlugin } = require("esbuild-sass-plugin");

build({
  entryPoints: ["./src/index.js"],
  bundle: true,
  minify: true,
  watch: true,
  outfile: "../assets/bundled.min.js",
  plugins: [sassPlugin()],
}).catch(() => process.exit(1));
