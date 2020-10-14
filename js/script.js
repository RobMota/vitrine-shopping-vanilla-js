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
  {
    imgPath: "./images/calca.jpg",
    prod_name: "camiseta",
    prod_preco: 10,
    estoque: 5,
  },
  {
    imgPath: "./images/calca.jpg",
    prod_name: "camiseta",
    prod_preco: 10,
    estoque: 5,
  },
  {
    imgPath: "./images/calca.jpg",
    prod_name: "camiseta",
    prod_preco: 10,
    estoque: 5,
  },
  {
    imgPath: "./images/calca.jpg",
    prod_name: "camiseta",
    prod_preco: 10,
    estoque: 5,
  },
  {
    imgPath: "./images/calca.jpg",
    prod_name: "camiseta",
    prod_preco: 10,
    estoque: 5,
  },
  {
    imgPath: "./images/calca.jpg",
    prod_name: "camiseta",
    prod_preco: 10,
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
		<span>Estoque: ${item.estoque}<span class="estoqueValue"></span></span>
			<button class="btn" onclick="comprarItem(${index})">Comprar</button>
      </div>`;

  document
    .querySelector(".produtos")
    .insertAdjacentHTML("beforeend", itemElement);
});

//adicionar item ao carrinho
let spanElement = document.querySelector('.poupup');

function comprarItem(index) {
  spanElement.style.right = 0;
  spanElement.style.display = 'block';
  
  setTimeout( function(){
    spanElement.style.right = '-218px';
    
  }, 2000 )


  let preco = parseFloat(prod_array[index].prod_preco).toFixed(2);

  let liElement = `
  <li>
    <img src=${prod_array[index].imgPath} alt=${prod_array[index].prod_name} />
    <span>Quantidade: <strong class="quantVale"> 0 </strong></span>
    <span>Preço: R$ <strong class="precoValue"> ${preco} </strong></span>
  </li>
`;
    carrinho.insertAdjacentHTML("beforeend", liElement);
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
