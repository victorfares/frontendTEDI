document.addEventListener('DOMContentLoaded', carregarAlunos);

let todosAlunos = [];

async function carregarAlunos() {
    try {
        const response = await fetch(`${API_BASE_URL}/alunos`);
        if (!response.ok) throw new Error("Falha ao buscar alunos");
        
        todosAlunos = await response.json();
        renderizarTabela(todosAlunos);
    } catch (error) {
        showError(error.message);
    }
}

function renderizarTabela(lista) {
    const tbody = document.getElementById('tabela-corpo');
    tbody.innerHTML = '';

    if (lista.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;">Nenhum aluno encontrado.</td></tr>';
        return;
    }

    lista.forEach(aluno => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${aluno.nome}</td>
            <td>${aluno.rg}</td>
            <td>${aluno.nivelDigital}</td>
            <td>${aluno.email}</td>
            <td>
                <a href="alunos-form.html?id=${aluno.rg}" class="btn btn-warning">Editar</a>
                
                <button onclick="excluirAluno('${aluno.rg}')" class="btn btn-danger">Excluir</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function buscarAlunos() {
    const termo = document.getElementById('searchInput').value.toLowerCase();
    const filtrados = todosAlunos.filter(aluno => 
        aluno.nome.toLowerCase().includes(termo) || 
        aluno.rg.toLowerCase().includes(termo)
    );
    renderizarTabela(filtrados);
}

// --- NOVA FUNÇÃO EXCLUIR ---
async function excluirAluno(rg) {
    if (confirm("Tem certeza que deseja excluir este aluno permanentemente?")) {
        try {
            const response = await fetch(`${API_BASE_URL}/alunos/${rg}`, {
                method: 'DELETE'
            });

            if (response.status === 204 || response.ok) {
                alert("Aluno excluído com sucesso!");
                carregarAlunos(); // Atualiza a lista
            } else {
                const erro = await response.json();
                throw new Error(erro.message || "Erro ao excluir");
            }
        } catch (error) {
            showError(error.message);
        }
    }
}