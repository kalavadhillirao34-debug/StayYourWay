// console.log("SCRIPT LOADED");

/* ============================
   BOOTSTRAP FORM VALIDATION
============================ */
(() => {
  "use strict";

  const forms = document.querySelectorAll(".needs-validation");

  Array.from(forms).forEach(form => {
    form.addEventListener(
      "submit",
      event => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
})();

/* ============================
   FILTER + ANIMATION LOGIC
============================ */
document.addEventListener("DOMContentLoaded", () => {
  const filterItems = document.querySelectorAll(".filter-item");
  const cards = document.querySelectorAll(".listing-card");

  filterItems.forEach(filter => {
    filter.addEventListener("click", () => {
      const selectedCategory = filter.dataset.category;

      // active filter UI
      filterItems.forEach(f => f.classList.remove("active"));
      filter.classList.add("active");

      cards.forEach(card => {
        const cardCategory = card.dataset.category;

        // fade out first
        card.classList.add("fade-out");

        setTimeout(() => {
          if (
            selectedCategory === "all" ||
            cardCategory === selectedCategory
          ) {
            card.style.display = "block";
            card.classList.remove("fade-out");
            card.classList.add("fade-in");
          } else {
            card.style.display = "none";
          }
        }, 200);
      });
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const taxToggle = document.getElementById("taxToggle");
  const prices = document.querySelectorAll(".listing-price");

  if (!taxToggle || prices.length === 0) return;

  const TAX_RATE = 0.18; // 18%

  taxToggle.addEventListener("change", () => {
    prices.forEach(priceEl => {
      const basePrice = Number(priceEl.dataset.price);
      const priceSpan = priceEl.querySelector(".price-value");

      if (!basePrice || !priceSpan) return;

      // animation
      priceSpan.classList.add("price-animate");

      setTimeout(() => {
        if (taxToggle.checked) {
          const total = Math.round(basePrice * (1 + TAX_RATE));
          priceSpan.innerText = total.toLocaleString("en-IN");
        } else {
          priceSpan.innerText = basePrice.toLocaleString("en-IN");
        }

        priceSpan.classList.remove("price-animate");
      }, 200);
    });
  });
});


const range = document.getElementById("priceRange");
const minLabel = document.getElementById("priceMin");
const maxLabel = document.getElementById("priceMax");
const applyBtn = document.getElementById("applyPrice");

let minPrice = 500;

range?.addEventListener("input", () => {
  minLabel.innerText = minPrice.toLocaleString("en-IN");
  maxLabel.innerText = Number(range.value).toLocaleString("en-IN");
});

applyBtn?.addEventListener("click", () => {
  const url = new URL(window.location.href);
  url.searchParams.set("minPrice", minPrice);
  url.searchParams.set("maxPrice", range.value);
  window.location.href = url.toString();
});

document.addEventListener("DOMContentLoaded", () => {
  const flashMessages = document.querySelectorAll(".flash-msg");

  flashMessages.forEach(msg => {
    setTimeout(() => {
      msg.classList.remove("show");
      msg.classList.add("fade");

      setTimeout(() => msg.remove(), 300); // remove from DOM
    }, 1000); // ⏱ 3 seconds
  });
});





