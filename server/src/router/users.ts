import express from 'express'
import { deleteUser, getAllUsers, getLoggedUser, updatePassword, updateUser } from '../controllers/users'
import { isAuthenticated, isOwner } from '../middlewaers'

export default (router: express.Router) => {
    router.get('/users', getAllUsers)
    router.get('/users/logged-user/:id', isAuthenticated, isOwner, getLoggedUser)
    router.delete('/users/:id', isAuthenticated, isOwner, deleteUser)
    router.patch('/users/:id', isAuthenticated, isOwner, updateUser)
    router.patch('/users/:id', isAuthenticated, isOwner, updatePassword)
}