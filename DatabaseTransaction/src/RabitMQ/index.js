const maria = require('../MariaDatabase/db')
const amqplib = require('amqplib');
const Receive = require('./consumer');
const TSVController = require('../TSVDatabase/controller')
const Producer = require('./producer');
async function main() {
  try {
    const db = await maria.getConnection();
    const rabitConect = await amqplib.connect('amqp://localhost:5672');
    const khachHangChannel = await rabitConect.createChannel();
    const SanPhamChannel = await rabitConect.createChannel();
    await SanPhamChannel.assertQueue('SanPham', {durable: true,});
    const PhieuCamChannel = await rabitConect.createChannel();
    await PhieuCamChannel.assertQueue('PhieuCam', {durable: true,});
    Receive.run('KhachHang', khachHangChannel, db);
    Receive.run('SanPham', SanPhamChannel, db);
    Receive.run('PhieuCam', PhieuCamChannel, db);
    const dataTsv = TSVController.getTSV();
    const sleep = (milliseconds) => {
      return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
    for (const data of dataTsv) {
      Producer.sendMess(khachHangChannel, 'KhachHang', JSON.stringify({
        HoVaTen: data.HoVaTen,
        NgaySinh: data.NgaySinh,
        SoDienThoai: data.SoDienThoai,
        CMND: data.CMND,
        DiaChi: data.DiaChi,
      }))
      Producer.sendMess(SanPhamChannel, 'SanPham', JSON.stringify({
        TenHang: data.SanPham,
        GiaTri: data.GiaTri,
        Note: data.Note,
      }))
      Producer.sendMess(PhieuCamChannel, 'PhieuCam', JSON.stringify({
        NgayTao: data.NgayCam,
        NgayTra: data.NgayTra,
        LaiSuat: data.LaiSuatTinh
      }))
    }
  } catch (e) {
    console.log(e);
  }
}
main();