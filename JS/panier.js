//Convertir le javascript en json
let camera = JSON.parse(localStorage.getItem("produit"));

// affichage des produits du panier
//RECUPERATION ID PRODUIT

let addIdBasket = [];

//selection de la class ou je vais inserer le code html
const displayPanier = document.querySelector("#panier-recap");

//Si le panier est vide
if (camera === null || camera == 0) {
  const panierVide = `<div class="container-panier-vide">
  <div> Le panier est vide</div>
  </div>`;

  displayPanier.innerHTML = panierVide;
} else {
  //Si le panier n'est pas vide alors je prend mes produits dans le local storage
  let structureProduitPanier = [];
  for (i = 0; i < camera.length; i++) {
    console.log("Nombre de produit" + " " + camera.length);

    //injection du code html
    structureProduitPanier =
      structureProduitPanier +
      `       <div id="panierContent">
        
        
        <img id="imgRecap" src=${camera[i].imgProduit} alt="photos produits" />
         <p> ${camera[i].nomProduit}</p>
          <p> Quantité ${camera[i].quantiteProduit} </p> 
         
          <p>${camera[i].prixProduit / 100} €</p>
          <button class="btnSupp">Supprimer le produit</button>
        </div>
        
        
      `;

    }
    
    // Boucle pour ajouter chaque cameras
  if (i === camera.length) {
    displayPanier.innerHTML = structureProduitPanier;
  }

}

//Gestion du boutton pour supprimer l'article

let btnSupprimer = document.querySelectorAll(".btnSupp");

for (let a = 0; a < btnSupprimer.length; a++) {
  btnSupprimer[a].addEventListener("click", (event) => {
    event.preventDefault();

    //selection de l'id au click sur supprimer
    let idSupp = camera[a].idProduit;

    camera = camera.filter((el) => el.idProduit !== idSupp);
    //on renvoi dans le local storage
    localStorage.setItem("produit", JSON.stringify(camera));
    console.log(camera);
    window.location.href = "panier.html";
  });
}

//boutton vider le panier

const btnSuppAll = `<button class ="btnSuppPanier">Vider le panier</button>`;

//insertion du boutton dans le html
displayPanier.insertAdjacentHTML("beforeend", btnSuppAll);

//selectionner la ref du boutton
btnDelAll = document.querySelector(".btnSuppPanier");

//suppression de la key produit du localstorage

btnDelAll.addEventListener("click", (e) => {
  e.preventDefault();

  //removeItem pour vider le localStorage
  localStorage.removeItem("produit");
  window.location.href = "panier.html";
  alert("Le panier a été vider");
});

//////////////////Calculer le prix total du panier/////////////////////////////

let prixTotalCalcul = [];

////prendre les prix du panier

for (let p = 0; p < camera.length; p++) {
  let prixPanier = camera[p].prixProduit / 100;

  ///mettre les prix du panier dans la variable  prixtotalcalcul
  prixTotalCalcul.push(prixPanier);
}
//additioner les prix de prix total calcul
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const prixTotal = prixTotalCalcul.reduce(reducer, 0);

//inserer dans le html
const affichageprixTotal = `<p class ="affichagePrix">Le prix total est de : ${prixTotal} € </p>
 `;

//injection
displayPanier.insertAdjacentHTML("beforeend", affichageprixTotal);

//Affichage du formulaire

const addHTMLFormulaire = () => {
  
  const DOMFormulaire = document.querySelector("#containerFormulaire");

  const displayFormulaire = `

<h2 class="formTitle">Validez votre formulaire pour passer la commande</h2>

<form action="#"id="form">
<label for="firstName">Prenom</label><span id="firstNameManquant" class="champsManquant"></span>
<input type="text" id="firstName" name="firstName" required>

<label for="lastName">nom</label><span id="lastNameManquant" class="champsManquant"></span>
<input type="text" id="lastName" name="lastName" required>

<label for="address">adresse</label><span id="addressManquant" class="champsManquant"></span>
<input type="text" id="address" name="address" required>

<label for="city">Ville</label><span id="cityManquant" class="champsManquant"></span>
<input type="text" id="city" name="city" required>

<label for="E-mail">E-mail</label><span id="emailManquant" class="champsManquant"></span>
<input type="email" id="email" name="E-mail" required>

<button id="envoyerFormulaire" type="submit" name="evoyerFormulaire">Envoyer votre formulaire</button>
<div class="champsManquant" id="verifFormulaire"></div>
</form>

`;
  DOMFormulaire.insertAdjacentHTML("beforeend", displayFormulaire);
};

addHTMLFormulaire();
//selection du boutton Envoyer le formulaire
const btnSubmit = document.querySelector("#envoyerFormulaire");

