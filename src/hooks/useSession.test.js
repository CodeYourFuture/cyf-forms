import { act, renderHook } from '@testing-library/react'

import useSession from './useSession'

describe('useSession', () => {
  const key = 'SOME_RANDOM_KEY'

  beforeEach(() => {
    sessionStorage.clear()
  })

  describe('initial value', () => {
    it('uses the session value if available', () => {
      sessionStorage.setItem(key, '{"foo":"bar"}')
      const {
        result: {
          current: [data]
        }
      } = renderHook(() => useSession(key, { something: 'else' }))
      expect(data).toEqual({ foo: 'bar' })
      expect(sessionStorage.getItem(key)).toBe('{"foo":"bar"}')
    })

    it('uses null by default', () => {
      const {
        result: {
          current: [data]
        }
      } = renderHook(() => useSession(key))
      expect(data).toBeNull()
      expect(sessionStorage.getItem(key)).toBe('null')
    })

    it('uses initial value if provided', () => {
      const {
        result: {
          current: [data]
        }
      } = renderHook(() => useSession(key, { foo: 'bar' }))
      expect(data).toEqual({ foo: 'bar' })
      expect(sessionStorage.getItem(key)).toBe('{"foo":"bar"}')
    })

    it('accepts a function returning initial value', () => {
      const {
        result: {
          current: [data]
        }
      } = renderHook(() => useSession(key, () => ({ foo: 'bar' })))
      expect(data).toEqual({ foo: 'bar' })
      expect(sessionStorage.getItem(key)).toBe('{"foo":"bar"}')
    })
  })

  describe('updating', () => {
    it('updates the value asked', async () => {
      const { result } = renderHook(() => useSession(key))
      act(() => result.current[1]({ foo: 'bar' }))
      expect(result.current[0]).toEqual({ foo: 'bar' })
      expect(sessionStorage.getItem(key)).toBe('{"foo":"bar"}')
    })

    it('accepts a functional update', () => {
      const { result } = renderHook(() => useSession(key, { foo: 'bar' }))
      act(() => result.current[1](previous => ({ ...previous, baz: 'qux' })))
      expect(result.current[0]).toEqual({ foo: 'bar', baz: 'qux' })
      expect(JSON.parse(sessionStorage.getItem(key))).toEqual({
        foo: 'bar',
        baz: 'qux'
      })
    })
  })
})
