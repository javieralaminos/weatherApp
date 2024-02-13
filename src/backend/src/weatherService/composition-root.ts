import { initTRPC } from '@trpc/server';
import { awsLambdaRequestHandler } from '@trpc/server/adapters/aws-lambda';
import { WeatherRepositoryStubAdapter, WeatherRepositoryDynamoAdapter } from './adapters/driven';
import { weatherServerTrpcAdapter } from './adapters/driver';
import { weatherInjestionTrpcAdapter } from './adapters/driver/weather-injestion-trpc-adapter';
import { WeatherService } from './app/weatherService';

export const trpcCompose = () => {
  const forManagingWeather = new WeatherRepositoryDynamoAdapter();
  const api = new WeatherService(forManagingWeather);

  const trpcInstance = initTRPC.create();
  const weatherServer = weatherServerTrpcAdapter(api, trpcInstance);
  const weatherIngestion = weatherInjestionTrpcAdapter(api, trpcInstance);
  const appRouter = trpcInstance.mergeRouters(weatherServer, weatherIngestion);
  const handler = awsLambdaRequestHandler({
    router: appRouter,
  });
  return { handler, appRouter };
};

export const trpcStubCompose = () => {
  const forManagingWeather = new WeatherRepositoryStubAdapter();
  const api = new WeatherService(forManagingWeather);

  const trpcInstance = initTRPC.create();
  const weatherServer = weatherServerTrpcAdapter(api, trpcInstance);
  const weatherIngestion = weatherInjestionTrpcAdapter(api, trpcInstance);
  const appRouter = trpcInstance.mergeRouters(weatherServer, weatherIngestion);
  const handler = awsLambdaRequestHandler({
    router: appRouter,
  });
  return { handler, appRouter };
};
