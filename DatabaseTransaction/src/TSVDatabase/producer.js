const amqplib = require('amqplib');

async function sendQueue ({smg}) {
  try {
    const conn = await amqplib.connect('amqp://localhost:5672');

    const channel = await conn.createChannel();

    const queue = 'q2';

    await channel.assertQueue(queue, {
      durable: true,
    });

    channel.sendToQueue(queue, Buffer.from(JSON.stringify(smg), {
      persistent: true
    }))
  } catch (err) {
    console.error(err);
  } 
};
sendQueue({smg: 'hello world'})
