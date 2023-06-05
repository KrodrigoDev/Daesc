const express = require('express')
const router = express.Router()
require('../models/Reclamacao')
require('../models/Servico')
require('../routes/user')
require('../models/MySql')
const Reclamacao = require("../models/Reclamacao")
const Servico = require("../models/Servico")
const Admin = require("../models/Administrador")
const bcrypt = require("bcryptjs")


//rotas do adminitrador 


// rota principal
router.get('/', (req, res) => {
  res.render("./admin/index")
  
})

// rota com todas as reclamações 
router.get('/situacaoReclamacao', (req, res) => {
  Reclamacao.findAll({ order: [['id', 'DESC']] })
    .then((reclamacoes) => {
      res.json(reclamacoes);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Houve um erro ao listar as reclamações' });
    });
});


// rota com todas as simulações
router.get('/situacaoSimulacao', (req, res) => {
  Servico.findAll({ order: [['id', 'desc']] }).then((servicos) => {
    res.json(servicos);
  }).catch((err) => {
    console.error(err);
    req.flash("erro_msg ", "Houve um erro ao criar uma simulação")
  })

})

// rota para criar um novo administrador
router.get('/criar', (req, res) => {
  res.render("./admin/criar")
})


// Rota post para apagar uma simulação
router.post('/situacaoSimulacao/deletar', (req, res) => {
  Servico.destroy({ where: { 'id': req.body.id } }).then(() => {
    req.flash("sucesso_msg", "Simulação deletada com sucesso !")
    res.redirect('/admin/situacaoSimulacao')
  }).catch((err) => {
    req.flash("erro_msg", "Houve um erro ao deletar a simulação" + err)
  })
})

//Rota post para apagar uma reclamação
router.post('/situacaoReclamacao/deletar', (req, res) => {
  Reclamacao.destroy({ where: { 'id': req.body.id } }).then(() => {
    req.flash("sucesso_msg", "Reclamação deletada com sucesso !")
    res.redirect('/admin/situacaoReclamacao')
  }).catch((err) => {
    req.flash("erro_msg", "Houve um erro ao deletar a simulação" + err)
  })
})

// rota post para validar a criação do administrador
router.post('/criar/novo', (req, res) => {
  var erros_admin = []

  if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
    erros_admin.push({ texto: " Nome inválido" })
  }

  if (!req.body.sobrenome || typeof req.body.sobrenome == undefined || req.body.sobrenome == null) {
    erros_admin.push({ texto: " Sobrenome inválido" })
  }

  if (!req.body.email || typeof req.body.email == undefined || req.body.email == null) {
    erros_admin.push({ texto: " E-mail inválido" })
  }

  if (!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null) {
    erros_admin.push({ texto: " Senha inválida" })
  }

  if (req.body.senha.length < 4) {
    erros_admin.push({ texto: " Senha muito curta" })
  }

  if (req.body.senha != req.body.senha2) {
    erros_admin.push({ texto: " As senhas são diferente, verifique os campos e tente novamente" })
  }

  if (erros_admin.length > 0) {
    res.render("./admin/criar", { erros_admin: erros_admin })

  } else {

    Admin.findAll({ where: { email: req.body.email } }).then((admin) => {

      if (admin.length > 0) {
        req.flash("erro_msg", "Já existe uma conta com este e-mail no nosso sistema")
        res.redirect("/admin/criar")

      } else {
        var hash = bcrypt.hashSync(req.body.senha, bcrypt.genSaltSync(12));
        const novoAdmin = {
          nome: req.body.nome,
          sobrenome: req.body.sobrenome,
          email: req.body.email,
          senha: hash
        };

        Admin.create(novoAdmin)
          .then(() => {
            req.flash('sucesso_msg', 'Usuario cadastrado com sucesso!')
            res.redirect('/admin')
          })
          .catch((err) => {
            console.log(err); // imprime o erro no console para debugar
            req.flash('erro_msg', 'Erro ao cadastrar o usuario')
            res.redirect("/admin")
          })
      }
    })



  }
})


module.exports = router