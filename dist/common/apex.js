"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postApex = exports.getUid = void 0;
const axios_1 = __importDefault(require("axios"));
// https://gb9fb258fe17506-apexdb.adb.ap-seoul-1.oraclecloudapps.com/ords/twright/v1/twright/logs/:rid
const auth_key = '766614B7C9A901198F2F5630349ADB7A9DAFB63976AF64DBB8A775D3BCCBDDB1';
const DEV = 'https://gb9fb258fe17506-apexdb.adb.ap-seoul-1.oraclecloudapps.com/ords/twright/';
const post_url = DEV + 'v1/twright/logs/';
const get_url = DEV + 'v1/twright/tests/';
// https://gb9fb258fe17506-apexdb.adb.ap-seoul-1.oraclecloudapps.com/ords/twright/v1/twright/tests/:rid
/**
 * Test UID 정보
 * @param {string} uid uid
 * @returns {user[]} id, pwd array
 */
async function getUid(uid) {
    let users = [];
    // userinfo_url = get_url + payment
    console.log(get_url + uid);
    const response = await axios_1.default.get(get_url + uid, {
    // headers: {
    //     Authorization: auth_key 
    // }
    });
    // console.log(response.data)
    return response.data;
}
exports.getUid = getUid;
/**
 * 결제 내역 Apex Upload
 * @param {Sales} upJson 결제 내역
 * @returns {boolean} uplaod 성공 or 실패
 */
async function postApex(rid, upJson) {
    const request_config = {
        headers: {
            "Content-Type": 'application/json',
            "Authorization": auth_key,
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
        data: upJson
    };
    const response = await axios_1.default.post(post_url + rid, upJson, request_config);
    console.log(post_url, upJson);
    try {
        if (response.status === 200) { // response - object, eg { status: 200, message: 'OK' }
            console.log(response.data);
            return true;
        }
        return false;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}
exports.postApex = postApex;
