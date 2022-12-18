const amqplib = require('amqplib');
class Receive {
  run (name, channel,db) {
    channel.prefetch(1);
    channel.consume(name, function(msg) {
      console.log('2: ', msg.content.toString());
      setTimeout(function() {
        console.log(" [x] Done");
        channel.ack(msg);
      }, 10 * 1000);
    }, {
      noAck: false
    });
  }
}
module.exports = new Receive();
