import 'dotenv/config'
import { createServer } from "node:http";
import routes from './routes/mainRoutes.js'

const port = process.env.PORT || 3000;

const server = createServer((req, res)=>{
    res.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*' 
    });

    try{
        const currentReq = routes.find(c =>{
            return c.method === req.method &&
            c.url === req.url
        });

        if(currentReq){
            res.statusCode = 200;
            currentReq.handler(req, res);
        }   

        res.statusCode = 400;
        res.end(JSON.stringify({ err: 'Erro na requisição' }))

    } catch (err){
        throw err;
    }
});

server.listen(port, ()=>{
    console.log('Servidor funcionante hehe')
})