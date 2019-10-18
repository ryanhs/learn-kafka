const Kafka = require('./shared/kafka-client.js')


const clientId = 'consumer1';
const kafka = Kafka({clientId});

const consumer = kafka.consumer({ groupId: 'test-group' })

const run = async () => {
  // Consuming
  await consumer.connect()
  await consumer.subscribe({ topic: 'test', fromBeginning: true })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      consumer.logger().info({event: 'RECEIVED!', topic, partition, offset: message.offset, message: message.value.toString()})
    },
  })
}

run().catch(console.error)
