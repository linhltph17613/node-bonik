import { Router } from 'express';
import { get, create, list, remove, update, search, page } from '../controllers/product';
// import { requiredSignin, isAdmin, isAuth} from '../middlewares/checkAuth';
const router = Router();

router.get('/products', list);   
router.post('/products', create);
router.get('/product/:id', get);
router.delete('/product/:id', remove);
router.put('/product/:id', update);
router.get('/search', search )
router.get('/filter', page )

// router.param("userId", userById)

export default router; 