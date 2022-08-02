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

let uid:any = {};
test.describe('test', async () => {

    test.beforeAll(async ({ browser }) => {
        let rimraf = require("rimraf");
        rimraf("images/", function () { console.log("done"); });
        // uid = await getUid('652BDE771ADB3C5F215AB01A83537A374B3820A7')
        uid.url = 'https://google.com'
        console.log(uid)
    })

    test('test', async ({  }) => {

        const {chromium, firefox, webkit} = playwright

        const screen = [
            {
                width: 800,
                height: 600
            },
            {
                width: 1000,
                height: 600
            },
        ]
        const browserTypes =  [chromium, webkit];
        for (let i =0; i < browserTypes.length; i++ )  {
            const browser = await browserTypes[i].launch();
            const device = devices['iPhone 6']
            const context = await browser.newContext(
                {
                   ...device
                }
            );
            
            const page = await context.newPage()
            let  start_mi =Date.now();

            await page.goto(uid.url, { waitUntil: 'networkidle'  });
            page.on("pageerror", (err) => {
                console.log(err.message)
            })

            await page.screenshot({ path: 'images/' + start_mi+'.png', fullPage: true });
            let end_mi = Date.now();
            console.log(start_mi, end_mi, end_mi - start_mi, browserTypes[i].name(), browser.version());
        }

    });
})