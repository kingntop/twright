"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const apex_1 = require("./common/apex");
// http://146.56.47.30:3000/images//652BDE771ADB3C5F215AB01A83537A374B3820A7/1.png
let uidInfo = {};
test_1.test.describe('test', async () => {
    test_1.test.beforeAll(async ({ browser }) => {
        const infos = await (0, apex_1.getUidAll)();
        for (const info of infos) {
            let rimraf = require("rimraf");
            rimraf("images/" + info.uid, function () { console.log("done"); });
        }
    });
    (0, test_1.test)('test', async ({}) => {
        const browserTypes = [test_1.chromium, test_1.webkit];
        let Json = [];
        const infos = await (0, apex_1.getUidAll)();
        for (const info of infos) {
            uidInfo = await (0, apex_1.getUid)(info.uid);
            for (const browserType of browserTypes) {
                for (const screen of uidInfo.screen) {
                    const browser = await browserType.launch();
                    const device = test_1.devices[screen.description];
                    const context = await browser.newContext(Object.assign({}, device));
                    if (browserType.name() == device.defaultBrowserType) {
                        const page = await context.newPage();
                        let start_mi = Date.now();
                        await page.goto(uidInfo.url, { waitUntil: 'networkidle' });
                        page.on("pageerror", (err) => {
                            console.log(err.message);
                        });
                        await page.screenshot({ path: 'images/' + info.uid + '/' + screen.code + '.png', fullPage: true });
                        let end_mi = Date.now();
                        console.log(start_mi, end_mi, end_mi - start_mi, browserType.name(), browser.version());
                        const apexJson = {
                            code: screen.code,
                            uid: info.uid,
                            status: 0,
                            dcl: end_mi - start_mi
                        };
                        Json.push(apexJson);
                    }
                }
            }
            (0, apex_1.postApex)(info.uid, Json);
        }
    });
});
//# sourceMappingURL=test-1.spec.js.map