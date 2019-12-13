const R = require('ramda')
const assert = require('assert')
const { walk, postwalk, prewalk } = require('./index')

describe('tree walking', () => {
  it('maps over array values', () => {
    const res = walk(
      inner => inner * 2,
      outer => outer.reduce((a, b) => a + b),
      [1, 2, 3, 4, 5]
    )
    assert.equal(res, 30)
  })

  it('iterates over objects', () => {
    const res = walk(([k, v]) => [k, v + 10], R.assoc('baz', 109), {
      foo: 99,
      bar: 99
    })
    assert.deepEqual(res, { foo: 109, bar: 109, baz: 109 })
  })

  it('iterates over objects', () => {
    const res = walk(([k, v]) => [k, v + 10], R.assoc('baz', 109), {
      foo: 99,
      bar: 99
    })
    assert.deepEqual(res, { foo: 109, bar: 109, baz: 109 })
  })

  it('postwalk', () => {
    const stack = []
    const fn = x => {
      stack.push(x)
      if (R.is(Number, x)) {
        return x * 2
      }
      return x
    }

    const input = [[1, 2, 3], [4, 5, 6]]
    const res = postwalk(fn, input)

    // assert post-order
    assert.deepEqual(res, [[2, 4, 6], [8, 10, 12]])
    assert.deepEqual(stack[0], 1)
    assert.deepEqual(stack[1], 2)
    assert.deepEqual(stack[3], [2, 4, 6])
  })

  it('postwalk', () => {
    const stack = []
    const fn = x => {
      stack.push(x)
      if (R.is(Number, x)) {
        return x * 2
      }
      return x
    }

    const input = [1, [2, 3]]
    const res = prewalk(fn, input)

    // assert pre-order
    assert.deepEqual(stack[0], [1, [2, 3]])
    assert.deepEqual(stack[1], 1)
    assert.deepEqual(stack[2], [2, 3])
  })
})
