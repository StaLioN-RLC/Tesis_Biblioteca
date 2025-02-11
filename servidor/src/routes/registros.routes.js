/* Importamos el paquete express */
import express from 'express';

/* Importamos otros archivos */
import {
  addRegistro,
  getRegistros,
  getRegistro
} from '../controllers/registro.controller.js';

const router = express.Router();

router.get('/gets', getRegistros);
router.get('/get/:id', getRegistro);
router.post('/add', addRegistro);

export default router;