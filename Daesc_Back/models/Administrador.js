const MySql = require("./MySql")

//definição do model usuário
const Administrador = MySql.sequelize.define('administrador', {

    nome: {
        type: MySql.Sequelize.STRING(30)
    },

    sobrenome: {
        type: MySql.Sequelize.STRING(30)
    },

    email: {
        type: MySql.Sequelize.STRING(50),
        unique: true
    },
    eAdmin: {
        type: MySql.Sequelize.INTEGER,
        default: 0   // 0 vai ser um usuário e 1 vai ser um administrador
    },

    senha: {
        type: MySql.Sequelize.STRING(225)
    }
    
}, { freezeTableName: true });


module.exports = Administrador;

//Administrador.sync({Force: true}) 