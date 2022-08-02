import axios, {
    AxiosResponse,
    AxiosStatic
} from 'axios';

import {
    yesterday,
    yesterdayDB
} from "./utils";


const auth_key = '766614B7C9A901198F2F5630349ADB7A9DAFB63976AF64DBB8A775D3BCCBDDB1'

const DEV = 'https://gb9fb258fe17506-apexdb.adb.ap-seoul-1.oraclecloudapps.com/ords/twright/'

const post_url = DEV +'data/sales'
const get_url  = DEV +'v1/twright/tests/'
const log_url  = DEV +'data/logs'
const baemin_get_url = DEV +'hm/baemin/'
const postMenuUrl    = DEV +'data/menu'
const postReviewUrl  = DEV +'data/review'

/**
 * Apex Sales JSON type
 * @param {string} payment_name 결재수단
 * @param {string} store_name  매장명
 * @param {string} receipt_count 결제 건수
 * @param {string} total_sales_amt 결제 금액
 * @param {string} c_date 결제일
 */
interface Sales {
    payment_name : string;
    store_name : string;
    receipt_count : number;
    total_sales_amt  : number;
    c_date : string;
}

/**
 * Apex Menu JSON type
 * @param {string} payment_name 결재수단
 * @param {string} store_name  매장명
 * @param {string} receipt_count 결제 건수
 * @param {string} total_sales_amt 결제 금액
 * @param {string} c_date 결제일
 */
interface Menus {
    store_cd: string;
    store_name: string;
    c_date: string;
    nm: string;
    pos_no: string;
    bill_no: string;
    hhmi: string;
    payment_name: string;
    cnt: number;
    amt: number;
}
/**
 * 매장, 결재수단 사이트 접속 id/pwd
 * @param {string} payment 결재수단
 * @returns {user[]} id, pwd array
 */
async function getUid(uid: string): Promise < any[] > {
    let users: any[] = [];
    // userinfo_url = get_url + payment
    console.log(get_url + uid)
    const response:any =  await axios.get(get_url + uid, {
        // headers: {
        //     Authorization: auth_key 
        // }
    })
    // console.log(response.data)
    return response.data
}


/**
 * 매장, 결재수단 사이트 접속 id/pwd
 * @param {string} payment 결재수단
 * @returns {user[]} id, pwd array
 */
 async function getReviewUserInfo(payment: string): Promise < any[] > {
    let users: any[] = [];
    let userinfo_url ;

        userinfo_url = get_url + payment
    
    // userinfo_url = get_url + payment
    const response:any =  await axios.get(userinfo_url, {
        headers: {
            Authorization: auth_key 
        }
    })
    return response.data.items

}

/**
 * 결제 내역 Apex Upload
 * @param {Sales} upJson 결제 내역
 * @returns {boolean} uplaod 성공 or 실패
 */
async function postApex(upJson: Sales):Promise < boolean > {
    const request_config = {
        headers: {
            "Content-Type": 'application/json',
            "Authorization": auth_key,
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        data: upJson
    };
    const response = await axios.post(post_url, upJson, request_config);
    console.log(post_url, upJson)
    try {
        if (response.status === 200) { // response - object, eg { status: 200, message: 'OK' }
            console.log(response.data);
            return true;
        }
        return false;
    } catch (err) {
        console.error(err)
        return false;
    }
}


/**
 * 결제 내역 Apex Upload
 * @param {Sales} upJson 결제 내역
 * @returns {boolean} uplaod 성공 or 실패
 */
 async function postReviewApex(upJson: Sales):Promise < boolean > {
    const request_config = {
        headers: {
            "Content-Type": 'application/json',
            "Authorization": auth_key,
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        data: upJson
    };
    const response = await axios.post(postReviewUrl, upJson, request_config);
    console.log(postReviewUrl, upJson)
    try {
        if (response.status === 200) { // response - object, eg { status: 200, message: 'OK' }
            console.log(response.data);
            return true;
        }
        return false;
    } catch (err) {
        console.error(err)
        return false;
    }
}


/**
 * 메뉴 내역 Apex Upload
 * @param {Sales} upJson 결제 내역
 * @returns {boolean} uplaod 성공 or 실패
 */
async function postMenuApex(keyparam:string, upJson: object) {
    console.log(keyparam)
    const request_config = {
        headers: {
            "Content-Type": 'application/json',
            "Authorization": auth_key,
            "keyparam":keyparam
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        data: upJson
    };
    const response = await axios.post(postMenuUrl, upJson, request_config);
    console.log(postMenuUrl, upJson)
    try {
        if (response.status === 200) { // response - object, eg { status: 200, message: 'OK' }
            console.log(response.data);
            return true;
        }
        return false;
    } catch (err) {
        console.error(err)
        return false;
    }
}

/**
 * 결제 실패 내역 Apex Upload
 * @param {String} payment_name 결제 수단
 * @param {String} store_name   매장병
 * @returns {boolean} uplaod 성공 or 실패
 */
async function passwordErrorApex(payment_name: String, store_name: String, e:string):Promise < boolean > {

    let apexdata = {
        payment_name: payment_name,
        store_name: store_name,
        c_date: yesterdayDB,
        gbn :'password',
        error : e
    };

    const request_config = {
        headers: {
            "Content-Type": 'application/json',
            "Authorization": auth_key,
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity
    };
    const response = await axios.post(log_url,  apexdata, request_config);
    console.log('패스워드 불일치' , log_url, apexdata)
    try {
        if (response.status === 200) { // response - object, eg { status: 200, message: 'OK' }
            console.log(response.data);
            return true;
        }
        return false;
    } catch (err) {
        console.error(err)
        return false;
    }
}

export {
    Sales,
    getUid,
    postApex,
    postMenuApex,
    passwordErrorApex,
    postReviewApex,
    getReviewUserInfo

}
