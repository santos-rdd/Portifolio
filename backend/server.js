import 'dotenv/config'
import { createServer } from "node:http";
import routes from './routes/mainRoutes.js'

const port = process.env.PORT;
const host = process.env.HOST;

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
            currentReq.handler(req, res);
        }

    } catch (err){
        throw err;
    }
});

server.listen(port, host, ()=>{
    console.log('Servidor funcionante hehe')
})