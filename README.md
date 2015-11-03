# Event Forage

Utility for [localforage](https://github.com/mozilla/localForage) that emits events when keys in the store are set or removed.

## Usage

```js
var localforage = require('eventforage')

localforage.on('set', function (key, value) {
  // Called when ANY key is set
  console.log('set', key, value)
})

localforage.on('set:test', function (value) {
  // Called when the key "test" is set
  console.log('set:test', value)
})

localforage.on('remove', function (key) {
  // Called when ANY key is removed
  console.log('remove', key)
})

localforage.on('remove:test', function () {
  // Called when the key "test" is removed
  console.log('remove:test')
})

localforage.on('clear', function () {
  // Called when the store is cleared
  console.log('clear')
})

// Start using the store ------------------------------------------------------

localforage.setItem('test', 'foo', function (err) {
  console.log('setItem callback')
})

localforage.removeItem('test', function (err) {
  console.log('removeItem callback')
})

localforage.clear(function (err) {
  console.log('clear callback')
})

// Output ---------------------------------------------------------------------

/*
setItem callback
set:test foo
set test foo
removeItem callback
remove:test
remove test
clear callback
clear
*/
```

## Events

### `set`

Emitted after _any_ key has been set in the store. Handler receives `key` and `value` params.

### `set:<key name>`

Emitted after a key has been set in the store. Handler receives `value` param.

### `remove`

Emitted after _any_ key has been removed from the store. Handler receives `key` param.

### `remove:<key name>`

Emitted after a key has been removed from the store. Handler receives no parameters.

### `clear`

Emitted after the store has been cleared. Handler receives no parameters.
