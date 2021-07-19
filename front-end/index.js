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
        <img src=${camera.imageUrl} alt="photos produits" />
        <div class="bloqueDescription">
            <h2> ${camera.name}</h2>
            <p>${camera.price / 100}€</p>
        </div>
        <p>${camera.description}</p>
       <a href="produit.html?${camera.id}"> En savoir plus</a>
    </article>`;
};
