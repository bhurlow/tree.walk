const R = require('ramda')

const walk = (inner, outer, form) => {
  if (Array.isArray(form)) {
    return outer(R.map(inner, form))
  }

  if (R.is(Object, form)) {
    const pairs = R.toPairs(form)
    return outer(
      R.pipe(
        R.map(inner),
        R.fromPairs
      )(pairs)
    )
  }

  return outer(form)
}

const postwalk = (f, form) => {
  return walk(x => postwalk(f, x), f, form)
}

const prewalk = (f, form) => {
  return walk(x => prewalk(f, x), R.identity, f(form))
}

module.exports = {
  walk,
  postwalk,
  prewalk
}
