const amqplib = require('amqplib');
const TSVController = require('./controller');

async function sendQueue ({smg}) {
  try {
    const conn = await amqplib.connect('amqp://localhost:5672');

    const channel = await conn.createChannel();

    const queueKhachHang = 'KhachHang';

    await channel.assertQueue(queueKhachHang, {
      durable: true,
    });

    channel.sendToQueue(queueKhachHang, Buffer.from(JSON.stringify(smg), {
      persistent: true
    }))
  } catch (err) {
    console.error(err);
  } 
};
const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
async function producer () {
  const dataTsv = TSVController.getTSV()
  let a = 0
  for ( const data of dataTsv ) {
    sendQueue({smg: data});
    await sleep(5000);
  }
}
producer();
