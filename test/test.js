var test = require('tape')
var proxyquire = require('proxyquire').noCallThru()
var EventForage = proxyquire('../', {localforage: {}}).EventForage
var MockForage = require('./helpers/mockforage')

test('Should emit set event for any key', function (t) {
  t.plan(4)

  var localforage = new EventForage(new MockForage())

  var item0 = {key: 'zero', value: 24}
  var item1 = {key: 'one', value: 'foo'}
  var calls = 0

  localforage.on('set', function (key, value) {
    if (calls === 0) {
      t.equal(key, item0.key)
      t.equal(value, item0.value)
      calls++
    } else {
      t.equal(key, item1.key)
      t.equal(value, item1.value)
      t.end()
    }
  })

  localforage.setItem(item0.key, item0.value, function () {
    localforage.setItem(item1.key, item1.value)
  })
})

test('Should emit set event for particular keys', function (t) {
  t.plan(2)

  var localforage = new EventForage(new MockForage())

  var item0 = {key: 'zero', value: 24}
  var item1 = {key: 'one', value: 'foo'}

  localforage.on('set:' + item0.key, function (value) {
    t.equal(value, item0.value)
  })

  localforage.on('set:' + item1.key, function (value) {
    t.equal(value, item1.value)
    t.end()
  })

  localforage.setItem(item0.key, item0.value, function () {
    localforage.setItem(item1.key, item1.value)
  })
})

test('Should emit remove event for any key', function (t) {
  t.plan(2)

  var localforage = new EventForage(new MockForage())

  var item0 = {key: 'zero', value: 24}
  var item1 = {key: 'one', value: 'foo'}
  var calls = 0

  localforage.on('remove', function (key) {
    if (calls === 0) {
      t.equal(key, item0.key)
      calls++
    } else {
      t.equal(key, item1.key)
      t.end()
    }
  })

  localforage.setItem(item0.key, item0.value, function () {
    localforage.setItem(item1.key, item1.value, function () {
      localforage.removeItem(item0.key, function () {
        localforage.removeItem(item1.key)
      })
    })
  })
})

test('Should emit remove event for particular keys', function (t) {
  t.plan(2)

  var localforage = new EventForage(new MockForage())

  var item0 = {key: 'zero', value: 24}
  var item1 = {key: 'one', value: 'foo'}

  localforage.on('remove:' + item0.key, function () {
    t.ok(true)
  })

  localforage.on('remove:' + item1.key, function () {
    t.ok(true)
    t.end()
  })

  localforage.setItem(item0.key, item0.value, function () {
    localforage.setItem(item1.key, item1.value, function () {
      localforage.removeItem(item0.key, function () {
        localforage.removeItem(item1.key)
      })
    })
  })
})

test('Should emit clear event', function (t) {
  t.plan(1)

  var localforage = new EventForage(new MockForage())

  localforage.on('clear', function () {
    t.ok(true)
    t.end()
  })

  localforage.clear()
})
