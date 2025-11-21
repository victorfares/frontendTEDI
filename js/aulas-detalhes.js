const urlParams = new URLSearchParams(window.location.search);
const aulaId = urlParams.get('id');

document.addEventListener('DOMContentLoaded', () => {
    if (aulaId) {
        carregarDadosAula();
    } else {
        alert("ID da aula não fornecido");
        window.location.href = 'aulas.html';
    }
});

async function carregarDadosAula() {
    try {
        const response = await fetch(`${API_BASE_URL}/aulas/${aulaId}`);
        if (!response.ok) throw new Error("Aula não encontrada");
        
        const aula = await response.json();
        renderizarTela(aula);
    } catch (error) {
        showError(error.message);
    }
}

function renderizarTela(aula) {
    // Preenche cabeçalho
    document.getElementById('tituloAula').innerText = aula.titulo;
    document.getElementById('descAula').innerText = aula.descricao;
    document.getElementById('dataAula').innerText = aula.data;

    // Preenche lista de Alunos
    const ulAlunos = document.getElementById('listaAlunos');
    ulAlunos.innerHTML = '';
    if (aula.alunos && aula.alunos.length > 0) {
        aula.alunos.forEach(aluno => {
            const li = document.createElement('li');
            li.innerHTML = `<span>${aluno.nome}</span> <small>(RG: ${aluno.rg})</small>`;
            ulAlunos.appendChild(li);
        });
    } else {
        ulAlunos.innerHTML = '<li style="color:#777">Nenhum aluno.</li>';
    }

    // Preenche lista de Membros
    const ulMembros = document.getElementById('listaMembros');
    ulMembros.innerHTML = '';
    if (aula.membros && aula.membros.length > 0) {
        aula.membros.forEach(membro => {
            const li = document.createElement('li');
            li.innerHTML = `<span>${membro.nome}</span> <small>(RA: ${membro.ra})</small>`;
            ulMembros.appendChild(li);
        });
    } else {
        ulMembros.innerHTML = '<li style="color:#777">Nenhum membro.</li>';
    }
}

// --- AÇÕES DE ADICIONAR ---

async function adicionarAluno() {
    const rg = document.getElementById('rgAlunoInput').value;
    if (!rg) return alert("Digite o RG!");

    try {
        // POST /api/aulas/{id}/alunos/{rg}
        const response = await fetch(`${API_BASE_URL}/aulas/${aulaId}/alunos/${rg}`, {
            method: 'POST'
        });

        if (!response.ok) throw new Error("Erro ao adicionar (Verifique se o RG existe)");

        // Limpa input e recarrega para mostrar o novo aluno na lista
        document.getElementById('rgAlunoInput').value = '';
        carregarDadosAula();

    } catch (error) {
        showError(error.message);
    }
}

async function adicionarMembro() {
    const ra = document.getElementById('raMembroInput').value;
    if (!ra) return alert("Digite o RA!");

    try {
        // POST /api/aulas/{id}/membros/{ra}
        const response = await fetch(`${API_BASE_URL}/aulas/${aulaId}/membros/${ra}`, {
            method: 'POST'
        });

        if (!response.ok) throw new Error("Erro ao adicionar (Verifique se o RA existe)");

        document.getElementById('raMembroInput').value = '';
        carregarDadosAula();

    } catch (error) {
        showError(error.message);
    }
}