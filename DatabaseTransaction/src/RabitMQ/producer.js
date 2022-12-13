const amqplib = require('amqplib');
const TSVController = require('../TSVDatabase/controller');

class Producer {
  constructor() {
    this.connect = null;
    this.queueName = null;
    this.channel = null;
  }
  async connectRabit() {
    this.connect = await amqplib.connect('amqp://localhost:5672');
  }
  async createChannel (queueName) {
    const channel = await conn.createChannel();
    await channel.assertQueue(queueName, {
      durable: true,
    });
    this.queueName = queueName;
    this.channel = channel;
  }
}

async function sendQueue ({smg}) {
  try {
    this.channel.sendToQueue(queueKhachHang, Buffer.from(JSON.stringify(smg), {
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
  for (const data of dataTsv) {
    sendQueue({smg: data});
    await sleep(5000);
  }
}
producer();
