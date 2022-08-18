import { Router } from 'express';
import { get, list, read, update, userById } from '../controllers/user';
import { isAdmin, isAuth, requiredSignin } from '../middlewares/checkAuth';
const router = Router();

// router.get('/users/:userId', requiredSignin, isAuth, isAdmin, list);
router.get('/users', list);
// router.get('/users/:id/:userId', requiredSignin, isAuth, read);
// router.get('/user/:id/:userId', requiredSignin, isAuth, get);
router.get('/users/:id', read);
router.get('/user/:id', get);
router.put('/user/:id', update);

router.param("userId", userById)

export default router;
