//Convertir le javascript en json
let InLocalStorage = JSON.parse(localStorage.getItem("produit"));

console.log(InLocalStorage);

// affichage des produits du panier

//selection de la class ou je vais inserer le code html
const displayPanier = document.querySelector("#panier-recap");
console.log(displayPanier);

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
console.log(btnDelAll);

//suppression de la key produit du localstorage

btnDelAll.addEventListener("click", (e) => {
  e.preventDefault();

  //removeItem pour vider le localStorage
  localStorage.removeItem("produit");
  window.location.href = "panier.html";
  alert("Le panier a été vider");
});



//////////////////Calculer le prix total du panier/////////////////////////////

let prixTotalCalcul =[];

////prendre les prix du panier

for(let p = 0; p < InLocalStorage.length ; p++){
  let prixPanier = InLocalStorage[p].prixProduit / 100;

///mettre les prix du panier dans la variable  prixtotalclalcul
  prixTotalCalcul.push(prixPanier);
    console.log(prixTotalCalcul);

   
}
 //additioner les prix de prix total calcul
 const reducer = (accumulator, currentValue) => accumulator + currentValue
 const prixTotal = prixTotalCalcul.reduce(reducer,0);
 console.log(prixTotal)


 //inserer dans le html
 const affichageprixTotal =`<div class ="affichagePrix">Le prix total est de : ${prixTotal} € </div>
 `

 //injection 
 displayPanier.insertAdjacentHTML("beforeend", affichageprixTotal);