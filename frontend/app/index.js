import express from 'express';
import http from 'http'
import dotenv from 'dotenv';
import vengine from './core/vengine';
import route from './route';

dotenv.config();
let config=process.env;
const app=express();
app.use((req, res, next)=> {
    res.locals.serverURL=process.env.serverURL;
    res.locals.appKey=process.env.appKey;
    
    next();
});
let _vengine=new vengine(app,'html');
app.use('/public',express.static('views/public'));
route(app);


const ParseHttpServer = http.createServer(app);
 ParseHttpServer.listen(config.appPort, ()=> {
     console.log('app is  running on port %s.', config.appPort);
 });
