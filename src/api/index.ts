import type { Express } from 'express'
import { initializePostsAPI } from './api'
import { initializeAuthAPI } from './auth'

export const initializeAPI = (app: Express) => {
    initializePostsAPI(app)
    initializeAuthAPI(app)
}