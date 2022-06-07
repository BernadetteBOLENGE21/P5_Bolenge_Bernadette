//-----------------------------récupérer les paramètres d'URL de l'objet id----------------------------------//

let str = window.location.href;
let url = new URL(str);
let idProduct = url.searchParams.get("id");

console.log(idProduct);

//--------------------------Récupérer les données de l'API relatif à l'objet id-----------------------------//

fetch("http://localhost:3000/api/products/" + idProduct)
  .then(function (response) {
    return response.json();
  })
  .then(function (article) {
    console.table(article);
    printItem(article);
    addToCartEvent(article);
  })
  .catch(function (error) {
    alert(error);
  });

function printItem(article) {
  let itemImg = document.querySelector("article > .item__img");
  console.log(itemImg);

  // implémentation de l'élement img
  const selectImg = document.createElement("img");
  itemImg.appendChild(selectImg);
  selectImg.setAttribute("src", article.imageUrl);
  selectImg.setAttribute("alt", article.altTxt);

  // implémentation du titre
  let title1 = document.getElementById("title");
  console.log(title1);
  title1.textContent = article.name;

  // implémentation du prix
  let price1 = document.getElementById("price");
  console.log(price1);
  price1.textContent = article.price;

  //implémentation de la description
  let description1 = document.getElementById("description");
  console.log(description1);
  description1.textContent = article.description;

  let color1 = document.getElementById("colors");
  console.log(color1);

  let colors = article.colors;

  //------------------------Mise en place d'une boucle pour parcourir le choix des couleurs------------------//

  for (let color of colors) {
    let productColor = document.createElement("option");
    color1.appendChild(productColor);
    productColor.value = color;
    productColor.innerHTML = color;
  }
}

//---------------------------------Ajout des produits dans le panier----------------------------------//

//----------------------------------------------Bouton-----------------------------------------------//

function addToCartEvent(article) {
  // Pourquoi y a un paramètre dans ta fonction alors que tu l'utilise pas? - Bianca

  //Ecoute et réaction lors du clic sur le bouton
  const button = document.getElementById("addToCart");
  button.addEventListener("click", function (event) {
    event.preventDefault();
    //Options choisies de l'utilisateur
    const colorPickedElt = document.getElementById("colors");
    const colorPicked = colorPickedElt.value;

    const quantityPickedElt = document.getElementById("quantity");
    const quantityPicked = quantityPickedElt.value;

    //----------------------------------------Local Storage----------------------------------------//
    //--------------Stocker la récupération des valeurs du formulaire dans le local storage--------//

    let product = {
      id: idProduct,
      quantity: Number(quantityPicked),
      color: colorPicked,
    };
    //---JSON.parse pour convertir les données JSON présentes dans le Ls en objet javascript

    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = [];
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    let productExists = false;
    for (i = 0; i < cart.length; i++) {
      if (cart[i].id === product.id && cart[i].color === product.color) {
        productExists = true;
        cart[i].quantity += product.quantity;
        break;
      }
    }

    if (!productExists) {
      cart.push(product);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  });
}
