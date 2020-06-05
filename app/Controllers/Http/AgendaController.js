'use strict'
const Tarea = use ('App/Models/Tarea');
const Agenda = use ('App/Models/Agenda');
const Proyecto = use('App/Models/Proyecto');
const AutorizacionService = use('App/Services/AutorizacionService');

class AgendaController {
    async index({ auth, params}){
        const user  = await auth.getUser();
        const {id} = params;
        const proyecto = await Proyecto.find(id);
        const tareas = await Tarea.find(id);
        AutorizacionService.verificarPermiso(proyecto, user);
        return await tareas.agenda().fetch(); 
    }
    async create({auth, request, params}){
        const user = await auth.getUser();
        const {descripcion} = request.all();
        const {id} = params;
        const proyecto = await Proyecto.find(id);
        const tareas = await Tarea.find(id);
        AutorizacionService.verificarPermiso(proyecto, user);
        const agenda = new Agenda();
        agenda.fill({
            descripcion
        });
        await tareas.agenda().save(agenda);
        return agenda;
    }

    async update({auth, params, request}){
        const user = await auth.getUser();
        const {id} = params;
        const agenda = await Agenda.find(id);
        const tarea = await agenda.tareas().fetch();
        const proyecto = await tarea.proyecto().fetch();
        AutorizacionService.verificarPermiso(proyecto, user);
        agenda.merge(request.only([
            'descripcion',
            'completada'
            ]))
        await agenda.save();
        return agenda;
    }

    async destroy({auth, params}){
        const user = await auth.getUser();
        const {id} = params;
        const agenda = await Agenda.find(id);
        const tarea = await agenda.tareas().fetch();
        const proyecto = await tarea.proyecto().fetch();
        AutorizacionService.verificarPermiso(proyecto, user);
        await agenda.delete();
        return agenda;
    }

}

module.exports = AgendaController
