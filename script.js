//!     Agenda de Tareas con Gráfico Interactivo version 1.0

// let chart;
// let taskData = {};

// function guardarLocalStorage() {
//   localStorage.setItem('agendaTareas', JSON.stringify(taskData));
// }

// function cargarLocalStorage() {
//   const data = localStorage.getItem('agendaTareas');
//   if (data) {
//     taskData = JSON.parse(data);
//     renderTodosLosDias();
//     actualizarGrafico();
//   }
// }

// function generarDias() {
//   const start = document.getElementById('startDate').value;
//   const end = document.getElementById('endDate').value;
//   if (!start || !end) {
//     Swal.fire('Error', 'Seleccioná las dos fechas primero.', 'warning');
//     return;
//   }

//   let current = new Date(start);
//   const endDate = new Date(end);

//   while (current <= endDate) {
//     const dayStr = current.toISOString().split('T')[0];
//     if (!taskData[dayStr]) taskData[dayStr] = [];
//     current.setDate(current.getDate() + 1);
//   }

//   guardarLocalStorage();
//   renderTodosLosDias();
//   actualizarGrafico();
// }

// function renderTodosLosDias() {
//   const container = document.getElementById('taskContainer');
//   container.innerHTML = '';

//   Object.keys(taskData).sort().forEach(dayStr => {
//     const dayName = new Date(dayStr).toLocaleDateString('es-ES', { weekday: 'long' });
//     const card = document.createElement('div');
//     card.className = 'dayCard';
//     card.innerHTML = `
//       <h3>${dayName} ${dayStr}</h3>
//       <div class="taskList" id="tasks-${dayStr}"></div>
//       <button id="btnagregar" onclick="agregarTarea('${dayStr}')">Agregar Tarea</button>
//     `;
//     container.appendChild(card);
//     renderTareas(dayStr);
//   });
// }

// function agregarTarea(fecha) {
//   Swal.fire({
//     title: 'Nueva tarea para ' + fecha,
//     input: 'text',
//     inputLabel: 'Tarea',
//     inputPlaceholder: 'Escribí tu tarea...',
//     showCancelButton: true,
//     confirmButtonText: 'Guardar',
//     cancelButtonText: 'Cancelar',
//     inputValidator: (value) => {
//       if (!value) return '¡Tenés que escribir algo!';
//     }
//   }).then(result => {
//     if (result.isConfirmed && result.value) {
//       taskData[fecha].push({ text: result.value, done: false });
//       guardarLocalStorage();
//       renderTareas(fecha);
//       actualizarGrafico();
//       Swal.fire('✅ Guardado', 'Tu tarea fue añadida', 'success');
//     }
//   });
// }

// function renderTareas(fecha) {
//   const contenedor = document.getElementById('tasks-' + fecha);
//   contenedor.innerHTML = '';
//   taskData[fecha].forEach((t, idx) => {
//     const div = document.createElement('div');
//     div.className = 'taskItem';
//     div.innerHTML = `
//       <input type="checkbox" ${t.done ? 'checked' : ''} onchange="toggleTarea('${fecha}', ${idx})"/>
//       <span>${t.text}</span>
//       <button id="btneditar" onclick="editarTarea('${fecha}', ${idx})">Editar</button>
//       <button id="btneliminar" onclick="eliminarTarea('${fecha}', ${idx})">Eliminar</button>
//     `;
//     contenedor.appendChild(div);
//   });
// }

// function toggleTarea(fecha, idx) {
//   taskData[fecha][idx].done = !taskData[fecha][idx].done;
//   guardarLocalStorage();
//   actualizarGrafico();
// }

// function actualizarGrafico() {
//   const allTasks = Object.values(taskData).flat();
//   const total = allTasks.length;
//   const completadas = allTasks.filter(t => t.done).length;

//   const ctx = document.getElementById('taskChart').getContext('2d');
//   if (chart) chart.destroy();
//   chart = new Chart(ctx, {
//     type: 'doughnut',
//     data: {
//       labels: ['Completadas', 'Pendientes'],
//       datasets: [{
//         data: [completadas, total - completadas],
//         backgroundColor: ['#2ecc71', '#e74c3c']
//       }]
//     },
//     options: {
//       plugins: { legend: { display: true } }
//     }
//   });

