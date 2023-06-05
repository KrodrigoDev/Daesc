require('./admin')
require('../models/Servico')
require('../models/Reclamacao')
require('../models/Administrador')
require('../models/MySql')

const Servico = require('../models/Servico')
const Reclamacao = require('../models/Reclamacao')
const Administrador = require('../models/Administrador')
const passport = require("passport")
const express = require('express')
const router = express.Router()


//rotas do usuário

//rota principal
router.get('/', (req, res) => {
    res.render("./user/principal")
})

// rota de simulação
router.get('/servico', (req, res) => {
    res.render("./user/servico")
})

// rota para abrir uma reclamação (ficou sem água)
router.get('/reclamacoes', (req, res) => {
    res.render("./user/reclamacoes")
})

// rota para acessar sessão administrativa
router.get('/restrito', (req, res) => {
    res.render("./user/admin")
})

// lista de serviços 
router.get('/lista', (req, res) => {
    res.render("./user/listaservicos")
})

// rota com as informações da empresa
router.get('/empresa', (req, res) => {
    res.render('./user/empresa')
})



// rotas POST que vão receber os meus arquivos

// POST de serviços
router.post('/servico/novo', (req, res) => {

    // validação dos formulários
    var erros_servico = []

    if (!req.body.boleto || typeof req.body.boleto == undefined || req.body.boleto == null || req.body.boleto == 0) {
        erros_servico.push({ texto: " O Valor do boleto é insuficiente" })
    }

    if (!req.body.entrada || typeof req.body.entrada == undefined || req.body.entrada == null || req.body.entrada == 0) {
        erros_servico.push({ texto: " A Quantia da entrada é insuficiente" })
    }

    if (!req.body.parcela || typeof req.body.parcela == undefined || req.body.parcela == null || req.body.parcela == 0) {
        erros_servico.push({ texto: " O Número de parcelas é insuficiente" })
    }

    if (erros_servico.length > 0) {
        res.render("./user/servico", { erros_servico: erros_servico })

    } else {
        // Adicionar uma nova simulação 
        const novaSimulacao = {
            boleto: req.body.boleto,
            entrada: req.body.entrada,
            parcela: req.body.parcela,
            data: req.body.data
        }
        new Servico(novaSimulacao).save().then(() => {
            req.flash("sucesso_msg", "Simulação criada com sucesso !!")
            res.redirect("/user")
        }).catch((err) => {
            req.flash("erro_msg", "Houve um erro ao criar uma simulação, tente novamente mais tarde !")
            res.redirect("/user")
        })
    }
})


// POST de reclamações 
router.post('/situacao/nova', (req, res) => {
    // Validação da reclamação
    var erros_reclamacao = []

    if (!req.body.rua || typeof req.body.rua == undefined || req.body.rua == null || req.body.rua.length < 2) {
        erros_reclamacao.push({ texto: " O nome da rua é inválido" })
    }

    if (!req.body.bairro || typeof req.body.bairro == undefined || req.body.bairro == null || req.body.bairro.length < 2) {
        erros_reclamacao.push({ texto: " O nome do bairro é inválido" })
    }

    if (!req.body.descricao || typeof req.body.descricao == undefined || req.body.descricao == null || req.body.descricao.length < 5) {
        erros_reclamacao.push({ texto: " A descrição está muito pequena, por favor forneça mais detalhes" })
    }



    if (erros_reclamacao.length > 0) {
        res.render("./user/reclamacoes", { erros_reclamacao: erros_reclamacao })

    } else {
        // adicionando uma nova reclamação
        const novaReclamacao = {
            rua: req.body.rua,
            bairro: req.body.bairro,
            descricao: req.body.descricao
        }
        new Reclamacao(novaReclamacao).save().then(() => {
            req.flash("sucesso_msg", "Reclamação criada com sucesso !!")
            res.redirect("/user")
        }).catch((err) => {
            req.flash("erro_msg", "Houve um erro ao criar uma reclamação, tente novamente mais tarde !")
            res.redirect("/user")
        })

    }
})

// Rota post para fazer login da área restrita



router.post('/login', passport.authenticate('local', {
    successRedirect: '/admin',
    failureRedirect: '/user/restrito',
    failureFlash: true,
    badRequestMessage: 'Informe o e-mail e senha'
  }));
  

router.get('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) { return next(err) }
        req.flash("sucesso_msg", "Deslogado com sucesso!!")
        res.redirect('/')
    })
})



module.exports = router