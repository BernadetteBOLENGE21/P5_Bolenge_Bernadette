let cart = JSON.parse(localStorage.getItem("cart")); // définition du panier
console.log(cart);

//----------------------Affichage des produits présents dans le panier--------------------//

//------------------Injection du code de façon dynamique-------------------//
let shoppingCart = document.getElementById("cart__items");
let promises = [];
const url = "http://localhost:3000/api/products/";
///--------- Cette boucle récupère les produits de l'API en page cart. Il faut une boucle pour traiter les promesses
//qui seront mises dasn un tableau qu'on pourra gérer avec promises.all. On boucle pour récupérer les produits du LS
for (let i = 0; i < cart.length; i++) {
  // console.log(cart[i].id);
  //On appelle l'API pour récupérer toutes les infos des produits présents dans le local storage et on push dans le tableau promises
  //afin de de gérer avec promises.all qui va gérer toutes les promessess en même temps. Il répond losque toutes les promesses sont résolues
  const promise = fetch(url + cart[i].id).then((res) => res.json());
  promises.push(promise);
}

function displayProducts(products) {
  let cartElements = "";
  for (j = 0; j < cart.length; j++) {
    console.log(cart.length);
    cartElements += `<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
      <div class="cart__item__img">
        <img src="${products[j].imageUrl}" alt="Photographie d'un canapé">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>${products[j].name}</h2>
          <p>${cart[j].color} </p>
          <p>${products[j].price}€</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cart[j].quantity}">
          </div>
          <div class="cart__item__content__settings__delete">
            <button class="deleteItem">Supprimer</button>
          </div>
        </div>
      </div>
    </article>`;
  }
  shoppingCart.innerHTML = cartElements;
}

//si le panier est vide
if (!cart) {
  shoppingCart.innerHTML = "<p>Votre panier est vide<p>";
} else {
  // si le panier n'est pas vide afficher les produits dans le panier.
  Promise.all(promises).then((products) => {
    console.log(products);
    displayProducts(products);
    getTotal(products);
    modifyQtt(products);

    let deleteButtons = document.querySelectorAll(".deleteItem");
    deleteItem(deleteButtons);
  });
}
// ------ Boucler sur les boutons de suppression--------
function deleteItem(items) {
  for (let k = 0; k < items.length; k++) {
    items[k].addEventListener("click", () => {
      let idDuProduitSupprime = cart[k].id;
      let colorDuProduitSupprime = cart[k].color;

      // Supprimer les produits aux ids correspondants
      cart = cart.filter(function (item) {
        // Retourne un tableau avec des éléments qui sont differents du produit cliqué
        return (
          item.id !== idDuProduitSupprime &&
          item.color !== colorDuProduitSupprime
        );
      });
      console.log(cart);
      localStorage.setItem("cart", JSON.stringify(cart));
    });
  }
}

//------------------Récupération du total des quantités--------------------
//------Un tableau pour y mettre les prix présents dans le LS----------

function getTotal(items) {
  let totalPrice = [];
  let totalQuantity = [];
  let productInTheCart = [];
  //let quantityInTheCart = [];

  for (let l = 0; l < cart.length; l++) {
    productInTheCart = cart[l].quantity *= items[l].price;
    totalPrice.push(productInTheCart);
    console.log(totalPrice);

    quantityInTheCart = cart[l].quantity;
    console.log(quantityInTheCart);
    totalQuantity.push(quantityInTheCart);
    console.log(totalQuantity);
  }

  //---- Additionner les totaux avec la méthode reduce qui est un accumulateur qui traite chaque valeur d'une liste afin de la réduire à une seule valeur-----
  const reducer = (accumulator, currentValue) => accumulator + currentValue;

  let totals = totalPrice.reduce(reducer, 0);
  console.log(totals);

  let allQuantity = totalQuantity.reduce(reducer);
  console.log(allQuantity);

  let cartPrice = document.querySelector(".cart__price");
  console.log(cartPrice);
  const displayTotalPrice = `
        <div class="cart__price">
            <p>Total (<span id="totalQuantity">${allQuantity}</span> articles) : <span id="totalPrice">${totals}</span> €</p>
        </div>
    `;
  console.log(displayTotalPrice);

  cartPrice.innerHTML = ("beforeend", displayTotalPrice);
}

