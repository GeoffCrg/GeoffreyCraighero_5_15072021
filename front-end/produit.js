const ID = window.location.search.substring(1);

fetch(`http://localhost:3000/api/cameras/${ID}`)
  .then((response) => response.json())
  .then(function (product) {
    let camera = new Camera(product);
    console.log(camera);
    display(camera);
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
        <select id="options">
        <option value="">--Choisir Lenses--</option>
        <option value="">--Lenses1--</option>
        <option value="">--Lenses2--</option>
        <option value="">--Lenses3--</option>
        </select>
       
    </article>`;
};
