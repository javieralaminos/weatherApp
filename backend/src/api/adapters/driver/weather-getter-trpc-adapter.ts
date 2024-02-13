import { initTRPC } from '@trpc/server';
import { StandardApi } from '../../app/api';
import { SetWeatherPropsSchema } from '../../app/schemas';

export function weatherSetterTrpcAdapter(api: StandardApi, t: ReturnType<typeof initTRPC.create>) {
  return t.router({
    setWeather: t.procedure
      .input(SetWeatherPropsSchema)
      .mutation(({ input }) => api.setWeather(input)),
  });
}
