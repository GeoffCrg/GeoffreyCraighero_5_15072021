const ID = window.location.search.substring(1);

//stock de l'id
let params = new URL(document.location).searchParams;

fetch(`http://localhost:3000/api/cameras/${ID}`)
  .then((response) => response.json())
  .then(function (data) {
    let camera = new Camera(data);
    display(camera);
    click(camera);
  })
  .catch(function (err) {
    console.log("fetch Error");
  });

let produit = document.getElementById("produit");
//Insertion du html
const display = (camera) => {
  produit.innerHTML += `
    <article id="cardProduct"">
    <div id="imgdesc">
        <img src=${camera.imageUrl} alt="photos produits" /><p>${
    camera.description
  }</p></div>
        <div class="bloqDescription">
            <h2> ${camera.name}</h2>
            <p>${camera.price / 100}€</p>
        
        
        <form>
        <label for="option_produit">choisisez une lentille</label>
        <select name="option_produit" id="select" >
          <option  value="">choisisez une lentille</option>
        </select>
        </form>
        <form>   <label for="quantite_produit" >Choisisez la quantité</label>
        <select name="quantite_produit" id="quantiteProduit" >
        </select>
        </form>

        
        
        </div>
        
        

    </article>`;
  //Choix des lentilles

  for (let lenses of camera.lenses) {
    document.getElementById(
      "select"
    ).innerHTML += `<option id="option" value="${lenses}">${lenses}</option>`;
  }

  //Afficher la quantité dans le formulaire
  const positionQuantite = document.getElementById("quantiteProduit");
  positionQuantite.innerHTML = structureQuantite;

  console.log(positionQuantite.value);
  //Choisir la quantité possible
};

const structureQuantite = `
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    `;

    
    //selectionner le bouton pour envoyer au panier
    
    const btn_addBasket = document.getElementById("btn-basket");
    
    //Fonction pour ajouter un produit au panier
const click = (camera) => {
  btn_addBasket.addEventListener("click", (event) => {
    //Prendre le choix de lenses
    let idForm = document.getElementById("option");
    let valueL = idForm;
    
    let qtyForm = document.getElementById("quantiteProduit");
    let value = qtyForm;
    

    let SelectProduct = {
      idProduit: camera.id,
      nomProduit: camera.name,
      prixProduit: camera.price * qtyForm.value,
      imgProduit: camera.imageUrl,
      LenseProduct: idForm.valueL,
      quantiteProduit: qtyForm.value,
    };
    console.log(SelectProduct);
    onclick

    ///--------------------Local storage---------------///

    //stocker la récuperation des valeurs du formulaire dans le local storage

    //Convertir le javascript en json
    let InLocalStorage = JSON.parse(localStorage.getItem("produit"));

    //si il ya deja des produit dan le local storage
    if (InLocalStorage) {
      console.log("ok");
      InLocalStorage.push(SelectProduct);
      localStorage.setItem("produit", JSON.stringify(InLocalStorage));
      console.log(InLocalStorage);
    }
    //Si il n'y a pas de produit d'enregistré dans le local storage
    else {
      InLocalStorage = [];
      InLocalStorage.push(SelectProduct);
      localStorage.setItem("produit", JSON.stringify(InLocalStorage));
      console.log(InLocalStorage);
    }
  });
};
