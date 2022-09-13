const express = require('express');
const router = express.Router();
const empleadoService = require('./empleado.service');

// routes
//router.post('/authenticate', authenticate);
router.post('/register', registerEmpleado);
router.get('/', getAllEmpleados);
router.get('/current', getCurrentEmpleado);
router.get('/:id', getById);
router.get('/ciudad/:ciudad', getByCiudad);
router.get('/nacionalidad/:nacionalidad', getByNacionalidad);
router.get('/name/:name', getByName);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(empleado => empleado ? res.json(empleado) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function registerEmpleado(req, res, next) {
    empleadoService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAllEmpleados(req, res, next) {
    empleadoService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getByCiudad(req, res, next) {
    empleadoService.getByCiudad(req.empleado.sub)
        .then(users => res.json(req.empleado.ciudad))
        .catch(err => next(err));
}

function getByName(req, res, next) {
    empleadoService.getByName(req.empleado.sub)
        .then(users => res.json(req.empleado.name))
        .catch(err => next(err));
}

function getByNacionalidad(req, res, next) {
    empleadoService.getByNacionalidad(req.empleado.nacionalidad)
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getCurrentEmpleado(req, res, next) {
    empleadoService.getBy(req.empleado.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    empleadoService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    empleadoService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    empleadoService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}