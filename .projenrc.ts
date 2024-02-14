import path from 'path';
import { AwsCdkTypeScriptApp } from 'projen/lib/awscdk';
import { TypeScriptAppProject } from 'projen/lib/typescript';
import { ReactTypeScriptProject } from 'projen/lib/web';

const COMMON_PROJEN_SETTINGS = {
  defaultReleaseBranch: 'main',
  authorName: 'Javier Alaminos',
  authorEmail: 'javialaminos@gmail.com',
  description: 'A simple weather app',
  projenrcTs: true,
  eslint: true,
};

const main = new AwsCdkTypeScriptApp({
  ...COMMON_PROJEN_SETTINGS,
  cdkVersion: '1.204.0',
  name: 'weatherApp',
  packageName: 'weatherApp',
  deps: ['@aws-cdk/core', '@aws-cdk/aws-s3', '@aws-cdk/aws-lambda', '@aws-cdk/aws-apigateway', '@aws-cdk/aws-dynamodb', '@aws-cdk/aws-lambda-nodejs'],
  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});

const REACT_QUERY_VERSION = '<5'; // v5 is not compatible with trpc v10
const TRPC_VERSION = '10.45.0';
const backend = new TypeScriptAppProject({
  ...COMMON_PROJEN_SETTINGS,
  name: 'backend',
  parent: main,
  outdir: 'src/backend',
  release: false,
  buildWorkflow: false,
  deps: [`@trpc/server@${TRPC_VERSION}`, 'zod', '@aws-sdk/client-dynamodb'],
  devDeps: ['@types/aws-lambda'],
});
const frontend = new ReactTypeScriptProject({
  ...COMMON_PROJEN_SETTINGS,
  name: 'frontend',
  parent: main,
  outdir: 'src/frontend',
  release: false,
  buildWorkflow: false,
  deps: [
    '@emotion/react',
    '@emotion/styled',
    '@mui/icons-material',
    '@mui/material',
    '@mui/x-date-pickers',
    'eslint-plugin-react-hooks',
    'highcharts',
    'zod',
    `@tanstack/react-query@${REACT_QUERY_VERSION}`,
    `@trpc/client@${TRPC_VERSION}`,
    `@trpc/react-query@${TRPC_VERSION}`,
    'node-fetch',
    'date-fns',
  ],
});
frontend.addDeps(`@weatherApp/backend@link:${path.relative(frontend.outdir, backend.outdir)}`);
main.synth();
