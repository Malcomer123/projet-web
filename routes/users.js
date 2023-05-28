const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const {verifyTokenMiddleware} = require("../jwtMiddleware/jwtMiddleware");

const prisma = new PrismaClient();

router.get('/:id',verifyTokenMiddleware, async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;
  try {
    const user = await prisma.utilisateur.findUnique({
      where: {
        OR: [
          { id: parseInt(id) },
          { email: email }
        ]
      }
    });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error getting user by id');
  }
});

router.post('/', async (req, res) => {
  const { nom, email, password, role } = req.body;
  try {
    const user = await prisma.utilisateur.create({
      data: {
        nom,
        email,
        password,
        role
      }
    });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating user');
  }
});

router.patch('/:id',verifyTokenMiddleware, async (req, res) => {
  const { id } = req.params;
  const { nom, email, password, role } = req.body;
  try {
    const updatedUser = await prisma.utilisateur.update({
      where: {
        id: parseInt(id)
      },
      data: {
        nom,
        email,
        password,
        role
      }
    });
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating user');
  }
});

router.delete('/:id',verifyTokenMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await prisma.utilisateur.delete({
      where: {
        id: parseInt(id)
      }
    });
    res.json(deletedUser);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting user');
  }
});

module.exports = router;
