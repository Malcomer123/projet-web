const { PrismaClient} = require('@prisma/client');
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();


const seed = async () => {
    // Suppression des données existantes
    await prisma.commentaire.deleteMany();
    await prisma.article.deleteMany();
    await prisma.categorie.deleteMany();
    await prisma.utilisateur.deleteMany();

    const result = await prisma.$queryRaw`ALTER SEQUENCE "Commentaire_id_seq" RESTART WITH 1`
    const result2 = await prisma.$queryRaw`ALTER SEQUENCE "Article_id_seq" RESTART WITH 1`
    const result3 = await prisma.$queryRaw`ALTER SEQUENCE "Categorie_id_seq" RESTART WITH 1`
    const result4 = await prisma.$queryRaw`ALTER SEQUENCE "Utilisateur_id_seq" RESTART WITH 1`


    try {
        // 10 utilisateurs avec le role author
        for (let i = 0; i < 10; i++) {
            await prisma.utilisateur.create({
                data: {
                    nom: faker.person.fullName(),
                    email: faker.internet.email(),
                    password: faker.internet.password(),
                    role: 'author'
                }
            });
        }
        // 1 utilisateur avec le role admin
        await prisma.utilisateur.create({
            data: {
                nom: faker.person.fullName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
                role: 'admin'
            }
        });
        // 10 categories
        for (let i = 0; i < 10; i++) {
            await prisma.categorie.create({
                data: {
                    nom: faker.word.sample()
                }
            });
        }
        // 100 articles
        for (let i = 0; i < 100; i++) {
            await prisma.article.create({
                data: {
                    titre: faker.lorem.sentence(),
                    contenu: faker.lorem.paragraphs(),
                    published: faker.datatype.boolean(),
                    auteurId: faker.number.int({ min: 1, max: 10 }),
                    categories: {
                        connect: [
                            {id: faker.number.int({min: 1, max: 10})},
                            {id: faker.number.int({min: 1, max: 10})},
                        ],
                    },
                }
            });
        }
        // 0 to 20 commentaires for each article
        const articles = await prisma.article.findMany();
        for (let i = 0; i < articles.length; i++) {
            const article = articles[i];
            const commentairesCount = faker.number.int({ min: 0, max: 20 });
            for (let j = 0; j < commentairesCount; j++) {
                await prisma.commentaire.create({
                    data: {
                        email: faker.internet.email(),
                        contenu: faker.lorem.paragraph(),
                        articleId: article.id
                    }
                });
            }
        }
    } catch (error) {
        console.error(error);
    }
};

seed().then(() => {
    console.log('Seed terminé');
});