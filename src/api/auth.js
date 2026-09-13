import { post } from './request'

export const login = (username, password) => post('/auth/login', { username, password })
export const register = (username, password, nickname) =>
  post('/auth/register', { username, password, nickname })
