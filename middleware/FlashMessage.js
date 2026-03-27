const flashMessage = (req, res, next) => {
  res.locals.mensaje = req.session.mensaje || null;
  delete req.session.mensaje; // lo borra después de mostrarlo
  next();
};

export default flashMessage;

