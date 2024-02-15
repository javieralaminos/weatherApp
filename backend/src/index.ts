import { trpcCompose } from './weather-service/composition-root';

export const trpcComposition = trpcCompose();
export type AppRouter = typeof trpcComposition.appRouter;
export const handler = trpcComposition.handler;
