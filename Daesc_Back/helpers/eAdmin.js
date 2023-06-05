module.exports = {
  eAdmin: function (req, res, next) {
    if (req.isAuthenticated() && req.user.eAdmin == 1) { // verifica se o usuário está autenticado e é um admin
      return next(); // passa para o próximo middleware ou rota
    }
    req.flash("erro_msg", "Você deve ser um admin para entrar aqui"); // exibe uma mensagem de erro usando o pacote connect-flash
    res.redirect("/user/restrito"); // redireciona o usuário para uma página restrita
  } 
};