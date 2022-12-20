const pool = require('../MariaDatabase/db')
const amqplib = require('amqplib');
const Receive = require('./consumer');
const TSVController = require('../TSVDatabase/controller')
const Producer = require('./producer');
const CheckRule = require('./rule/index')
async function rabitMQ () {
  try {
    const dataTsv = TSVController.getTSV();
    const queueName = 'CamDo';
    const conn = await pool.getConnection();
    amqplib.connect('amqp://localhost:5672').then((connection) => {
      connection.createChannel().then(async channel => {
        channel.assertQueue(queueName, { durable: true });
        Receive.run(queueName, channel, conn)
        for (const data of dataTsv) {
          const dataChecked = await CheckRule.checkRule(data);
          if (dataChecked !== null){
            Producer.sendMess(channel, queueName, JSON.stringify(dataChecked))
          }
        }
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