const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require("bcryptjs");
const Admin = require("../models/Administrador");

module.exports = function (passport) {

  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'senha',
    passReqToCallback: true
  }, (req, email, senha, done) => {

    console.log("Verificando o administrador no banco de dados:", email);

    Admin.findOne({ where: { email: email } })
      .then((admin) => {

        if (!admin) {
          req.flash("erro_msg", "Essa conta não existe");
          return done(null, false, { mensagem: 'Essa conta não existe' });
        }

        bcrypt.compare(senha, admin.senha)
          .then((res) => {

            if (res) {
              return done(null, admin);
            } else {
              req.flash("erro_msg", "Senha incorreta!");
              return done(null, false, { mensagem: 'Senha incorreta' });
            }
          })
          .catch((err) => {
            console.error('Erro ao comparar as senhas:', err);
            return done(err);
          });
      })
      .catch((err) => {
        console.error('Erro ao buscar o administrador:', err);
        return done(err);
      });

  }));

  passport.serializeUser((admin, done) => {
    done(null, admin.id);
  });

  passport.deserializeUser(function (id, done) {
    Admin.findOne({ where: { id: id } }).then((admin) => {
      done(null, admin);
    }).catch((err) => {
      console.error('Erro ao buscar o administrador na sessão:', err);
      done(err, null);
    });
  });
};
