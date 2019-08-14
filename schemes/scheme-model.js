const db = require('../data/db-config')

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove,
}

function find() {
    return db('schemes')
}

function findById(id) {
    return db('schemes')
        .where({ id })
}

function findSteps(id) {
    return db('steps as st')
        .innerJoin('schemes as sc', 'st.scheme_id', '=', 'sc.id')
        .select('sc.id', 'sc.scheme_name', 'st.step_number', 'st.instructions')
        .where({ scheme_id: id })
}

function add(schemeData) {
    return db('schemes')
        .insert(schemeData)
}

function update(id, changes) {
    return db('schemes')
        .where({ id })
        .update(changes)
}

function remove(id) {
    return db('schemes')
        .where({ id })
        .del()
}
