function MockForage () {
  if (!(this instanceof MockForage)) {
    return new MockForage()
  }
  this.data = {}
}

MockForage.prototype.getItem = function (key, cb) {
  var data = this.data
  setTimeout(function () { cb(null, data[key]) })
}

MockForage.prototype.setItem = function (key, value, cb) {
  var data = this.data
  setTimeout(function () {
    data[key] = value
    cb(null, value)
  })
}

MockForage.prototype.removeItem = function (key, cb) {
  var data = this.data
  setTimeout(function () {
    delete data[key]
    cb()
  })
}

MockForage.prototype.clear = function (cb) {
  setTimeout(function () {
    this.data = {}
    cb()
  }.bind(this))
}

module.exports = MockForage
