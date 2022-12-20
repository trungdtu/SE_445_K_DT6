const { invalid } = require('moment');
const moment = require('moment');
function formatRate(string) {
  var format = /^[+-]? *100(\.0{0,2})? *%?$|^[+]? *\d{1,2}(\.\d{1,})? *%?$/;
  if (format.test(string)) {
    return true;
  }
  return false;
}
function deleteSpace(string) {
  string = string.split(' ').join('');
  return string;
}
function getRateRule(value) {
  return new Promise((resolve, reject) => {
    let num = parseFloat(value);
    num = num / 100;
    if (num !== NaN) {
      resolve(num)
    } else{ 
      resolve(0.02)
    }
  });
}
function dateRule(valueTao) {
  return new Promise((resolve, reject) => {
    valueTao = deleteSpace(valueTao);
    let check = moment(valueTao, 'DD/MM/YYYY');
    if (
      check.parsingFlags().unusedInput.length == 0 &&
      check.parsingFlags().empty == true
    ) {
      reject({
        table: 'PhieuCam',
        col: 'NgayCam',
        message: 'Wrong format must be DD/MM/YYYY',
      });
    } else if (check.parsingFlags().unusedInput.length > 0) {
      reject({
        table: 'PhieuCam',
        col: 'NgayCam',
        message: 'Wrong format must be DD/MM/YYYY',
      });
    } else if (check.parsingFlags().overflow == 0) {
      reject({
        table: 'PhieuCam',
        col: 'NgayCam',
        message: 'Wrong format for Ngay Tao, years is invalid',
      });
    } else if (check.parsingFlags().overflow == 1) {
      reject({
        table: 'PhieuCam',
        col: 'NgayCam',
        message: 'Wrong format for Ngay Tao, month is invalid',
      });
    } else if (check.parsingFlags().overflow == 2) {
      reject({
        table: 'PhieuCam',
        col: 'NgayCam',
        message: 'Wrong format for Ngay Tao, date is invalid',
      });
    } else {
      resolve(valueTao);
    }
  });
}
function dateRuleReturn(valueTao, valueTra) {
  return new Promise((resolve, reject) => {
    if (valueTra == undefined) resolve(null);
    if (valueTra.trim() == '') resolve(null);
    valueTra = deleteSpace(valueTra);
    let check = moment(valueTra, 'DD/MM/YYYY');
    let dateTao = moment(valueTao, 'DD/MM/YYYY');
    if (check.parsingFlags().unusedInput.length > 0) {
      reject({
        table: 'PhieuCam',
        col: 'NgayTra',
        message: 'Wrong format must be DD/MM/YYYY',
      });
    } else if (check.parsingFlags().overflow == 0) {
      reject({
        table: 'PhieuCam',
        col: 'NgayTra',
        message: 'Wrong format for Ngay Tra, years is invalid',
      });
    } else if (check.parsingFlags().overflow == 1) {
      reject({
        table: 'PhieuCam',
        col: 'NgayTra',
        message: 'Wrong format for Ngay Tra, month is invalid',
      });
    } else if (check.parsingFlags().overflow == 2) {
      reject({
        table: 'PhieuCam',
        col: 'NgayTra',
        message: 'Wrong format for Ngay Tra, date is invalid',
      });
    } else if (moment(valueTra, 'DD/MM/YYYY').isAfter(dateTao)) {
      resolve(valueTra);
    } else
      reject({
        table: 'PhieuCam',
        col: 'NgayTra',
        message: 'Date Ngay Tra must be after date Ngay Tao',
      });
  });
}
class RulePhieuCam {
  async checkRule(data) {
    try {
      const returnData = {
        NgayCam: await dateRule(data.NgayCam),
        NgayTra: await dateRuleReturn(data.NgayCam, data.NgayTra),
        LaiSuat: await getRateRule(data.LaiSuat),
      };
      return returnData;
    } catch (err) {
      console.log(err)
      return null;
    }
  }
}
module.exports = new RulePhieuCam();
