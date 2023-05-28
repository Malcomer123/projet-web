const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.get('/', async (req, res) => {
    try {
        const user = await prisma.utilisateur.findUnique({
            where:{
                id: req.user.userId
            }
        });
        const commentaire = await prisma.commentaire.findMany();
        res.json({commentaires: commentaire, emailOwner: user.email});
    } catch (error) {
        console.error(error);
        res.status(500).send('Error getting categorie by id');
    }
});


router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const commentaire = await prisma.commentaire.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        res.json(commentaire);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error getting commentaire by id');
    }
});

router.post('/', async (req, res) => {
    const { contenu, articleId } = req.body;
    try {
        const user = await prisma.utilisateur.findUnique({
            where:{
                id: req.user.userId
            }
        });
        const email = user.email;
        const commentaire = await prisma.commentaire.create({
            data: {
                email: email,
                contenu: contenu,
                article: {
                    connect: {
                        id: articleId,
                    },
                },
            },
        });
        res.json(commentaire);

    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating commentaire');
    }
});

router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const {  contenu } = req.body;
    try {
        console.log(id);
        console.log(contenu);
        const updatedCommentaire = await prisma.commentaire.update({
            where: {
                id: parseInt(id)
            },
            data: {
                contenu
            }
        });
        res.json(updatedCommentaire);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating commentaire');
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        console.log(id);
        const deletedCommentaire = await prisma.commentaire.delete({
            where: {
                id: parseInt(id)
            }
        });
        res.json(deletedCommentaire);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting commentaire');
    }
});

module.exports = router;
