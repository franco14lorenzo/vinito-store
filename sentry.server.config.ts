// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: 'https://fdb61416f28134a2c2ba885f845f82de@o917579.ingest.us.sentry.io/4508898146910208',

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false
})
