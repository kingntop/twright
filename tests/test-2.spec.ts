import {
    test,
    expect,
    chromium,
    firefox,
    webkit,
    devices

} from '@playwright/test';

import * as playwright from 'playwright' 

test('test', async ({  }) => {

  // Go to https://www.google.com/

  const browserTypes =  chromium;

  const browser = await browserTypes.launch();

  const context = await browser.newContext( {});
  

  const page = await context.newPage()
  await browser.startTracing(page, { path: 'trace.json' });

  await page.goto('https://www.google.com/');
  await browser.stopTracing();
});