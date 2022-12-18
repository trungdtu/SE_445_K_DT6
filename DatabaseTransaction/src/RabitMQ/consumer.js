const amqplib = require('amqplib');
class Receive {
  run (name, channel,db) {
    try {
      channel.prefetch(1);
      channel.consume(name, function(msg) {
        const msgData = JSON.parse(msg.content.toString());
        console.log('msgData: ', msgData)
        setTimeout(function() {
          channel.ack(msg);
        }, 1 * 1000);
      }, {
        noAck: false
      });
    } catch (e) {
      console.log('hihi', e)
    }
  }
}
module.exports = new Receive();
