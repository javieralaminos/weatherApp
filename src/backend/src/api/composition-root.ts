import { initTRPC } from '@trpc/server';
import { awsLambdaRequestHandler } from '@trpc/server/adapters/aws-lambda';
import { WeatherRepositoryStubAdapter } from './adapters/driven';
import { weatherGetterTrpcAdapter } from './adapters/driver';
import { weatherSetterTrpcAdapter } from './adapters/driver/weather-getter-trpc-adapter';
import { StandardApi } from './app/api';

export const trpcCompose = () => {
  const forManagingWeather = new WeatherRepositoryStubAdapter();
  const api = new StandardApi(forManagingWeather);

  const trpcInstance = initTRPC.create();
  const weatherGetter = weatherGetterTrpcAdapter(api, trpcInstance);
  const weatherSetter = weatherSetterTrpcAdapter(api, trpcInstance);
  const appRouter = trpcInstance.mergeRouters(weatherGetter, weatherSetter);
  const handler = awsLambdaRequestHandler({
    router: appRouter,
  });
  return { handler, appRouter };
};