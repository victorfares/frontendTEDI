document.addEventListener('DOMContentLoaded', carregarMembros);

let todosMembros = [];

async function carregarMembros() {
    try {
        const response = await fetch(`${API_BASE_URL}/membros`);
        if (!response.ok) throw new Error("Falha ao buscar membros");
        
        todosMembros = await response.json();
        renderizarTabela(todosMembros);
    } catch (error) {
        showError(error.message);
    }
}

function renderizarTabela(lista) {
    const tbody = document.getElementById('tabela-corpo');
    tbody.innerHTML = '';

    if (lista.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;">Nenhum membro encontrado.</td></tr>';
        return;
    }

    lista.forEach(membro => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${membro.nome}</td>
            <td>${membro.ra}</td>
            <td>${membro.departamento}</td>
            <td>${membro.funcao}</td>
            <td>${membro.email}</td>
            <td>
                <a href="membros-form.html?id=${membro.ra}" class="btn btn-warning">Editar</a>
                
                <button onclick="excluirMembro('${membro.ra}')" class="btn btn-danger">Excluir</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function buscarMembros() {
    const termo = document.getElementById('searchInput').value.toLowerCase();
    const filtrados = todosMembros.filter(membro => 
        membro.nome.toLowerCase().includes(termo) || 
        membro.ra.toLowerCase().includes(termo)
    );
    renderizarTabela(filtrados);
}



async function excluirMembro(ra) {
    if (confirm("Tem certeza que deseja excluir este membro permanentemente?")) {
        try {
            // DELETE /api/membros/{ra}
            const response = await fetch(`${API_BASE_URL}/membros/${ra}`, {
                method: 'DELETE'
            });

            if (response.status === 204 || response.ok) {
                alert("Membro excluído com sucesso!");
                carregarMembros(); // Recarrega a lista
            } else {
                const erro = await response.json();
                throw new Error(erro.message || "Erro ao excluir");
            }
        } catch (error) {
            showError(error.message);
        }
    }
}