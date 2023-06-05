const MySql = require("./MySql")

const Servico = MySql.sequelize.define('servico', {

    boleto: {
        type: MySql.Sequelize.INTEGER
    },
    entrada: {
        type: MySql.Sequelize.INTEGER
    },
    parcela: {
        type: MySql.Sequelize.INTEGER
    }

}  , { freezeTableName: true });

module.exports = Servico;

//Servico.sync({force: true})