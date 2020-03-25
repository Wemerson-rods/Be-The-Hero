//importação dos módulos e arquivos
const express = require('express');
const cors = require('cors');
const routes = require('./routes');


//criando uma aplicação, responsável pelas rotas e demais funcionalidades
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);


app.listen(3333);
