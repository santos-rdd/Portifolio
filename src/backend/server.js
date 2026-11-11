import 'dotenv/config'
import { createServer } from "node:http";
import routes from './routes/mainRoutes.js'

const port = process.env.PORT || 3000;

const server = createServer((req, res)=>{
    
    try{
        const currentReq = routes.find(c =>{
            return c.method === req.method &&
            c.url === req.url
        });
        
        if(currentReq){
            res.writeHead(200, {
                'Content-Type': 'application/json; charset=utf-8',
                'Access-Control-Allow-Origin': '*' 
            });
            return currentReq.handler(req, res);
        }   
        
        res.writeHead(400, {
            'Content-Type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin': '*' 
        });
        res.end(JSON.stringify({ err: 'Erro na requisição' }))

    } catch (err){
        throw err;
    }
});

server.listen(port, ()=>{
    console.log('Servidor funcionante hehe')
})