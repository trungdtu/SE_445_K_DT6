function isFloat(n) {
  return Number(n) === n && n % 1 !== 0;
}

function rateRule(value) {
  return new Promise((resolve, reject) => {
    if (Number.isFloat(value)) {
      return resolve(value);
    } else reject('Wrong format, rate must be a float ');
  });
}
function dateRule(value) {
  return new Promise((resolve, reject) => {
    let daymax;
    const day = Number(value.split('/')[0]);
    const month = Number(value.split('/')[1]);
    const year = Number(value.split('/')[2]);
    if (day < 0 || day > 31) {
      reject('lỗi nhập ngày ,Ngày trả không hợp lệ');
    } else if (month < 0 || month > 12) {
      reject('lỗi nhập tháng ,Tháng trả không hợp lệ');
    } else if (year < 0) {
      reject('lỗi nhập năm ,Năm trả không hợp lệ');
    } else {
      switch (month) {
        case (1, 3, 5, 7, 8, 10, 12):
          daymax = 31;
          break;
        case 2:
          if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0)
            daymax = 29;
          else daymax = 28;
          break;
        case (4, 6, 9, 11):
          daymax = 30;
          break;
      }
      if (day <= daymax) {
        return resolve(value);
      } else {
        reject('lỗi ,Ngày tạo không hợp lệ');
      }
    }
  });
}
function dateRule2(valueTao, valueTra) {
  return new Promise((resolve, reject) => {
    let daymax;
    const dayTra = Number(valueTra.split('/')[0]);
    const monthTra = Number(valueTra.split('/')[1]);
    const yearTra = Number(valueTra.split('/')[2]);
    const dayTao = Number(valueTao.split('/')[0]);
    const monthTao = Number(valueTao.split('/')[1]);
    const yearTao = Number(valueTao.split('/')[2]);
    if (dayTra < 0 || dayTra > 31) {
      reject('lỗi nhập ngày ,Ngày trả không hợp lệ');
    } else if (monthTra < 0 || monthTra > 12) {
      reject('lỗi nhập tháng ,Tháng trả không hợp lệ');
    } else if (yearTra < 0) {
      reject('lỗi nhập năm ,Năm trả không hợp lệ');
    } else {
      switch (monthTra) {
        case (1, 3, 5, 7, 8, 10, 12):
          daymax = 31;
          break;
        case 2:
          if ((yearTra % 4 == 0 && yearTra % 100 != 0) || yearTra % 400 == 0)
            daymax = 29;
          else daymax = 28;
          break;
        case (4, 6, 9, 11):
          daymax = 30;
          break;
      }
      if (dayTra > daymax) {
        reject('lỗi nhập ngày ,Ngày trả không hợp lệ');
      }

      if (yearTao > yearTra) {
        reject('lỗi nhập năm ,năm trả không thể nhỏ hơn năm tạo');
      } else if (yearTao == yearTra && monthTao > monthTra) {
        reject('lỗi nhập tháng ,tháng trả không thể nhỏ hơn tháng tạo');
      } else if (monthTao == monthTra && dayTao > dayTra) {
        reject('lỗi nhập ngày ,ngày trả không thể nhỏ hơn ngày tạo');
      } else {
        return resolve(valueTra);
      }
    }
  });
}
// const data = {
//   NgayTao: '15/12/2022',
//   NgayTra: '17/12/2022',
//   LaiSuat: 0.2,
// };

// dateRule2(data.NgayTao, data.NgayTra).then((value) => {
//   console.log(value);
// });

class RulePhieuCam {
  async checkRule(data) {
    try {
      return {
        ...data,
        NgayTao: await dateRule(data.NgayTao),
        NgayTra: await dateRule2(data.NgayTao),
        LaiSuat: await numberRule(data.LaiSuat),
      };
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
