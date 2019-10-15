const express = require('express');

const server = express();


server.get('/teste', (req, res) => {
    return res.json({message:"hI LILO"});
});
server.listen(3000);


//Query params = ?teste=2
//Route params = /users/1
//Request body = {"name": "Diego", "email": "ad@ad.com", }