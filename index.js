const express = require('express');

const server = express();
server.use(express.json());


//criando um Middleware Global

server.use((req,res,next)=>{
    console.time('request')
    console.log(`Metodo: ${req.method}, URL: ${req.url};`);
    next();
    console.timeEnd('Finalizou');
})

//Criando Middleware local utilizei no metodo post e pu

function checkUserExists(req, res, next){
    if(!req.body.name){
        return res.status(400).json({error: 'User not Found on Request Body'});
    }
    return next();
}

// um Middleware de leitura
function checkUserInArray(req,res,next){
    const user = users[req.params.index];
    if(!user){
        return res.status(400).json({error:'User Does not exists'})
    }
    req.user =user;
    return next();
}

const users = ['Diego', 'Claudio', 'Vitor'];


server.get('/users/:index',checkUserInArray, (req, res) => {
       const {index} = req.params;
    return res.json(req.user);
});


server.get('/users',(req,res)=>{
    return res.json(users); 

});

server.post('/users',checkUserExists, (req,res)=>{
    const {name} = req.body;

    users.push(name);
    
    return res.json(users)

});

server.put('/users/:index',checkUserExists,checkUserInArray, (req,res)=>{
    const {index}  = req.params;
    const {name} = req.body;

    users[index] = name;

    return res.json(users);

});


server.delete('/users/:index', checkUserInArray,(req,res)=>{

    const {index}  = req.params;
    users.splice(index,1);
    return res.send('Usuário Deletado');

});


server.listen(3000);


//Query params = ?teste=2
//Route params = /users/1 => declaração ccorreta  espera recepção de um id server.get('/user/:id'
//Request body = {"name": "Diego", "email": "ad@ad.com", }