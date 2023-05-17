const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const categorie = await prisma.categorie.findUnique({
            where: {
                id: parseInt(id)
            },
            include: {
                articles: true
            }
        });
        res.json(categorie);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error getting categorie by id');
    }
});

router.post('/', async (req, res) => {
    const { nom } = req.body;
    try {
        const categorie = await prisma.categorie.create({
            data: {
                nomà
            }
        });
        res.json(categorie);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating categorie');
    }
});

router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { nom } = req.body;
    try {
        const updatedCategorie = await prisma.categorie.update({
            where: {
                id: parseInt(id)
            },
            data: {
                nom
            }
        });
        res.json(updatedCategorie);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating categorie');
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCategorie = await prisma.categorie.delete({
            where: {
                id: parseInt(id)
            }
        });
        res.json(deletedCategorie);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting categorie');
    }
});

module.exports = router;
