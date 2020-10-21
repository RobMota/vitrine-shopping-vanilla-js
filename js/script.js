let prod_array = [
  {
    imgPath: "./images/calca.jpg",
    prod_name: "Calça",
    prod_preco: 99.99,
    estoque: 3,
  },
  {
    imgPath: "./images/blusa.jpg",
    prod_name: "Blusa Yu yu Hakusho",
    prod_preco: 149.99,
    estoque: 4,
  },
  {
    imgPath: "./images/sobretudo.jpg",
    prod_name: "Sobretudo Akatsuke",
    prod_preco: 2.5,
    estoque: 6,
  },
  {
    imgPath: "./images/sapato.jpg",
    prod_name: "Sapato Social",
    prod_preco: 0.99,
    estoque: 3,
  },
  {
    imgPath: "./images/naruto.jpg",
    prod_name: "fantasia naruto",
    prod_preco: 23456.78,
    estoque: 2,
  },
  {
    imgPath: "./images/sakura.jpg",
    prod_name: "fantasia sakura",
    prod_preco: 4567.89,
    estoque: 10,
  },
];

let carrinho = document.querySelector(".carrinho");
let showCar = document.querySelector(".showCarrinho");
let seta = document.querySelector(".seta");

//listar elementos
prod_array.map((item, index) => {
  let preco = parseFloat(item.prod_preco).toFixed(2);

  let itemElement = `
	<div class="prod" id="item-${index}">
  <img src=${item.imgPath} alt=${item.prod_name} />
		<p>${item.prod_name}</p>
		<span>Preço: R$ ${preco} <span class="precoValue"></span></span>
		<span>Estoque: ${item.estoque}</span>
			<button class="btn" onclick="comprarItem(${index})">Comprar</button>
      </div>`;

  document
    .querySelector(".produtos")
    .insertAdjacentHTML("beforeend", itemElement);
});

//adicionar item ao carrinho e apresentar total
let totalValue = document.querySelector(".totalValue");
let total = 0;

function comprarItem(index) {
  let preco = parseFloat(prod_array[index].prod_preco).toFixed(2);
  let prodAdicionado = document.querySelector(`#prod-add-${index}`);

  total = total + prod_array[index].prod_preco;
  totalValue.innerHTML = parseFloat(total).toFixed(2);

  if (prodAdicionado) {
    let quantValor = prodAdicionado.querySelector(".quantValor");
    let precoValor = prodAdicionado.querySelector(".precoValor");

    quantValor.innerHTML = parseInt(quantValor.innerHTML) + 1;
    precoValor.innerHTML = parseFloat(preco * quantValor.innerHTML).toFixed(2);
  } else {
    let liElement = `
    <li id="prod-add-${index}">
      <button class="close" onclick="remover(${index})">X</button>
      <img src=${prod_array[index].imgPath} alt=${prod_array[index].prod_name} />
      <span>Quantidade: <strong class="quantValor"> 1 </strong></span>
      <div class="upDown">
        <div class="setaCima" onclick="up(${index})"></div>
        <div class="setaBaixo" onclick="down(${index})"></div>
      </div>
      <span>Preço: R$ <strong class="precoValor"> ${preco} </strong></span>
    </li>
    `;

    carrinho.insertAdjacentHTML("beforeend", liElement);
  }
  calculaTotal();
}

// apresentar e esconder carrinho
let evento = false;
showCar.addEventListener("click", () => {
  if (evento) {
    carrinho.style.display = "none";
    seta.style.display = "none";
    evento = false;
  } else {
    carrinho.style.display = "block";
    seta.style.display = "block";
    evento = true;
  }
});

//remover item do carrinho e atualiza o valor de total
function remover(index) {
  let item = document.querySelector(`#prod-add-${index}`);

  item.remove();
  calculaTotal();
}

function calculaTotal() {
  //pega todos os preços do carrinho
  let precosNoCarrinho = document.getElementsByClassName("precoValor");
  let totalCarrinho = 0;

  //soma todos os preços do carrinho
  for (let i = 0; i < precosNoCarrinho.length; i++) {
    totalCarrinho += parseFloat(precosNoCarrinho[i].innerHTML);
  }

  //atualiza innerHTML do valor total
  document.querySelector(".totalValue").innerHTML = totalCarrinho.toFixed(2);
}

// aumentar a quantidade e valor total do item no carrinho
// e somar ao valor total de todos os items no carrinho
function up(index) {
  let prodAdicionado = document.querySelector(`#prod-add-${index}`);
  let setaCima = prodAdicionado.querySelector(".setaCima");
  let estoque = prod_array[index].estoque;
  let quantValor = prodAdicionado.querySelector(".quantValor"); // quantidade item no carrinho
  let precoValor = prodAdicionado.querySelector(".precoValor"); //  valor total item no carrinho

  if (quantValor.innerHTML >= estoque) {
    setaCima.style.borderBottom = "15px solid red";
    setTimeout(() => {
      setaCima.style.borderBottom = "15px solid black";
    }, 200);

    return;
  }

  quantValor.innerHTML = parseInt(quantValor.innerHTML) + 1;
  precoValor.innerHTML = parseFloat(
    prod_array[index].prod_preco * quantValor.innerHTML
  ).toFixed(2);

  calculaTotal();
}

// diminuir a quantidade e valor de items no carrinho e o valor total
function down(index) {
  let prodAdicionado = document.querySelector(`#prod-add-${index}`);
  let quantValor = prodAdicionado.querySelector(".quantValor"); // quantidade item no carrinho
  let precoValor = prodAdicionado.querySelector(".precoValor"); //  valor total item no carrinho
  let setaBaixo = prodAdicionado.querySelector(".setaBaixo");

  if (quantValor.innerHTML <= 1) {
    setaBaixo.style.borderTop = "15px solid red";

    setTimeout(() => {
      setaBaixo.style.borderTop = "15px solid black";
    }, 200);

    return;
  }

  quantValor.innerHTML = parseInt(quantValor.innerHTML) - 1;
  precoValor.innerHTML = parseFloat(
    quantValor.innerHTML * prod_array[index].prod_preco
  ).toFixed(2);
  calculaTotal();
}
