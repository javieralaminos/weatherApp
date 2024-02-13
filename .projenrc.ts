import { awscdk } from 'projen';
import { PythonProject } from 'projen/lib/python';
import { ReactTypeScriptProject } from 'projen/lib/web';

const COMMON_PROJEN_SETTINGS = {
  defaultReleaseBranch: 'main',
  authorName: 'Javier Alaminos',
  authorEmail: 'javialaminos@gmail.com',
  description: 'A simple weather app',
  projenrcTs: true,
};

const main = new awscdk.AwsCdkTypeScriptApp({
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

new ReactTypeScriptProject({
  ...COMMON_PROJEN_SETTINGS,
  name: 'frontend',
  parent: main,
  outdir: 'frontend',
  release: false,
  buildWorkflow: false,
});

new PythonProject({
  ...COMMON_PROJEN_SETTINGS,
  moduleName: 'backend',
  version: '0.1.0',
  venv: true,
  venvOptions: {
    pythonExec: 'python3',
  },
  pytest: true,
  name: 'backend',
  parent: main,
  deps: ['fastapi'],
  devDeps: [],
  outdir: 'backend',
  description: 'A simple weather app',
  packageName: 'weatherApp-backend',
});

main.synth();
