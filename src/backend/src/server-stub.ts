import * as trpcExpress from '@trpc/server/adapters/express';
import express from 'express';
import { trpcStubCompose } from './weather-service/composition-root';

const app = express();
// eslint-disable-next-line @typescript-eslint/no-require-imports
const cors = require('cors');
app.use(cors());

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: trpcStubCompose().appRouter,
  }),
);

app.listen(4000, () => {
  console.log('Listening on http://localhost:4000/trpc');
});
