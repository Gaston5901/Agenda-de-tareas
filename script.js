let chart;
let taskData = {};

function guardarLocalStorage() {
  localStorage.setItem('agendaTareas', JSON.stringify(taskData));
}

function cargarLocalStorage() {
  const data = localStorage.getItem('agendaTareas');
  if (data) {
    taskData = JSON.parse(data);
    renderTodosLosDias();
    actualizarGrafico();
  }
}

function generarDias() {
  const start = document.getElementById('startDate').value;
  const end = document.getElementById('endDate').value;
  if (!start || !end) {
    Swal.fire('Error', 'Seleccioná las dos fechas primero.', 'warning');
    return;
  }

  let current = new Date(start);
  const endDate = new Date(end);

  while (current <= endDate) {
    const dayStr = current.toISOString().split('T')[0];
    if (!taskData[dayStr]) taskData[dayStr] = [];
    current.setDate(current.getDate() + 1);
  }

  guardarLocalStorage();
  renderTodosLosDias();
  actualizarGrafico();
}

function renderTodosLosDias() {
  const container = document.getElementById('taskContainer');
  container.innerHTML = '';

  Object.keys(taskData).sort().forEach(dayStr => {
    const dayName = new Date(dayStr).toLocaleDateString('es-ES', { weekday: 'long' });
    const card = document.createElement('div');
    card.className = 'dayCard';
    card.innerHTML = `
      <h3>${dayName} ${dayStr}</h3>
      <div class="taskList" id="tasks-${dayStr}"></div>
      <button onclick="agregarTarea('${dayStr}')">Agregar Tarea</button>
    `;
    container.appendChild(card);
    renderTareas(dayStr);
  });
}

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
      if (!value) return '¡Tenés que escribir algo!';
    }
  }).then(result => {
    if (result.isConfirmed && result.value) {
      taskData[fecha].push({ text: result.value, done: false });
      guardarLocalStorage();
      renderTareas(fecha);
      actualizarGrafico();
      Swal.fire('✅ Guardado', 'Tu tarea fue añadida', 'success');
    }
  });
}

function renderTareas(fecha) {
  const contenedor = document.getElementById('tasks-' + fecha);
  contenedor.innerHTML = '';
  taskData[fecha].forEach((t, idx) => {
    const div = document.createElement('div');
    div.className = 'taskItem';
    div.innerHTML = `
      <input type="checkbox" ${t.done ? 'checked' : ''} onchange="toggleTarea('${fecha}', ${idx})"/>
      <span>${t.text}</span>
    `;
    contenedor.appendChild(div);
  });
}

function toggleTarea(fecha, idx) {
  taskData[fecha][idx].done = !taskData[fecha][idx].done;
  guardarLocalStorage();
  actualizarGrafico();
}

function actualizarGrafico() {
  const allTasks = Object.values(taskData).flat();
  const total = allTasks.length;
  const completadas = allTasks.filter(t => t.done).length;

  const ctx = document.getElementById('taskChart').getContext('2d');
  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Completadas', 'Pendientes'],
      datasets: [{
        data: [completadas, total - completadas],
        backgroundColor: ['#2ecc71', '#e74c3c']
      }]
    },
    options: {
      plugins: { legend: { display: true } }
    }
  });

  const resumen = document.getElementById('progressSummary');
  resumen.innerHTML = `
    <p><strong>Completadas:</strong> ${completadas} / ${total}</p>
    <p><strong>Progreso:</strong> ${total ? ((completadas / total) * 100).toFixed(1) : 0}%</p>
  `;
}

function reiniciarAgenda() {
  Swal.fire({
    title: '¿Estás seguro?',
    text: '¡Esto borrará toda tu agenda!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sí, borrar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      taskData = {};
      localStorage.removeItem('agendaTareas');
      document.getElementById('taskContainer').innerHTML = '';
      cerrarResumen();
      actualizarGrafico();
      Swal.fire('🧹 Borrado', 'Tu agenda fue reiniciada.', 'success');
    }
  });
}

function mostrarResumen() {
  document.getElementById('resumenModal').style.display = 'block';
  actualizarGrafico();
}

function cerrarResumen() {
  document.getElementById('resumenModal').style.display = 'none';
}

window.onload = cargarLocalStorage();