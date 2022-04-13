function display() {
    const topo =  document.querySelector(".topo");
    const bottom = document.querySelector(".bottom");
    const menuContatos = document.querySelector(".menu").querySelector(".contados")
    const menuVisibilidade = document.querySelector(".menu").querySelector(".visib")

    let displayTopo = `
    
            <img src="img/logo 1.svg" alt="logo">
            <ion-icon name="people"></ion-icon>
            `;

        topo.innerHTML = displayTopo;

    let displayBottom = `
    <input type="text" placeholder="Escreva aqui...">
        <ion-icon name="paper-plane-outline"></ion-icon>
        `;

        bottom.innerHTML = displayBottom;


let contatos = `
<p>Escolha um contato para enviar mensagem:</p>
<div class="ion-icon-align"><ion-icon name="people"></ion-icon> <h3>Todas</h3></div>
<div class="ion-icon-align"><ion-icon name="person-circle"></ion-icon> <h3>João</h3></div>
<div class="ion-icon-align"><ion-icon name="person-circle"></ion-icon> <h3>Maria</h3></div>
`
menuContatos.innerHTML = contatos;

let visibilidade = `
<p>Escolha a visibilidade:</p>

<div class="ion-icon-align">

<ion-icon name="lock-open"></ion-icon> 
<h3>Público</h3>
<ion-icon class="escondido" name="checkmark"></ion-icon>

</div>

<div class="ion-icon-align">

<ion-icon name="lock-closed"></ion-icon> 
<h3>Reservadamente</h3>
<ion-icon class="escondido" name="checkmark"></ion-icon>

</div>`



menuVisibilidade.innerHTML = visibilidade;



}
display()

function check () {
    document.querySelector(".menu").querySelector(".escondido").classList.remove("escondido")
}