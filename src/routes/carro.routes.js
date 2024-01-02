import { Router } from "express";
import { getCarro, createCarro, updateCarro, deleteCarro,getCarro1 } from "../controllers/carro.controller.js";

const router = Router()

router.get('/carros', getCarro)
router.get('/carros/:id', getCarro1)
router.post('/carros', createCarro)
router.patch('/carros/:id', updateCarro )
router.delete('/carros/:id',deleteCarro )


export default router