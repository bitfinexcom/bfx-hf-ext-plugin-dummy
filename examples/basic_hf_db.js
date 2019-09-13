'use strict'

process.env.DEBUG = '*'

const debug = require('debug')('bfx:hf:ext-plugin:dummy:examples:basic-hf-db')
const HFDB = require('bfx-hf-models')
const HFDBLowDBAdapter = require('bfx-hf-models-adapter-lowdb')
const { schema: DummySchema } = require('../')

const DB_PATH = `${__dirname}/../db/example.json`

const run = async () => {
  debug('loading db from %s', DB_PATH)

  // Create an hf DB instance without exchange specific methods
  const db = new HFDB({
    schema: DummySchema,
    adapter: HFDBLowDBAdapter({
      dbPath: DB_PATH
    })
  })

  // All default models are available, but will lack exchange specific methods (i.e Candle.sync_range())
  const {
    AlgoOrder, Backtest, Candle, Credential, Market, Strategy, Trade // eslint-disable-line
  } = db

  const allCandles = await Candle.getAll()
  const allTrades = await Trade.getAll()
  const activeAlgoOrders = await AlgoOrder.find(['active', '=', true])
  const allCredentialsByCID = await Credential.getAll()
  const allCredentials = Object.values(allCredentialsByCID)

  debug('db has %d candles', allCandles.length)
  debug('db has %d trades', allTrades.length)
  debug('db has %d credentials', allCredentials.length)
  debug('db has %d active algo orders', activeAlgoOrders.length)

  const credential = await Credential.create({
    cid: Date.now(),
    key: 'some_public_key',
    secret: 'some_secret_key',
    meta: 'credential information'
  })

  debug('added credential to db: %j', credential)

  // ...
}

try {
  run()
} catch (e) {
  debug('error: %s', e.stack)
}