//   const resumen = document.getElementById('progressSummary');
//   resumen.innerHTML = `
//     <p><strong>Completadas:</strong> ${completadas} / ${total}</p>
//     <p><strong>Progreso:</strong> ${total ? ((completadas / total) * 100).toFixed(1) : 0}%</p>
//   `;
// }

// function reiniciarAgenda() {
//   Swal.fire({
//     title: '¿Estás seguro?',
//     text: '¡Esto borrará toda tu agenda!',
//     icon: 'warning',
//     showCancelButton: true,
//     confirmButtonColor: '#d33',
//     cancelButtonColor: '#3085d6',
//     confirmButtonText: 'Sí, borrar',
//     cancelButtonText: 'Cancelar'
//   }).then((result) => {
//     if (result.isConfirmed) {
//       taskData = {};
//       localStorage.removeItem('agendaTareas');
//       document.getElementById('taskContainer').innerHTML = '';
//       cerrarResumen();
//       actualizarGrafico();
//       Swal.fire('🧹 Borrado', 'Tu agenda fue reiniciada.', 'success');
//     }
//   });
// }

// function mostrarResumen() {
//   document.getElementById('resumenModal').style.display = 'block';
//   actualizarGrafico();
// }

// function cerrarResumen() {
//   document.getElementById('resumenModal').style.display = 'none';
// }

// function editarTarea(fecha, idx) {
//   Swal.fire({
//     title: 'Editar tarea',
//     input: 'text',
//     inputValue: taskData[fecha][idx].text,
//     inputPlaceholder: 'Escribí la nueva tarea...',
//     showCancelButton: true,
//     confirmButtonText: 'Guardar',
//     cancelButtonText: 'Cancelar',
//     inputValidator: (value) => {
//       if (!value) return '¡Tenés que escribir algo!';
//     }
//   }).then(result => {
//     if (result.isConfirmed && result.value) {
//       taskData[fecha][idx].text = result.value;
//       guardarLocalStorage();
//       renderTareas(fecha);
//       actualizarGrafico();
//       Swal.fire('✅ Guardado', 'Tu tarea fue actualizada', 'success');
//     }
//   });
// }

// function eliminarTarea(fecha, idx) {
//   Swal.fire({
//     title: '¿Estás seguro?',
//     text: '¡Esto eliminará la tarea!',
//     icon: 'warning',
//     showCancelButton: true,
//     confirmButtonColor: '#d33',
//     cancelButtonColor: '#3085d6',
//     confirmButtonText: 'Sí, eliminar',
//     cancelButtonText: 'Cancelar'
//   }).then((result) => {
//     if (result.isConfirmed) {
//       taskData[fecha].splice(idx, 1);
//       guardarLocalStorage();
//       renderTareas(fecha);
//       actualizarGrafico();
//       Swal.fire('🗑️ Eliminado', 'Tu tarea fue eliminada.', 'success');
//     }
//   });
// }

// window.onload = cargarLocalStorage();

//!    version 2.0
let chart; // Variable global para la instancia del gráfico Chart.js
let taskData = {}; // Objeto para almacenar todas las tareas por fecha

/**
 * Guarda el objeto taskData en el almacenamiento local del navegador.
 */
function guardarLocalStorage() {
    localStorage.setItem('agendaTareas', JSON.stringify(taskData));
}

/**
 * Carga el objeto taskData desde el almacenamiento local al iniciar la aplicación.
 * Si hay datos, renderiza todos los días y actualiza el gráfico.
 */
function cargarLocalStorage() {
    const data = localStorage.getItem('agendaTareas');
    if (data) {
        taskData = JSON.parse(data);
        renderTodosLosDias(); // Renderiza las tarjetas de día y las tareas
        actualizarGrafico(); // Actualiza el gráfico con los datos cargados
    }
}

/**
 * Genera un rango de días entre una fecha de inicio y una fecha de fin seleccionadas
 * y los añade a taskData si no existen.
 */
