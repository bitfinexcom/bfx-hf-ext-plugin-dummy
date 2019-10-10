## Bitfinex Honey Framework Dummy DB plugin for Node.JS

This plugin is meant to be used when no exchange-specific methods are required by a running instance of the `bfx-hf-models` database. It implements the required methods as stubs.

### Features
* Allows for utilization of the base `bfx-hf-models` functionality without exchange-specific methods

### Installation

```bash
npm i --save bfx-hf-ext-plugin-dummy
```

### Docs

[See `examples/basic_hf_db.js`](/examples/basic_hf_db.js) to get a `bfx-hf-models` instance running with no exchange-specific methods.

### Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Reques