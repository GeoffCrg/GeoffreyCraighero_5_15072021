//Convertir le javascript en json
let InLocalStorage = JSON.parse(localStorage.getItem("produit"));

console.log(InLocalStorage);

// affichage des produits du panier

//selection de la class ou je vais inserer le code html
const displayPanier = document.querySelector("#panier-recap");

//Si le panier est vide
if (InLocalStorage === null || InLocalStorage == 0) {
  const panierVide = `<div class="container-panier-vide">
  <div> Le panier est vide</div>
  </div>`;

  displayPanier.innerHTML = panierVide;
} else {
  //Si le panier n'est pas vide alors je prend mes produits dans le local storage
  let structureProduitPanier = [];

  for (i = 0; i < InLocalStorage.length; i++) {
    console.log("Nombre de produit" + " " + InLocalStorage.length);

    structureProduitPanier =
      structureProduitPanier +
      `       <div id="panierContent">
        
        
        <img id="imgRecap" src=${
          InLocalStorage[i].imgProduit
        } alt="photos produits" />
        
          <div> quantité 1 ${InLocalStorage[i].nomProduit}</div>
          <div>${InLocalStorage[i].prixProduit / 100} €</div>
          <button class="btnSupp">Supprimer le produit</button>
        </div>
        
        
      `;
  }
  if (i === InLocalStorage.length) {
    displayPanier.innerHTML = structureProduitPanier;
  }
  //injection du code html
}

//Gestion du boutton pour supprimer l'article

let btnSupprimer = document.querySelectorAll(".btnSupp");

for (let a = 0; a < btnSupprimer.length; a++) {
  btnSupprimer[a].addEventListener("click", (event) => {
    event.preventDefault();

    //selection de l'id au click sur supprimer
    let idSupp = InLocalStorage[a].idProduit;

    InLocalStorage = InLocalStorage.filter((el) => el.idProduit !== idSupp);
    //on renvoi dans le local storage
    localStorage.setItem("produit", JSON.stringify(InLocalStorage));
    console.log(InLocalStorage);
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

for (let p = 0; p < InLocalStorage.length; p++) {
  let prixPanier = InLocalStorage[p].prixProduit / 100;

  ///mettre les prix du panier dans la variable  prixtotalclalcul
  prixTotalCalcul.push(prixPanier);
}
//additioner les prix de prix total calcul
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const prixTotal = prixTotalCalcul.reduce(reducer, 0);

//inserer dans le html
const affichageprixTotal = `<div class ="affichagePrix">Le prix total est de : ${prixTotal} € </div>
 `;

//injection
displayPanier.insertAdjacentHTML("beforeend", affichageprixTotal);

//Affichage du formulaire

const addHTMLFormulaire = () => {
  //Selection element du DOM pour le positionnement du html
  const DOMFormulaire = document.querySelector("#containerFormulaire");

  const displayFormulaire = `

<h2>Validez votre formulaire pour passer la commande</h2>

<form action="#">
<label for="prenom">Prenom</label>
<input type="text" id="prenom" name="prenom" required>

<label for="nom">nom</label>
<input type="text" id="nom" name="nom" required>

<label for="adresse">adresse</label>
<input type="text" id="adresse" name="adresse" required>

<label for="ville">Ville</label>
<input type="text" id="ville" name="ville" required>

<label for="E-mail">E-mail</label>
<input type="email" id="e-mail" name="E-mail" required>

<button id="envoyerFormulaire" type="submit" name="evoyerFormulaire">Envoyer votre formulaire</button>

</form>

`;
  DOMFormulaire.insertAdjacentHTML("beforeend", displayFormulaire);
};

addHTMLFormulaire();
//addEventListener boutton
//selection du boutton Envoyer le formulaire
const btnSubmit = document.querySelector("#envoyerFormulaire");

btnSubmit.addEventListener("click", (event) => {
  event.preventDefault();

  //recuperation des valeurs du formulaire
  const formulaireValues = {
    prenom: document.querySelector("#prenom").value,
    nom: document.querySelector("#nom").value,
    adresse: document.querySelector("#adresse").value,
    ville: document.querySelector("#ville").value,
    email: document.querySelector("#e-mail").value,
  };

  /////////////////Validation du formulaire///////////////////
  const regExPrenomNomVille = (value) => {
    return /^[A-Za-z]{2,20}$/.test(value);
  };

  const regExAdresse = (value) => {
    return /^[A-Za-z0-9\s]{2,50}$/.test(value);
  };

  const regExEmail = (value) => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
  };

  const textAlertForm = (value) => {
    return `${value}: Chiffre et symboles ne sont pas autorisés \n Ne pas despasser 20 caractères Min 3 caractères`;
  };

  function controlePrenom() {
    const checkPrenom = formulaireValues.prenom;
    if (regExPrenomNomVille(checkPrenom)) {
      console.log("OK");
      return true;
    } else {
      alert(textAlertForm("prenom"));
      return false;
    }
  }
  function controleNom() {
    const checkNom = formulaireValues.nom;
    if (regExPrenomNomVille(checkNom)) {
      return true;
    } else {
      alert(textAlertForm("nom"));
      return false;
    }
  }
  function controleVille() {
    const checkVille = formulaireValues.ville;
    if (regExPrenomNomVille(checkVille)) {
      return true;
    } else {
      alert(textAlertForm("ville"));
      return false;
    }
  }
  function controleAdresse() {
    const checkAdresse = formulaireValues.adresse;
    if (regExAdresse(checkAdresse)) {
      return true;
    } else {
      alert("Veuillez renseignez une adresse valide ");
      return false;
    }
  }
  function controleEmail() {
    const checkEmail = formulaireValues.email;
    if (regExEmail(checkEmail)) {
      return true;
    } else {
      alert("Veuillez renseigner une adresse  email valide");
      return false;
    }
  }
  if (
    controlePrenom() &&
    controleNom() &&
    controleVille() &&
    controleAdresse() &&
    controleEmail()
  ) {
    //Mettre l'objet formulaireValues dans le local storage
    localStorage.setItem("formulaireValues", JSON.stringify(formulaireValues));
  } else {
    alert("Veuillez bien remplir le formulaire");
  }

  fetch("http://localhost:3000/api/cameras"),
    {
      method: "post",
      body: JSON.stringify(formulaireValues),
      Headers: {
        "Content-Type": "application/json",
      },
    };

  ///// mettre le formulaire et les produits du panier pour les envoyé vers le serveurs
  ///envoie de l'objet au serveur
  const sendOrder = {
    formulaireValues,
    InLocalStorage,
  };
  console.log(sendOrder);
});
const dataLocalStorage = localStorage.getItem("formulaireValues");
// ///Garder les valeurs dans le formulaire
// //Convertir la chaine de caractere en objet javascript
const dataLocalStorageObjet = JSON.parse(dataLocalStorage);
// console.log(dataLocalStorageObjet);

// //mettre les values du local storage dans les champs du formulaire
function GarderValues(input) {
  document.querySelector(`#${input}`).value = dataLocalStorageObjet[input];
}
GarderValues("prenom");
GarderValues("nom");
GarderValues("adresse");
GarderValues("ville");
GarderValues("e-mail");

///////////////////////////Fin/////////////////////////////////////////////////
