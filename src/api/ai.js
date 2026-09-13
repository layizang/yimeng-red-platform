import { post } from './request'

export const chat = (question) => post('/ai/chat', { question })
