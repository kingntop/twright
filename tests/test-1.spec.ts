import {
    test,
    expect,
    chromium,
    firefox,
    webkit,
    devices

} from '@playwright/test';

import * as playwright from 'playwright' 

import {
    yesterday,
    yesterdayDB
} from "./common/utils";
import {
    getUid,
    postApex,
    passwordErrorApex,
    Sales
} from "./common/apex";

// http://146.56.47.30:3000/images//652BDE771ADB3C5F215AB01A83537A374B3820A7/1.png

let uidInfo:any = {};
let uid = '652BDE771ADB3C5F215AB01A83537A374B3820A7';

test.describe('test', async () => {

    test.beforeAll(async ({ browser }) => {

        uidInfo = await getUid(uid)
        // uid.url = 'https://google.com'
        let rimraf = require("rimraf");
        rimraf("images/"+uid, function () { console.log("done"); });
        console.log(uid)
    })

    test('test', async ({  }) => {

        const browserTypes =  [chromium, webkit, firefox];

        for (const browserType of browserTypes)  {

            for (const screen of uidInfo.screen) {
                
                const browser = await browserType.launch();
                const device = devices[screen.description]
                const context = await browser.newContext( {...device });

                if (browserType.name() == device.defaultBrowserType) {
                    const page = await context.newPage()
                    let  start_mi = Date.now();
                    await page.goto(uidInfo.url, { waitUntil: 'networkidle'  });
                    page.on("pageerror", (err) => {
                        console.log(err.message)
                    })
                    await page.screenshot({ path: 'images/' + uid + '/' + screen.code +'.png', fullPage: true });
                    let end_mi = Date.now();
                    console.log(start_mi, end_mi, end_mi - start_mi, browserType.name(), browser.version());
                }
            }
        }
    });
})