for (let i = 2; i < camera.length; i++) {
  addIdBasket.push(camera[i].idProduit);
  
  console.log(addIdBasket);
}

//addEventListener boutton
btnSubmit.addEventListener("click", (event) => {
  event.preventDefault();

  //recuperation des valeurs du formulaire
  let contact = {
    firstName: document.querySelector("#firstName").value,
    lastName: document.querySelector("#lastName").value,
    address: document.querySelector("#address").value,
    city: document.querySelector("#city").value,
    email: document.querySelector("#email").value,
  };

  function controlForm() {
    /////////////////Validation du formulaire///////////////////
    const regExFirstNameLastNameCity = (value) => {
      return /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/.test(
        value
      );
    };

    const regExAddress = (value) => {
      return /^(([a-zA-ZÀ-ÿ0-9]+[\s\-]{1}[a-zA-ZÀ-ÿ0-9]+)){1,10}$/.test(value);
    };

    const regExEmail = (value) => {
      return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
        value
      );
    };

    const textAlertForm = (value) => {
      return `${value}: Chiffre et symboles ne sont pas autorisés \n Ne pas despasser 20 caractères Min 3 caractères`;
    };

    function controlFirstName() {
      const checkFirstName = contact.firstName;
      if (regExFirstNameLastNameCity(checkFirstName)) {
        document.querySelector("#firstNameManquant").textContent = "";

        return true;
      } else {
        document.querySelector("#firstNameManquant").textContent =
          "Veuillez bien remplir ce champ";
        return false;
      }
    }
    function controlLastName() {
      const checkLastName = contact.LastName;
      if (regExFirstNameLastNameCity(checkLastName)) {
        document.querySelector("#lastNameManquant").textContent = "";
        return true;
      } else {
        document.querySelector("#LastNameManquant").textContent =
          "Veuillez bien remplir ce champ";
        return false;
      }
    }
    function controlCity() {
      const checkCity = contact.city;
      if (regExFirstNameLastNameCity(checkCity)) {
        document.querySelector("#cityManquant").textContent = "";
        return true;
      } else {
        document.querySelector("#cityManquant").textContent =
          "Veuillez bien remplir ce champ";

        return false;
      }
    }
    function controlAddress() {
      const checkAddress = contact.address;
      if (regExAddress(checkAddress)) {
        document.querySelector("#addressManquant").textContent = "";
        return true;
      } else {
        document.querySelector("#addressManquant").textContent =
          "Veuillez renseignez une adresse valide ";

        return false;
      }
    }
    function controlEmail() {
      const checkEmail = contact.email;
      if (regExEmail(checkEmail)) {
        document.querySelector("#emailManquant").textContent = "";
        return true;
      } else {
        document.querySelector("#emailManquant").textContent =
          "Veuillez renseigner une adresse  email valide";

        return false;
      }
    }
    if (
      controlFirstName() &&
      controlLastName() &&
      controlCity() &&
      controlAddress() &&
      controlEmail()
    ) {
      //Mettre l'objet contact dans le local storage

      localStorage.setItem("contact", JSON.stringify(contact));
    } else {
      document.querySelector("#verifFormulaire").textContent =
        "Veuillez bien remplir le formulaire";
      console.log("ko");
    }
  }
  controlForm();
  let products = addIdBasket;
  const sendOrder = JSON.stringify({
    contact,
    products,
  });
  localStorage.setItem("prixTotal", JSON.stringify(prixTotal));
  console.log(sendOrder);

  // APEL API AVEC FETCH // ENVOIE DES DONNEES AVEC POST
  fetch("http://localhost:3000/api/cameras/order", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    mode: "cors",
    body: sendOrder,
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (r) {
      localStorage.setItem("contact", JSON.stringify(r.contact));
      window.location.assign("confirmation.html?orderId=" + r.orderId);
    })
    //SI PROBLEME API
    .catch(function (err) {
      console.log("fetch Error");
    });
});

//Garder les valeurs dans le formulaire
const dataLocalStorage = localStorage.getItem("contact");
//Convertir la chaine de caractere en objet javascript
const dataLocalStorageObjet = JSON.parse(dataLocalStorage);

//mettre les values du local storage dans les champs du formulaire
function remplirInputDepuisLocalStorage(input) {
  document.querySelector(`#${input}`).value = dataLocalStorageObjet[input];
}

remplirInputDepuisLocalStorage("firstName");
remplirInputDepuisLocalStorage("lastName");
remplirInputDepuisLocalStorage("address");
remplirInputDepuisLocalStorage("city");
remplirInputDepuisLocalStorage("email");


