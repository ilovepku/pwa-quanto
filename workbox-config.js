module.exports = {
  globDirectory: "build/",
  globPatterns: ["**/*.{png,json,ico,html,js,css}"],
  swDest: "build\\sw.js",
  swSrc: "src/sw-template.js",
  injectionPointRegexp: /(self.__precacheManifest = )\[\](.concat\(self.__precacheManifest \|\| \[\]\);)/
};
