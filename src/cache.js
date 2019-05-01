'use strict'

const Cacheman = require('cacheman')
const noop = () => {}

const EventEmitter = require('events')
const { on, once, off, emit } = new EventEmitter()

class Cache {
    constructor(options) {
        this.cache = new Cacheman('cachegoose-cache', options)
    }
}

Object.defineProperties(Cache.prototype, {
    on: { value: on },
    once: { value: once },
    off: { value: off },
    emit: { value: emit },
    get: {
        value: function(key, cb = noop) {
            this.emit('get', key)
            return this.cache.get(key, cb)
        }
    },
    set: {
        value: function(key, value, ttl, cb = noop) {
            this.emit('set', key)
            if (ttl === 0) ttl = -1
            return this.cache.set(key, value, ttl, cb)
        }
    },
    del: {
        value: function(key, cb = noop) {
            this.emit('set', key)
            return this.cache.del(key, cb)
        }
    },
    clear: {
        value: function(cb = noop) {
            return this.cache.clear(cb)
        }
    }
})

module.exports = function(options) {
    return new Cache(options)
}
