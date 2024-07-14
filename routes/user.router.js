import { userLogin, userRegister,userFav } from '../controllers/user.controllers.js';
import { Router } from 'express';

const router = Router();

router.route("/register").post(
    userRegister
)

router.route("/login").post(
    userLogin
)

router.route("/fav").post(
    userFav
)

export default router;
