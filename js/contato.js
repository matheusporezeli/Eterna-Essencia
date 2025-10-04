let nome = document.getElementById("nome");
let email = document.getElementById("email");
let tel = document.getElementById("telefone");
let text = document.getElementById("text");
let form = document.getElementById("contato");
let textForm = document.getElementById("textForm");
let textNome = document.getElementById("textNome");
let textEmail = document.getElementById("textEmail");
let textTel = document.getElementById("textTel");

// Validação do formulário de contato
form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (email.value == "" && nome.value == "" && tel.value == "" && text.value == "") {
        textForm.textContent = "Você precisa preencher todos os campos!";
    } else if (
        // Verifica se os campos atendem aos critérios de validação
        validaNome(nome.value) === true &&
        validatorEmail(email.value) === true &&
        validarTelefone(tel.value) === true &&
        verificarVazio(text.value) === false &&
        nome.value.length >= 3 &&
        tel.value.length == 15
    ) {
        //Função para armazenar no localStorage em formato de lista de objetos
        salvarEmLista("Contatos", { Nome: nome.value, Email: email.value, Telefone: tel.value, Mensagem: text.value })
        function salvarEmLista(chave, objeto) {
            // Recupera a lista existente no localStorage pela chave
            let contato = localStorage.getItem(chave);
            if (contato) {
                // Converte de JSON para array se existir
                contato = JSON.parse(contato);
            } else {
                // Cria um array vazio se não existir
                contato = [];
            }
            // Adiciona o novo objeto ao array
            contato.push(objeto);
            // Salva o array atualizado de volta no localStorage em formato JSON stringificado
            localStorage.setItem(chave, JSON.stringify(contato));
            console.log(`Objeto adicionado na lista '${chave}'.`);
            textNome.textContent = "";
            textEmail.textContent = "";
            textTel.textContent = "";
            //limpa os campos do formulário
            nome.value = "";
            email.value = "";
            tel.value = "";
            text.value = "";
            textForm.textContent = "Mensagem enviada com sucesso! Obrigado por entrar em contato conosco.";
        }
    } else {
        console.log("Requisição não atendida");
    }
});

// Função de validação de nome
function validaNome(nome) {
    let nomePattern = /^[a-zA-Z\s]+$/;
    return nomePattern.test(nome);
}

//Validação do nome
nome.addEventListener("keyup", () => {
    if (nome.value.length < 3 || validaNome(nome.value) !== true) {
        textNome.textContent = "O nome deve conter no mínimo 3 caracteres! Apenas letras são permitidas.";
    } else {
        textNome.textContent = "";
    }
});

// Função de validação de email
function validatorEmail(email) {
    let emailPattern =
        /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
    return emailPattern.test(email);
}

// Validação de email
email.addEventListener("keyup", () => {
    if (validatorEmail(email.value) !== true) {
        textEmail.textContent = "O formato do email deve ser Ex: name@abc.com";
    } else {
        textEmail.textContent = "";
    }
});

// Função de validação de telefone
function validarTelefone(telefone) {
    let telefonePattern = /^\(\d{2}\) \d{5}-\d{4}$/;
    return telefonePattern.test(telefone);
}

//Validação do telefone
tel.addEventListener("keyup", () => {
    if (tel.value.length < 15 || tel.value.length > 15) {
        textTel.textContent = "O telefone deve conter 11 números!";
    } else {
        textTel.textContent = "";
    }
});

// Função para formatar o telefone enquanto o usuário digita
function formatarTelefone(telefone) {
    // Remove todos os caracteres que não são dígitos
    let numero = telefone.value.replace(/\D/g, "");
    // Adiciona parênteses ao redor do código de área
    numero = numero.replace(/^(\d{2})(\d)/g, "($1) $2");
    // Adiciona um hífen entre o quarto e o quinto dígitos
    numero = numero.replace(/(\d{5})(\d)/, "$1-$2");
    // Limita o comprimento máximo a 15 caracteres (incluindo formatação)
    numero = numero.substring(0, 15);
    // Atualiza o valor do campo de entrada com o número formatado
    telefone.value = numero;
    return telefone;
}

// Função para verificar se o texto está vazio
function verificarVazio(texto) {
    return texto.trim() === "";
}
// Validação do campo de texto
text.addEventListener("keyup", () => {
    if (verificarVazio(text.value) === true) {
        textForm.textContent = "O campo de texto não pode estar vazio!";
    } else {
        textForm.textContent = "";
    }
});