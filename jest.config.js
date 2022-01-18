const { pathsToModuleNameMapper } = require('ts-jest');
const tsconfig = require('./tsconfig.paths.json');

const tsConfigPathsNameMapper = pathsToModuleNameMapper(
  tsconfig.compilerOptions.paths,
  {
    prefix: '<rootDir>/src/',
  },
);

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/jest/mockFile.js',
    '\\.(scss|less)$': 'identity-obj-proxy',
    ...tsConfigPathsNameMapper,
  },
};
