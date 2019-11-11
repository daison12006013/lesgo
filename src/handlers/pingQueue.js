import middy from 'middy';
import { httpMiddleware } from 'lesgo';

import { connectSentry } from 'Utils/sentry';
import pingQueue from 'Core/pingQueue';
import { app } from 'Config';

connectSentry();

const originalHandler = event => {
  return pingQueue(event.input);
};

// eslint-disable-next-line import/prefer-default-export
export const handler = middy(originalHandler);

handler.use(httpMiddleware({ debugMode: app.debug }));
