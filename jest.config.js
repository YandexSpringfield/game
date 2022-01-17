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
  testEnvironment: 'node',
  moduleNameMapper: {
    ...tsConfigPathsNameMapper,
    '\\.(scss|less)$': 'identity-obj-proxy',
  },
};
