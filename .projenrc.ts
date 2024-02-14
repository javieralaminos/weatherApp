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
  cdkVersion: '2.1.0',
  name: 'weatherApp',
  packageName: 'weatherApp',
  deps: ['@aws-cdk/core', '@aws-cdk/aws-s3', '@aws-cdk/aws-lambda', '@aws-cdk/aws-apigateway'],
  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});

const backend = new TypeScriptAppProject({
  ...COMMON_PROJEN_SETTINGS,
  name: 'backend',
  parent: main,
  outdir: 'src/backend',
  release: false,
  buildWorkflow: false,
  deps: ['@trpc/server', 'zod', '@aws-sdk/client-dynamodb'],
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
    '@tanstack/react-query',
    '@trpc/client',
    '@trpc/react-query',
    'node-fetch',
    'date-fns',
  ],
});
frontend.addDeps(`@backend@link:${path.relative(frontend.outdir, backend.outdir)}`);

main.synth();
