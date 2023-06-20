const express = require('express')
const router = express.Router()
const connection = require('../utils/db')

require('dotenv').config()


const createLaptop=async (req, res) => {
  try {
    const { firstname, lastname, nationalID, phone, email, department, position, laptopManufacturer, model, serialNumber } = req.body;

    const countResult = await new Promise((resolve, reject) => {
      connection.query('SELECT COUNT(*) AS count FROM  employeelaptop WHERE serialNumber = ?', [serialNumber], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });

    const count = countResult[0].count;
    if (count > 0) {
      res.status(400).send('Serial number already exists');
    } else {
      const insertResult = await new Promise((resolve, reject) => {
        connection.query('INSERT INTO  employeelaptop (firstname, lastname, nationalID, phone, email, department, position, laptopManufacturer, model, serialNumber) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [firstname, lastname, nationalID, phone, email, department, position, laptopManufacturer, model, serialNumber], (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
      });

      res.status(201).send(`Laptop added with ID: ${insertResult.insertId}`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};
const getLaptop= async (req, res) => {
    try {
      const result = await new Promise((resolve, reject) => {
        connection.query('SELECT * FROM employeeLaptop', (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        });
      });
  
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  };
  module.exports={createLaptop,getLaptop}


