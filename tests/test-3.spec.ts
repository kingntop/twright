import {
    test,
    expect
} from '@playwright/test';

import * as playwright from 'playwright'

import {
    yesterday,
    yesterdayDB
} from "./common/utils";

import {
    getUid,
    postApex,
    getUidAll
} from "./common/apex";


// import Logger from "./common/logger";


test('test', async ({
    page
}) => {

    // Go to https://botstore.raiid.ai/ords/r/mon/ai/intro
    await page.goto('https://botstore.raiid.ai/ords/r/mon/ai/intro');

    const posts = await page.$$('div.a-TMV-w-scroll > ul > li')

    let jsonArray = [{}]
// elapse time calculation
    const start = new Date().getTime()

    for (const post of posts) {
        const title = await post.$eval('div > div.a-CardView-header > div.a-CardView-headerBody > h3', el => el.innerText);
        const link = await post.$eval('div > a', el => el.href);
        const img = await post.$eval('div > div.a-CardView-media.a-CardView-media--first.a-CardView-media--fit > img', el => el.src);
        const json = {
            title: title,
            link: link,
            img: img
        }
        jsonArray.push(json)
    }
    const end = new Date().getTime()
    const elapse = end - start;
    console.log(elapse)


});