function modifyQtt(items) {
  const optionQtt = document.querySelectorAll(".itemQuantity");
  console.log("optionQtt");

  for (let h = 0; h < optionQtt.length; h++) {
    optionQtt[h].addEventListener("change", () => {
      let changeQuantity = cart[h].quantity;
      let quantityValue = optionQtt[h].valueAsNumber;

      let resultFind = cart.find(
        (element) => element.quantityValue !== changeQuantity
      );

      resultFind.quantity = quantityValue;

      localStorage.setItem("cart", JSON.stringify(cart));

      //----- refresh rapide--------
      location.reload();
    });
  }
}

//------- création des variable dans lesquels iront les valeurs du formulaires-------
const firstName = document.querySelector("#firstName").value;
const lastName = document.querySelector("#lastName").value;
const address = document.querySelector("#address").value;
const city = document.querySelector("#city").value;
const email = document.querySelector("#email").value;

const sendForm = document.querySelector("#order");

sendForm.addEventListener("click", (e) => {
  e.preventDefault();
  // Utilisation des regex pour une validation plus complexe
  const regExFirstNameNameCity = (value) => {
    return /^([A-Za-z]{0,20})?([-]{0,1})?([A-Za-z]{0,20})$/.test(value);
  };

  const regexEmail = (value) => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
  };

  const regexAdress = (value) => {
    return /^[A-Za-z0-9\s]{5,60}$/.test(value);
  };

  const formValues = {
    firstName: firstName,
    lastName: lastName,
    address: address,
    city: city,
    email: email,
  };
  //-------------- controle de la validité du prénom regex
  function firstNameControl() {
    if (regExFirstNameNameCity(firstName)) {
      return true;
    } else {
      document.getElementById("firstNameErrorMsg").innerHTML =
        "Veuillez entrez un prénom valide";
      return false;
    }
  }

  function lastNameControl() {
    //---------controle de la validité du nom  regex

    if (regExFirstNameNameCity(formValues.lastName)) {
      return true;
    } else {
      document.getElementById("lastNameErrorMsg").innerHTML =
        "Veuillez entrez un nom valide";
      return false;
    }
  }

  function controlCity() {
    //---------controle de la validité de la ville  regex

    if (regExFirstNameNameCity(formValues.city)) {
      return true;
    } else {
      document.getElementById("cityErrorMsg").innerHTML =
        "Veuillez entrez une ville valide";
      return false;
    }
  }
  function controlAdress() {
    //---------controle de la validité de l'adresse

    if (regexAdress(formValues.address)) {
      return true;
    } else {
      document.getElementById("addressErrorMsg").innerHTML =
        "Veuillez entrez une adresse valide";
      return false;
    }
  }

  function controlEmail() {
    //---------controle de la validité de l'email  regex

    if (regexEmail(formValues.email)) {
      return true;
    } else {
      document.getElementById("emailErrorMsg").innerHTML =
        "Veuillez entrez un email valide";
      return false;
    }
  }

  if (
    firstNameControl() &&
    lastNameControl() &&
    controlCity() &&
    controlEmail() &&
    controlAdress()
  ) {
    //mettre l'obj ds "formulaire values" ds le local storage

    localStorage.setItem("formulaireValues", JSON.stringify(formulairesValues));
  } else {
    return false;
  }

  // fetch url envoi des données au serveur

  const orderPromise = fetch(`http://localhost:3000/api/products/order`, {
    method: "POST",
    // envoi des données formValues et cart avec une requête "POST"
    body: JSON.stringify({
      formValues,
      cart,
    }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  orderPromise.then(async (data) => {
    try {
      const contenu = await data.json();
      // puis récupérer dans la réponse le numéro de commande "orderId"

      orderId = contenu.orderId;

      // redirection de l'utilisateur vers la page confirmation.html

      window.location.href = `./confirmation.html?orderId=${orderId}`;
    } catch (e) {
      alert("Problème avec fetch : " + err.message);
    }
  });
});
