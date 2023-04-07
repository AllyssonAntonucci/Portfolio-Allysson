/*--------------------PROGRAMAÇÃO MENU HAMBURGUER-----------------------------*/

const nav = document.querySelector(".nav");
const btnMenu = document.querySelector(".btn-menu");
const menu = document.querySelector(".menu");


function handleButtonClick(event) {
  if (event.type === "touchstart") event.preventDefault(); // Usa isso pois quando o evento touchstart acionado, um evento de click é emulado automaticamente em seguida, por isso o menu abre e fecha rapido já que a função handle que criamos é ativada 2 vezes, então usamos o prevent default pra retirar esse segundo click e funcionar corretamente;
  event.stopPropagation(); // Isso para evitar o bubbling
  nav.classList.toggle("active"); // o método toggle pertence ao objeto classList de um elemento. Ele irá inserir a classe caso não exista e remover caso exista;
  handleClickOutside(menu, () => {
    nav.classList.remove("active");  
  });

  for (let i = 0; i < menuItens.length; i++) {
    handleClickOutside(menuItens[i], () => {
      nav.classList.remove("active");
    });
  }

}


function handleClickOutside(targetElement, callback) {
  const html = document.documentElement; // O lado de fora de um elemento alvo pode ser representado pelo elemento html em sí
  function handleHTMLClick(event) {
    if (!targetElement.contains(event.target)) { //contains verifica se um elemento x contém um elemento y ou se x é o próprio x, ou seja, usando "!" temos que o código dentro de if irá executar apenas se o alvo "targetElement" NÂO FOR o próprio menu "event.target" e sim um elemento do lado de fora dele, como um header ou outra coisa;
      targetElement.removeAttribute("data-target"); // QUando o código acima acontecer, queremos limpar o atributo data-target para permitir que essa função como um todo ocorra mais vezes;
      html.removeEventListener("click", handleHTMLClick); // também queremos remover os gatilhos de evento do html, por uma questão de performance eles só precisam estar ligados quando o menu estiver aberto;
      html.removeEventListener("touchstart", handleHTMLClick);

      callback(); // Por fim, esse callback remove o 'active' para fechar o menu quando clicar fora; (A partir desse ponto ocorre o bubbling, e o menu não funciona mais, para concertar vamos usar o método stop propagation na função handleButtonClick)
    }
  }

   //Vamos verificar se tal elemento possui um atributo data-target (por isso o "!" abaixo, que significa se não possuir vamos: fazer isso...:
  if (!targetElement.hasAttribute("data-target")) {
    html.addEventListener("click", handleHTMLClick); // nessas duas funções, no html quero acionar elas quando acontecer um click, vamos adicionar essa função acima; 
    html.addEventListener("touchstart", handleHTMLClick);
    targetElement.setAttribute("data-target", "");
  }
}

btnMenu.addEventListener("click", handleButtonClick);
btnMenu.addEventListener("touchstart", handleButtonClick); // usando o touchstart no mobile ele será mais responsivo e otimizado








/*--------------------PROGRAMAÇÃO DO TÍTULO EFEITO MÁQUINA DE ESCREVER-----------------------------*/

const texto = document.getElementById("texto");
const conteudo = texto.innerHTML;
texto.innerHTML = "";

let i = 0;
let animacao = setInterval(function() {
  texto.innerHTML += conteudo.charAt(i);
  i++;
  if (i > conteudo.length) {
    clearInterval(animacao);
    
  }
}, 100);




/*--------------------PROGRAMAÇÃO ITENS DO MENU ATIVO EM CADA SECTION-----------------------------*/

const menuItens = document.querySelectorAll('.menu a li ');
const sections = document.querySelectorAll("section");
const header = document.querySelector("header");
const headerHeight = header.offsetHeight;


//console.log(menuItens)
//console.log(sections)
//console.log(headerHeight)

window.onscroll = () => {
  var current = "";
  
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (pageYOffset >= sectionTop - headerHeight) {
        current = section.getAttribute("id");
      }

      //console.log(current)
    });

    menuItens.forEach((li) => {
      li.classList.remove("active");
      if (li.classList.contains(current)) {
        li.classList.add("active");
      }
    });
  };



/*--------------------PROGRAMAÇÃO SCROLL SUAVE-----------------------------*/

//Novamente usares a const menuItens definida acima
const apresentacaoBtns = document.querySelectorAll('.apresentacao-btns button');



menuItens.forEach(item => {
  item.addEventListener('click', scrollToSection);
});

apresentacaoBtns.forEach(item => {
  item.addEventListener('click', scrollToSection);
});



function scrollToSection(e) {
  e.preventDefault(); // cancelar o comportamento padrão de clique 

  const targetSection = this.getAttribute('data-section');
  const targetElement = document.getElementById(targetSection);

  targetElement.scrollIntoView({ behavior: 'smooth' });
}







/*--------------------PROGRAMAÇÃO COPIAR EMAIL DE CONTATO AO CLICAR-----------------------------*/

const email = document.querySelector('.contato-email p')
const msgCopy = document.getElementById('email-copia');
//console.log(email.innerHTML)
//console.log(msgCopy)

msgCopy.innerHTML="Email copiado!";

function copiarTexto() {
  const textoCopiado = email.textContent;
  navigator.clipboard.writeText(textoCopiado).then(() => {
  });

  msgCopy.classList.add("active");

  // Esconde a mensagem após 3 segundos
  setTimeout(function() {
    msgCopy.classList.remove("active");
  }, 3000);

}














