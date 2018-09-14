module.exports = {
  "root": true,
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  "extends": ["standard"],
  "globals": {
  },
  "rules": {
    "no-new": 0,
    "comma-dangle": [2, "only-multiline"]
  },
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true
    }
  }
}
