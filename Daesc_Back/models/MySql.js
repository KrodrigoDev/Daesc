const Sequelize = require('sequelize')

// conexão com banco de dados MySql
// utilizar o workbench
const sequelize = new Sequelize('daesc', 'root', '', {
    host: "localhost",   // onde vamos rodar o servidor
    dialect: 'mysql',     // banco de dados utilizado
    query: { raw: true }  // indica que as querys serão retornadas em formato bruto (sem formatação)
})

// Exportando a instância do Sequelize e do objeto sequelize
module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}


