// Récupération des éléments de l'API avec la fonction fetch
function getProducts () {
    fetch("http://localhost:3000/api/products")
    .then(function(response) {
        return response.json(); 
    })
    .then(function(data) {
        console.log(data); 
        printItems(data); 
    })
    .catch (function(error){
        alert(error);  
    })
}; 

// affichage des éléments dans le DOM
getProducts(); 

// Introduction des produits dans la page d'accueil 

//Mise en place d'une fonction qui attendra les données de l'API avant d'excuter le reste du cote - Cette fonction contient une boucle
    function printItems(articles){
    // document.GetElementById pour retrouver l'id items
    const items = document.getElementById("items");
    // console.log pour affichage de l'élement dans la console
    console.log(items); 

    
    // Boucle pour réitération des éléments nécessaire car le tableau contient plusieurs articles qui doivent être parcourus. 
    for (let i=0; i < articles.length; i++) {

        // création d'une variable reprenant les données pour plus simplicité et de lisibilité
        const produit = articles[i];
        //console.log(produit)

        // Mise en place de la balise a 
        const linkProducts = document.createElement("a");
        items.appendChild(linkProducts);
        const url = "./product.html?id=" + produit._id;
        linkProducts.setAttribute("href", url)

        // Mise en place de la balise article 
        const article = document.createElement("article"); 
        linkProducts.appendChild(article);

        // Mise en place de la balise image + attribut src 
        const image = document.createElement("img"); 
        article.appendChild(image);
        image.setAttribute("src", produit.imageUrl);

        //Mise en place de la balise h3 + class + text
        const h3Elt = document.createElement("h3"); 
        article.appendChild(h3Elt); 
        h3Elt.classList.add("productName"); 
        h3Elt.textContent = produit.name 

        // Mise en place de la balise p + class + text
        const pElt = document.createElement("p"); 
        article.appendChild(pElt); 
        pElt.classList.add("productDescription"); 
        pElt.textContent = produit.description 

    }
}
