import { Router } from 'express';
import { get, create, list } from '../controllers/invoiceDetail';
import { userById } from '../controllers/user';
import { requiredSignin, isAdmin, isAuth } from '../middlewares/checkAuth';
const router = Router();

router.get('/invoiceDetails', list);
// router.post('/invoicesDetails/:userId', requiredSignin, isAuth, create);
router.post('/invoiceDetails', create);
router.get('/invoiceDetail/:id', get);

router.param("userId", userById)

export default router; 