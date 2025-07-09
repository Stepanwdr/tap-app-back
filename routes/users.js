import express from "express";

import UsersController from "../controllers/usersController";

const router = express.Router();

router.post('/auth-telegram', UsersController.authFromTelegram);
router.put('/changeScore', UsersController.changeScore);

export default router
