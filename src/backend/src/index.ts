import { trpcCompose } from './weatherService/composition-root';

export const trpcComposition = trpcCompose();
export const handler = trpcComposition.handler;
