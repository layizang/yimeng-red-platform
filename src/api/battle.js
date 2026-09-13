import { get } from './request'

export const getStages = () => get('/battle/stages')
export const getUnits = () => get('/battle/units')
export const getEvents = () => get('/battle/events')
export const getRoutes = () => get('/battle/routes')
