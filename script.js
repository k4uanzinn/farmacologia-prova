// ============================
// LOGIN
// ============================

function login(event) {
  event.preventDefault();

  const user = document.getElementById("loginUser").value;
  const pass = document.getElementById("loginPass").value;

  if (user === "administrador" && pass === "ADM") {
    localStorage.setItem("tipoUsuario", "admin");
    window.location.href = "dashboard.html";
  } 
  else if (user === "usuario" && pass === "usuario") {
    localStorage.setItem("tipoUsuario", "usuario");
    window.location.href = "dashboard.html";
  } 
  else {
    document.getElementById("loginMsg").innerText = "❌ Usuário ou senha incorretos";
  }
}

function sair() {
  localStorage.removeItem("tipoUsuario");
  window.location.href = "index.html";
}

function protegerPagina() {
  if (!localStorage.getItem("tipoUsuario")) {
    window.location.href = "index.html";
  }
}

// ============================
// LISTA DE INSCRITOS
// ============================

function getInscritos() {
  return JSON.parse(localStorage.getItem("inscritos")) || [];
}

function salvarInscritos(lista) {
  localStorage.setItem("inscritos", JSON.stringify(lista));
}

// Registrar presença
function registrarPresenca() {
  const nome = document.getElementById("nome").value.trim();

  if (!nome) {
    alert("Digite um nome");
    return;
  }

  const inscritos = getInscritos();

  if (inscritos.includes(nome)) {
    alert("Esse nome já está na lista");
    return;
  }

  inscritos.push(nome);
  salvarInscritos(inscritos);

  alert("Presença confirmada ✅");
  document.getElementById("nome").value = "";
}

// Carregar lista
function carregarLista() {
  const ul = document.getElementById("lista");
  if (!ul) return;

  const inscritos = JSON.parse(localStorage.getItem("inscritos")) || [];
  const tipo = localStorage.getItem("tipoUsuario");

  ul.innerHTML = "";

  inscritos.forEach((nome, index) => {
    const li = document.createElement("li");
    li.textContent = nome;

    if (tipo === "admin") {
      const btn = document.createElement("button");
      btn.textContent = "Excluir";
      btn.style.marginLeft = "10px";

      btn.onclick = () => {
        inscritos.splice(index, 1);
        localStorage.setItem("inscritos", JSON.stringify(inscritos));
        carregarLista();
      };

      li.appendChild(btn);
    }

    ul.appendChild(li);
  });

  atualizarContador();
}


function atualizarContador() {
  const contador = document.getElementById("contador");
  if (!contador) return;

  const inscritos = JSON.parse(localStorage.getItem("inscritos")) || [];
  contador.innerText = `👥 ${inscritos.length} / 30 confirmados`;
}
