//Recuperation des donnees de l'url
let paramsUrl = new URL(window.location).searchParams;

let orderId = paramsUrl.get("orderId");

//Recuperation des contact
let contact = JSON.parse(localStorage.getItem("contact"));

// Recuperation du prix total
let prixTotal = JSON.parse(localStorage.getItem("prixTotal"));

// Affichage Html
function display() {
  confirmation.innerHTML += `
        <p>
        Merci  ${contact.firstName} ${contact.lastName} 
        </p>
        
        <p>Nous avons bien reçu votre commande N° ${orderId} </br>
        D'un montant de ${prixTotal} €  </br>
        </p>
        <p>Un email vous sera envoyer à l'adresse : </br> ${contact.email} a l'envoi de votre commande  
    `;
}

display();
