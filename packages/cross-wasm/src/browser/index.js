import {ensureServiceIsRunning, initialize} from './init';

export const add = async (a, b) => {
  await initialize({
    wasmURL: ''
  })
  return ensureServiceIsRunning().add(a, b)
}

export const Keccak256 = async (data) => {
  await initialize({
    wasmURL: ''
  })
  return ensureServiceIsRunning().Keccak256(data)
}
