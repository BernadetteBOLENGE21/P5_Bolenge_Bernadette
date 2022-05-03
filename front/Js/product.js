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

    const selectImg = document.createElement("img"); 
    itemImg.appendChild(selectImg); 

    //selectImg.setAttribute("src",  )

}

