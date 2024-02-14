import { trpcCompose } from './weather-service/composition-root';

export const trpcComposition = trpcCompose();
export const handler = trpcComposition.handler;
