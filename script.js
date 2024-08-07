//table de kullanılan değişkenler
const shipping = 15.0;
const tax = 0.18;

let basket = [
  {
    name: "Shoulder Laptop Bag",
    price: 44.99,
    piece: 1,
    img: "./img/photo1.jpeg",
  },
  { name: "dumbbells", price: 24.99, piece: 1, img: "./img/photo2.jpeg" },
  { name: "Vintage Backpack", price: 34.99, piece: 1, img: "./img/photo1.png" },
  { name: "Levi Shoes", price: 40.99, piece: 1, img: "./img/photo2.png" },
  { name: "Antique Clock", price: 69.99, piece: 1, img: "./img/photo3.jpg" },
];

basket.forEach(({ name, price, piece, img }) => {
  document.querySelector("#product-rowlari").innerHTML += `
  <div class="card mb-3" style="max-width: 540px;">

<div class="row ">

  <div class="col-md-5 ">
    <img src=${img}  class=" w-100 rounded-start" alt="...">
  </div>

  <div class="col-md-7 ">

    <div class="card-body">
    
      <h5 class="card-title">${name}</h5>
      
           <div class="ürün-price">
                  <p class="text-warning h2">$
                    <span class="indirim-price">${(price * 0.7).toFixed(
                      2
                    )} </span>
                    <span class="h5 text-dark text-decoration-line-through">${price}</span>
                  </p>
                </div>

                
                <div
                  class="border border-1 border-dark shadow-lg d-flex justify-content-center p-2"
                >
                  <div class="adet-controller">
                    <button class="btn btn-secondary btn-sm minus">
                      <i class="fas fa-minus"></i>
                    </button>
                    <p class="d-inline mx-4" id="ürün-adet">${piece}</p>
                    <button class="btn btn-secondary btn-sm plus">
                      <i class="fas fa-plus"></i>
                    </button>
                  </div>

                </div>

                <div class="ürün-removal mt-4">
                  <button class="btn btn-danger btn-sm w-100 remove-product">
                    <i class="fa-solid fa-trash-can me-2"></i>Remove
                  </button>
                </div>

                <div class="mt-2">
                  Ürün Toplam: $<span class="product-total">${(
                    price *
                    0.7 *
                    piece
                  ).toFixed(2)} </span>
                </div>
    </div>
  </div>
</div>
</div>
  `;
});
calculateCardTotal();

removeButton();

pieceButton();

function removeButton() {
  document.querySelectorAll(".remove-product").forEach((btn) => {
    btn.onclick = () => {
      btn.closest(".card").remove();

      calculateCardTotal();
    };
  });
}

//Adet değiştirme fonk.

function pieceButton() {
  document.querySelectorAll(".adet-controller").forEach((kutu) => {
    const plus = kutu.lastElementChild;

    const mines = kutu.firstElementChild;

    const adet = plus.previousElementSibling;

    // const adet = kutu.children[1];

    //plus btn basınca olacaklar;

    plus.onclick = () => {
      adet.textContent++;
      plus.closest(".card-body").querySelector(".product-total").textContent = (
        plus.closest(".card-body").querySelector(".indirim-price").textContent *
        adet.textContent
      ).toFixed(2);

      calculateCardTotal();
    };

    mines.onclick = () => {
      adet.textContent--;
      plus.closest(".card-body").querySelector(".product-total").textContent = (
        plus.closest(".card-body").querySelector(".indirim-price").textContent *
        adet.textContent
      ).toFixed(2);

      calculateCardTotal();

      //adet 1 iken mine sa basılırsa ürün ekrandan silinsin.

      if (adet.textContent < 1) {
        alert("Do you want delete");

        mines.closest(".card").remove();
      }
    };
  });
}

function calculateCardTotal() {
  const toplam = document.querySelectorAll(".product-total");

  const pSum = Array.from(toplam).reduce(
    (sum, item) => sum + Number(item.textContent),
    0
  );
  document.querySelector(".productstoplam").textContent = pSum.toFixed(2);

  document.querySelector(".vergi").textContent = (pSum * tax).toFixed(2);

  document.querySelector(".kargo").textContent = pSum ? shipping : 0;

  document.querySelector(".toplam").textContent = pSum
    ? (pSum + pSum * tax + shipping).toFixed(2)
    : 0;
}
