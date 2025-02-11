/* Importar Base de datos */
import { pool } from '../db/db.js'

/* Modulo de obtener todos los registros */
export const getRegistros = async (req, res) => {
  try {
    const [result] = await pool.query(`
    SELECT 
      registros.id,
      alumnos.nombre AS alumno,
      libros.titulo AS libro,
      registros.inicio,
      registros.fin
    FROM registros
    JOIN alumnos ON registros.id_alumno = alumnos.id
    JOIN libros ON registros.id_libro = libros.id
    ORDER BY registros.inicio DESC`);

    res.json({
      id: result.insertId,
      result
    }).status(201);

  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: error.message });
  }
};

/* Modulo de obtener solo un registro */
export const getRegistro = async (req, res) => {
  try {
    const { id } = req.params
    const [result] = await pool.query(`
    SELECT 
      registros.id,
      alumnos.nombre AS alumno,
      libros.titulo AS libro,
      registros.inicio,
      registros.fin
    FROM registros
    JOIN alumnos ON registros.id_alumno = alumnos.id
    JOIN libros ON registros.id_libro = libros.id
    WHERE id = ?`, [
      id,
    ]);

    res.json({
      id: result.insertId,
      result
    }).status(201);

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/* Modulo de añadir un registro en la biblioteca */
export const addRegistro = async (req, res) => {
  try {
    const { id_alumno, id_libro, inicio, fin } = req.body;

    const [result] = await pool.query(
      `INSERT INTO registros (id_alumno, id_libro, inicio, fin) VALUES (?, ?, ?, ?)`,
      [id_alumno, id_libro, inicio, fin]
    );

    res.json({
      id: result.insertId,
      id_alumno, id_libro, inicio, fin
    }).status(201);

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
