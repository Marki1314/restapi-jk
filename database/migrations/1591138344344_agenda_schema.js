'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AgendaSchema extends Schema {
  up () {
    this.create('agenda', (table) => {
      table.increments()
      table.integer('tarea_id').unsigned().references('id').inTable('tareas')
      table.string('descripcion', 255).notNullable()
      table.boolean('completada').defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('agenda')
  }
}

module.exports = AgendaSchema
