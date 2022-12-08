const amqplib = require('amqplib');
const maria = require('./db')
async function receiveQueue () {
  try {
    const db = await maria.getConnection()
    const rabitMQ = await amqplib.connect('amqp://localhost:5672');

    const date = new Date();

    const channel = await rabitMQ.createChannel();


    // db.query(`INSERT INTO 'dbtransaction'.'khachhang' ('Ho', 'Ten', 'NgaySinh', 'SoDienThoai', 'CMND', 'DiaChi') VALUES ('Phan', 'Trung', '2022-12-08', '0123456789', '012345567', 'DaNang');`);

    const queue = 'KhachHang';

    await channel.assertQueue(queue, {
      durable: true,
    });
    //reciver 
    await channel.consume(queue, async smg => {
      // await db.query("INSERT INTO `dbtransaction`.`khachhang` (`Ho`, `Ten`, `NgaySinh`, `SoDienThoai`, `CMND`, `DiaChi`) VALUES ('Phan', 'Trung', '2022-12-08', '0123456789', '012345567', 'DaNang')")

      console.log('KhachHang: ', smg.content.toString())
      console.log('\n\n')
    }, {
      noAck: true,
    })
  } catch (err) {
    console.log('Error: ', err);
  }
};
receiveQueue()
