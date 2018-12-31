import express from 'express';
import http from 'http';
import bbcore_register from 'babel-core/register';
import bbpoly from 'babel-polyfill';

import api from './parse_server';


let app =express();
app.use(process.env.mountPath, api);

let ParseHttpServer = http.createServer(app);
 ParseHttpServer.listen(process.env.port, ()=> {
     
     console.log('Server is  running at %s.', process.env.port);
 });
