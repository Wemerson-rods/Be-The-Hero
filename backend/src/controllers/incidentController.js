const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        //controle da paginação, caso não seja indicado a página inicia da págia 1
        const { page = 1 } = request.query;

        const [count] = await connection('incidents').count();
        //console.log(count);

        //lista todos os casos de incidentes do BD, limitado de 5 elementos por paginas
        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);

        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },

    async create(request, response) { 
        const {title, description, value} = request.body;
        const ong_id = request.headers.authorization;

        //cria um incidente no BD
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        return response.json({ id })
    },
    
    //deleta um icidente apartir de um id
    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;
        
        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();
        if (incident.ong_id != ong_id) {
            return response.status(401).json({ error: 'Oeration not permitted.'});
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    }
};