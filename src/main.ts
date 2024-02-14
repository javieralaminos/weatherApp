import path from 'path';
import { App, RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import { LambdaRestApi } from 'aws-cdk-lib/aws-apigateway';
import { AllowedMethods, CachePolicy, Distribution, OriginAccessIdentity, ViewerProtocolPolicy } from 'aws-cdk-lib/aws-cloudfront';
import { RestApiOrigin, S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { AttributeType, BillingMode, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
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
      runtime: Runtime.NODEJS_16_X,
      environment: {
        TABLE_NAME: table.tableName,
      },
    });
    table.grantReadWriteData(lambdaFunction);
    const api = new LambdaRestApi(this, 'weatherApi', {
      handler: lambdaFunction,
      proxy: false,
    });
    const root = api.root.addResource('trpc');
    root.addResource('getTimeSeries').addMethod('POST');
    root.addResource('setWeather').addMethod('POST');

    // Front end deployment
    const originAccessIdentity = new OriginAccessIdentity(this, 'OAI');
    const websiteBucket = new Bucket(this, 'weatherAppS3', {
      removalPolicy: RemovalPolicy.DESTROY,
    });
    websiteBucket.grantRead(originAccessIdentity);
    const distribution = new Distribution(this, 'Distribution', {
      defaultBehavior: { origin: new S3Origin(websiteBucket) },
      defaultRootObject: 'index.html',
    });
    new BucketDeployment(this, 'DeployWithInvalidation', {
      sources: [Source.asset(path.join(__dirname, 'frontend/build'))],
      destinationBucket: websiteBucket,
      distribution,
    });
    distribution.addBehavior('/trpc/*', new RestApiOrigin(api), {
      allowedMethods: AllowedMethods.ALLOW_ALL,
      cachePolicy: CachePolicy.CACHING_DISABLED,
      viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
    });
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