function generarDias() {
    const start = document.getElementById('startDate').value;
    const end = document.getElementById('endDate').value;

    if (!start || !end) {
        // Usa SweetAlert2 para mostrar una alerta de error
        Swal.fire('Error', 'Seleccioná las dos fechas primero.', 'warning');
        return;
    }

    let current = new Date(start);
    const endDate = new Date(end);

    // Asegura que la fecha de inicio no sea posterior a la fecha de fin
    if (current > endDate) {
        Swal.fire('Error', 'La fecha de inicio no puede ser posterior a la fecha de fin.', 'warning');
        return;
    }

    // Itera desde la fecha de inicio hasta la fecha de fin
    while (current <= endDate) {
        const dayStr = current.toISOString().split('T')[0]; // Formato 'YYYY-MM-DD'
        if (!taskData[dayStr]) { // Si el día no existe, lo inicializa con un array vacío
            taskData[dayStr] = [];
        }
        current.setDate(current.getDate() + 1); // Avanza al siguiente día
    }

    guardarLocalStorage(); // Guarda los cambios en localStorage
    renderTodosLosDias(); // Vuelve a renderizar la interfaz para mostrar los nuevos días
    actualizarGrafico(); // Actualiza el gráfico de progreso
}

/**
 * Renderiza todas las tarjetas de día en el contenedor principal.
 * Se ordena por fecha para asegurar la visualización cronológica.
 */
function renderTodosLosDias() {
    const container = document.getElementById('taskContainer');
    container.innerHTML = ''; // Limpia el contenedor antes de renderizar

    Object.keys(taskData).sort().forEach(dayStr => { // Itera sobre las fechas ordenadas
        // Formatea la fecha para mostrar el día de la semana (ej. "lunes")
        const dayName = new Date(dayStr).toLocaleDateString('es-ES', { weekday: 'long' });
        const card = document.createElement('div');
        card.className = 'dayCard'; // Aplica la clase CSS dayCard
        card.innerHTML = `
            <h3>${dayName} ${dayStr}</h3>
            <div class="taskList" id="tasks-${dayStr}"></div>
            <button id="btnagregar" onclick="agregarTarea('${dayStr}')">Agregar Tarea</button>
        `;
        container.appendChild(card); // Añade la tarjeta al contenedor principal
        renderTareas(dayStr); // Llama a renderTareas para poblar las tareas de ese día
    });
}

/**
 * Abre un SweetAlert2 para añadir una nueva tarea a una fecha específica.
 * @param {string} fecha - La fecha en formato 'YYYY-MM-DD' a la que se añadirá la tarea.
 */
function agregarTarea(fecha) {
    Swal.fire({
        title: 'Nueva tarea para ' + fecha,
        input: 'text',
        inputLabel: 'Tarea',
        inputPlaceholder: 'Escribí tu tarea...',
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
        inputValidator: (value) => {
            if (!value) return '¡Tenés que escribir algo!'; // Valida que el campo no esté vacío
        }
    }).then(result => {
        if (result.isConfirmed && result.value) { // Si el usuario confirmó y hay un valor
            taskData[fecha].push({ text: result.value, done: false }); // Añade la tarea
            guardarLocalStorage(); // Guarda los cambios
            renderTareas(fecha); // Vuelve a renderizar las tareas de ese día
            actualizarGrafico(); // Actualiza el gráfico
            Swal.fire('✅ Guardado', 'Tu tarea fue añadida', 'success');
        }
    });
}

/**
 * Renderiza la lista de tareas para una fecha específica dentro de su contenedor.
 * Incluye el checkbox, texto, y botones de editar/eliminar.
 * @param {string} fecha - La fecha en formato 'YYYY-MM-DD' cuyas tareas se van a renderizar.
 */
function renderTareas(fecha) {
    const contenedor = document.getElementById('tasks-' + fecha);
    contenedor.innerHTML = ''; // Limpia el contenido actual del contenedor
    taskData[fecha].forEach((t, idx) => { // Itera sobre las tareas de la fecha
        const div = document.createElement('div');
        div.className = 'taskItem'; // Aplica la clase CSS taskItem
        div.innerHTML = `
            <input type="checkbox" ${t.done ? 'checked' : ''} onchange="toggleTarea('${fecha}', ${idx})"/>
            <span>${t.text}</span>
            <div class="task-buttons"> 
                <button id="btneditar" onclick="editarTarea('${fecha}', ${idx})">Editar</button>
                <button id="btneliminar" onclick="eliminarTarea('${fecha}', ${idx})">Eliminar</button>
            </div>
        `;
        contenedor.appendChild(div); // Añade el div de la tarea al contenedor del día
    });
}

/**
 * Cambia el estado 'done' (completado/pendiente) de una tarea.
 * @param {string} fecha - La fecha de la tarea.
 * @param {number} idx - El índice de la tarea en el array.
 */
