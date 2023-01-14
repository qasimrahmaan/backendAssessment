import { Router } from "express";
import {createTasks, listTasks} from '../controllers/tasks'
import AuthJWT from '../middleware/jwtauth'

const router = Router();



router.get('/list-tasks',AuthJWT, listTasks)

router.post('/create-tasks',AuthJWT, createTasks)

export default router;