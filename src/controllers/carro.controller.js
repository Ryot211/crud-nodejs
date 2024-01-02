import { request } from 'express'
import { pool } from '../db.js';

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
  try {
    const [rows] = await pool.query('INSERT INTO carro (marca, modelo, año, color, precio) VALUES (?, ?, ?, ?, ?)', [marca, modelo, año, color, precio]);
    res.json({
      id: rows.insertId,
      marca,
      modelo,
      año,
      color,
      precio,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Hubo un error al crear el carro.' });
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
  try {
    const [result] = await pool.query('UPDATE carro SET marca=?, modelo=?, año=?, color=?, precio=? WHERE id=?', [marca, modelo, año, color, precio, id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Carro no encontrado.' });
    const [rows] = await pool.query('SELECT * FROM carro WHERE id=?', [id]);
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Hubo un error al actualizar el carro.' });
  }
};
