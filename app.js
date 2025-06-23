const tareaForm = document.getElementById('tareaForm'); 
const contenedorTareas = document.getElementById('contenedorTareas');

let tareas = [];

function validarFormulario(event) {
    event.preventDefault(); 

    const nombre = document.getElementById('nombreTarea').value.trim();
    const fechaEntrega = document.getElementById('fechaEntrega').value;
    const descripcion = document.getElementById('descripcionTarea').value.trim();
    const tipo = document.getElementById('tipoTarea').value;
    const prioridad = document.querySelector('input[name="prioridad"]:checked'); 

    if (!nombre) {
        alert('El nombre de la tarea es obligatorio.');
        return false;
    }
    if (nombre.length > 25) {
        alert('El nombre de la tarea no puede exceder los 25 caracteres.');
        return false;
    }
    if (!fechaEntrega) {
        alert('La fecha de entrega es obligatoria.');
        return false;
    }
    if (!tipo) {
        alert('Debe seleccionar un tipo de tarea.');
        return false;
    }
    if (!prioridad) {
        alert('Debe seleccionar una prioridad para la tarea.');
        return false;
    }

    const nuevaTarea = {
        id: Date.now(), 
        nombre: nombre,
        fechaEntrega: fechaEntrega,
        descripcion: descripcion,
        tipo: tipo,
        prioridad: prioridad.value 
    };

    tareas.push(nuevaTarea);
    renderizarTareas();
    tareaForm.reset(); 
    return true; 
}

function renderizarTareas() {
    contenedorTareas.innerHTML = ''; 

    if (tareas.length === 0) {
        contenedorTareas.innerHTML = '<p style="text-align: center; color: #777;">No hay tareas agregadas aún.</p>';
        return;
    }

    tareas.forEach(tarea => {
        const tareaCard = document.createElement('div');
        tareaCard.classList.add('tarea-card'); 
        tareaCard.innerHTML = `
            <h3>${tarea.nombre}</h3>
            <p><strong>Fecha de entrega:</strong> ${tarea.fechaEntrega}</p>
            <p><strong>Tipo:</strong> ${tarea.tipo.charAt(0).toUpperCase() + tarea.tipo.slice(1)}</p>
            <p class="prioridad"><strong>Prioridad:</strong> <span style="color: ${obtenerColorPrioridad(tarea.prioridad)};">${tarea.prioridad.charAt(0).toUpperCase() + tarea.prioridad.slice(1)}</span></p>
            ${tarea.descripcion ? `<p class="descripcion"><strong>Descripción:</strong> ${tarea.descripcion}</p>` : ''}
        `;
        contenedorTareas.appendChild(tareaCard);
    });
}
