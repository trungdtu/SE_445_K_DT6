const amqplib = require('amqplib');
const { write } = require('fs');
const Logger = require('../Log/LogController')
class Receive {
  run (name, channel,conn) {
    try {
      channel.prefetch(1);
      channel.consume(name, async function(msg) {
        try {
          const msgData = JSON.parse(msg.content.toString());
          const user = await conn.query(`SELECT * FROM khachhang WHERE CMND = '${msgData.CMND}'`);
          let khachHangData = user[0];
          let khachHangId;
          if (khachHangData === undefined) {
            const khachHangInsertData = await conn.query(`INSERT INTO khachhang (HoVaTen, NgaySinh, SoDienThoai, CMND, DiaChi)
            VALUES ('${msgData.HoVaTen}', STR_TO_DATE('${msgData.NgaySinh}', '%d/%m/%Y'), '${msgData.SoDienThoai}', '${msgData.CMND}', '${msgData.DiaChi}')`)
            khachHangId =  Number(khachHangInsertData.insertId)
          } else {
            khachHangId = khachHangData.MaKhachHang
          }
          const phieuThu = await conn.query(`INSERT INTO phieucam (NgayTao, NgayTra, LaiSuat, MaKhachHang) VALUES (STR_TO_DATE('${msgData.NgayCam}', '%d/%m/%Y'), STR_TO_DATE('${msgData.NgayTra}', '%d/%m/%Y'), '${msgData.LaiSuat}', '${khachHangId}')`)
          const PhieuThuId = Number(phieuThu.insertId)
          await conn.query(`INSERT INTO sanpham (TenHang, GiaTri, Note, MaPhieu) VALUES ('${msgData.SanPham}', '${msgData.GiaTri}', '${msgData.Note}', '${PhieuThuId}')`)
          console.log('Chuyển dữ liệu thành công')
          channel.ack(msg);
        } catch {
          console.log('Chuyển dữ liệu thất bại 1 trường')
          channel.ack(msg);
        }
      }, {
        noAck: false
      });
    } catch (e) {
      console.log('hihi', e)
    }
  }
}
module.exports = new Receive();
