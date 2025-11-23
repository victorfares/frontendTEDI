const urlParams = new URLSearchParams(window.location.search);
const alunoId = urlParams.get('id'); // Pega o ?id=123 da URL

const form = document.getElementById('form-aluno');
const rgInput = document.getElementById('rg');

document.addEventListener('DOMContentLoaded', () => {
    if (alunoId) {
        // MODO EDIÇÃO
        document.getElementById('titulo-pagina').innerText = 'Editar Aluno';
        rgInput.readOnly = true; // Não pode mudar ID na edição
        carregarDadosAluno(alunoId);
    }
});

async function carregarDadosAluno(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/alunos/${id}`);
        if (!response.ok) throw new Error("Aluno não encontrado");
        
        const aluno = await response.json();
        
        // Preenche os campos
        document.getElementById('nome').value = aluno.nome;
        document.getElementById('email').value = aluno.email;
        document.getElementById('telefone').value = aluno.telefone;
        document.getElementById('rg').value = aluno.rg;
        document.getElementById('nivelDigital').value = aluno.nivelDigital;
        
    } catch (error) {
        showError(error.message);
        window.location.href = 'alunos.html';
    }
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const dados = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        rg: document.getElementById('rg').value,
        nivelDigital: document.getElementById('nivelDigital').value
    };

    try {
        let response;
        if (alunoId) {
            response = await fetch(`${API_BASE_URL}/alunos`, { 
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados)
            });
        } else {
            response = await fetch(`${API_BASE_URL}/alunos`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados)
            });
        }

        if (!response.ok) {
            const erroJson = await response.json();
            throw new Error(erroJson.details ? erroJson.details[0] : "Erro ao salvar");
        }

        alert("Salvo com sucesso!");
        window.location.href = 'alunos.html';

    } catch (error) {
        showError(error.message);
    }
});