'use strict'

const syncTradesRange = require('./lib/models/trade/sync_range')
const syncCandlesRange = require('./lib/models/candle/sync_range')
const auditCandleGaps = require('./lib/models/candle/audit_gaps')

/**
 * This module is meant to be used when no exchange-specific methods are
 * required by a running instance of the {@link external:bfx-hf-models}
 * database. It implements the required methods as stubs.
 *
 * @license Apache-2.0
 * @module bfx-hf-ext-plugin-dummy
 * @example
 * const debug = require('debug')('bfx:hf:ext-plugin:dummy:examples:basic-hf-db')
 * const { schema: DummySchema } = require('bfx-hf-ext-plugin-dummy')
 * const HFDBLowDBAdapter = require('bfx-hf-models-adapter-lowdb')
 * const HFDB = require('bfx-hf-models')
 *
 * const DB_PATH = '...'
 *
 * debug('loading db from %s', DB_PATH)
 *
 * // Create an hf DB instance without exchange specific methods
 * const db = new HFDB({
 *   schema: DummySchema,
 *   adapter: HFDBLowDBAdapter({
 *     dbPath: DB_PATH
 *   })
 * })
 *
 * // All default models are available, but will lack exchange specific methods
 * // (i.e Candle.sync_range())
 * const {
 *   AlgoOrder, Backtest, Candle, Credential, Market, Strategy, Trade
 * } = db
 *
 * const allCandles = await Candle.getAll()
 * const allTrades = await Trade.getAll()
 * const activeAlgoOrders = await AlgoOrder.find(['active', '=', true])
 * const allCredentialsByCID = await Credential.getAll()
 * const allCredentials = Object.values(allCredentialsByCID)
 *
 * debug('db has %d candles', allCandles.length)
 * debug('db has %d trades', allTrades.length)
 * debug('db has %d credentials', allCredentials.length)
 * debug('db has %d active algo orders', activeAlgoOrders.length)
 *
 * const credential = await Credential.create({
 *   cid: Date.now(),
 *   key: 'some_public_key',
 *   secret: 'some_secret_key',
 *   meta: 'credential information'
 * })
 *
 * debug('added credential to db: %j', credential)
 *
 * // ...
 */

/**
 * @external bfx-hf-models
 * @see https://github.com/bitfinexcom/bfx-hf-models
 */

module.exports = {
  schema: {
    Trade: {
      schemaExchangeData: {
        id: Number
      },

      methods: {
        syncRange: syncTradesRange
      }
    },

    Candle: {
      schemaExchangeData: {
        type: String
      },

      methods: {
        auditGaps: auditCandleGaps,
        syncRange: syncCandlesRange
      }
    }
  }
}
