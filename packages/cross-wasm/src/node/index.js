import {getService, initialize} from './init';

export const add = async (a, b) => {
  const service = await getService()
  return service.add(a, b)
}

export const Keccak256 = async (data) => {
  const service = await getService()
  return service.Keccak256(data)
}
