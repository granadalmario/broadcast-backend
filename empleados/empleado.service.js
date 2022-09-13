const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Empleado = db.Empleado;
const User = db.User;

module.exports = {
    authenticate,
    getAll,
    getById,
    getByCiudad,
    getByNacionalidad,
    create,
    update,
    delete: _delete
};

async function authenticate({ username, password }) {
    const empleado = await Empleado.findOne({ username });
    if (empleado && bcrypt.compareSync(password, empleado.hash)) {
        const token = jwt.sign({ sub: empleado.id }, config.secret, { expiresIn: '7d' });
        return {
            ...user.toJSON(),
            token
        };
    }
}

async function getAll() {
    return await Empleado.find();
}

async function getByCiudad(ciudad) {
    return await Empleado.find({ciudad: ciudad});
}

//Importante poner que machee por arriba o abajo
async function getByName(name) {
    return await Empleado.find({firstName: name});
}

async function getByNacionalidad(nacionalidad) {
    return await Empleado.find({nacionalidad: nacionalidad});
}

async function getById(id) {
    return await Empleado.findById(id);
}

async function create(empParam) {
    // validate
    if (await Empleado.findOne({ username: empParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken by employee';
    }
    if (await User.findOne({ username: empParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken by admin';
    }

    const emp = new Empleado(empParam);
    // hash password
    if (empParam.password) {
        emp.hash = bcrypt.hashSync(empParam.password, 10);
    }

    // save user
    await emp.save();
}

async function update(id, empParam) {
    const emp = await Empleado.findById(id);

    // validate
    if (!emp) throw 'User not found';
    if (emp.username !== empParam.username && await User.findOne({ username: empParam.username })) {
        throw 'Username "' + empParam.username + '" is already taken by an admin';
    }
    //Validate emp
    if (emp.username !== empParam.username && await Empleado.findOne({ username: empParam.username })) {
        throw 'Username "' + empParam.username + '" is already taken by a employee';
    }

    // hash password if it was entered
    if (empParam.password) {
        empParam.hash = bcrypt.hashSync(empParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(emp, empParam);

    await emp.save();
}

async function _delete(id) {
    await Empleado.findByIdAndRemove(id);
}