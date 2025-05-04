/* Importamos el paquete express */
import express from 'express';

/* Importamos otros archivos */
import {
  addAlumno,
  addLibro,
  addAutor,
  addEditorial,
  addCategoria,
  addRegistro
} from '../controllers/add.controller.js';
import { validateSchema } from '../middleware/validator.middleware.js'
import { alumnoSchema } from '../schemas/alumnos.schema.js';
import { libroSchema } from '../schemas/libros.schema.js';
import { autorSchema } from '../schemas/autores.schema.js';
import { editorialSchema } from '../schemas/editoriales.schema.js';
import { categoriaSchema } from '../schemas/categorias.schema.js';
import { registroSchema } from '../schemas/registro.schema.js';

const router = express.Router();

router.post('/alumno', addAlumno);
router.post('/libro', validateSchema(libroSchema), addLibro);
router.post('/categoria', validateSchema(categoriaSchema), addCategoria);
router.post('/editorial', validateSchema(editorialSchema), addEditorial);
router.post('/autor', validateSchema(autorSchema), addAutor);
router.post('/registo', validateSchema(registroSchema), addRegistro);

export default router;