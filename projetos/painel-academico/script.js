const STORAGE_KEY = "painel-academico-dados";
const emptyMessage = "Nenhum item cadastrado ainda. Adicione um novo registro para começar.";

const exampleData = {
  subjects: [
    {
      id: createId(),
      name: "Bootcamp I",
      focus: "Organização do portfólio acadêmico",
      status: "Em andamento"
    }
  ],
  tasks: [
    {
      id: createId(),
      name: "Finalizar portfólio acadêmico",
      deadline: "Semana atual",
      status: "Em andamento"
    }
  ],
  projects: [
    {
      id: createId(),
      name: "Painel Acadêmico",
      description: "Protótipo para organizar estudos, tarefas e projetos.",
      focus: "HTML, CSS e JavaScript",
      status: "Em andamento"
    }
  ]
};

let panelData = loadData();

const elements = {
  totalSubjects: document.querySelector("#totalSubjects"),
  totalTasks: document.querySelector("#totalTasks"),
  pendingTasks: document.querySelector("#pendingTasks"),
  activeProjects: document.querySelector("#activeProjects"),
  subjectsList: document.querySelector("#subjectsList"),
  tasksList: document.querySelector("#tasksList"),
  projectsList: document.querySelector("#projectsList"),
  subjectForm: document.querySelector("#subjectForm"),
  taskForm: document.querySelector("#taskForm"),
  projectForm: document.querySelector("#projectForm"),
  loadExamplesButton: document.querySelector("#loadExamplesButton"),
  clearPanelButton: document.querySelector("#clearPanelButton")
};

function loadData() {
  const savedData = localStorage.getItem(STORAGE_KEY);

  if (!savedData) {
    return {
      subjects: [],
      tasks: [],
      projects: []
    };
  }

  try {
    return JSON.parse(savedData);
  } catch {
    return {
      subjects: [],
      tasks: [],
      projects: []
    };
  }
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(panelData));
}

