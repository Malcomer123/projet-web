const express = require('express');
const router = express.Router();

router.get("/:id", (req, res)=>{
    const {id} = req.params;
    res.send(id);
    // to be added
});

router.post("/",(req, res)=>{
    // to be added for create
});

router.patch("/",(req, res)=>{
    // to be added for create
});

router.delete("/",(req, res)=>{
    // to be added for create
});

module.exports = router;
