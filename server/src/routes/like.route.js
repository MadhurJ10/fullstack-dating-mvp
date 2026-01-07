import express from 'express'
import {likeUser , getMatches} from '../controllers/like.controller.js';
import {protect} from '../middlewares/auth.middleware.js'

const router = express.Router();


router.post("/:userId" , protect , likeUser);
router.get("/matches" , protect , getMatches);



export default router


