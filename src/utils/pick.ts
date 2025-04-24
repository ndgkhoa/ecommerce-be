const pick = <T, K extends keyof T>(object: T, keys: K[]): Pick<T, K> => {
  return keys.reduce(
    (result, key) => {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        result[key] = object[key]
      }
      return result
    },
    {} as Pick<T, K>
  )
}

export default pick
