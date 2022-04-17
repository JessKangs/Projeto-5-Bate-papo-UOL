function display() {
    const topo = document.querySelector(".topo");
    const bottom = document.querySelector(".bottom");
    const menuContatos = document.querySelector(".menu").querySelector(".contados")
    const menuVisibilidade = document.querySelector(".menu").querySelector(".visib")

    let displayTopo = `
    
            <img src="img/logo 1.svg" alt="logo">
            
            <ion-icon id=menu-open name="people" onclick="menuClick(this)"></ion-icon>
            `;

    topo.innerHTML = displayTopo;


    let displayBottom = `
    <form action"">
    <input class="inputMessage" type="text" name="message" placeholder="Escreva aqui...">
        <button class="enviar" type="submit"><ion-icon name="paper-plane-outline"></ion-icon></button>
    </form>
        `;

    bottom.innerHTML = displayBottom;


    let contatos = `
<p>Escolha um contato para enviar mensagem:</p>

<div class="ion-icon-align">
<ion-icon name="people"></ion-icon> <h3> Todos </h3>
<ion-icon class="escondido" name="checkmark-outline"></ion-icon>

</div>

<div class="ion-icon-align">
<ion-icon name="person-circle"></ion-icon> <h3>João</h3>
<ion-icon class="escondido" name="checkmark-outline"></ion-icon>

</div>

<div class="ion-icon-align">
<ion-icon name="person-circle"></ion-icon> <h3>Maria</h3>
<ion-icon class="escondido" name="checkmark-outline"></ion-icon>

</div>
`
    menuContatos.innerHTML = contatos;

    let visibilidade = `
<p>Escolha a visibilidade:</p>

<div class="ion-icon-align" onclick="check(this)">

<ion-icon name="lock-open"></ion-icon> 
<h3>Público</h3>
<ion-icon class="escondido" name="checkmark-outline"></ion-icon>

</div>

<div class="ion-icon-align" onclick="check(this)">

<ion-icon name="lock-closed"></ion-icon> 
<h3>Reservadamente</h3>
<ion-icon class="escondido" name="checkmark-outline"></ion-icon>

</div>`



    menuVisibilidade.innerHTML = visibilidade;



}
display()

// MENU 

function menuClick(elemento) {
    let propriedade = document.querySelector(".menu").querySelector(".escondido")

    document.querySelector(".menu").classList.remove("escondido")

    let background = document.querySelector(".pai-menu")

    if (propriedade !== null) {
        document.querySelector(".pai-menu").classList.add("fundo")
        
    }

}



function closeMenu(elemento) {

    document.querySelector(".menu").classList.add("escondido")
    document.querySelector(".pai-menu").classList.remove("fundo")
}


// Colocar check ao clicar nas opções

function check(elemento) {
    const opcaoSelecionada = document.querySelector(".ion-icon-align").querySelector(".escondido")

    if (opcaoSelecionada === null) {
        elemento.classList.toggle(".escondido")
    }


}



// COMEÇA PARTE API


const id = prompt('Escolha seu nome de usuário:');

let nomeUsuario = {
    name: `${id}`,
}
let requisicaoNome = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', nomeUsuario);

requisicaoNome.then(tratarSucesso);
requisicaoNome.catch(tratarErro);


function tratarSucesso(resposta) {

    alert("Bem vinde ao bate-papo UOL!")
}


function tratarErro(erro) {
    do {
        let mensagemErro = `erro ${erro.response.status}`;

        return alert(mensagemErro), prompt('Escolha seu nome de usuário:');

    } while (mensagemErro === 400);
}






// CONEXÃO

function conexao () {
    axios.post('https://mock-api.driven.com.br/api/v6/uol/status', nomeUsuario);
}

setInterval(conexao,5000)

//MENSAGENS

let listaMensagens;
let disporMensagens = document.querySelector(".mensagens")

function carregarMensagens () {
    const mensagens = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages')

mensagens.then(mensagensServidor);
}

function mensagensServidor(resposta) {
    listaMensagens = resposta.data
    console.log(resposta)

    disporMensagens.innerHTML = ""
    

    for (let i = 20; i < 100; i++) {
        if (listaMensagens[i].type === "message") {
            disporMensagens.innerHTML += `
            <div class="normais">

                <div class="messageStatus">
                <div class="time">(${listaMensagens[i].time})</div>
                   <h1> ${listaMensagens[i].from} </h1>
                    para  <h1> ${ listaMensagens[i].to}: </h1>
                </div>
                    ${listaMensagens[i].text} 
        </div>
            `

        } 
         else if (listaMensagens[i].type === "status") {
            disporMensagens.innerHTML += `
            <div class="status">
            <div class="time">(${listaMensagens[i].time})</div>
            <h1> ${listaMensagens[i].from} ${listaMensagens[i].text} </h1>
        </div>
            `
        } else if(listaMensagens[i].type == "private_message") {
            disporMensagens.innerHTML += `
            <div class="mensagensPrivadas">
            <div class="time">(${listaMensagens[i].time})</div>
            <h1>${listaMensagens[i].from}</h1> reservadamente para <h1>${listaMensagens[i].to}</h1>
            
            `
        }
    }
}

disporMensagens.scrollIntoView();

setInterval(carregarMensagens, 3000);



// ENVIAR MENSAGENS

let value;

const btn = document.querySelector(".enviar");

btn.addEventListener("click", function(e) {
    e.preventDefault();

    let input = document.querySelector(".inputMessage");

    value = input.value;

    let objetoMensagens = {
        from: `${nomeUsuario.name}`,
        to: "Todos",
        text: `${value}`,
        type: "message"
    }
    
    axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", objetoMensagens)

}) 

