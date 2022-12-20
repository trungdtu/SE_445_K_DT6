const RuleKhachHang = require("./RuleKhachHang.js");
const RuleSanPham = require("./RuleSanPham.js");
const RulePhieuCam = require("./RulePhieuCam.js");
// async function checkRule() {
//   const data = {
//     HoVaTen: 'Phan Trung',
//     NgaySinh: '25/12/2000',
//     DiaChi: '50 - Đà Nẵng',
//     SoDienThoai: '0123456789',
//     CMND: '012345678',
//     SanPham: 'Iphone 6s',
//     GiaTri: '2000000',
//     Note: '',
//     LaiSuatTinh: '2%',
//     NgayCam: '10/10/2022',
//     NgayTra: ''
//   }
//   const ruleKhachHang = await RuleKhachHang.checkRule({
//     HoVaTen: data.HoVaTen,
//     NgaySinh: data.NgaySinh,
//     DiaChi: data.DiaChi,
//     SoDienThoai: data.SoDienThoai,
//     CMND: data.CMND,
//   });
//   const ruleSanPham = await RuleSanPham.checkRule({
//     SanPham: data.SanPham,
//     GiaTri: data.GiaTri,
//     Note: data.Note,
//   });
//   const rulePhieuCam = await RulePhieuCam.checkRule({
//     LaiSuat: '2%',
//     NgayCam: '10/10/2022',
//     NgayTra: '20/10/2022'
//   });
//   if (ruleKhachHang !== null && ruleSanPham !== null && rulePhieuCam !== null) {
//     console.log('ruleKhachHang: ', ruleKhachHang)
//     return {
//       ...ruleKhachHang,
//       ...ruleSanPham,
//       ...rulePhieuCam
//     }
//   } else {
//     return null
//   }
// }
// async function testRun() {
//   console.log(await checkRule());
// }
// testRun();
class CheckRule {
  async checkRule(data) {
    const ruleKhachHang = await RuleKhachHang.checkRule({
      HoVaTen: data.HoVaTen,
      NgaySinh: data.NgaySinh,
      DiaChi: data.DiaChi,
      SoDienThoai: data.SoDienThoai,
      CMND: data.CMND,
    });
    const ruleSanPham = await RuleSanPham.checkRule({
      SanPham: data.SanPham,
      GiaTri: data.GiaTri,
      Note: data.Note,
    });
    const rulePhieuCam = await RulePhieuCam.checkRule({
      LaiSuat: data.LaiSuat,
      NgayCam: data.NgayCam,
      NgayTra: data.NgayTra,
    });
    if (
      ruleKhachHang !== null &&
      ruleSanPham !== null &&
      rulePhieuCam !== null
    ) {
      return {
        ...ruleKhachHang,
        ...ruleSanPham,
        ...rulePhieuCam,
      };
    } else {
      return null;
    }
  }
}
module.exports = new CheckRule();
