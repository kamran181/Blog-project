import express from "express";

const router = express.Router();

import { getSignUp, postSignup, getLogin, postLogin , isLoggedout} from '../controllers/userController.js'


router.get('/signup', getSignUp);

router.post('/signup', postSignup);

router.get('/login', getLogin);

router.post('/login', postLogin);

router.get('/logout', isLoggedout);

export default router


