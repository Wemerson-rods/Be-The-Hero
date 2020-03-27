const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach( async () => {
        await connection.migrate.rollback(); //limpar o banco de dados
        await connection.migrate.latest();  //executar as migrações
    });

    afterAll(async () => {
        await connection.destroy(); // encerrar a conexão com o banco de dados
    });

    it('should be able to create a new ONG', async () => {
        const response = await request(app)
        .post('/ongs')
        .send({
            name: "APAD2",
            email: "contaot@gmail.com",
            whatsapp: "3434340034",
            city: "São Paulo",
            uf: "SP"
        });
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});