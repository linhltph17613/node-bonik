import { Router } from 'express';
import { get, create, list, update, read } from '../controllers/invoice';
import { userById } from '../controllers/user';
import { requiredSignin, isAdmin, isAuth } from '../middlewares/checkAuth';
const router = Router();

router.get('/invoices', list);
// router.post('/invoices/:userId', requiredSignin, isAuth, create);
router.post('/invoices', create);
router.get('/invoices/:id', read);
router.get('/invoice/:id', get);
// router.put('/invoice/:id/:userId', requiredSignin, isAuth, isAdmin, update);
router.put('/invoice/:id', update);

router.param("userId", userById)

export default router; 