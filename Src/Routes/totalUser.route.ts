import { Router } from 'express'
import { CreateUserDataModel, getAllUsersFullData, getUserFullData } from '../Controllers/totalUser.controller.js'
import { authUser } from '../middleware/auth.middleware.js'

const router = Router()

router.post('/create', authUser, CreateUserDataModel)
router.get('/get/:email', authUser, getUserFullData)
router.get('/get', authUser, getAllUsersFullData)

export default router
