const { invalid } = require('moment');
const moment = require('moment');
function isFloat(n) {
  return Number(n) === n && n % 1 !== 0;
}
function rateRule(value) {
  return new Promise((resolve, reject) => {
    if (isFloat(value)) {
      return resolve(value);
    } else reject('Wrong format, rate must be a float ');
  });
}
function checkKiTuDacBiet(input) {
  for (let i = 0; i < input.length; i++) {
    if (input[i].trim() !== '') return true;
  }
  return false;
}
function dateRule(valueTao) {
  return new Promise((resolve, reject) => {
    let check = moment(data.NgayTao, 'DD/MM/YYYY');
    if (
      check.parsingFlags().unusedInput.length == 0 &&
      check.parsingFlags().empty == true
    ) {
      reject('Wrong format for Ngay Tao,Ngay Tao cant be blank');
    } else if (checkKiTuDacBiet(check.parsingFlags().unusedInput)) {
      reject('Wrong format for Ngay Tao, contains invalid characters');
    } else if (check.parsingFlags().overflow == 0) {
      reject('Wrong format for Ngay Tao, years is invalid');
    } else if (check.parsingFlags().overflow == 1) {
      reject('Wrong format for Ngay Tao, months is invalid');
    } else if (check.parsingFlags().overflow == 2) {
      reject('Wrong format for Ngay Tao, days is invalid');
    } else return resolve(valueTao);
  });
}
function dateRuleReturn(valueTao, valueTra) {
  return new Promise((resolve, reject) => {
    let check = moment(data.NgayTra, 'DD/MM/YYYY');
    let dateTao = moment(data.NgayTao, 'DD/MM/YYYY');
    if (
      check.parsingFlags().unusedInput.length == 0 &&
      check.parsingFlags().empty == true
    ) {
      reject('Wrong format for Ngay Tra,Ngay Tra cant be blank');
    } else if (checkKiTuDacBiet(check.parsingFlags().unusedInput)) {
      reject('Wrong format for Ngay Tra, contains invalid characters');
    } else if (check.parsingFlags().overflow == 0) {
      reject('Wrong format for Ngay Tra, years is invalid');
    } else if (check.parsingFlags().overflow == 1) {
      reject('Wrong format for Ngay Tra, months is invalid');
    } else if (check.parsingFlags().overflow == 2) {
      reject('Wrong format for Ngay Tra, days is invalid');
    } else if (
      moment(valueTra, 'DD/MM/YYYY').isAfter(moment(valueTao, 'DD/MM/YYYY'))
    )
      return resolve(valueTra);
    else
      reject(
        'Wrong format for Ngay Tra, date Ngay Tra must be after date Ngay Tao'
      );
  });
}
const data = {
  NgayTao: '15/12/2022',
  NgayTra: '30/12/2022',
  LaiSuat: 0.2,
};
// Requiring module
class RulePhieuCam {
  async checkRule(data) {
    try {
      return {
        ...data,
        NgayTao: await dateRule(data.NgayTao),
        NgayTra: await dateRuleReturn(data.NgayTao),
        LaiSuat: await rateRule(data.LaiSuat),
      };
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
module.exports = new RulePhieuCam();
