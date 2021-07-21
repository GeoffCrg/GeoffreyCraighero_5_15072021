const ID = window.location.search.substring(1);

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

const display = (camera) => {
  produit.innerHTML += `
    <article id="cardsProduct"">
        <img src=${camera.imageUrl} alt="photos produits" />
        <div class="bloqueDescription">
            <h2> ${camera.name}</h2>
            <p>${camera.price / 100}€</p>
        </div>
        <p>${camera.description}</p>
        <form>
        <label for="option_produit"></label>
        <select name="option_produit" id="select" >
          <option  value="">--choisisez une lentille--</option>
        </select>
        </form>
        
    </article>`;
  //Choix des lentilles

  for (let lenses of camera.lenses) {
    document.getElementById(
      "select"
    ).innerHTML += `<option id="option" value="${lenses}">${lenses}</option>`;
  }
};

//Fonction pour ajouter un produit au panier

//selectionner le bouton pour envoyer au panier

const btn_addBasket = document.getElementById("btn-basket");

const click = (camera) => {
  btn_addBasket.addEventListener("click", (event) => {
    event.preventDefault();
    //Prendre le choix de lenses
    let idForm = document.getElementById("option");
    let value = idForm;
    console.log(idForm.value);
    let SelectProduct = {
      idProduit: camera.id._id,
      nomProduit: camera.name,
      prixProduit: camera.price,
      imgProduit: camera.imageUrl,
      LenseProduct: idForm.value,
    };
    console.log(SelectProduct);
    ///--------------------Local storage---------------///

    //stocker la récuperation des valeurs du formulaire dans le local storage

    //declaration de la variable///
    //fonction fenetre popup

    const popupConfirmation = () => {
      if (
        window.confirm(`${camera.name} avec la lentille ${idForm.value} ont bien été ajouter au panier
      Consultez le panier ok ou consultez nos autres produits`)
      ) {
        window.location.href = "panier.html";
      } else {
        window.location.href = "index.html";
      }
    };

    //Convertir le javascript en json
    let InLocalStorage = JSON.parse(localStorage.getItem("produit"));

    //si il ya deja des produit dan le local storage
    if (InLocalStorage) {
      console.log("ok");
      InLocalStorage.push(SelectProduct);
      localStorage.setItem("produit", JSON.stringify(InLocalStorage));
      console.log(InLocalStorage);
      popupConfirmation();
    }
    //Si il n'y a pas de produit d'enregistré dans le local storage
    else {
      InLocalStorage = [];
      InLocalStorage.push(SelectProduct);
      localStorage.setItem("produit", JSON.stringify(InLocalStorage));
      console.log(InLocalStorage);
      popupConfirmation();
    }
  });
};
