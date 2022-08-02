import dayjs from "dayjs";

const api_url = 'https://gb9fb258fe17506-apexdb.adb.ap-seoul-1.oraclecloudapps.com/ords/hm/data/sales'
const src = 'okpos'

const yesterday = dayjs().subtract(1, "d").format("YYYY-MM-DD");
const yesterdayDB = dayjs().subtract(1, "d").format("YYYYMMDD");

/**
 * 매장, 결재수단 사이트 접속 id/pwd
 * @param {string} onclike, amt, cnt html text 변황
 * @returns {String} cleansing 완료된 value
 */
function replaceK(data:string):String {
    return data.replace('ID. ', '').replace('개', '').replace('건', '').replace(/,/gi, '').replace('원', '').trim();
}
export {
    yesterday,
    yesterdayDB,
    replaceK
}