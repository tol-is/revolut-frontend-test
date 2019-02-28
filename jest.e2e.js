module.exports = {
  preset     : 'jest-puppeteer',
  setupFiles : [
    "<rootDir>/config/polyfills.js",
  ],
  testMatch : [
    "<rootDir>/src/**/__e2e__/**/*.{js,jsx,mjs}",
    "<rootDir>/src/**/?(*.)(e2e).{js,jsx,mjs}",
  ],
  transform : {
    "^.+\\.(js|jsx|mjs)$"              : "<rootDir>/node_modules/babel-jest",
    "^.+\\.css$"                       : "<rootDir>/config/jest/cssTransform.js",
    "^(?!.*\\.(js|jsx|mjs|css|json)$)" : "<rootDir>/config/jest/fileTransform.js",
  },
  transformIgnorePatterns : [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$",
  ],
  moduleNameMapper : {
    "^react-native$" : "react-native-web",
    "app/(.*)$"      : "<rootDir>/src",
  },
};
