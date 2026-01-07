import express from 'express'
import { getMe , getProfiles } from '../controllers/user.controller.js'
import { protect } from '../middlewares/auth.middleware.js';


const router  = express.Router();

router.get('/getme',  protect , getMe);
router.get('/getProfiles' , protect , getProfiles);

export default router