const amqplib = require('amqplib');
class Receive {
  async run (name, channel,db) {
    const rabitMQ = await amqplib.connect('amqp://localhost:5672');
    await channel.consume(name, async smg => {
      console.log(name + ': ', smg.content.toString())
    }, {
      noAck: true,
    })
  }
}
module.exports = new Receive();
