//importação dos módulos e arquivos
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const { errors } = require('celebrate');


//criando uma aplicação, responsável pelas rotas e demais funcionalidades
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());
module.exports = app;