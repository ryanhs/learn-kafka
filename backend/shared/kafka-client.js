const { Kafka } = require('kafkajs')

const MyLogCreator = require('./LogCreator')

module.exports = (configs) =>  new Kafka({
  clientId: Math.random(),
  brokers: [`172.20.0.101:9092`],
  logCreator: MyLogCreator,
  ...configs
})
