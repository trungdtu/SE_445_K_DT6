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
    if (value.includes(',')) {
      value = value.replace(',', '.');
    }
    if (!formatRate(value)) {
      reject('Wrong format for Lai Suat, contains invalid characters');
    } else {
      value = parseFloat(value).toFixed(2);
      if (value >= 10 && value <= 100) resolve(value / 100);
      resolve(value);
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
      reject('Wrong format for Ngay Tao,Ngay Tao cant be blank');
    } else if (check.parsingFlags().unusedInput.length > 0) {
      reject('Wrong format for Ngay Tao, contains invalid characters');
    } else if (check.parsingFlags().overflow == 0) {
      reject('Wrong format for Ngay Tao, years is invalid');
    } else if (check.parsingFlags().overflow == 1) {
      reject('Wrong format for Ngay Tao, months is invalid');
    } else if (check.parsingFlags().overflow == 2) {
      reject('Wrong format for Ngay Tao, days is invalid');
    } else {
      return resolve(valueTao);
    }
  });
}
function dateRuleReturn(valueTao, valueTra) {
  return new Promise((resolve, reject) => {
    valueTra = deleteSpace(valueTra);
    let check = moment(valueTra, 'DD/MM/YYYY');
    let dateTao = moment(valueTao, 'DD/MM/YYYY');
    if (
      check.parsingFlags().unusedInput.length == 0 &&
      check.parsingFlags().empty == true
    ) {
      reject('Wrong format for Ngay Tra,Ngay Tra cant be blank');
    } else if (check.parsingFlags().unusedInput.length > 0) {
      reject('Wrong format for Ngay Tra, contains invalid characters');
    } else if (check.parsingFlags().overflow == 0) {
      reject('Wrong format for Ngay Tra, years is invalid');
    } else if (check.parsingFlags().overflow == 1) {
      reject('Wrong format for Ngay Tra, months is invalid');
    } else if (check.parsingFlags().overflow == 2) {
      reject('Wrong format for Ngay Tra, days is invalid');
    } else if (moment(valueTra, 'DD/MM/YYYY').isAfter(dateTao)) {
      return resolve(valueTra);
    } else
      reject(
        'Wrong format for Ngay Tra, date Ngay Tra must be after date Ngay Tao'
      );
  });
}
async function checkRule(data) {
  try {
    return {
      ...data,
      NgayTao: await dateRule(data.NgayTao),
      NgayTra: await dateRuleReturn(data.NgayTao, data.NgayTra),
      LaiSuat: await getRateRule(data.LaiSuat),
    };
  } catch (err) {
    console.log(err);
    return null;
  }
}
async function run() {
  const data = {
    MaPhieu: '1',
    MaKhachHang: '1',
    NgayTao: '15/12/2022',
    NgayTra: '30/12/2022',
    LaiSuat: '2.424413',
  };
  console.log(await checkRule(data));
}
run();
// class RulePhieuCam {
// }
// module.exports = new RulePhieuCam();
