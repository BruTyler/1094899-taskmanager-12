module.exports = {
  rootDir: `./src`,
  transform: {
    "^.+\\.ts?$": `ts-jest`,
    "^.+\\.js?$": `babel-jest`,
  },
  testRegex: `.test.(js?|ts?)$`,
  moduleFileExtensions: [
    `ts`,
    `js`,
    `json`,
  ],
  moduleNameMapper: {
    "\\.(css)$": `identity-obj-proxy`,
  }
};
