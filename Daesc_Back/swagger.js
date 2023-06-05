const swagger_auto_gen = require("swagger-autogen")

const outputFile = "./swagger_documentos.json"
const endpointsFiles = ["./app.js"]


const doc = {
    info: {
        title: "Minhas rotas",
        descrição: "Documentação do projeto daesc",
    },
    host: "localhost:8083",
    schemes: ["http"],
}


swagger_auto_gen(outputFile, endpointsFiles, doc);



