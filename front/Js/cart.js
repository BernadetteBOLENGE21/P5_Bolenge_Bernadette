let cart = JSON.parse(localStorage.getItem("cart"));
console.log(cart);

//----------------------Affichage des produits présents dans le panier--------------------//

//------------------Injection du code de façon dynamique-------------------//
let shoppingCart = document.getElementById("cart__items");
let promises = [];

for (let i = 0; i < cart.length; i++) {
  const url = "http://localhost:3000/api/products/";
  // console.log(cart[i].id);

  const promise = fetch(url + cart[i].id).then((res) => res.json());
  promises.push(promise);
}

function displayProducts(values) {
  let cartElements = "";
  for (i = 0; i < cart.length; i++) {
    console.log(cart.length);
    cartElements += `<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
      <div class="cart__item__img">
        <img src="${values[i].imageUrl}" alt="Photographie d'un canapé">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>${values[i].name}</h2>
          <p>${cart[i].color} </p>
          <p>${values[i].price}</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cart[i].quantity}">
          </div>
          <div class="cart__item__content__settings__delete">
            <button class="deleteItem">Supprimer</button>
          </div>
        </div>
      </div>
    </article>`;

    // console.log("cartElements ", cartElements);
  }
  shoppingCart.innerHTML = cartElements;
}

//si le panier est vide
if (!cart) {
  shoppingCart.innerHTML = "<p>Votre panier est vide<p>";
} else {
  // si le panier n'est pas vide afficher les produits dans le panier
  Promise.all(promises).then((values) => {
    console.log("VALUES ", values);
    displayProducts(values);

    let deleteButtons = document.querySelectorAll(".deleteItem");

    deleteItem(deleteButtons);
  });
}

function deleteItem(items) {
  for (let i = 0; i < items.length; i++) {
    items[i].addEventListener("click", (event) => {
      event.preventDefault();

      let idDuProduitSupprime = cart[i].id;

      // Supprimer les produits aux ids correspondants
      let nouveauPanier = cart.filter(function (item) {
        // Retourne un tableau avec des éléments qui sont differents du produit cliqué
        return item.id !== idDuProduitSupprime;
      });
      console.log(nouveauPanier);

      localStorage.setItem("cart", JSON.stringify(nouveauPanier));
    });
  }
}

const firstName = document.querySelector("#firstName").value;
const lastName = document.querySelector("#lastName").value;
const address = document.querySelector("#address").value;
const city = document.querySelector("#city").value;
const email = document.querySelector("#email").value;

const sendForm = document.querySelector("#order");

sendForm.addEventListener("click", (e) => {
  e.preventDefault();

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
    //---------controle de la validité du prenom  regex

    if (regExFirstNameNameCity(formValues.lastName)) {
      return true;
    } else {
      document.getElementById("lastNameErrorMsg").innerHTML =
        "Veuillez entrez un nom valide";
      return false;
    }
  }

  function controlCity() {
    //---------controle de la validité du prenom  regex

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
    //---------controle de la validité du prenom  regex

    if (regexEmail(email)) {
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

    localStorage.setItem("formulaireValues", JSON.stringify(formulaireValues));
  } else {
    return false;
  }

  // fetch url envoi des données au serveur

  const orderPromise = fetch(`http://localhost:3000/api/products/order`, {
    method: "POST",
    // envoi de l'objet contact et de la variable products en "POST"
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
