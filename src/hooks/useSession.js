import { useCallback, useState } from 'react'

/**
 * Behaves like useState but with the value retained in sessionStorage.
 *
 * @template T
 * @param {string} key
 * @param {(T | (() => T))=} initialValue
 * @returns {[T | null, (newValue: T | ((oldValue: T) => T)) => void]}
 */
export default function useSession(key, initialValue) {
  const [data, setData] = useState(startValue(key, initialValue))
  const updateData = useCallback(
    newData => {
      setData(oldData => stored(key, callIfFunc(newData, oldData)))
    },
    [key]
  )
  return [data, updateData]
}

const callIfFunc = (maybeFunc, ...args) =>
  typeof maybeFunc === 'function' ? maybeFunc(...args) : maybeFunc

const retrieved = key => {
  return JSON.parse(sessionStorage.getItem(key))
}

const startValue = (key, initialValue) => {
  return retrieved(key) ?? stored(key, callIfFunc(initialValue))
}

const stored = (key, value = null) => {
  sessionStorage.setItem(key, JSON.stringify(value))
  return value
}
