const express = require('express')
const router = express.Router()
const connection = require('../utils/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const JWT_SECRETT=require('../utils/key')

const login= async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const results = await new Promise((resolve, reject) => {
        connection.query("SELECT * from users where email = ?", [email], (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
      });
  
      if (results.length === 0) {
        res.status(401).json({ message: 'Invalid credentials' });
      } else {
        const user = results[0];
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).json({ message: 'Server error' });
          } else {
            if (result === true) {
              const token = jwt.sign({ userId: user.id }, JWT_SECRETT,{

                expiresIn: '8h' // expires in 24 hours

                 });
              res.header('Authorization', `Bearer ${token}`).status(200).json({Status:'Success' ,message: 'Login successful', token: `Bearer ${token}` });
            } else {
              res.status(401).json({ message: 'Invalid credentials' });
            }
          }
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
const signup= async (req, res) => {
    try {
      const { names, email, password } = req.body;
  
      const countResult = await new Promise((resolve, reject) => {
        connection.query(
          "SELECT COUNT(*) AS count FROM users WHERE email = ?",
          [email],
          (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          }
        );
      });
  
      if (countResult[0].count > 0) {
        res.status(409).send("Email already exists");
        return;
      }
  
      bcrypt.hash(password, 10, async (hashErr, hash) => {
        if (hashErr) {
          console.log(hashErr);
          res.status(500).send("Server error");
          return;
        }
  
        const insertResult = await new Promise((resolve, reject) => {
          connection.query(
            "INSERT INTO users (names, email, password) VALUES (?, ?, ?)",
            [names, email, hash],
            (insertErr, result) => {
              if (insertErr) {
                reject(insertErr);
              } else {
                resolve(result);
              }
            }
          );
        });
  
        res.status(201).send(`User added with id ${insertResult.insertId}`);
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  };
  
  module.exports = {login,signup};