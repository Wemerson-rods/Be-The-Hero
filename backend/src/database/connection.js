const knex = require('knex'); //importando o knex
const configuration = require('../../knexfile'); //inportando as configurações do BD "knexfile.js"

const config = process.env.NODE_ENV == 'test' ? configuration.test : configuration.development; //setando variável de ambiente

const connection = knex(config); //criando uma conexão com o módulo development do knexfile.js

module.exports = connection; //exportando a conexão com o BD