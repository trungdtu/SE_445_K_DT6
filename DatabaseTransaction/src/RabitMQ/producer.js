const TSVController = require('../TSVDatabase/controller');
class Producer {
  async sendMess (channel, name, message) {
    try {
      await channel.assertQueue('KhachHang', {durable: true,});
      channel.sendToQueue(name, Buffer.from(message, {
        persistent: true
      }))
    } catch (err) {
      console.error(err);
    } 
  }
}
module.exports = new Producer();

