import express from 'express'
import { login, logout, register } from '../controllers/authentication'
import { isAuthenticated, isOwner } from '../middlewaers'

export default (router: express.Router) => {
    router.post('/auth/register', register)
    router.post('/auth/login', login)
    router.post('/auth/logout', logout)
}