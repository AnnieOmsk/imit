/**
 * Resolves locale and adds it to session
 */
module.exports =  function(req, res, next){
  req.session.locale = 'ru';
  next();
};
