'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Agenda extends Model {
    tareas(){
        return this.belongsTo('App/Models/Tarea')
    }
}

module.exports = Agenda
