const MAIN_URL = "http://localhost:3000/api/cameras";
// const MAIN_URL = "http://localhost:3000/api/cameras/id";

fetch(MAIN_URL)
  .then((response) => response.json())
  .then(function (listeProduct) {
    for (let product of listeProduct) {
      let camera = new Camera(product);
      display(camera);
      console.log(camera);
    }
  })

  .catch(function (err) {
    console.log("fetch Error");
  });

let container = document.getElementById("container");

const display = (camera) => {

  container.innerHTML += `
    <article id="cardsProduct" class="produit">
    
        <img src=${camera.imageUrl} id="imgProduit" alt="photos produits" />
        <div class="bloqueDescription">
            <h2 id="nameProduct"> ${camera.name}</h2>
            <p id="descriptionProduct">${camera.description}</p>
            <p id="priceProduct">${
              camera.price / 100
            }€</p ><a id="learnMore" href="./pages/produit.html?${
    camera.id
  }"> En savoir plus</a>
        </div>
        
       
    </article>`;

};
