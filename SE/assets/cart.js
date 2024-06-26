class CartRemoveButton extends HTMLElement {
  constructor() {
    super(),
      this.addEventListener("click", (t) => {
        t.preventDefault(),
          this.closest("cart-items").updateQuantity(this.dataset.index, 0);
      });
  }
}
customElements.define("cart-remove-button", CartRemoveButton);
class CartItems extends HTMLElement {
  constructor() {
    super(),
      (this.lineItemStatusElement = document.getElementById(
        "shopping-cart-line-item-status"
      )),
      (this.cartErrors = document.getElementById("cart-errors")),
      (this.currentItemCount = Array.from(
        this.querySelectorAll('[name="updates[]"]')
      ).reduce((t, e) => t + parseInt(e.value), 0)),
      (this.debouncedOnChange = debounce((t) => {
        this.onChange(t);
      }, 300)),
      this.addEventListener("change", this.debouncedOnChange.bind(this));
  }
  onChange(t) {
    null !== t.target &&
      this.updateQuantity(
        t.target.dataset.index,
        t.target.value,
        document.activeElement.getAttribute("name")
      );
  }
  getSectionsToRender() {
    var t = [
      {
        id: "main-cart-items",
        section: document.getElementById("main-cart-items")?.dataset.id,
        selector: ".js-contents",
      },
      { id: "mini-cart", section: "mini-cart", selector: ".shopify-section" },
      {
        id: "cart-icon-bubble",
        section: "cart-icon-bubble",
        selector: ".shopify-section",
      },
      {
        id: "cart-live-region-text",
        section: "cart-live-region-text",
        selector: ".shopify-section",
      },
      {
        id: "main-cart-footer",
        section: document.getElementById("main-cart-footer")?.dataset.id,
        selector: ".js-contents",
      },
    ];
    return (
      document.querySelector("#main-cart-footer .free-shipping") &&
        t.push({
          id: "main-cart-footer",
          section: document.getElementById("main-cart-footer")?.dataset.id,
          selector: ".free-shipping",
        }),
      t
    );
  }
  updateQuantity(n, t, s) {
    this.enableLoading(n);
    var e = this.getSectionsToRender().map((t) => t.section),
      t = JSON.stringify({
        line: n,
        quantity: t,
        sections: e,
        sections_url: window.location.pathname,
      });
    fetch("" + routes.cart_change_url, { ...fetchConfig(), body: t })
      .then((t) => t.text())
      .then((e) => {
        const i = JSON.parse(e);
        const cartItems = i.items;
        const sampleProducts = Array.from(
          document.querySelectorAll("div[data-product-id]")
        ).map((product) => parseInt(product.dataset.productId));
        console.log(sampleProducts);
        const maxSamples = 2;
        let noSamples = 0;
        let totalItems = 0;
        cartItems.forEach((item, index) => {
          if (sampleProducts.includes(item.id)) {
            noSamples++;
          }
          totalItems++;
        });
        console.log(noSamples, totalItems);
        if (totalItems == noSamples && noSamples > 0) {
          fetch(window.Shopify.routes.root + "cart/clear.js", {
            method: "POST",
          }).then((response) => location.reload());
        }
        this.classList.toggle("is-empty", 0 === i.item_count);
        (t = document.getElementById("main-cart-footer")),
          t && t.classList.toggle("is-empty", 0 === i.item_count),
          this.getSectionsToRender().forEach((t) => {
            var e = document.getElementById(t.id);
            e &&
              (e = e.querySelector(t.selector) || e) &&
              i.sections[t.section] &&
              (e.innerHTML = this.getSectionInnerHTML(
                i.sections[t.section],
                t.selector
              ));
          }),
          this.updateLiveRegions(n, i.item_count),
          (t = document.getElementById("CartItem-" + n));
        t && s && t.querySelector(`[name="${s}"]`).focus(),
          this.disableLoading();
      })
      .catch(() => {
        this.querySelectorAll(".loading-overlay").forEach((t) =>
          t.classList.add("hidden")
        ),
          this.disableLoading(),
          this.cartErrors && (this.cartErrors.textContent = cartStrings.error);
      });
  }
  updateLiveRegions(t, e) {
    var i;
    this.currentItemCount === e &&
      (i = document.getElementById("Line-item-error-" + t)) &&
      (i.querySelector(".cart-item__error-text").innerHTML =
        cartStrings.quantityError.replace(
          "[quantity]",
          document.getElementById("Quantity-" + t).value
        )),
      (this.currentItemCount = e),
      this.lineItemStatusElement &&
        this.lineItemStatusElement.setAttribute("aria-hidden", !0);
    const n = document.getElementById("cart-live-region-text");
    n &&
      (n.setAttribute("aria-hidden", !1),
      setTimeout(() => {
        n.setAttribute("aria-hidden", !0);
      }, 1e3));
  }
  getSectionInnerHTML(t, e) {
    return new DOMParser().parseFromString(t, "text/html").querySelector(e)
      ?.innerHTML;
  }
  enableLoading(t) {
    var e = document.getElementById("main-cart-items"),
      e =
        (e && e.classList.add("cart__items--disabled"),
        this.querySelectorAll(".loading-overlay")[t - 1]);
    e && e.classList.remove("hidden"),
      document.activeElement.blur(),
      this.lineItemStatusElement &&
        this.lineItemStatusElement.setAttribute("aria-hidden", !1);
  }
  disableLoading() {
    var t = document.getElementById("main-cart-items");
    t && t.classList.remove("cart__items--disabled");
  }
  renderContents(i) {
    this.getSectionsToRender().forEach((t) => {
      var e = document.getElementById(t.id);
      console.log(e, i.sections[t.id]),
        e &&
          (e.innerHTML = this.getSectionInnerHTML(
            i.sections[t.id],
            t.selector
          ));
    });
  }
}
customElements.define("cart-items", CartItems);
class CartNote extends HTMLElement {
  constructor() {
    super(),
      this.addEventListener(
        "change",
        debounce((t) => {
          t = JSON.stringify({ note: t.target.value });
          fetch("" + routes.cart_update_url, { ...fetchConfig(), body: t });
        }, 300)
      );
  }
}
customElements.define("cart-note", CartNote);
class DiscountCode extends HTMLElement {
  constructor() {
    super(),
      isStorageSupported("session") &&
        (this.setupDiscount(),
        this.addEventListener("change", (t) => {
          window.sessionStorage.setItem("discount", t.target.value);
        }));
  }
  setupDiscount() {
    var t = window.sessionStorage.getItem("discount");
    null !== t && (this.querySelector('input[name="discount"]').value = t);
  }
}
customElements.define("discount-code", DiscountCode);
class ShippingCalculator extends HTMLElement {
  constructor() {
    super(),
      this.setupCountries(),
      (this.errors = this.querySelector("#ShippingCalculatorErrors")),
      (this.success = this.querySelector("#ShippingCalculatorSuccess")),
      (this.zip = this.querySelector("#ShippingCalculatorZip")),
      (this.country = this.querySelector("#ShippingCalculatorCountry")),
      (this.province = this.querySelector("#ShippingCalculatorProvince")),
      (this.button = this.querySelector("button")),
      this.button.addEventListener("click", this.onSubmitHandler.bind(this));
  }
  setupCountries() {
    Shopify &&
      Shopify.CountryProvinceSelector &&
      new Shopify.CountryProvinceSelector(
        "ShippingCalculatorCountry",
        "ShippingCalculatorProvince",
        { hideElement: "ShippingCalculatorProvinceContainer" }
      );
  }
  onSubmitHandler(t) {
    t.preventDefault(),
      this.errors.classList.add("hidden"),
      this.success.classList.add("hidden"),
      this.zip.classList.remove("invalid"),
      this.country.classList.remove("invalid"),
      this.province.classList.remove("invalid"),
      this.button.classList.add("loading"),
      this.button.setAttribute("disabled", !0);
    t = JSON.stringify({
      shipping_address: {
        zip: this.zip.value,
        country: this.country.value,
        province: this.province.value,
      },
    });
    let e = routes.cart_url + "/shipping_rates.json";
    (e = e.replace("//", "/")),
      fetch(e, { ...fetchConfig("javascript"), body: t })
        .then((t) => t.json())
        .then((t) => {
          if (t.shipping_rates)
            this.success.classList.remove("hidden"),
              (this.success.innerHTML = ""),
              t.shipping_rates.forEach((t) => {
                var e = document.createElement("p");
                (e.innerHTML =
                  `${t.name}: ${t.price} ` + Shopify.currency.active),
                  this.success.appendChild(e);
              });
          else {
            let i = [];
            Object.entries(t).forEach(([t, e]) => {
              i.push(t.charAt(0).toUpperCase() + t.slice(1) + " " + e[0]);
            }),
              this.errors.classList.remove("hidden"),
              (this.errors.querySelector(".errors").innerHTML = i.join("; "));
          }
        })
        .catch((t) => {
          console.error(t);
        })
        .finally(() => {
          this.button.classList.remove("loading"),
            this.button.removeAttribute("disabled");
        });
  }
}
customElements.define("shipping-calculator", ShippingCalculator);
