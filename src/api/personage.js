import { get } from './request'

export const getPersons = () => get('/personage/list')
export const getRelations = () => get('/personage/relations')
