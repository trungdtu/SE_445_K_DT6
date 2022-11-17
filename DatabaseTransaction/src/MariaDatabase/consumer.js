const amqplib = require('amqplib');

async function receiveQueue () {
  const conn = await amqplib.connect('amqp://localhost:5672');

  const channel = await conn.createChannel();

  const queue = 'q2';

  await channel.assertQueue(queue, {
    durable: true,
  });
  //reciver 
  await channel.consume(queue, smg => {
    console.log('Smg: ', smg.content.toString())
  }, {
    noAck: true,
  })
};
receiveQueue()
