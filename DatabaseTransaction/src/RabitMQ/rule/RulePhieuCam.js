function numberRule(value) {
  return new Promise((resolve, reject) => {
    if (Number.isInteger(value)) {
      return resolve(value);
    } else reject('Wrong format ID ');
  });
}
function dateRule(value) {
  return new Promise((resolve, reject) => {
    let daymax;
    const day = Number(value.split('/')[0]);
    const month = Number(value.split('/')[1]);
    const year = Number(value.split('/')[2]);
    if (day < 0 || month < 0 || month > 12 || day < 0 || day > 31) {
      reject({
        table: 'PhieuCam',
        col: 'NgayTao',
        message: 'Ngày tạo không hợp lệ',
      });
    } else {
      switch (month) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
          daymax = 31;
          break;
        case 2:
          if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0)
            daymax = 29;
          else daymax = 28;
          break;
        case 4:
        case 6:
        case 9:
        case 11:
          daymax = 30;
          break;
      }
      if (day <= daymax) {
        return resolve(value);
      } else {
        reject({
          table: 'PhieuCam',
          col: 'NgayTao',
          message: 'Ngày tạo không hợp lệ',
        });
      }
    }
  });
}
function dateRule2(valueTao, valueTra) {
  return new Promise((resolve, reject) => {
    let daymax;
    const day = Number(valueTra.split('/')[0]);
    const month = Number(valueTra.split('/')[1]);
    const year = Number(valueTra.split('/')[2]);
    if (day < 0 || month < 0 || month > 12 || day < 0 || day > 31) {
      reject({
        table: 'PhieuCam',
        col: 'NgayTra',
        message: 'Ngày tra không hợp lệ',
      });
    } else {
      switch (month) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
          daymax = 31;
          break;
        case 2:
          if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0)
            daymax = 29;
          else daymax = 28;
          break;
        case 4:
        case 6:
        case 9:
        case 11:
          daymax = 30;
          break;
      }
      if (day > daymax) {
        reject({
          table: 'PhieuCam',
          col: 'NgayTra',
          message: 'Ngày trả không hợp lệ',
        });
      } else {
        let date1 = new Date(valueTao);
        let date2 = new Date(valueTra);
        if (date1 > date2) {
          reject({
            table: 'PhieuCam',
            col: 'NgayTra',
            message: 'Ngày trả nhỏ hơn ngày tạo',
          });
        } else {
          return resolve(NgayTra);
        }
      }
    }
  });
}
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
