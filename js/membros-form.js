const urlParams = new URLSearchParams(window.location.search);
const membroRa = urlParams.get('id'); // Pega o ?id=123 da URL

const form = document.getElementById('form-membro');
const raInput = document.getElementById('ra');

document.addEventListener('DOMContentLoaded', () => {
    if (membroRa) {
        // MODO EDIÇÃO
        document.getElementById('titulo-pagina').innerText = 'Editar Membro';
        raInput.readOnly = true; // Bloqueia o RA na edição
        carregarDadosMembro(membroRa);
    }
});

async function carregarDadosMembro(ra) {
    try {
        const response = await fetch(`${API_BASE_URL}/membros/${ra}`);
        if (!response.ok) throw new Error("Membro não encontrado");
        
        const membro = await response.json();
        document.getElementById('nome').value = membro.nome;
        document.getElementById('email').value = membro.email;
        document.getElementById('telefone').value = membro.telefone;
        document.getElementById('ra').value = membro.ra;
        document.getElementById('departamento').value = membro.departamento;
        document.getElementById('funcao').value = membro.funcao;
        
    } catch (error) {
        showError(error.message);
        window.location.href = 'membros.html';
    }
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const dados = {
        nomeMembro: document.getElementById('nome').value,
        emailMembro: document.getElementById('email').value,
        telefoneMembro: document.getElementById('telefone').value,
        raMembro: document.getElementById('ra').value,
        departamentoMembro: document.getElementById('departamento').value,
        funcaoMembro: document.getElementById('funcao').value
    };

    try {
        let response;
        const headers = { 'Content-Type': 'application/json' };

        if (membroRa) {
            response = await fetch(`${API_BASE_URL}/membros/${membroRa}`, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(dados)
            });
        } else {
            response = await fetch(`${API_BASE_URL}/membros`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(dados)
            });
        }

        if (!response.ok) {
            const erroJson = await response.json();
            const msg = erroJson.errorMessage || (erroJson.details ? erroJson.details[0] : "Erro ao salvar");
            throw new Error(msg);
        }

        alert("Membro salvo com sucesso!");
        window.location.href = 'membros.html';

    } catch (error) {
        showError(error.message);
    }
});