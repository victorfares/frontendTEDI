const urlParams = new URLSearchParams(window.location.search);
const aulaId = urlParams.get('id'); // Pega o id da URL (ex: ?id=1)

const form = document.getElementById('form-aula');

// Ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    if (aulaId) {
        // --- MODO EDIÇÃO ---
        document.getElementById('titulo-pagina').innerText = 'Editar Aula/Evento';
        document.getElementById('btn-salvar').innerText = 'Salvar Alterações';
        carregarDadosAula(aulaId);
    }
});

// Busca os dados atuais para preencher o formulário
async function carregarDadosAula(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/aulas/${id}`);
        if (!response.ok) throw new Error("Aula não encontrada");
        
        const aula = await response.json();
        
        // Preenche os inputs
        document.getElementById('titulo').value = aula.titulo;
        document.getElementById('descricao').value = aula.descricao;
        document.getElementById('data').value = aula.data;
        
    } catch (error) {
        showError(error.message);
        window.location.href = 'aulas.html';
    }
}

// Ao enviar o formulário
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const dados = {
        titulo: document.getElementById('titulo').value,
        descricao: document.getElementById('descricao').value,
        data: document.getElementById('data').value,
        // Importante: No Java, configuramos para que se a lista for NULL, 
        // ele MANTÉM os participantes atuais. Se for [], ele limpa.
        rgsAlunos: null, 
        rasMembros: null
    };

    try {
        let response;
        const headers = { 'Content-Type': 'application/json' };

        if (aulaId) {
            // --- ATUALIZAR (PUT) ---
            response = await fetch(`${API_BASE_URL}/aulas/${aulaId}`, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(dados)
            });
        } else {
            dados.rgsAlunos = [];
            dados.rasMembros = [];
            
            response = await fetch(`${API_BASE_URL}/aulas`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(dados)
            });
        }

        if (!response.ok) {
            const erro = await response.json();
            const msg = erro.errorMessage || (erro.details ? erro.details[0] : "Erro ao salvar");
            throw new Error(msg);
        }

        alert("Aula salva com sucesso!");
        window.location.href = 'aulas.html';

    } catch (error) {
        showError(error.message);
    }
});