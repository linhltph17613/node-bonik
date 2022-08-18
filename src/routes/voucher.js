import { Router } from "express";
import { list, post, read, remove, update } from "../controllers/voucher";

// import { checkAuth, isAuth, isAdmin, requireSignin } from "../middlewares/checkAuth";
const router = Router();

router.get("/vouchers", list);
router.get("/vouchers/:id", read);
router.post("/vouchers", post);
router.put("/vouchers/:id", update);
router.delete("/vouchers/:id", remove);
// router.param("userId", userById);
export default router;