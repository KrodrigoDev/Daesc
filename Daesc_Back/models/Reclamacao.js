const MySql = require("./MySql")

const Reclamacao = MySql.sequelize.define('reclamacao', {

    rua: {
        type: MySql.Sequelize.STRING(60)
    },
    bairro: {
        type: MySql.Sequelize.STRING(60)
    },
    descricao: {
        type: MySql.Sequelize.STRING(150)
    }

} , { freezeTableName: true });

module.exports = Reclamacao;

//essa linha server para criar a nossa tabela

//Reclamacao.sync({force: true})  