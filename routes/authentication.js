const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { generateToken, verifyTokenMiddleware} = require('../jwtMiddleware/jwtMiddleware');

const prisma = new PrismaClient();

router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    try {
        console.log(req.body);
        const user = await prisma.utilisateur.findUnique({
            where: {
                email: email
            }
        });
        if(!user) {res.json({message: "email wrong",status: false});}
        else {
            if(user.password!==password) {
                res.json({user: user, message: "password wrong", status: false});
            }
            else{
                const token = generateToken({userId: user.id}); // Replace with actual user ID
                res.json({token: token, status: true});
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error getting user by id');
    }
});

router.get('/check',verifyTokenMiddleware, async (req, res)=>{
    res.json(true);
})


router.get('/logout', (req, res) => {
    res.send("Done");
});

module.exports = router;
