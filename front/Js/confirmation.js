// récuperer les paramètres d'URL
let str = window.location.href;
let url = new URL(str);
const orderId = url.searchParams.get("orderId");
console.log(orderId, "cool");
const orderNumber = document.getElementById("orderId");
orderNumber.innerHTML += `${orderId}`;

localStorage.clear();