function toggleTarea(fecha, idx) {
    taskData[fecha][idx].done = !taskData[fecha][idx].done; // Invierte el estado
    guardarLocalStorage(); // Guarda el cambio
    actualizarGrafico(); // Actualiza el gráfico
}

/**
 * Actualiza el gráfico de progreso y el resumen de tareas.
 */
function actualizarGrafico() {
    // Convierte el objeto taskData en un array plano de todas las tareas
    const allTasks = Object.values(taskData).flat();
    const total = allTasks.length;
    const completadas = allTasks.filter(t => t.done).length; // Filtra tareas completadas

    const ctx = document.getElementById('taskChart').getContext('2d');
    if (chart) {
        chart.destroy(); // Destruye la instancia anterior del gráfico si existe
    }
    // Crea un nuevo gráfico de tipo donut
    chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Completadas', 'Pendientes'],
            datasets: [{
                data: [completadas, total - completadas],
                backgroundColor: ['#2ecc71', '#e74c3c'] // Colores para completadas y pendientes
            }]
        },
        options: {
            // No cambiamos nada aquí para evitar problemas con el modal/gráfico
            plugins: { legend: { display: true } }
        }
    });

    const resumen = document.getElementById('progressSummary');
    // Muestra el resumen textual del progreso
    resumen.innerHTML = `
        <p><strong>Completadas:</strong> ${completadas} / ${total}</p>
        <p><strong>Progreso:</strong> ${total ? ((completadas / total) * 100).toFixed(1) : 0}%</p>
    `;
}

/**
 * Reinicia completamente la agenda, borrando todos los datos.
 * Solicita confirmación al usuario antes de proceder.
 */
function reiniciarAgenda() {
    Swal.fire({
        title: '¿Estás seguro?',
        text: '¡Esto borrará toda tu agenda y no se podrá deshacer!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, borrar todo',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            taskData = {}; // Vacía el objeto de tareas
            localStorage.removeItem('agendaTareas'); // Elimina los datos de localStorage
            document.getElementById('taskContainer').innerHTML = ''; // Limpia la interfaz
            cerrarResumen(); // Cierra el modal de resumen si está abierto
            actualizarGrafico(); // Reinicia el gráfico
            Swal.fire('🧹 Borrado', 'Tu agenda fue reiniciada.', 'success');
        }
    });
}

/**
 * Muestra el modal de resumen.
 */
function mostrarResumen() {
    document.getElementById('resumenModal').style.display = 'block';
    actualizarGrafico(); // Asegura que el gráfico esté actualizado al abrir el modal
}

/**
 * Cierra el modal de resumen.
 */
function cerrarResumen() {
    document.getElementById('resumenModal').style.display = 'none';
}

/**
 * Permite al usuario editar el texto de una tarea existente.
 * @param {string} fecha - La fecha de la tarea a editar.
 * @param {number} idx - El índice de la tarea en el array.
 */
function editarTarea(fecha, idx) {
    Swal.fire({
        title: 'Editar tarea',
        input: 'text',
        inputValue: taskData[fecha][idx].text, // Precarga el texto actual de la tarea
        inputPlaceholder: 'Escribí la nueva tarea...',
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
        inputValidator: (value) => {
            if (!value) return '¡Tenés que escribir algo!';
        }
    }).then(result => {
        if (result.isConfirmed && result.value) {
            taskData[fecha][idx].text = result.value; // Actualiza el texto de la tarea
            guardarLocalStorage();
            renderTareas(fecha); // Vuelve a renderizar para mostrar el cambio
            actualizarGrafico();
            Swal.fire('✅ Guardado', 'Tu tarea fue actualizada', 'success');
        }
    });
}

/**
 * Elimina una tarea específica de la agenda.
 * @param {string} fecha - La fecha de la tarea a eliminar.
 * @param {number} idx - El índice de la tarea en el array.
 */
function eliminarTarea(fecha, idx) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: '¡Esto eliminará la tarea seleccionada!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            taskData[fecha].splice(idx, 1); // Elimina la tarea del array
            guardarLocalStorage();
            renderTareas(fecha); // Vuelve a renderizar
            actualizarGrafico();
            Swal.fire('🗑️ Eliminado', 'Tu tarea fue eliminada.', 'success');
        }
    });
}

// Carga los datos guardados al cargar la página
window.onload = cargarLocalStorage;