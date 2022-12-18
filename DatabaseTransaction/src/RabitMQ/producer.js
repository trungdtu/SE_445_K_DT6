const TSVController = require('../TSVDatabase/controller');
class Producer {
  async sendMess (channel, name, message) {
    try {
      await channel.sendToQueue(name, Buffer.from(message), {
        persistent: true
      });
    } catch (err) {
      console.error('hhe:', err);
    } 
  }
}
module.exports = new Producer();