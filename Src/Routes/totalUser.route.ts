import { Router } from 'express'
import { CreateUserDataModel, getUserFullData } from '../Controllers/totalUser.controller.js'

const router = Router()

router.post('/create', CreateUserDataModel)
router.get('/get', getUserFullData)

export default router
