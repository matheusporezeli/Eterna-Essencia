let tel = document.getElementById("telefone");
let email = document.getElementById("email");
let email2 = document.getElementById("email2");
let password = document.getElementById("password");
let password2 = document.getElementById("password2");
let nome = document.getElementById("nome");
let form = document.getElementById("form");
let form2 = document.getElementById("form2");
let textForm = document.getElementById("textForm");
let textForm2 = document.getElementById("textForm2");
let textNome = document.getElementById("textNome");
let textEmail = document.getElementById("textEmail");
let textEmail2 = document.getElementById("textEmail2");
let textTel = document.getElementById("textTel");
let textPassword = document.getElementById("textPassword");
let textPassword2 = document.getElementById("textPassword2");

// Validação do formulário 1
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (email.value == "" && password.value == "") {
    textForm.textContent = "Você precisa preencher todos os campos!";
  } else if (
    validatorEmail(email.value) === true &&
    validatorPassword(password.value) === true
  ) {
    //verifica se o email e senha existem no localStorage na lista "Clientes"
    let clientes = localStorage.getItem("Clientes");
    if (clientes) {
      clientes = JSON.parse(clientes);
      const usuarioEncontrado = clientes.find(
        (cliente) => cliente.Email === email.value && cliente.Senha === password.value
      );
      if (usuarioEncontrado) {
        // Limpa os campos e mensagens de erro após o login
        email.value = "";
        password.value = "";
        textEmail.textContent = "";
        textPassword.textContent = "";
        textForm.textContent = "Login bem-sucedido!";
        //leva para a página index.html depois de 1 segundo
        setTimeout(() => {
          window.location.href = "../index.html";
        }, 3000);
      } else {
        textForm.textContent = "Email ou senha incorretos!";
      }
    } else {
      textForm.textContent = "Nenhum usuário cadastrado!";
    }
  }
});

// Validação do formulário 2
form2.addEventListener("submit", (e) => {
  e.preventDefault();
  // Verifica se os campos estão vazios
  if (email2.value == "" && password2.value == "" && nome.value == "" && tel.value == "") {
    textForm2.textContent = "Você precisa preencher todos os campos!";
  } else if (
    // Verifica se os campos atendem aos critérios de validação
    validatorEmail(email2.value) === true &&
    validarTelefone(tel.value) === true &&
    validatorPassword(password2.value) === true
    && validaNome(nome.value) === true
    && nome.value.length >= 3
    && tel.value.length == 15
  ) {
    // Chama a função para salvar o objeto na lista "Clientes" no localStorage
    salvarEmLista("Clientes", { Nome: nome.value, Email: email2.value, Senha: password2.value, Telefone: tel.value })

    //Função para armazenar no localStorage em formato de lista de objetos
    function salvarEmLista(chave, objeto) {
      // Recupera a lista existente no localStorage pela chave
      let cliente = localStorage.getItem(chave);

      if (cliente) {
        // Converte de JSON para array se existir
        cliente = JSON.parse(cliente);
      } else {
        // Se não existir, inicia como array vazio
        cliente = [];
      }
      // Adiciona o novo objeto à lista
      cliente.push(objeto);

      // Salva de volta no localStorage em formato JSON stringificado
      localStorage.setItem(chave, JSON.stringify(cliente));
      console.log(`Objeto adicionado na lista '${chave}'.`);
    }
    // Limpa os campos e mensagens de erro após o cadastro
    nome.value = "";
    email2.value = "";
    tel.value = "";
    password2.value = "";
    textNome.textContent = "";
    textEmail2.textContent = "";
    textTel.textContent = "";
    textPassword2.textContent = "";
    textForm2.textContent = "Cadastro realizado com sucesso!";
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

// Validação de email 1
email.addEventListener("keyup", () => {
  if (validatorEmail(email.value) !== true) {
    textEmail.textContent = "O formato do email deve ser Ex: name@abc.com";
  } else {
    textEmail.textContent = "";
  }
});

// Validação de email 2
email2.addEventListener("keyup", () => {
  if (validatorEmail(email2.value) !== true) {
    textEmail2.textContent = "O formato do email deve ser Ex: name@abc.com";
  } else {
    textEmail2.textContent = "";
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

// Função de validação de senha
function validatorPassword(password) {
  let passwordPattern =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])[A-Za-z\d#?!@$%^&*-]{8,}$/;
  return passwordPattern.test(password);
}

// Validação de senha 1
password.addEventListener("keyup", () => {
  if (validatorPassword(password.value) !== true) {
    textPassword.textContent =
      "A senha deve contar no mínimo 8 caracteres, letras maiúsculas, minúsculas, números e caracteres especiais!";
  } else {
    textPassword.textContent = "";
  }
});

// Validação de senha 2
password2.addEventListener("keyup", () => {
  if (validatorPassword(password2.value) !== true) {
    textPassword2.textContent =
      "A senha deve contar no mínimo 8 caracteres, letras maiúsculas, minúsculas, números e caracteres especiais!";
  } else {
    textPassword2.textContent = "";
  }
});