function createId() {
  if (crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return String(Date.now() + Math.random());
}

function escapeHtml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getStatusClass(status) {
  if (status === "Concluído") {
    return "status-done";
  }

  if (status === "Em andamento") {
    return "status-progress";
  }

  return "status-pending";
}

function createStatusSelect(type, id, currentStatus) {
  return `
    <select class="status-select" data-type="${type}" data-id="${id}" aria-label="Alterar status">
      <option value="Pendente" ${currentStatus === "Pendente" ? "selected" : ""}>Pendente</option>
      <option value="Em andamento" ${currentStatus === "Em andamento" ? "selected" : ""}>Em andamento</option>
      <option value="Concluído" ${currentStatus === "Concluído" ? "selected" : ""}>Concluído</option>
    </select>
  `;
}

function renderSummary() {
  elements.totalSubjects.textContent = panelData.subjects.length;
  elements.totalTasks.textContent = panelData.tasks.length;
  elements.pendingTasks.textContent = panelData.tasks.filter((task) => task.status === "Pendente").length;
  elements.activeProjects.textContent = panelData.projects.filter((project) => project.status === "Em andamento").length;
}

function renderSubjects() {
  if (panelData.subjects.length === 0) {
    elements.subjectsList.innerHTML = `<p class="empty-state">${emptyMessage}</p>`;
    return;
  }

  elements.subjectsList.innerHTML = panelData.subjects.map((subject) => `
    <article class="info-card">
      <div class="card-header">
        <h3>${escapeHtml(subject.name)}</h3>
        <span class="status ${getStatusClass(subject.status)}">${subject.status}</span>
      </div>
      <p class="label">Foco atual</p>
      <p>${escapeHtml(subject.focus)}</p>
      <div class="record-actions">
        ${createStatusSelect("subjects", subject.id, subject.status)}
        <button class="delete-button" type="button" data-type="subjects" data-id="${subject.id}">Excluir</button>
      </div>
    </article>
  `).join("");
}

function renderTasks() {
  if (panelData.tasks.length === 0) {
    elements.tasksList.innerHTML = `<p class="empty-state">${emptyMessage}</p>`;
    return;
  }

  const rows = panelData.tasks.map((task) => `
    <div class="task-row" role="row">
      <span role="cell">${escapeHtml(task.name)}</span>
      <span role="cell">${escapeHtml(task.deadline)}</span>
      <span role="cell"><span class="status ${getStatusClass(task.status)}">${task.status}</span></span>
      <span class="record-actions" role="cell">
        ${createStatusSelect("tasks", task.id, task.status)}
        <button class="delete-button" type="button" data-type="tasks" data-id="${task.id}">Excluir</button>
      </span>
    </div>
  `).join("");

  elements.tasksList.innerHTML = `
    <div class="task-row task-head" role="row">
      <span role="columnheader">Tarefa</span>
      <span role="columnheader">Prazo</span>
      <span role="columnheader">Status</span>
      <span role="columnheader">Ações</span>
    </div>
    ${rows}
  `;
}

function renderProjects() {
  if (panelData.projects.length === 0) {
    elements.projectsList.innerHTML = `<p class="empty-state">${emptyMessage}</p>`;
    return;
  }

  elements.projectsList.innerHTML = panelData.projects.map((project) => `
    <article class="project-card">
      <div>
        <div class="card-header">
          <h3>${escapeHtml(project.name)}</h3>
          <span class="status ${getStatusClass(project.status)}">${project.status}</span>
        </div>
        <p>${escapeHtml(project.description)}</p>
      </div>
      <p class="project-focus">Foco: ${escapeHtml(project.focus)}</p>
      <div class="record-actions">
        ${createStatusSelect("projects", project.id, project.status)}
        <button class="delete-button" type="button" data-type="projects" data-id="${project.id}">Excluir</button>
      </div>
    </article>
  `).join("");
}

function renderPanel() {
  renderSummary();
  renderSubjects();
  renderTasks();
  renderProjects();
}

function addSubject(event) {
  event.preventDefault();

  panelData.subjects.push({
    id: createId(),
    name: document.querySelector("#subjectName").value.trim(),
    focus: document.querySelector("#subjectFocus").value.trim(),
    status: document.querySelector("#subjectStatus").value
  });

  elements.subjectForm.reset();
  saveData();
  renderPanel();
}

function addTask(event) {
  event.preventDefault();

  panelData.tasks.push({
    id: createId(),
    name: document.querySelector("#taskName").value.trim(),
    deadline: document.querySelector("#taskDeadline").value.trim(),
    status: document.querySelector("#taskStatus").value
  });

  elements.taskForm.reset();
  saveData();
  renderPanel();
}

function addProject(event) {
  event.preventDefault();

  panelData.projects.push({
    id: createId(),
    name: document.querySelector("#projectName").value.trim(),
    description: document.querySelector("#projectDescription").value.trim(),
    focus: document.querySelector("#projectFocus").value.trim(),
    status: document.querySelector("#projectStatus").value
  });

  elements.projectForm.reset();
  saveData();
  renderPanel();
}

function removeItem(type, id) {
  panelData[type] = panelData[type].filter((item) => item.id !== id);
  saveData();
  renderPanel();
}

function updateStatus(type, id, newStatus) {
  panelData[type] = panelData[type].map((item) => {
    if (item.id === id) {
      return {
        ...item,
        status: newStatus
      };
    }

    return item;
  });

  saveData();
  renderPanel();
}

function loadExamples() {
  panelData = JSON.parse(JSON.stringify(exampleData));
  saveData();
  renderPanel();
}

function clearPanel() {
  panelData = {
    subjects: [],
    tasks: [],
    projects: []
  };

  saveData();
  renderPanel();
}

document.addEventListener("click", (event) => {
  const deleteButton = event.target.closest(".delete-button");

  if (deleteButton) {
    removeItem(deleteButton.dataset.type, deleteButton.dataset.id);
  }
});

document.addEventListener("change", (event) => {
  if (event.target.classList.contains("status-select")) {
    updateStatus(event.target.dataset.type, event.target.dataset.id, event.target.value);
  }
});

elements.subjectForm.addEventListener("submit", addSubject);
elements.taskForm.addEventListener("submit", addTask);
elements.projectForm.addEventListener("submit", addProject);
elements.loadExamplesButton.addEventListener("click", loadExamples);
elements.clearPanelButton.addEventListener("click", clearPanel);

renderPanel();
