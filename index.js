var EventEmitter = require('events').EventEmitter
var inherits = require('util').inherits

function EventForage (localforage) {
  if (!(this instanceof EventForage)) {
    return new EventForage(localforage)
  }
  this._localforage = localforage || require('localforage')
}
inherits(EventForage, EventEmitter)

EventForage.prototype.setItem = function (key, value, cb) {
  var self = this
  return self._localforage.setItem.call(this._localforage, key, value, function (err) {
    if (err) {
      if (cb) cb(err)
      return
    }

    if (cb) cb.apply(null, arguments)

    self.emit('set:' + key, value)
    self.emit('set', key, value)
  })
}

EventForage.prototype.removeItem = function (key, cb) {
  var self = this
  return self._localforage.removeItem.call(this._localforage, key, function (err) {
    if (err) {
      if (cb) cb(err)
      return
    }

    if (cb) cb.apply(null, arguments)

    self.emit('remove:' + key)
    self.emit('remove', key)
  })
}

EventForage.prototype.clear = function (cb) {
  var self = this
  return self._localforage.clear.call(this._localforage, function (err) {
    if (err) {
      if (cb) cb(err)
      return
    }

    if (cb) cb.apply(null, arguments)

    self.emit('clear')
  })
}

EventForage.prototype.getItem = passThru('getItem')
EventForage.prototype.length = passThru('length')
EventForage.prototype.key = passThru('key')
EventForage.prototype.keys = passThru('keys')
EventForage.prototype.iterate = passThru('iterate')

function passThru (fn) {
  return function () {
    var self = this
    return self._localforage[fn].apply(self._localforage, arguments)
  }
}

module.exports = new EventForage()
module.exports.EventForage = EventForage
