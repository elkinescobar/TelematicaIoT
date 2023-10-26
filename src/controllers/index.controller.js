const indexCtrl = {};


indexCtrl.renderIndex = (req, res) => {
  res.render('index');
};

indexCtrl.renderAbout = (req, res) => {
  res.render('about');
};
indexCtrl.renderregistrar = (req, res) => {
  res.render('registrar');
};
indexCtrl.renderlistado = (req, res) => {
  res.render('listado');
};
indexCtrl.renderEditarSensor = (req, res) => {
  res.render('editarSensor');
};

module.exports = indexCtrl;