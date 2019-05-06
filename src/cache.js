'use strict'

const Cacheman = require('cacheman')
const noop = () => {}

const EventEmitter = require('events')
const { on, once, off, emit } = new EventEmitter()

class Cache {
    constructor(options) {
        this.cache = new Cacheman('cachegoose-cache', options)
        this.keys = []
    }
}

Object.defineProperties(Cache.prototype, {
    on: { value: on },
    once: { value: once },
    off: { value: off },
    emit: { value: emit },
    keys: {
        value: function() {
            return this.keys
        }
    },
    get: {
        value: function(key, cb = noop) {
            return this.cache.get(key, cb)
        }
    },
    set: {
        value: function(key, value, ttl, cb = noop) {
            if (ttl === 0) ttl = -1
            this.keys.push[key]
            return this.cache.set(key, value, ttl, cb)
        }
    },
    del: {
        value: function(key, cb = noop) {
            this.emit('del', key)
            this.keys = this.keys.filter(k => k !== key)
            return this.cache.del(key, cb)
        }
    },
    clear: {
        value: function(cb = noop) {
            this.emit('clear')
            this.keys = []
            return this.cache.clear(cb)
        }
    }
})

module.exports = function(options) {
    return new Cache(options)
}
