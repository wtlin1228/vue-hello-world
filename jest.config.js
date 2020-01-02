const { defaults } = require("jest-config");
module.exports = {
  verbose: true,
  transform: {
    "^.+\\.js$": "babel-jest",
    "^.+\\.vue$": "vue-jest"
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{js,vue}",
    "!**/node_modules/**",
    "!**/vendor/**",
    "!**/coverage/**",
    "!**/*.config.*",
    "!**/dist/**",
    "!**/src/store/index.js",
    "!**/src/store/actions.js",
    "!**/src/store/mutations.js",
    "!**/src/store/mutation-types.js",
    "!**/src/store/modules/index.js",
    "!**/src/api/**",
    "!src/main.js"
  ],
  moduleFileExtensions: [...defaults.moduleFileExtensions, "vue"]
};
