let prod_array = [
  {
    imgPath: "./images/calca.jpg",
    prod_name: "camiseta",
    prod_preco: 100,
    estoque: 5,
  },
  {
    imgPath: "./images/calca.jpg",
    prod_name: "camiseta",
    prod_preco: 10,
    estoque: 5,
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
let total = 0.0;

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
    <span>Preço: R$ <strong class="precoValor"> ${preco} </strong></span>
    </li>
    `;

    carrinho.insertAdjacentHTML("beforeend", liElement);
  }
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
  let totalItem = item.querySelector(".precoValor");

  total = total - totalItem.innerHTML;
  totalValue.innerHTML = parseFloat(total).toFixed(2);

  item.remove();
}


