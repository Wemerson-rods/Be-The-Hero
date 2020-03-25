const knex = require('knex'); //importando o knex
const configuration = require('../../knexfile'); //inportando as configurações do BD "knexfile.js"

const connection = knex(configuration.development); //criando uma conexão com o módulo development do knexfile.js

module.exports = connection; //exportando a conexão com o BD