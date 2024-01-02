import { request } from 'express'
import { pool } from '../db.js';
import Joi from 'joi';
export const getCarro = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM carro');
    res.json(rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Hubo un error al obtener los carros.' });
  }
};

export const getCarro1 = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM carro WHERE id = ?', [req.params.id]);
    if (rows.length <= 0) return res.status(404).json({ message: 'Carro no encontrado.' });
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Hubo un error al obtener el carro.' });
  }
};

export const createCarro = async (req, res) => {
  const { marca, modelo, año, color, precio } = req.body;

  // Validación de los datos de entrada usando Joi
  const schema = Joi.object({
      marca: Joi.string().required(),
      modelo: Joi.string().required(),
      año: Joi.number().integer().min(1900).max(new Date().getFullYear()).required(),
      color: Joi.string().required(),
      precio: Joi.number().precision(10).required(),
  });

  const { error } = schema.validate({ marca, modelo, año, color, precio });

  if (error) {
      return res.status(400).json({ error: error.details[0].message });
  }

  try {
      // Realizar la inserción en la base de datos
      const [rows] = await pool.query('INSERT INTO carro (marca, modelo, año, color, precio) VALUES (?, ?, ?, ?, ?)', [marca, modelo, año, color, precio]);

      res.send({
          id: rows.insertId,
          marca,
          modelo,
          año,
          color,
          precio,
      });
  } catch (error) {
      return res.status(500).json({ message: 'Algo fue mal' });
  }
};

export const deleteCarro = async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM carro WHERE id = ?', [req.params.id]);
    if (result.affectedRows <= 0) return res.status(404).json({ message: 'Carro no eliminado.' });
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Hubo un error al eliminar el carro.' });
  }
};

export const updateCarro = async (req, res) => {
  const { id } = req.params;
  const { marca, modelo, año, color, precio } = req.body;

  // Validación de los datos de entrada usando Joi
  const schema = Joi.object({
      marca: Joi.string(),
      modelo: Joi.string(),
      año: Joi.number().integer().min(1900).max(new Date().getFullYear()),
      color: Joi.string(),
      precio: Joi.number().precision(10),
  }).or('marca', 'modelo', 'año', 'color', 'precio');

  const { error } = schema.validate({ marca, modelo, año, color, precio });

  if (error) {
      return res.status(400).json({ error: error.details[0].message });
  }

  try {
      const updatedFields = {};
      ['marca', 'modelo', 'año', 'color', 'precio'].forEach((field) => {
          if (req.body[field]) {
              updatedFields[field] = req.body[field];
          }
      });

      // Realizar la actualización en la base de datos
      const [result] = await pool.query('UPDATE carro SET ? WHERE id=?', [updatedFields, id]);

      if (result.affectedRows === 0) {
          return res.status(404).json({ message: 'Carro no encontrado' });
      }

      const [rows] = await pool.query('SELECT * FROM carro WHERE id=?', [id]);

      res.json(rows[0]);
  } catch (error) {
      return res.status(500).json({ message: 'Algo fue mal' });
  }
};

