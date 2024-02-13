import { App, RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import { LambdaRestApi } from 'aws-cdk-lib/aws-apigateway';
import { AttributeType, BillingMode, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';

export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    const table = new Table(this, 'weatherTable', {
      tableName: 'weatherTable',
      partitionKey: { name: 'pk', type: AttributeType.STRING },
      sortKey: { name: 'sk', type: AttributeType.STRING },
      billingMode: BillingMode.PAY_PER_REQUEST,
      removalPolicy: RemovalPolicy.DESTROY,
    });
    // Create the Lambda function
    const lambdaFunction = new NodejsFunction(this, 'weatherLambda', {
      entry: require.resolve('./backend/src/index'),
      runtime: Runtime.NODEJS_18_X,
      environment: {
        TABLE_NAME: table.tableName,
      },
    });
    table.grantReadWriteData(lambdaFunction);
    const api = new LambdaRestApi(this, 'weatherApi', {
      handler: lambdaFunction,
      proxy: false,
    });
    api.root.addResource('getTimeSeries').addMethod('POST');
    api.root.addResource('setWeather').addMethod('POST');
  }
}

// for development, use account/region from cdk cli
const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new App();

new MyStack(app, 'weatherApp-dev', { env: devEnv });
// new MyStack(app, 'weatherApp-prod', { env: prodEnv });

app.synth();