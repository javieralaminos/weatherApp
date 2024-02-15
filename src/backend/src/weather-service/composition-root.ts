import { awsLambdaRequestHandler } from '@trpc/server/adapters/aws-lambda';
import { WeatherRepositoryStubAdapter, WeatherRepositoryDynamoAdapter } from './adapters/driven';
import { weatherServerTrpcAdapter } from './adapters/driver';
import { trpcInstance } from './adapters/driver/trpc';
import { weatherIngestionTrpcAdapter } from './adapters/driver/weather-ingestion-trpc-adapter';
import { WeatherService } from './app/weatherService';


// Trpc composition for production
export const trpcCompose = () => {
  // Drivens
  const forManagingWeather = new WeatherRepositoryDynamoAdapter();

  // Weather Service
  const api = new WeatherService(forManagingWeather);

  // Trpc and driver adapters
  const weatherServer = weatherServerTrpcAdapter(api);
  const weatherIngestion = weatherIngestionTrpcAdapter(api);
  const appRouter = trpcInstance.mergeRouters(weatherServer, weatherIngestion);
  const handler = awsLambdaRequestHandler({
    router: appRouter,
  });
  return { handler, appRouter };
};

// Trpc composition for local environment
export const trpcStubCompose = () => {
  // Drivens
  const forManagingWeather = new WeatherRepositoryStubAdapter();

  // Weather Service
  const api = new WeatherService(forManagingWeather);

  // Trpc and driver adapters
  const weatherServer = weatherServerTrpcAdapter(api);
  const weatherIngestion = weatherIngestionTrpcAdapter(api);
  const appRouter = trpcInstance.mergeRouters(weatherServer, weatherIngestion);
  const handler = awsLambdaRequestHandler({
    router: appRouter,
  });
  return { handler, appRouter };
};
