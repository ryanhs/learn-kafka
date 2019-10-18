const Kafka = require('./shared/kafka-client.js')


const clientId = 'producer1';
const kafka = Kafka({clientId});

const producer = kafka.producer({ groupId: 'test-group' })

const sendMessage = async () => {
  let message = 'Hello KafkaJS user!';

  await producer.send({
    topic: 'test',
    messages: [
      { value: message },
    ],
  })

  producer.logger().info({event: 'SENT!', message})
}

const run = async () => {
  // Producing
  await producer.connect()


  setInterval(sendMessage, 1000)
}

run().catch(console.error)
