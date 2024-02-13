import { trpcCompose } from './api/composition-root';

export const trpcComposition = trpcCompose();
export const handler = trpcComposition.handler;
