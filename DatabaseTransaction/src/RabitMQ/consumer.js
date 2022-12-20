const amqplib = require('amqplib');
class Receive {
  run (name, channel,conn) {
    try {
      channel.prefetch(1);
      channel.consume(name, async function(msg) {
        const msgData = JSON.parse(msg.content.toString());
        console.log(msgData.LaiSuat)
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
        console.log(msgData.HoVaTen)
        channel.ack(msg);
      }, {
        noAck: false
      });
    } catch (e) {
      console.log('hihi', e)
    }
  }
}
module.exports = new Receive();
