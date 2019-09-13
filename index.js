'use strict'

const syncTradesRange = require('./lib/models/trade/sync_range')
const syncCandlesRange = require('./lib/models/candle/sync_range')
const auditCandleGaps = require('./lib/models/candle/audit_gaps')

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
