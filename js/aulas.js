document.addEventListener('DOMContentLoaded', carregarAulas);

async function carregarAulas() {
    try {
        const response = await fetch(`${API_BASE_URL}/aulas`);
        if (!response.ok) throw new Error("Falha ao buscar aulas");
        
        const aulas = await response.json();
        renderizarTabela(aulas);
    } catch (error) {
        showError(error.message);
    }
}

function renderizarTabela(lista) {
    const tbody = document.getElementById('tabela-corpo');
    tbody.innerHTML = '';

    if (lista.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;">Nenhuma aula encontrada.</td></tr>';
        return;
    }

    lista.forEach(aula => {
        const qtdAlunos = aula.alunos ? aula.alunos.length : 0;
        const qtdMembros = aula.membros ? aula.membros.length : 0;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${aula.id}</td>
            <td>${aula.titulo}</td>
            <td>${aula.data}</td>
            <td>${aula.descricao}</td>
            <td>${qtdAlunos} Alunos, ${qtdMembros} Membros</td>
            <td>
                <a href="aulas-form.html?id=${aula.id}" class="btn btn-warning">Editar</a>

                <a href="aulas-detalhes.html?id=${aula.id}" class="btn btn-primary">Participantes</a>
                
                <button onclick="excluirAula(${aula.id})" class="btn btn-danger">Excluir</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

async function excluirAula(id) {
    if (confirm("Tem certeza que deseja excluir esta aula?")) {
        try {
            const response = await fetch(`${API_BASE_URL}/aulas/${id}`, { method: 'DELETE' });
            if (response.status === 204 || response.ok) {
                alert("Aula excluída!");
                carregarAulas();
            } else {
                throw new Error("Erro ao excluir");
            }
        } catch (error) {
            showError(error.message);
        }
    }
}