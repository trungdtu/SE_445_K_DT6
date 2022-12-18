const maria = require('../MariaDatabase/db')
const amqplib = require('amqplib');
const Receive = require('./consumer');
const TSVController = require('../TSVDatabase/controller')
const Producer = require('./producer');
const RuleKhachHang = require('./rule/RuleKhachHang')
async function rabitMQ () {
  try {
    const dataTsv = TSVController.getTSV();
    const queueName = 'CamDo';
    const db = await maria.getConnection();
    amqplib.connect('amqp://localhost:5672').then((connection) => {
      connection.createChannel().then(channel => {
        channel.assertQueue(queueName, { durable: true });
        Receive.run(queueName, channel, db)
        console.log('dataTsv: ', dataTsv);
        // for (const data of dataTsv) {
        //   console.log(data);
        //   Producer.sendMess(channel, queueName, JSON.stringify(data))
        // }
      }).catch(error => {
        throw error;
      })
    })
    .catch(error => {
      throw error;
    })
  } catch (e) {
    console.log(e);
  }
}
rabitMQ();