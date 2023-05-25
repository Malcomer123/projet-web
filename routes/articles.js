const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.get('/', async (req, res) => {
    const { take, skip } = req.query;
    const takeValue = parseInt(take);
    const skipValue = parseInt(skip);

    try {
        const articles = await prisma.article.findMany({
            take: takeValue,
            skip: skipValue,
            include: {categories: true, commentaires: true, auteur: true},
        });
        res.json(articles);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const article = await prisma.article.findUnique({
            where: { id: parseInt(id) },
            include: {categories: true, commentaires: true, auteur: true},
        });

        if (!article) {
            res.status(404).json({ error: 'Article not found' });
        } else {
            res.json(article);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.post('/', async (req, res) => {
    const { titre, contenu, image, published, auteurId, categorieId } = req.body;

    try {
        const article = await prisma.article.create({
            data: {
                titre: titre,
                contenu: contenu,
                image: image,
                published: published,
                auteurId: req.user.userId,
                categories: { connect: categorieId.map((categoryId) => ({ id: categoryId.id }))}
            },
        });

        res.json(article);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { titre, contenu, image, published, auteurId } = req.body;

    try {
        const updatedArticle = await prisma.article.update({
            where: { id: parseInt(id) },
            data: {
                titre,
                contenu,
                image,
                published,
                auteurId,
            },
        });

        res.json(updatedArticle);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/:id',async (req, res) => {
    const { id } = req.params;

    try {
        const deletedArticle = await prisma.article.delete({
            where: { id: parseInt(id) },
        });

        res.json(deletedArticle);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
