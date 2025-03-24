const img = document.querySelector(".section-img");
const defaultImg = img.src;
document.addEventListener("DOMContentLoaded", async function () {
  const swiperWrapper = document.querySelector(".swiper-wrapper");

  try {
    const response = await fetch("https://api.escuelajs.co/api/v1/products");
    const products = await response.json();

    products.forEach((product, index) => {
      const slide = document.createElement("div");
      slide.classList.add("swiper-slide");

      slide.innerHTML = `
      <div class="product-container">
        <div class="product-title">
            <h2>${product.title}</h2>
            <div class="price">
                <p>€${parseFloat(product.price).toFixed(2)}</p>
                <p>€${parseFloat(product.price).toFixed(2)}</p>
            </div>
        </div>
            <img width="100%" class="product-img"  src="${
              product.images[0]
            }" alt="${product.images[0]}">
        </div>
      `;
      swiperWrapper.appendChild(slide);
    });

    const swiper = new Swiper(".swiper", {
      spaceBetween: 10,
      slidesPerView: 1.2,
      direction: "horizontal",
      loop: true,
      pagination: { el: ".swiper-pagination", dynamicBullets: true },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        750: {
          slidesPerView: 1,
        },
      },
      scrollbar: { el: ".swiper-scrollbar" },
    });

    swiper.on("slideChange", function () {
      if (swiper.realIndex != 0) {
        img.src = products[swiper.realIndex]?.images[2] || defaultImg;
        img.alt =
          products[swiper.realIndex]?.images[2] ||
          `Imagen destacada ${swiper.realIndex}`;
      } else {
        img.src = defaultImg;
        img.alt = "Imagen destacada";
      }
    });
  } catch (error) {
    console.error("Error al cargar las imágenes:", error);
  }
});
