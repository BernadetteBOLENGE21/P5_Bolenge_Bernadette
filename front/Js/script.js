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
getProducts (); 

// Introduction des produits dans la page d'accueil 

async function printItems(articles){
        
    const items = document.getElementById("items");
    console.log(items); 

    
    // Boucle pour réitération des éléments
    for (let i=0; i < articles.length; i++) {
        console.log(articles[i])

        const produit = articles[i];

        console.log(produit)

        const linkProducts = document.createElement("a");
        items.appendChild(linkProducts);
        const url = "/product.html?id=" + produit._id;
        linkProducts.setAttribute("href", url)

        const article = document.createElement("article"); 
        linkProducts.appendChild(article);

        const image = document.createElement("img"); 
        article.appendChild(image);
        image.setAttribute("src", produit.imageUrl);

        //const h3Element = document.createElement(h3)

    }
       
    

}
