import express from "express";
import { signup,login,logout,updateProfile,checkAuth} from "../controllers/auth.controller.js";
import { ProtectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.put("/updateProfile",ProtectRoute,updateProfile);
router.post("/login", login);
router.post("/logout", logout);
router.get("/check",ProtectRoute,checkAuth)

export default router;
