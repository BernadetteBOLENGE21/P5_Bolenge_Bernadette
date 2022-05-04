// récupérer les paramètres d'URL de l'objet id

let str = window.location.href
let url = new URL(str); 
let idProduct = url.searchParams.get("id"); 


console.log(idProduct); 

// Récupérer les données de l'API relatif à l'objet id 

getProducts(); 

function getProducts(){
    fetch("http://localhost:3000/api/products/" + idProduct)
    .then(function(response) {
        return response.json(); 
    })
    .then(function(data) {
        console.table(data); 
        printItem(data); 
    })
    .catch (function(error){
        alert(error);  
    })
}

function printItem(article){

    let itemImg = document.querySelector("article > .item__img")
    console.log(itemImg); 

    // implémentation de l'élement img
    const selectImg = document.createElement("img"); 
    itemImg.appendChild(selectImg); 
    selectImg.setAttribute("src", article.imageUrl)
    selectImg.setAttribute("alt", article.altTxt)

    // implémentation du titre
    let title1 = document.getElementById("title")
    console.log(title1); 
    title1.textContent = article.name

    //implémentation de la description 
    let description1 = document.getElementById("description"); 
    console.log(description1); 
    description1.textContent = article.description
}

