import { Router } from "express";
import { get, list, post, read, relatedProduct, remove, update } from "../controllers/category";

// import { checkAuth, isAuth, isAdmin, requireSignin } from "../middlewares/checkAuth";
const router = Router();

router.get("/categories", list);
router.get("/category/:id", get);
router.get("/categories/:id", read);
router.post("/categories", post);
router.put("/categories/:id", update);
router.delete("/categories/:id", remove);
router.get('/categories/:id/:idPro', relatedProduct);
// router.param("userId", userById);
export default router;