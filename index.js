const express = require('express');

const server = express();
server.use(express.json());

const users = ['Diego', 'Claudio', 'Vitor'];
server.get('/users/:index', (req, res) => {
       const {index} = req.params;
    return res.json({message:`Hello ${users[index]} Buscando o usuário`});
});


server.get('/users',(req,res)=>{
    return res.json(users); 

});

server.post('/users', (req,res)=>{
    const {name} = req.body;

    users.push(name);
    return res.json(users)

});

server.put('/users/:index',(req,res)=>{
    const {index}  = req.params;
    const {name} = req.body;

    users[index] = name;

    return res.json(users);

});


server.delete('/users/:index', (req,res)=>{

    const {index}  = req.params;
    users.splice(index,1);
    return res.send('Usuário Deletado');

});


server.listen(3000);


//Query params = ?teste=2
//Route params = /users/1 => declaração ccorreta  espera recepção de um id server.get('/user/:id'
//Request body = {"name": "Diego", "email": "ad@ad.com", }