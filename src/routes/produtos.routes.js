/* eslint-disable new-cap */
import {Router} from 'express';
import produtosController from '../controllers/produtos.controller.js';

const router = Router();

router.post('/', produtosController.createOrUpdateProduct);
router.get('/', produtosController.listProducts);
router.get('/:codigo', produtosController.listProductByCodigo);
router.put('/', produtosController.updateProduct);
router.delete('/', produtosController.deleteProductByCodigo);

export default router;
