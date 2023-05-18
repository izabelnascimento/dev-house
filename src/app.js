//a dependencia sucrade deixou isso:
//const express = require('express');
//para isso:
import express from 'express';
import routes from './routes';
import mongoose from 'mongoose';
import path from 'path';
import cors from 'cors';

class App{

    constructor(){
        this.server = express();

        mongoose.connect('mongodb+srv://admin:admin@devhouse.ry0g6sp.mongodb.net/?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.server.use(
            '/files',
            express.static(path.resolve(__dirname, '..', 'uploads'))
        );
        this.server.use(express.json());
        //liberando qualquer pessoa usar essa api
        this.server.use(cors());
    }

    routes(){
        this.server.use(routes);
    }

}

export default new App().server;