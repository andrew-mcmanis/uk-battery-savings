# Analytics Limitations

## Current setup

The site currently uses:

- Vercel Web Analytics
- Vercel Speed Insights
- Google Search Console
- Bing Webmaster Tools

## Custom events

Vercel custom events are not available on the current plan.

Because of this, the site does not currently track specific button actions such as:

- Copy calculator result
- Copy calculator share link
- Print estimate
- Copy quote comparison
- Save quote comparison in browser
- Load saved quote comparison

## Current decision

Do not add another analytics provider yet.

Reason:

- The site is early-stage.
- The current setup is privacy-friendly and low maintenance.
- Page-level analytics and Search Console data are enough for the first traffic review phase.

## Revisit later if needed

Reconsider action/event tracking only if:

- The site starts receiving meaningful traffic.
- There is a clear need to understand tool usage.
- Monetisation decisions depend on user actions.
- A privacy-conscious implementation is available without adding unnecessary maintenance.
