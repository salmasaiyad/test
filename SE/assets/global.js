function productGallery() {
  var e = new Splide("#images", {
      type: "loop",
      rewind: !0,
      pagination: !1,
      arrows: !0,
      lazyLoad: "nearby",
      isNavigation: !1,
      breakpoints: {
        1024: {
          arrows: !0,
          pagination: !1,
        },
      },
    }),
    t = new Splide("#thumbnails", {
      direction: "ttb",
      height: "32rem",
      perPage: 5,
      gap: 5,
      rewind: !0,
      pagination: !1,
      isNavigation: !0,
      arrows: !1,
      waitForTransition: !0,
      lazyLoad: "nearby",
      breakpoints: {
        1024: {
          direction: "ltr",
          height: "5rem",
          perPage: 5,
          gap: 10,
          arrows: !1,
        },
      },
    });
  e.sync(t),
    e.mount(),
    t.mount(),
    e.on("inactive", function (e) {
      e = e.slide.querySelector("video");
      e && e.pause();
    }),
    e.on("active", function (e) {
      e = e.slide.querySelector("video");
      e && (e.muted = !1);
    });
  const i = /Apple/i,
    s = /Safari/i;
  i.test(navigator.vendor) &&
    s.test(navigator.userAgent) &&
    document.querySelector("html").classList.add("is-safari");
}

function isStorageSupported(e) {
  if (window.self !== window.top) return !1;
  var t = "beyours:test";
  let i;
  "session" === e && (i = window.sessionStorage),
    "local" === e && (i = window.localStorage);
  try {
    return i.setItem(t, "1"), i.removeItem(t), !0;
  } catch (e) {
    return !1;
  }
}

function checkScrollbar() {
  var e = document.body.getBoundingClientRect();
  return Math.round(e.left + e.right) < window.innerWidth;
}

function setScrollbarWidth() {
  var e, t;
  checkScrollbar() &&
    (((e = document.createElement("span")).className =
      "modal-scrollbar-measure"),
    document.body.appendChild(e),
    (t = e.getBoundingClientRect().width - e.clientWidth),
    document.body.removeChild(e),
    document.documentElement.style.setProperty("--scrollbar-width", t + "px"));
}

function setHeaderHeight() {
  var e = document.getElementById("shopify-section-header");
  e &&
    document.documentElement.style.setProperty(
      "--header-height",
      parseInt(e.getBoundingClientRect().bottom) + "px"
    );
}

function getFocusableElements(e) {
  return Array.from(
    e.querySelectorAll(
      "summary, a[href], button:enabled, [tabindex]:not([tabindex^='-']), [draggable], area, input:not([type=hidden]):enabled, select:enabled, textarea:enabled, object, iframe"
    )
  );
}
(window.theme = window.theme || {}),
  (theme.config = {
    mqlSmall: !1,
    mediaQuerySmall: "screen and (max-width: 749px)",
    isTouch: !!(
      "ontouchstart" in window ||
      (window.DocumentTouch && window.document instanceof DocumentTouch) ||
      window.navigator.maxTouchPoints ||
      window.navigator.msMaxTouchPoints
    ),
    rtl: "rtl" === document.documentElement.getAttribute("dir"),
  }),
  (theme.Currency = {
    formatMoney: function (e, t) {
      "string" == typeof e && (e = e.replace(".", ""));
      let i = "";
      var s = /\{\{\s*(\w+)\s*\}\}/;

      function n(e, t, i, s) {
        return (
          (i = i || ","),
          (s = s || "."),
          isNaN(e) || null === e
            ? 0
            : (t = (e = (e / 100).toFixed(t)).split("."))[0].replace(
                /(\d)(?=(\d\d\d)+(?!\d))/g,
                "$1" + i
              ) + (t[1] ? s + t[1] : "")
        );
      }
      switch ((t = t || "${{amount}}").match(s)[1]) {
        case "amount":
          i = n(e, 2);
          break;
        case "amount_no_decimals":
          i = n(e, 0);
          break;
        case "amount_with_comma_separator":
          i = n(e, 2, ".", ",");
          break;
        case "amount_no_decimals_with_comma_separator":
          i = n(e, 0, ".", ",");
          break;
        case "amount_no_decimals_with_space_separator":
          i = n(e, 0, " ");
          break;
        case "amount_with_apostrophe_separator":
          i = n(e, 2, "'");
      }
      return t.replace(s, i);
    },
  }),
  (theme.initWhenVisible = function (i) {
    var e = i.threshold || 0;
    new IntersectionObserver(
      (e, t) => {
        e.forEach((e) => {
          e.isIntersecting &&
            "function" == typeof i.callback &&
            (i.callback(), t.unobserve(e.target));
        });
      },
      {
        rootMargin: `0px 0px ${e}px 0px`,
      }
    ).observe(i.element);
  }),
  (function () {
    var e = window.matchMedia(theme.config.mediaQuerySmall);

    function t() {
      var e = navigator?.userAgentData?.platform || navigator?.platform;
      (/iPad|iPhone|iPod/.test(e) ||
        ("MacIntel" === e && 1 < navigator.maxTouchPoints)) &&
        document.documentElement.style.setProperty(
          "--viewport-height",
          window.innerHeight + "px"
        ),
        setHeaderHeight();
    }
    if (
      ((theme.config.mqlSmall = e.matches),
      (e.onchange = (e) => {
        e.matches
          ? ((theme.config.mqlSmall = !0),
            document.dispatchEvent(new CustomEvent("matchSmall")))
          : ((theme.config.mqlSmall = !1),
            document.dispatchEvent(new CustomEvent("unmatchSmall")));
      }),
      window.addEventListener("beforeunload", () => {
        document.body.classList.add("unloading");
      }),
      window.addEventListener("DOMContentLoaded", () => {
        document.body.classList.add("loaded");
      }),
      window.addEventListener("pageshow", (e) => {
        e.persisted && document.body.classList.remove("unloading");
      }),
      window.addEventListener("resize", t),
      window.addEventListener("DOMContentLoaded", t),
      null !== document.body.getAttribute("data-page-rendering"))
    ) {
      const i = new IntersectionObserver(
        (e, t) => {
          e.forEach((e) => {
            var t = e.target;
            0 == e.intersectionRatio ||
              t.markedVisible ||
              (t.attributeStyleMap &&
                t.attributeStyleMap.set("content-visibility", "visible"),
              (t.markedVisible = !0));
          });
        },
        {
          rootMargin: "50px 0px 100px 0px",
        }
      );
      document
        .querySelectorAll(".shopify-section + .shopify-section")
        .forEach((e) => {
          i.observe(e);
        });
    }
  })(),
  (function () {
    var i,
      s = !1;
    document.body.addEventListener("touchstart", function (e) {
      if (!e.target.closest(".flickity-slider")) return (s = !1);
      (s = !0),
        (i = {
          x: e.touches[0].pageX,
          y: e.touches[0].pageY,
        });
    }),
      document.body.addEventListener(
        "touchmove",
        function (e) {
          var t;
          s &&
            e.cancelable &&
            ((t = {
              x: e.touches[0].pageX - i.x,
              y: e.touches[0].pageY - i.y,
            }),
            Math.abs(t.x) > Flickity.defaults.dragThreshold) &&
            e.preventDefault();
        },
        {
          passive: !1,
        }
      );
  })();
const trapFocusHandlers = {};

function trapFocus(t, e = t) {
  var i = getFocusableElements(t),
    s = i[0],
    n = i[i.length - 1];
  removeTrapFocus(),
    (trapFocusHandlers.focusin = (e) => {
      (e.target !== t && e.target !== n && e.target !== s) ||
        document.addEventListener("keydown", trapFocusHandlers.keydown);
    }),
    (trapFocusHandlers.focusout = function () {
      document.removeEventListener("keydown", trapFocusHandlers.keydown);
    }),
    (trapFocusHandlers.keydown = function (e) {
      "TAB" === (e.code || e.key).toUpperCase() &&
        (e.target !== n || e.shiftKey || (e.preventDefault(), s.focus()),
        e.target === t || e.target === s) &&
        e.shiftKey &&
        (e.preventDefault(), n.focus());
    }),
    document.addEventListener("focusout", trapFocusHandlers.focusout),
    document.addEventListener("focusin", trapFocusHandlers.focusin),
    e && e.focus();
}
try {
  document.querySelector(":focus-visible");
} catch {
  focusVisiblePolyfill();
}

function focusVisiblePolyfill() {
  const t = [
    "ARROWUP",
    "ARROWDOWN",
    "ARROWLEFT",
    "ARROWRIGHT",
    "TAB",
    "ENTER",
    "SPACE",
    "ESCAPE",
    "HOME",
    "END",
    "PAGEUP",
    "PAGEDOWN",
  ];
  let e = null,
    i = null;
  window.addEventListener("keydown", (e) => {
    t.includes(e.code.toUpperCase()) && (i = !1);
  }),
    window.addEventListener("mousedown", (e) => {
      i = !0;
    }),
    window.addEventListener(
      "focus",
      () => {
        e && e.classList.remove("focused"),
          i || (e = document.activeElement).classList.add("focused");
      },
      !0
    );
}

function pauseAllMedia() {
  document.querySelectorAll(".js-youtube").forEach((e) => {
    e.contentWindow.postMessage(
      '{"event":"command","func":"pauseVideo","args":""}',
      "*"
    );
  }),
    document.querySelectorAll(".js-vimeo").forEach((e) => {
      e.contentWindow.postMessage('{"method":"pause"}', "*");
    }),
    document.querySelectorAll("video").forEach((e) => e.pause()),
    document.querySelectorAll("product-model").forEach((e) => {
      e.modelViewerUI && e.modelViewerUI.pause();
    });
}

function removeTrapFocus(e = null) {
  document.removeEventListener("focusin", trapFocusHandlers.focusin),
    document.removeEventListener("focusout", trapFocusHandlers.focusout),
    document.removeEventListener("keydown", trapFocusHandlers.keydown),
    e && e.focus();
}

function onKeyUpEscape(e) {
  var t;
  "ESCAPE" === (e.code || e.key).toUpperCase() &&
    (e = e.target.closest("details[open]")) &&
    ((t = e.querySelector("summary")),
    e.removeAttribute("open"),
    t.setAttribute("aria-expanded", !1),
    t.focus());
}

function filterShopifyEvent(e, t, i) {
  let s = !1;
  e.type.includes("shopify:section")
    ? t.hasAttribute("data-section-id") &&
      t.getAttribute("data-section-id") === e.detail.sectionId &&
      (s = !0)
    : e.type.includes("shopify:block") && e.target === t && (s = !0),
    s && i(e);
}

function debounce(t, i) {
  let s;
  return (...e) => {
    clearTimeout(s), (s = setTimeout(() => t.apply(this, e), i));
  };
}

function fetchConfig(e = "json") {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/" + e,
    },
  };
}
const serializeForm = (e) => {
  var t = {},
    i = new FormData(e);
  for (const n of i.keys()) {
    var s = /(?:^(properties\[))(.*?)(?:\]$)/;
    s.test(n)
      ? ((t.properties = t.properties || {}),
        (t.properties[s.exec(n)[2]] = i.get(n)))
      : (t[n] = i.get(n));
  }
  return JSON.stringify(t);
};
void 0 === window.Shopify && (window.Shopify = {}),
  (Shopify.bind = function (e, t) {
    return function () {
      return e.apply(t, arguments);
    };
  }),
  (Shopify.setSelectorByValue = function (e, t) {
    for (var i = 0, s = e.options.length; i < s; i++) {
      var n = e.options[i];
      if (t == n.value || t == n.innerHTML) return (e.selectedIndex = i);
    }
  }),
  (Shopify.addListener = function (e, t, i) {
    e.addEventListener
      ? e.addEventListener(t, i, !1)
      : e.attachEvent("on" + t, i);
  }),
  (Shopify.postLink = function (e, t) {
    var i = (t = t || {}).method || "post",
      s = t.parameters || {},
      n = document.createElement("form");
    n.setAttribute("method", i), n.setAttribute("action", e);
    for (const a in s) {
      var r = document.createElement("input");
      r.setAttribute("type", "hidden"),
        r.setAttribute("name", a),
        r.setAttribute("value", s[a]),
        n.appendChild(r);
    }
    document.body.appendChild(n), n.submit(), document.body.removeChild(n);
  }),
  (Shopify.postLink2 = function (e, t) {
    var i = (t = t || {}).method || "post",
      s = t.parameters || {},
      n = document.createElement("form");
    n.setAttribute("method", i), n.setAttribute("action", e);
    for (const a in s)
      for (const o in s[a])
        for (const l in s[a][o]) {
          var r = document.createElement("input");
          r.setAttribute("type", "hidden"),
            r.setAttribute("name", `${a}[${o}][${l}]`),
            r.setAttribute("value", s[a][o][l]),
            n.appendChild(r);
        }
    document.body.appendChild(n), n.submit(), document.body.removeChild(n);
  }),
  (Shopify.CountryProvinceSelector = function (e, t, i) {
    (this.countryEl = document.getElementById(e)),
      (this.provinceEl = document.getElementById(t)),
      (this.provinceContainer = document.getElementById(i.hideElement || t)),
      Shopify.addListener(
        this.countryEl,
        "change",
        Shopify.bind(this.countryHandler, this)
      ),
      this.initCountry(),
      this.initProvince();
  }),
  (Shopify.CountryProvinceSelector.prototype = {
    initCountry: function () {
      var e = this.countryEl.getAttribute("data-default");
      Shopify.setSelectorByValue(this.countryEl, e), this.countryHandler();
    },
    initProvince: function () {
      var e = this.provinceEl.getAttribute("data-default");
      e &&
        0 < this.provinceEl.options.length &&
        Shopify.setSelectorByValue(this.provinceEl, e);
    },
    countryHandler: function (e) {
      var t = (s =
          this.countryEl.options[this.countryEl.selectedIndex]).getAttribute(
          "data-provinces"
        ),
        i = JSON.parse(t);
      if ((this.clearOptions(this.provinceEl), i && 0 == i.length))
        this.provinceContainer.style.display = "none";
      else {
        for (var s, n = 0; n < i.length; n++)
          ((s = document.createElement("option")).value = i[n][0]),
            (s.innerHTML = i[n][1]),
            this.provinceEl.appendChild(s);
        this.provinceContainer.style.display = "";
      }
    },
    clearOptions: function (e) {
      for (; e.firstChild; ) e.removeChild(e.firstChild);
    },
    setOptions: function (e, t) {
      var i = 0;
      for (t.length; i < t.length; i++) {
        var s = document.createElement("option");
        (s.value = t[i]), (s.innerHTML = t[i]), e.appendChild(s);
      }
    },
  });
class QuantityInput extends HTMLElement {
  constructor() {
    super(), this.init();
  }
  init() {
    (this.input = this.querySelector("input")),
      (this.changeEvent = new Event("change", {
        bubbles: !0,
      })),
      this.querySelectorAll("button").forEach((e) =>
        e.addEventListener("click", this.onButtonClick.bind(this))
      );
  }
  onButtonClick(e) {
    e.preventDefault();
    var t = this.input.value;
    "plus" === e.target.name ? this.input.stepUp() : this.input.stepDown(),
      t !== this.input.value && this.input.dispatchEvent(this.changeEvent);
  }
}
customElements.define("quantity-input", QuantityInput);
class MenuDropdown extends HTMLElement {
  constructor() {
    super(),
      (this.classes = {
        isActive: "is-active",
      }),
      this.addEventListener("focusin", this.openDropdown.bind(this)),
      this.addEventListener("focusout", this.closeDropdown.bind(this)),
      this.addEventListener("mouseover", this.openDropdown.bind(this)),
      this.addEventListener("mouseleave", this.closeDropdown.bind(this));
  }
  openDropdown() {
    this.classList.add(this.classes.isActive);
  }
  closeDropdown() {
    this.classList.remove(this.classes.isActive);
  }
}
customElements.define("menu-dropdown", MenuDropdown);
class MenuDrawer extends HTMLElement {
  constructor(e) {
    super(),
      (this.classes = e
        ? e.classes
        : {
            open: "menu-drawer--open",
            opening: "menu-drawer--opening",
            closing: "menu-drawer--closing",
          }),
      (this.mainDetailsToggle = this.querySelector("details")),
      this.addEventListener("keyup", this.onKeyUp.bind(this)),
      this.addEventListener("focusout", this.onFocusOut.bind(this)),
      this.bindEvents();
  }
  bindEvents() {
    this.querySelectorAll("summary").forEach((e) =>
      e.addEventListener("click", this.onSummaryClick.bind(this))
    ),
      this.querySelectorAll("button").forEach((e) =>
        e.addEventListener("click", this.onCloseButtonClick.bind(this))
      );
  }
  onKeyUp(e) {
    var t;
    "ESCAPE" === (e.code || e.key).toUpperCase() &&
      (t = e.target.closest("details[open]")) &&
      (t === this.mainDetailsToggle
        ? this.closeMenuDrawer(
            e,
            this.mainDetailsToggle.querySelector("summary")
          )
        : this.closeSubmenu(t));
  }
  onSummaryClick(e) {
    const t = e.currentTarget,
      i = t.parentNode;
    var s = i.hasAttribute("open");
    const n = window.matchMedia("(prefers-reduced-motion: reduce)");

    function r() {
      trapFocus(t.nextElementSibling, i.querySelector("button")),
        t.nextElementSibling.removeEventListener("transitionend", r);
    }
    i === this.mainDetailsToggle
      ? (s && e.preventDefault(),
        s ? this.closeMenuDrawer(e, t) : this.openMenuDrawer(t))
      : setTimeout(() => {
          i.classList.add("menu-opening"),
            t.setAttribute("aria-expanded", !0),
            !n || n.matches
              ? r()
              : t.nextElementSibling.addEventListener("transitionend", r);
        }, 100);
  }
  openMenuDrawer(e) {
    setHeaderHeight(),
      setScrollbarWidth(),
      setTimeout(() => {
        this.mainDetailsToggle.classList.add("menu-opening");
      }),
      e.setAttribute("aria-expanded", !0),
      trapFocus(this.mainDetailsToggle, e),
      setTimeout(() => {
        (this.onBodyClickEvent =
          this.onBodyClickEvent || this.onBodyClick.bind(this)),
          document.body.addEventListener("click", this.onBodyClickEvent);
      }),
      setTimeout(() => {
        this.classes.open.includes("mini-cart") &&
          document.getElementById("cart").addEventListener("submit", () => {
            var e = document.getElementById("cart"),
              e = JSON.parse(e.getAttribute("data-ga4-onsubmit"));
            dataLayer.push(e);
          });
      }, 1e3),
      document.body.classList.add(this.classes.opening),
      this.openAnimation();
  }
  closeMenuDrawer(e, t = !1) {
    void 0 !== e &&
      (this.mainDetailsToggle.querySelectorAll("details").forEach((e) => {
        e.removeAttribute("open"), e.classList.remove("menu-opening");
      }),
      this.mainDetailsToggle.classList.remove("menu-opening"),
      this.mainDetailsToggle.classList.add("menu-closing"),
      removeTrapFocus(t),
      document.body.removeEventListener("click", this.onBodyClickEvent),
      document.body.classList.remove(this.classes.open),
      document.body.classList.add(this.classes.closing),
      this.closeAnimation(this.mainDetailsToggle),
      this.dispatchEvent(new CustomEvent("close")));
  }
  onFocusOut() {
    setTimeout(() => {
      this.mainDetailsToggle.hasAttribute("open") &&
        !this.mainDetailsToggle.contains(document.activeElement) &&
        this.closeMenuDrawer();
    });
  }
  onCloseButtonClick(e) {
    e = e.currentTarget.closest("details");
    this.closeSubmenu(e);
  }
  closeSubmenu(e) {
    e.classList.remove("menu-opening"),
      e.querySelector("summary").setAttribute("aria-expanded", !1),
      removeTrapFocus(),
      this.closeAnimation(e);
  }
  openAnimation() {
    let t;
    const i = (e) => {
      e - (t = void 0 === t ? e : t) < 400
        ? window.requestAnimationFrame(i)
        : (document.body.classList.remove(this.classes.opening),
          document.body.classList.add(this.classes.open));
    };
    window.requestAnimationFrame(i);
  }
  closeAnimation(t) {
    let i;
    const s = (e) => {
      e - (i = void 0 === i ? e : i) < 400
        ? window.requestAnimationFrame(s)
        : (t === this.mainDetailsToggle &&
            (document.body.classList.remove(this.classes.closing),
            t.classList.remove("menu-closing")),
          t.removeAttribute("open"),
          t.closest("details[open]") &&
            trapFocus(t.closest("details[open]"), t.querySelector("summary")));
    };
    window.requestAnimationFrame(s);
  }
  onBodyClick(e) {
    this.contains(e.target) || this.closeMenuDrawer(e);
  }
}
customElements.define("menu-drawer", MenuDrawer);
class CartDrawer extends MenuDrawer {
  constructor() {
    super({
      classes: {
        open: "mini-cart--open",
        opening: "mini-cart--opening",
        closing: "mini-cart--closing",
      },
    });
  }
}
customElements.define("cart-drawer", CartDrawer);
class FacetDrawer extends MenuDrawer {
  constructor() {
    super({
      classes: {
        open: "facet-drawer--open",
        opening: "facet-drawer--opening",
        closing: "facet-drawer--closing",
      },
    });
  }
}
customElements.define("facet-drawer", FacetDrawer);
class HeaderDrawer extends MenuDrawer {
  constructor() {
    super({
      classes: {
        open: "menu-mobile--open",
        opening: "menu-mobile--opening",
        closing: "menu-mobile--closing",
      },
    });
  }
}
customElements.define("header-drawer", HeaderDrawer);
class ModalDialog extends HTMLElement {
  constructor() {
    super(),
      this.querySelector('[id^="ModalClose-"]').addEventListener(
        "click",
        this.hide.bind(this)
      ),
      this.addEventListener("keyup", (e) => {
        "ESCAPE" === (e.code || e.key).toUpperCase() && this.hide();
      }),
      this.classList.contains("media-modal")
        ? this.addEventListener("pointerup", (e) => {
            "mouse" !== e.pointerType ||
              e.target.closest("deferred-media, product-model") ||
              this.hide();
          })
        : this.addEventListener("click", (e) => {
            "MODAL-DIALOG" === e.target.nodeName && this.hide();
          });
  }
  show(e) {
    this.openedBy = e;
    e = this.querySelector(".template-popup");
    document.body.classList.add("overflow-hidden"),
      this.setAttribute("open", ""),
      e && e.loadContent(),
      trapFocus(this, this.querySelector('[role="dialog"]')),
      window.pauseAllMedia();
  }
  hide() {
    document.body.classList.remove("overflow-hidden"),
      this.removeAttribute("open"),
      removeTrapFocus(this.openedBy),
      window.pauseAllMedia();
  }
}
customElements.define("modal-dialog", ModalDialog);
class ModalOpener extends HTMLElement {
  constructor() {
    super(),
      (this.button = this.querySelector("button")),
      this.button &&
        this.button.addEventListener("click", () => {
          var e = document.querySelector(this.getAttribute("data-modal"));
          e && e.show(this.button);
        });
  }
}
customElements.define("modal-opener", ModalOpener);
class DeferredMedia extends HTMLElement {
  constructor() {
    super(),
      (this.poster = this.querySelector('[id^="Deferred-Poster-"]')),
      this.poster &&
        this.poster.addEventListener("click", this.loadContent.bind(this));
  }
  loadContent() {
    var e;
    window.pauseAllMedia(),
      this.getAttribute("loaded") ||
        ((e = document.createElement("div")).appendChild(
          this.querySelector("template").content.firstElementChild.cloneNode(!0)
        ),
        (e.querySelector("video-section")
          ? this.appendChild(e)
          : (this.setAttribute("loaded", !0),
            this.appendChild(e.querySelector("video, model-viewer, iframe")))
        ).focus());
  }
}
customElements.define("deferred-media", DeferredMedia);
class SliderComponent extends HTMLElement {
  constructor() {
    super(),
      (this.slider = this.querySelector('[id^="Slider-"]')),
      (this.sliderItems = this.querySelectorAll('[id^="Slide-"]')),
      (this.enableSliderLooping = !1),
      (this.currentPageElement = this.querySelector(
        ".slider-counter--current"
      )),
      (this.pageTotalElement = this.querySelector(".slider-counter--total")),
      (this.prevButton = this.querySelector('button[name="previous"]')),
      (this.nextButton = this.querySelector('button[name="next"]')),
      this.slider &&
        this.nextButton &&
        theme.initWhenVisible({
          element: this,
          callback: this.init.bind(this),
          threshold: 200,
        });
  }
  init() {
    new ResizeObserver(() => this.initPages()).observe(this.slider),
      this.slider.addEventListener("scroll", this.update.bind(this)),
      this.prevButton.addEventListener("click", this.onButtonClick.bind(this)),
      this.nextButton.addEventListener("click", this.onButtonClick.bind(this));
  }
  initPages() {
    (this.sliderItemsToShow = Array.from(this.sliderItems).filter(
      (e) => 0 < e.clientWidth
    )),
      this.sliderItemsToShow.length < 2 ||
        ((this.sliderItemOffset =
          this.sliderItemsToShow[1].offsetLeft -
          this.sliderItemsToShow[0].offsetLeft),
        (this.slidesPerPage = Math.floor(
          this.slider.clientWidth / this.sliderItemOffset
        )),
        (this.totalPages =
          this.sliderItemsToShow.length - this.slidesPerPage + 1),
        this.update());
  }
  resetPages() {
    (this.sliderItems = this.querySelectorAll('[id^="Slide-"]')),
      this.initPages();
  }
  update() {
    var e,
      t = this.currentPage;
    (this.currentPage =
      Math.round(this.slider.scrollLeft / this.sliderItemOffset) + 1),
      this.currentPageElement &&
        this.pageTotalElement &&
        ((this.currentPageElement.textContent = this.currentPage),
        (this.pageTotalElement.textContent = this.totalPages)),
      this.currentPage != t &&
        this.dispatchEvent(
          new CustomEvent("slideChanged", {
            detail: {
              currentPage: this.currentPage,
              currentElement: this.sliderItemsToShow[this.currentPage - 1],
            },
          })
        ),
      1 === this.currentPage && this.currentPage === this.totalPages
        ? this.classList.add("slider--no-buttons")
        : this.classList.remove("slider--no-buttons"),
      this.enableSliderLooping ||
        ((t = 1 === this.currentPage),
        (e = this.currentPage === this.sliderItemsToShow.length),
        t || this.isSlideVisible(this.sliderItemsToShow[0])
          ? this.prevButton.setAttribute("disabled", "disabled")
          : this.prevButton.removeAttribute("disabled"),
        e ||
        this.isSlideVisible(
          this.sliderItemsToShow[this.sliderItemsToShow.length - 1]
        )
          ? this.nextButton.setAttribute("disabled", "disabled")
          : this.nextButton.removeAttribute("disabled"));
  }
  isSlideVisible(e, t = 0) {
    t = this.slider.clientWidth + this.slider.scrollLeft - t;
    return (
      e.offsetLeft + e.clientWidth <= t &&
      e.offsetLeft >= this.slider.scrollLeft
    );
  }
  onButtonClick(e) {
    e.preventDefault();
    var t = e.currentTarget.dataset.step || 1;
    (this.slideScrollPosition =
      "next" === e.currentTarget.name
        ? this.slider.scrollLeft + t * this.sliderItemOffset
        : this.slider.scrollLeft - t * this.sliderItemOffset),
      (this.slideScrollPosition = theme.config.rtl
        ? -1 * this.slideScrollPosition
        : this.slideScrollPosition),
      this.slider.scrollTo({
        left: this.slideScrollPosition,
      });
  }
}
customElements.define("slider-component", SliderComponent);
class ThumbnailSlider extends SliderComponent {
  constructor() {
    super();
  }
  init() {
    super.init();
    var e = this.querySelectorAll(
      ".thumbnail-list_item--variant:not(.is-active)"
    );
    (this.slider.dataset.mediaCount = this.sliderItems.length - e.length),
      this.querySelector("[data-gang-option]") &&
        ((e = this.querySelectorAll("[data-gang-option]:not(.gang__active)")),
        (this.slider.dataset.mediaCount = this.sliderItems.length - e.length)),
      this.slider.dataset.mediaCount < 2 && this.classList.add("hidden");
  }
}
customElements.define("thumbnail-slider", ThumbnailSlider);
class QuoteSlider extends SliderComponent {
  constructor() {
    super();
  }
  update() {
    super.update(),
      this.currentPageElement &&
        this.pageTotalElement &&
        (this.sliderItems.forEach((e) => {
          e.removeAttribute("aria-current");
        }),
        this.sliderItemsToShow[this.currentPage - 1].setAttribute(
          "aria-current",
          !0
        ));
  }
}
customElements.define("quote-slider", QuoteSlider);
class ProductGallery extends SliderComponent {
  constructor() {
    super();
  }
  init() {
    super.init();
    var e = this.querySelector(".slider-buttons");
    e &&
      this.querySelector("[data-gang-option]") &&
      (this.querySelectorAll(".product__media-item.gang__active").length < 2
        ? e.classList.add("hidden")
        : e.classList.remove("hidden")),
      (this.cursor = this.querySelector(".gallery-cursor")),
      this.cursor &&
        ((e = this.querySelectorAll(".product__modal-opener--image")).forEach(
          (e) => e.addEventListener("mousemove", this.onMoveHandler.bind(this))
        ),
        e.forEach((e) =>
          e.addEventListener("mouseenter", this.onEnterHandler.bind(this))
        ),
        e.forEach((e) =>
          e.addEventListener("mouseleave", this.onLeaveHandler.bind(this))
        ));
  }
  onMoveHandler(e) {
    (this.cursor.style.left = e.clientX - 32 + "px"),
      (this.cursor.style.top = e.clientY - 32 + "px");
  }
  onEnterHandler() {
    this.cursor.classList.add("show");
  }
  onLeaveHandler() {
    this.cursor.classList.remove("show");
  }
  update() {
    var e;
    super.update(),
      this.currentPageElement &&
        this.pageTotalElement &&
        (e = this.sliderItemsToShow[this.currentPage - 1]) &&
        this.slider.style.setProperty(
          "--force-image-ratio-percent",
          e
            .querySelector(".media")
            .style.getPropertyValue("--image-ratio-percent")
        );
  }
  goToFirstSlide() {
    this.slider.scrollTo({
      left: 0,
    });
  }
}
customElements.define("product-gallery", ProductGallery);
class VariantSelects extends HTMLElement {
  constructor() {
    super(), this.addEventListener("change", this.onVariantChange);
  }
  onVariantChange(e) {
    this.updateOptions(),
      this.updateMasterId(),
      this.toggleAddButton(!0, "", !1),
      this.updatePickupAvailability(),
      this.removeErrorMessage(),
      this.validateGang(),
      this.currentVariant
        ? (this.gangOption ? this.updateGangMedia() : this.updateMedia(),
          this.updateURL(),
          this.updateVariantInput(),
          this.renderProductInfo())
        : (this.toggleAddButton(!0, "", !0), this.setUnavailable()),
      this.handleStickyCart(e.target);
  }
  handleStickyCart(t) {
    var e;
    document.getElementById("sticky-cart-" + this.dataset.section) &&
      ((e = t.getAttribute("name")),
      document
        .querySelectorAll(
          `variant-radios[data-section="${this.dataset.section}"] [name="${e}"], variant-selects[data-section="${this.dataset.section}"] [name="${e}"]`
        )
        .forEach((e) => {
          "INPUT" === e.tagName
            ? (e.checked = e.value === t.value)
            : (e.value = t.value);
        }),
      this.currentVariant) &&
      this.currentVariant.featured_media &&
      (e = document.querySelector(".sticky-cart__content-image img")) &&
      ((e.srcset = `${this.currentVariant.featured_media.preview_image.src}&width=70 1x, ${this.currentVariant.featured_media.preview_image.src}&width=140 2x`),
      (e.src =
        this.currentVariant.featured_media.preview_image.src + "&width=70"),
      (e.width = 70),
      (e.height = Math.ceil(
        70 / this.currentVariant.featured_media.preview_image.aspect_ratio
      )));
  }
  updateOptions() {
    this.options = Array.from(this.querySelectorAll("select"), (e) => e.value);
  }
  updateMasterId() {
    this.currentVariant = this.getVariantData().find(
      (e) => !e.options.map((e, t) => this.options[t] === e).includes(!1)
    );
  }
  validateGang() {
    var e = document.querySelector(
      `#shopify-section-${this.dataset.section} [data-gang-option]`
    );
    e && (this.gangOption = e.dataset.gangOption);
  }
  updateGangMedia() {
    if (this.gangOption) {
      var e = this.querySelector(
        '.variant-input-wrapper[data-option-slug="' + this.gangOption + '"]'
      );
      if (
        (e
          ? (this.gangIndex = e.dataset.optionIndex)
          : (this.gangOption = null),
        this.currentVariant)
      ) {
        var e = document.getElementById("MediaGallery-" + this.dataset.section),
          t = this.getSlug(this.currentVariant[this.gangIndex]);
        if (this.currentGangValue !== t) {
          document
            .querySelectorAll(
              `#shopify-section-${this.dataset.section} [data-gang-connect]`
            )
            .forEach(function (e) {
              e.classList.remove("gang__active");
            }),
            (this.currentGangValue = t);
          var t = this.gangOption + "_" + t,
            t = document.querySelectorAll(
              `#shopify-section-${this.dataset.section} [data-gang-connect="${t}"]`
            );
          if (!t.length) return;
          Array.from(t)
            .reverse()
            .forEach(function (e) {
              e.classList.add("gang__active");
              var t = e.parentElement;
              t.firstChild != e &&
                (t.prepend(e), t.classList.add("product__media-no-animate"));
            });
          var i,
            t = document.getElementById(
              "GalleryThumbnails-" + this.dataset.section
            ),
            t =
              (t &&
                ((i = t.querySelectorAll(
                  ".thumbnail-list__item:not(.gang__active)"
                )),
                (t.slider.dataset.mediaCount = t.sliderItems.length - i.length),
                t.slider.dataset.mediaCount < 2
                  ? t.classList.add("hidden")
                  : t.classList.remove("hidden"),
                t.resetPages()),
              e ||
                ((i = document.querySelector(
                  `#shopify-section-${this.dataset.section} product-gallery`
                )) &&
                  (i.resetPages(), i.goToFirstSlide())),
              document.querySelector(
                `#shopify-section-${this.dataset.section} product-gallery .slider-buttons`
              ));
          t &&
            (document.querySelectorAll(
              `#shopify-section-${this.dataset.section} product-gallery .product__media-item.gang__active`
            ).length < 2
              ? t.classList.add("hidden")
              : t.classList.remove("hidden"));
        }
        this.currentVariant.featured_media
          ? (e &&
              ((i = void 0 === this.dataset.noScroll),
              e.setActiveMedia(
                this.dataset.section +
                  "-" +
                  this.currentVariant.featured_media.id,
                !0,
                i
              )),
            (t = document.querySelector(
              `#ProductModal-${this.dataset.section} .product-media-modal__content`
            )) &&
              ((e = t.querySelector(
                `[data-media-id="${this.currentVariant.featured_media.id}"]`
              )),
              t.prepend(e)),
            (i = document.querySelector(
              "#ProductThumbnails-" + this.dataset.section
            )) &&
              ((t = i.querySelector(
                `[data-media-id="${this.currentVariant.featured_media.id}"]`
              )),
              i.prepend(t)))
          : document.querySelectorAll(
              `#shopify-section-${this.dataset.section} product-gallery .product__media-item.gang__active.is-active`
            ).length ||
            document
              .querySelector(
                `#shopify-section-${this.dataset.section} product-gallery .product__media-item.gang__active`
              )
              .classList.add("is-active");
      }
    }
  }
  getSlug(e) {
    return e
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/-$/, "")
      .replace(/^-/, "");
  }
  updateMedia() {
    var e, t;
    this.currentVariant &&
      this.currentVariant.featured_media &&
      (e = document.querySelector(
        `[data-media-id="${this.dataset.section}-${this.currentVariant.featured_media.id}"]`
      )) &&
      (t = e.parentElement).firstChild != e &&
      (t.prepend(e),
      t.classList.add("product__media-no-animate"),
      (e = document.getElementById("MediaGallery-" + this.dataset.section)) &&
        ((t = void 0 === this.dataset.noScroll),
        e.setActiveMedia(
          this.dataset.section + "-" + this.currentVariant.featured_media.id,
          !0,
          t
        )),
      (e = document.querySelector(
        `#ProductModal-${this.dataset.section} .product-media-modal__content`
      )) &&
        ((t = e.querySelector(
          `[data-media-id="${this.currentVariant.featured_media.id}"]`
        )),
        e.prepend(t)),
      (e = document.querySelector(
        "#ProductThumbnails-" + this.dataset.section
      ))) &&
      ((t = e.querySelector(
        `[data-media-id="${this.currentVariant.featured_media.id}"]`
      )),
      e.prepend(t));
  }
  updateURL() {
    this.currentVariant &&
      "false" !== this.dataset.updateUrl &&
      window.history.replaceState(
        {},
        "",
        this.dataset.url + "?variant=" + this.currentVariant.id
      );
  }
  updateVariantInput() {
    document
      .querySelectorAll(
        `#product-form-${this.dataset.section}, #product-form-installment, #product-form-${this.dataset.section}--alt`
      )
      .forEach((e) => {
        e = e.querySelector('input[name="id"]');
        (e.value = this.currentVariant.id),
          e.dispatchEvent(
            new Event("change", {
              bubbles: !0,
            })
          );
      });
  }
  updatePickupAvailability() {
    var e = document.querySelector("pickup-availability");
    e &&
      (this.currentVariant && this.currentVariant.available
        ? e.fetchAvailability(this.currentVariant.id)
        : (e.removeAttribute("available"), (e.innerHTML = "")));
  }
  removeErrorMessage() {
    var e = this.closest("section");
    e && (e = e.querySelector("product-form")) && e.handleErrorMessage();
  }
  renderProductInfo() {
    fetch(
      `${this.dataset.url}?variant=${this.currentVariant.id}&section_id=` +
        this.dataset.section
    )
      .then((e) => e.text())
      .then((e) => {
        this.updateSKU(e),
          this.updatePrice(e),
          this.updatePriceAlt(e),
          this.updateColorName(e),
          this.updateInventoryStatus(e),
          this.updateGallery(e),
          this.currentVariant &&
            this.toggleAddButton(
              !this.currentVariant.available,
              variantStrings.soldOut
            );
      })
      .catch((e) => {
        console.error(e);
      });
  }
  updateSKU(e) {
    var t = "sku-" + this.dataset.section,
      e = new DOMParser().parseFromString(e, "text/html"),
      i = document.getElementById(t),
      e = e.getElementById(t);
    e && i && (i.innerHTML = e.innerHTML),
      i && i.classList.remove("visibility-hidden");
  }
  updatePrice(e) {
    var t = "price-" + this.dataset.section,
      e = new DOMParser().parseFromString(e, "text/html"),
      i = document.getElementById(t),
      e = e.getElementById(t);
    e && i && (i.innerHTML = e.innerHTML),
      i && i.classList.remove("visibility-hidden");
  }
  updateGallery(e) {
    var t = "product-gallery-" + this.dataset.section,
      e = new DOMParser().parseFromString(e, "text/html"),
      i = document.getElementById(t),
      e = e.getElementById(t);
    e && i && (i.innerHTML = e.innerHTML),
      i && i.classList.remove("visibility-hidden"),
      productGallery();
  }
  updatePriceAlt(e) {
    var t = `price-${this.dataset.section}--alt`,
      e = new DOMParser().parseFromString(e, "text/html"),
      i = document.getElementById(t),
      e = e.getElementById(t);
    e && i && (i.innerHTML = e.innerHTML),
      i && i.classList.remove("visibility-hidden");
  }
  updateColorName(e) {
    var t = "color-" + this.dataset.section,
      e = new DOMParser().parseFromString(e, "text/html"),
      i = document.getElementById(t),
      e = e.getElementById(t);
    e && i && (i.innerHTML = e.innerHTML),
      i && i.classList.remove("visibility-hidden");
  }
  updateInventoryStatus(e) {
    var t = "inventory-" + this.dataset.section,
      e = new DOMParser().parseFromString(e, "text/html"),
      i = document.getElementById(t),
      e = e.getElementById(t);
    e && i && (i.innerHTML = e.innerHTML),
      i && i.classList.remove("visibility-hidden");
  }
  toggleAddButton(t = !0, i, e) {
    document
      .querySelectorAll(
        `#product-form-${this.dataset.section}, #product-form-${this.dataset.section}--alt`
      )
      .forEach((e) => {
        e = e.querySelector('[name="add"]');
        e &&
          (t
            ? (e.setAttribute("disabled", !0), i && (e.textContent = i))
            : (e.removeAttribute("disabled"),
              (e.textContent =
                "true" === e.dataset.preOrder
                  ? variantStrings.preOrder
                  : variantStrings.addToCart)));
      });
  }
  setUnavailable() {
    document
      .querySelectorAll(
        `#product-form-${this.dataset.section}, #product-form-${this.dataset.section}--alt`
      )
      .forEach((e) => {
        var e = e.querySelector('[name="add"]');
        e &&
          ((e.textContent = variantStrings.unavailable),
          (e = document.getElementById("price-" + this.dataset.section)) &&
            e.classList.add("visibility-hidden"),
          (e = document.getElementById(`price-${this.dataset.section}--alt`)) &&
            e.classList.add("visibility-hidden"),
          (e = document.getElementById("inventory-" + this.dataset.section))) &&
          e.classList.add("visibility-hidden");
      });
  }
  getVariantData() {
    return (
      (this.variantData =
        this.variantData ||
        JSON.parse(
          this.querySelector('[type="application/json"]').textContent
        )),
      this.variantData
    );
  }
}
customElements.define("variant-selects", VariantSelects);
class VariantRadios extends VariantSelects {
  constructor() {
    super();
  }
  updateOptions() {
    var e = Array.from(this.querySelectorAll("fieldset"));
    this.options = e.map(
      (e) =>
        Array.from(e.querySelectorAll("input")).find((e) => e.checked).value
    );
  }
}
customElements.define("variant-radios", VariantRadios);
class ProductForm extends HTMLElement {
  constructor() {
    super(),
      (this.miniCart = document.querySelector("mini-cart")),
      (this.form = this.querySelector("form")),
      (this.form.querySelector("[name=id]").disabled = !1),
      this.form.addEventListener("submit", this.onSubmitHandler.bind(this));
  }
  onSubmitHandler(e) {
    if (
      !document.body.classList.contains("template-cart") &&
      shopSettings.cartDrawer
    ) {
      e.preventDefault();
      const i = this.querySelector('[type="submit"]');
      var t;
      i.classList.contains("loading") ||
        (this.handleErrorMessage(),
        i.setAttribute("aria-disabled", !0),
        i.classList.add("loading"),
        ((e = fetchConfig("javascript")).headers["X-Requested-With"] =
          "XMLHttpRequest"),
        delete e.headers["Content-Type"],
        (t = new FormData(this.form)),
        this.miniCart &&
          t.append(
            "sections",
            this.miniCart.getSectionsToRender().map((e) => e.id)
          ),
        t.append("sections_url", window.location.pathname),
        (e.body = t),
        fetch("" + routes.cart_add_url, e)
          .then((e) => e.json())
          .then((e) => {
            e.status
              ? this.handleErrorMessage(e.description)
              : (this.miniCart && this.miniCart.renderContents(e),
                dataLayer &&
                  dataLayer.push({
                    event: "addToCart",
                    ecommerce: {
                      currencyCode: "SEK",
                      add: {
                        products: [
                          {
                            name: e.title,
                            id: e.sku,
                            price: e.final_price / 100,
                            brand: "Deodoc",
                            variant: e.variant_title,
                            quantity: 1,
                          },
                        ],
                      },
                    },
                  }));
          })
          .catch((e) => {
            console.error(e);
          })
          .finally(() => {
            i.classList.remove("loading"), i.removeAttribute("aria-disabled");
          }));
    }
  }
  handleErrorMessage(e = !1) {
    (this.errorMessageWrapper =
      this.errorMessageWrapper ||
      this.querySelector(".product-form__error-message-wrapper")),
      this.errorMessageWrapper
        ? ((this.errorMessage =
            this.errorMessage ||
            this.errorMessageWrapper.querySelector(
              ".product-form__error-message"
            )),
          this.errorMessageWrapper.toggleAttribute("hidden", !e),
          e && (this.errorMessage.textContent = e))
        : e && alert(e);
  }
}
customElements.define("product-form", ProductForm);
class ProgressBar extends HTMLElement {
  constructor() {
    super(),
      theme.initWhenVisible({
        element: this,
        callback: this.init.bind(this),
        threshold: 0,
      });
  }
  init() {
    setTimeout(() => {
      var e = parseInt(this.dataset.quantity);
      this.style.setProperty("--progress-bar-width", (100 * e) / 30 + "%");
    }, 1e3);
  }
}
customElements.define("progress-bar", ProgressBar);
class FormState extends HTMLElement {
  constructor() {
    super(),
      (this.formInputs = this.querySelectorAll("input,select,textarea")),
      (this.form = this.querySelector("form")),
      this.formInputs.forEach((e) => {
        e.addEventListener("input", this.onInputChange.bind(this)),
          e.addEventListener("blur", this.onInputChange.bind(this));
      }),
      this.form &&
        this.form.addEventListener("submit", this.onSubmitHandler.bind(this));
  }
  onInputChange(e) {
    this.handleInputCheck(e.target);
  }
  onSubmitHandler(e) {
    let t = !0;
    this.formInputs.forEach((e) => {
      this.handleInputCheck(e) || (t = !1);
    }),
      t || e.preventDefault();
  }
  handleInputCheck(e) {
    return (
      !e.classList.contains("required") ||
      (0 === e.value.length || e.value === e.dataset.empty
        ? (e.classList.remove("valid"), e.classList.add("invalid"), !1)
        : (e.classList.remove("invalid"), e.classList.add("valid"), !0))
    );
  }
}
customElements.define("form-state", FormState);
class ListMenuItem extends HTMLElement {
  constructor() {
    super(),
      (this.listMenuHover =
        this.closest("menu-drawer").querySelector("list-menu-hover")),
      this.addEventListener("mouseenter", () => {
        this.listMenuHover.open({
          title: this.dataset.title,
          url: this.dataset.url,
          image: this.dataset.image,
          description: this.dataset.description,
        });
      });
  }
}
customElements.define("list-menu-item", ListMenuItem);
class ListMenuHover extends HTMLElement {
  constructor() {
    super();
  }
  open(e) {
    let t = "";
    (0 < e.image.length || 0 < e.description.length) &&
      (t =
        (t =
          (t =
            (t =
              (t += `<a href="${e.url}" class="hover-collection${
                0 < e.image.length ? "" : " hover-collection--no-image"
              }">`) +
              '<figure class="hover-collection__image"' +
              (0 < e.image.length
                ? `style="background-image:url(${e.image})"`
                : "") +
              '></figure><div class="hover-collection__content">') +
            `<span class="hover-collection__title h4">${e.title}</span>`) +
          (0 < e.description.length
            ? `<div class="hover-collection__description">${e.description}</div>`
            : "")) + "</div></a>"),
      (this.innerHTML = t);
  }
  close() {
    this.innerHTML = "";
  }
}
customElements.define("list-menu-hover", ListMenuHover);
class TransparentHeader extends HTMLElement {
  constructor() {
    super();
    var e = document.getElementById("shopify-section-header");
    e.classList.add("transparent-header"),
      "true" == this.dataset.showSeparator &&
        e.classList.add("transparent-separator");
  }
}
customElements.define("transparent-header", TransparentHeader);
class ColorSwatch extends HTMLElement {
  constructor() {
    super(),
      this.addEventListener("mouseenter", this.onHoverHandler.bind(this));
  }
  onHoverHandler() {
    var e = this.closest(".card-wrapper").querySelector(".media img");
    null !== e &&
      ((e.src = this.dataset.src),
      (e.srcset = this.dataset.srcset),
      this.activeColorSwatch());
  }
  activeColorSwatch() {
    this.closest(".card__colors")
      .querySelectorAll(".color-swatch")
      .forEach((e) => {
        e.classList.remove("active");
      }),
      this.parentNode.classList.add("active");
  }
}
customElements.define("color-swatch", ColorSwatch);
class AddToCart extends HTMLElement {
  constructor() {
    super(),
      (this.miniCart = document.querySelector("mini-cart")),
      this.addEventListener("click", this.onClickHandler.bind(this));
  }
  onClickHandler() {
    var e,
      t = this.dataset.variantId;
    t &&
      (document.body.classList.contains("template-cart") ||
      !shopSettings.cartDrawer
        ? Shopify.postLink(routes.cart_add_url, {
            parameters: {
              id: t,
              quantity: 1,
            },
          })
        : (this.setAttribute("disabled", !0),
          this.classList.add("loading"),
          (e = this.miniCart
            ? this.miniCart.getSectionsToRender().map((e) => e.id)
            : []),
          (t = JSON.stringify({
            id: t,
            quantity: 1,
            sections: e,
            sections_url: window.location.pathname,
          })),
          fetch("" + routes.cart_add_url, {
            ...fetchConfig("javascript"),
            body: t,
          })
            .then((e) => e.json())
            .then((e) => {
              this.miniCart && this.miniCart.renderContents(e);
            })
            .catch((e) => {
              console.error(e);
            })
            .finally(() => {
              this.classList.remove("loading"),
                this.removeAttribute("disabled");
            })));
  }
}
customElements.define("add-to-cart", AddToCart);
class PriceMoney extends HTMLElement {
  constructor() {
    super(), this.shouldInit() && this.init();
  }
  shouldInit() {
    return -1 === shopSettings.moneyFormat.toLowerCase().indexOf("class=");
  }
  init() {
    var e,
      t =
        "ANG,ARS,BRL,BYN,BYR,CLF,CLP,COP,CRC,CZK,DKK,EUR,HRK,HUF,IDR,ISK,MZN,NOK,PLN,RON,RUB,SEK,TRY,UYU,VES,VND".split(
          ","
        ),
      i = shopSettings.moneyFormat.replace(/\{{.*}}/, "").trim(),
      s = this.querySelector("bdi"),
      n = s.textContent;
    let r = n.replace(" ", ""),
      a = ".";
    t.includes(shopSettings.isoCode) && (a = ","),
      (r = (r = n.includes(a)
        ? n.lastIndexOf(i) + i.length === n.length
          ? ((t = n.slice(0, n.lastIndexOf(i))),
            (e = n.slice(0, n.lastIndexOf(a))),
            (t = t.replace(e, "").trim()),
            r.replace(t, `<sup class="price__suffix">${t}</sup>`))
          : ((e = n.slice(0, n.lastIndexOf(a))),
            (t = n.replace(e, "").trim()),
            r.replace(t, `<sup class="price__suffix">${t}</sup>`))
        : r).replace(i, `<span class="price__prefix">${i}</span>`)),
      (s.innerHTML = r);
  }
}
customElements.define("price-money", PriceMoney);
class SlideshowComponent extends HTMLElement {
  constructor() {
    super(),
      (this.mql = window.matchMedia("(min-width: 750px)")),
      (this.elements = {
        small: this.querySelector(".slideshow__left"),
        content: this.querySelector(".slideshow__content"),
        large: this.querySelector(".slideshow__right"),
      }),
      (this.settings = {
        autorotate: "true" == this.dataset.autorotate,
        autorotateSpeed: parseInt(this.dataset.autorotateSpeed),
        slidesSmall: this.elements.small.querySelectorAll(".slideshow__image"),
        slidesLarge: this.elements.large.querySelectorAll(".slideshow__image"),
      }),
      theme.initWhenVisible({
        element: this,
        callback: this.init.bind(this),
        threshold: 600,
      }),
      this.matchMedia();
  }
  init() {
    setTimeout(() => {
      (this.flickitySmall = new Flickity(this.elements.small, {
        accessibility: !1,
        rightToLeft: theme.config.rtl,
        prevNextButtons: !1,
        pageDots: !1,
        wrapAround: !0,
        draggable: !1,
        setGallerySize: !1,
        autoPlay: !!this.settings.autorotate && this.settings.autorotateSpeed,
      })),
        (this.flickityContent = new Flickity(this.elements.content, {
          accessibility: !1,
          rightToLeft: theme.config.rtl,
          prevNextButtons: !0,
          pageDots: !0,
          wrapAround: !0,
          draggable: !this.mql.matches,
          asNavFor: this.elements.small,
          adaptiveHeight: !0,
          arrowShape:
            "M14.453 30.078q-0.391 1.172-3.125 16.602t-2.539 15.625 16.406 3.125 16.406 2.734 0.195-2.148l0.391-1.563-13.281-2.344q-13.281-2.344-13.281-2.734t2.734-2.344 5.078-3.125q3.906-2.734 9.18-4.688t10.352-2.734q3.516-0.391 8.789-0.391t8.789 0.391q15.625 2.344 28.125 13.281l3.125 2.344 1.563-1.172q1.172-1.172 1.172-1.563t-3.32-3.125-5.273-4.297q-5.078-3.125-11.133-5.664t-11.914-3.711q-3.906-0.781-10.938-0.781t-10.938 0.781q-6.25 1.172-13.281 4.297t-11.719 6.641q-1.563 1.563-1.758 1.367t1.758-12.305l2.344-12.109q0-0.391-1.953-0.781h-1.563q-0.391 0-0.391 0.391z",
          on: {
            ready: () => {
              var e = this.querySelectorAll(".flickity-button");
              e &&
                e.forEach((e) => {
                  e.setAttribute("tabindex", "-1");
                });
            },
          },
        })),
        (this.flickityLarge = new Flickity(this.elements.large, {
          accessibility: !1,
          rightToLeft: theme.config.rtl,
          prevNextButtons: !1,
          pageDots: !1,
          wrapAround: !0,
          draggable: !0,
          setGallerySize: !1,
          asNavFor: this.elements.content,
        })),
        this.bindEvents();
    });
  }
  bindEvents() {
    this.flickitySmall.on("scroll", () => {
      this.flickitySmall.slides.forEach((e, t) => {
        var i = this.flickitySmall,
          s = this.settings.slidesSmall[t];
        let n = 0;
        s &&
          ((n =
            0 === t
              ? Math.abs(i.x) > i.slidesWidth
                ? i.slidesWidth +
                  i.x +
                  i.slides[i.slides.length - 1].outerWidth +
                  e.target
                : e.target + i.x
              : t === i.slides.length - 1 &&
                Math.abs(i.x) + i.slides[t].outerWidth < i.slidesWidth
              ? e.target - i.slidesWidth + i.x - i.slides[t].outerWidth
              : e.target + i.x),
          theme.config.isTouch ||
            theme.config.rtl ||
            (s.style.transform = "translateX(" + -0.5 * n + "px)"));
      });
    }),
      this.flickityLarge.on("scroll", () => {
        this.flickityLarge.slides.forEach((e, t) => {
          var i = this.flickityLarge,
            s = this.settings.slidesLarge[t];
          let n = 0;
          s &&
            ((n =
              0 === t
                ? Math.abs(i.x) > i.slidesWidth
                  ? i.slidesWidth +
                    i.x +
                    i.slides[i.slides.length - 1].outerWidth +
                    e.target
                  : e.target + i.x
                : t === i.slides.length - 1 &&
                  Math.abs(i.x) + i.slides[t].outerWidth < i.slidesWidth
                ? e.target - i.slidesWidth + i.x - i.slides[t].outerWidth
                : e.target + i.x),
            theme.config.isTouch ||
              theme.config.rtl ||
              (s.style.transform = "translateX(" + -0.5 * n + "px)"));
        });
      }),
      this.elements.content
        .querySelector(".flickity-button.next")
        .addEventListener("click", () => {
          this.flickitySmall.next(), this.stopPlayer();
        }),
      this.elements.content
        .querySelector(".flickity-button.previous")
        .addEventListener("click", () => {
          this.flickitySmall.previous(), this.stopPlayer();
        });
    let s = null,
      n = null;
    this.flickityLarge.on("dragMove", (e, t, i) => {
      (s = this.flickityLarge.selectedIndex),
        (n = this.getSwipeDirection(i)),
        this.stopPlayer();
    }),
      this.flickityLarge.on("dragEnd", () => {
        this.flickityLarge.selectedIndex !== s &&
          ("left" === n
            ? this.flickitySmall.next()
            : this.flickitySmall.previous());
      });
  }
  stopPlayer() {
    this.settings.autorotate && this.flickitySmall.stopPlayer();
  }
  getSwipeDirection(e) {
    return 0 < e.x ? "right" : "left";
  }
  matchMedia() {
    document.addEventListener("matchSmall", () => {
      this.unload(), this.init();
    }),
      document.addEventListener("unmatchSmall", () => {
        this.unload(), this.init();
      });
  }
  unload() {
    this.flickitySmall &&
      "function" == typeof this.flickitySmall.destroy &&
      this.flickitySmall.destroy(),
      this.flickityContent &&
        "function" == typeof this.flickityContent.destroy &&
        this.flickityContent.destroy(),
      this.flickityLarge &&
        "function" == typeof this.flickityLarge.destroy &&
        this.flickityLarge.destroy();
  }
}
customElements.define("slideshow-component", SlideshowComponent);
class TestimonialsComponent extends HTMLElement {
  constructor() {
    super(),
      "true" == this.dataset.slider &&
        ((this.settings = {
          autorotate: "true" == this.dataset.autorotate,
          autorotateSpeed: parseInt(this.dataset.autorotateSpeed),
        }),
        (this.slider = this.querySelector(".testimonial__list")),
        (this.previews = this.querySelector(".testimonial__previews")),
        theme.initWhenVisible({
          element: this,
          callback: this.init.bind(this),
          threshold: 600,
        }),
        theme.initWhenVisible({
          element: this,
          callback: this.update.bind(this),
          threshold: 0,
        }));
  }
  init() {
    setTimeout(() => {
      (this.flickity = new Flickity(this.slider, {
        accessibility: !1,
        rightToLeft: theme.config.rtl,
        prevNextButtons: !0,
        arrowShape: {
          x0: 10,
          x1: 60,
          y1: 50,
          x2: 65,
          y2: 45,
          x3: 20,
        },
        pageDots: !1,
        wrapAround: !0,
        draggable: !0,
        cellAlign: "center",
        autoPlay: !!this.settings.autorotate && this.settings.autorotateSpeed,
        pauseAutoPlayOnHover: !0,
        asNavFor: this.previews,
      })),
        (this.flickityNav = new Flickity(this.previews, {
          accessibility: !1,
          rightToLeft: theme.config.rtl,
          prevNextButtons: !1,
          pageDots: !1,
          wrapAround: !0,
          selectedAttraction: 0.2,
          friction: 0.8,
          adaptiveHeight: !0,
        })),
        this.flickityNav.previous(),
        this.settings.autorotate && this.flickity.pausePlayer(),
        this.flickity.on("staticClick", (e, t, i, s) => {
          "number" == typeof s && this.flickityNav.select(s);
        }),
        this.flickity.on("change", (e) => {
          this.flickityNav.select(e);
        });
    });
  }
  update() {
    setTimeout(() => {
      this.flickity &&
        this.flickityNav &&
        (this.flickityNav.next(), this.settings.autorotate) &&
        this.flickity.unpausePlayer();
    }, 300);
  }
  getSwipeDirection(e) {
    return 0 < e.x ? "right" : "left";
  }
}
customElements.define("testimonials-component", TestimonialsComponent);
class UseAnimate extends HTMLElement {
  constructor() {
    super(),
      theme.initWhenVisible({
        element: this,
        callback: this.init.bind(this),
        threshold: 0,
      });
  }
  init() {
    this.setAttribute("animate", "");
  }
}
customElements.define("use-animate", UseAnimate);
class AnimateSticky extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    (this.onScrollHandler = this.onScroll.bind(this)),
      window.addEventListener("scroll", this.onScrollHandler, !1),
      this.onScrollHandler();
  }
  disconnectedCallback() {
    window.removeEventListener("scroll", this.onScrollHandler);
  }
  onScroll() {
    (window.pageYOffset || document.documentElement.scrollTop) >=
    this.getOffsetTop(this)
      ? requestAnimationFrame(this.reveal.bind(this))
      : requestAnimationFrame(this.reset.bind(this));
  }
  reveal() {
    this.setAttribute("animate", "");
  }
  reset() {
    this.removeAttribute("animate");
  }
  getOffsetTop(e) {
    let t = 0;
    for (; e; ) (t += e.offsetTop), (e = e.offsetParent);
    return t;
  }
}
customElements.define("animate-sticky", AnimateSticky);
class LookbookComponent extends HTMLElement {
  constructor() {
    super(),
      theme.initWhenVisible({
        element: this,
        callback: this.init.bind(this),
        threshold: 0,
      });
  }
  init() {
    const e = this.querySelectorAll(".look__hotspot");
    e.forEach((e) => {
      e.classList.add("active");
    }),
      setTimeout(() => {
        e.forEach((e) => {
          e.classList.remove("active");
        });
      }, 3e3);
  }
}
customElements.define("lookbook-component", LookbookComponent);
class TabCollage extends HTMLElement {
  constructor() {
    super(),
      this.querySelectorAll(".tab-collage__heading").forEach((e) =>
        e.addEventListener("click", this.onButtonClick.bind(this))
      ),
      this.querySelectorAll(".tab-collage__heading").forEach((e) =>
        e.addEventListener("mouseover", this.onButtonClick.bind(this))
      );
  }
  onButtonClick(e) {
    const t = e.target;
    t.classList.contains("active") ||
      (this.pauseAllMedia(),
      this.querySelectorAll("[data-block-id]").forEach((e) => {
        t.dataset.blockId === e.dataset.blockId
          ? e.classList.add("active")
          : e.classList.remove("active");
      }));
  }
  pauseAllMedia() {
    this.querySelectorAll('video-section[data-type="youtube"] iframe').forEach(
      (e) => {
        e.contentWindow.postMessage(
          '{"event":"command","func":"pauseVideo","args":""}',
          "*"
        );
      }
    ),
      this.querySelectorAll('video-section[data-type="vimeo"] iframe').forEach(
        (e) => {
          e.contentWindow.postMessage('{"method":"pause"}', "*");
        }
      );
  }
}
customElements.define("tab-collage", TabCollage);
class CountdownTimer extends HTMLElement {
  constructor() {
    super(),
      (this.parent = this.closest(".product-countdown")),
      (this.date = new Date(Date.parse(this.dataset.date)).getTime()),
      isNaN(this.date) &&
      ((this.date = new Date(this.dataset.date.replace(/-/g, "/")).getTime()),
      isNaN(this.date))
        ? this.unload()
        : theme.initWhenVisible({
            element: this,
            callback: this.init.bind(this),
            threshold: 200,
          });
  }
  init() {
    this.timer(),
      (this.dataset.interval = setInterval(this.timer.bind(this), 1e3));
  }
  timer() {
    var e,
      t,
      i,
      s,
      n = new Date(),
      n = new Date(this.date) - n;
    n < 0
      ? this.unload()
      : ((e = 864e5),
        (t = Math.floor((n / e) * 1)),
        (i = Math.floor(((n % e) / 36e5) * 1)),
        (s = Math.floor((((n % e) % 36e5) / 6e4) * 1)),
        (n = Math.floor(((((n % e) % 36e5) % 6e4) / 1e3) * 1)),
        "true" == this.dataset.compact
          ? ((e =
              0 < t
                ? `<div class="countdown__item"><span>${t}${dateStrings.d}</span></div>`
                : ""),
            (this.innerHTML =
              e +
              `<div class="countdown__item"><span>${9 < i ? i : "0" + i}:${
                9 < s ? s : "0" + s
              }:${9 < n ? n : "0" + n}</span></div>`))
          : ((e =
              0 < t
                ? `<div class="countdown__item"><span>${t}</span> ${
                    1 == t ? dateStrings.day : dateStrings.days
                  }</div>`
                : ""),
            (t = `<div class="countdown__item"><span>${i}</span> ${
              1 == i ? dateStrings.hour : dateStrings.hours
            }</div>`),
            (i = `<div class="countdown__item"><span>${s}</span> ${
              1 == s ? dateStrings.minute : dateStrings.minutes
            }</div>`),
            (s = `<div class="countdown__item"><span>${n}</span> ${
              1 == n ? dateStrings.second : dateStrings.seconds
            }</div>`),
            (this.innerHTML = e + t + i + s)));
  }
  unload() {
    this.dataset.interval && clearInterval(this.dataset.interval),
      this.classList.add("hidden"),
      this.parent && this.parent.classList.add("hidden");
  }
}
customElements.define("countdown-timer", CountdownTimer);
class GMap extends HTMLElement {
  constructor() {
    super(),
      this.dataset.apiKey &&
        this.dataset.mapAddress &&
        theme.initWhenVisible({
          element: this,
          callback: this.prepMapApi.bind(this),
          threshold: 200,
        });
  }
  prepMapApi() {
    this.loadScript().then(this.initMap.bind(this));
  }
  loadScript() {
    return new Promise((e, t) => {
      var i = document.createElement("script");
      document.body.appendChild(i),
        (i.onload = e),
        (i.onerror = t),
        (i.async = !0),
        (i.src =
          "https://maps.googleapis.com/maps/api/js?key=" + this.dataset.apiKey);
    });
  }
  initMap() {
    new google.maps.Geocoder().geocode(
      {
        address: this.dataset.mapAddress,
      },
      (e, t) => {
        if (t !== google.maps.GeocoderStatus.OK) Shopify.designMode;
        else {
          t = {
            zoom: parseInt(this.dataset.zoom),
            center: e[0].geometry.location,
            draggable: !0,
            clickableIcons: !1,
            scrollwheel: !1,
            disableDoubleClickZoom: !0,
            disableDefaultUI: !0,
          };
          const i = new google.maps.Map(this, t),
            s = i.getCenter();
          i.setCenter(s);
          (e = {
            path: "M32.7374478,5.617 C29.1154478,1.995 24.2994478,0 19.1774478,0 C14.0544478,0 9.23944778,1.995 5.61744778,5.617 C-1.08555222,12.319 -1.91855222,24.929 3.81344778,32.569 L19.1774478,54.757 L34.5184478,32.6 C40.2734478,24.929 39.4404478,12.319 32.7374478,5.617 Z M19.3544478,26 C15.4954478,26 12.3544478,22.859 12.3544478,19 C12.3544478,15.141 15.4954478,12 19.3544478,12 C23.2134478,12 26.3544478,15.141 26.3544478,19 C26.3544478,22.859 23.2134478,26 19.3544478,26 Z",
            fillColor: this.dataset.markerColor,
            fillOpacity: 1,
            anchor: new google.maps.Point(15, 55),
            strokeWeight: 0,
            scale: 0.6,
          }),
            (t =
              (new google.maps.Marker({
                map: i,
                position: i.getCenter(),
                icon: e,
              }),
              new google.maps.StyledMapType(
                JSON.parse(
                  this.parentNode.querySelector("[data-gmap-style]").innerHTML
                )
              )));
          i.mapTypes.set("styled_map", t),
            i.setMapTypeId("styled_map"),
            google.maps.event.addDomListener(window, "resize", function () {
              google.maps.event.trigger(i, "resize"), i.setCenter(s);
            });
        }
      }
    );
  }
}
customElements.define("g-map", GMap);
class RelatedButtons extends HTMLElement {
  constructor() {
    super(),
      window.addEventListener("scroll", this.checkListener.bind(this)),
      this.querySelectorAll("a").forEach((e) =>
        e.addEventListener("click", this.onButtonClick.bind(this))
      );
  }
  checkListener() {
    var e = document.querySelector(this.dataset.scrollto);
    window.scrollY >= e.offsetTop - e.clientHeight
      ? this.classList.add("is-flipped")
      : this.classList.remove("is-flipped");
  }
  onButtonClick(e) {
    e.preventDefault();
    e = e.target;
    document.querySelector(e.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  }
}
customElements.define("related-buttons", RelatedButtons);
class ProductRecentlyViewed extends HTMLElement {
  constructor() {
    var e, t, i;
    super(),
      isStorageSupported("local") &&
        ((e = parseInt(this.dataset.productId)),
        (t = "beyours:recently-viewed"),
        (i = JSON.parse(window.localStorage.getItem(t) || "[]")).includes(e) ||
          i.unshift(e),
        window.localStorage.setItem(t, JSON.stringify(i.slice(0, 5))));
  }
}
customElements.define("product-recently-viewed", ProductRecentlyViewed);
class RecentlyViewedProducts extends HTMLElement {
  constructor() {
    super(),
      theme.initWhenVisible({
        element: this,
        callback: this.init.bind(this),
        threshold: 600,
      });
  }
  init() {
    fetch(this.dataset.url + this.getQueryString())
      .then((e) => e.text())
      .then((e) => {
        var t = document.createElement("div"),
          e = ((t.innerHTML = e), t.querySelector("recently-viewed-products"));
        e && e.innerHTML.trim().length && (this.innerHTML = e.innerHTML);
      })
      .catch((e) => {
        console.error(e);
      });
  }
  getQueryString() {
    var e = JSON.parse(
      window.localStorage.getItem("beyours:recently-viewed") || "[]"
    );
    return (
      this.dataset.productId &&
        e.includes(parseInt(this.dataset.productId)) &&
        e.splice(e.indexOf(parseInt(this.dataset.productId)), 1),
      e
        .map((e) => "id:" + e)
        .slice(0, 4)
        .join(" OR ")
    );
  }
}
customElements.define("recently-viewed-products", RecentlyViewedProducts);
class VideoSection extends HTMLElement {
  constructor() {
    super(),
      (this.background = "template" !== this.dataset.initMode),
      this.background
        ? theme.initWhenVisible({
            element: this,
            callback: this.init.bind(this),
            threshold: 600,
          })
        : this.init();
  }
  init() {
    switch (
      ((this.parentSelector = this.dataset.parent || ".media-wrapper"),
      (this.parent = this.closest(this.parentSelector)),
      this.dataset.type)
    ) {
      case "youtube":
        this.initYoutubeVideo();
        break;
      case "vimeo":
        this.initVimeoVideo();
        break;
      case "mp4":
        this.initMp4Video();
    }
  }
  initYoutubeVideo() {
    this.setAsLoading(),
      this.loadScript("youtube").then(this.setupYoutubePlayer.bind(this));
  }
  initVimeoVideo() {
    this.setAsLoading(),
      this.loadScript("vimeo").then(this.setupVimeoPlayer.bind(this));
  }
  initMp4Video() {
    const e = this.querySelector("video");
    var t;
    e &&
      void 0 !== (t = e.play()) &&
      t
        .then(function () {})
        .catch(function () {
          e.setAttribute("controls", "");
        });
  }
  loadScript(s) {
    return new Promise((e, t) => {
      var i = document.createElement("script");
      document.body.appendChild(i),
        (i.onload = e),
        (i.onerror = t),
        (i.async = !0),
        (i.src =
          "youtube" === s
            ? "//www.youtube.com/iframe_api"
            : "//player.vimeo.com/api/player.js");
    });
  }
  setAsLoading() {
    this.parent.setAttribute("loading", !0);
  }
  setAsLoaded() {
    this.parent.removeAttribute("loading"),
      this.parent.setAttribute("loaded", !0);
  }
  setupYoutubePlayer() {
    const t = this.dataset.videoId,
      i = setInterval(() => {
        window.YT &&
          window.YT.ready(() => {
            var e = document.createElement("div");
            this.appendChild(e),
              (this.player = new YT.Player(e, {
                videoId: t,
                playerVars: {
                  showinfo: 0,
                  controls: !this.background,
                  fs: !this.background,
                  rel: 0,
                  height: "100%",
                  width: "100%",
                  iv_load_policy: 3,
                  html5: 1,
                  loop: 1,
                  playsinline: 1,
                  modestbranding: 1,
                  disablekb: 1,
                },
                events: {
                  onReady: this.onYoutubeReady.bind(this),
                  onStateChange: this.onYoutubeStateChange.bind(this),
                },
              })),
              clearInterval(i);
          });
      }, 50);
  }
  onYoutubeReady() {
    (this.iframe = this.querySelector("iframe")),
      this.iframe.setAttribute("tabindex", "-1"),
      this.background && this.player.mute(),
      "function" == typeof this.player.playVideo && this.player.playVideo(),
      this.setAsLoaded(),
      new IntersectionObserver(
        (e, t) => {
          e.forEach((e) => {
            e.isIntersecting ? this.youtubePlay() : this.youtubePause();
          });
        },
        {
          rootMargin: "0px 0px 50px 0px",
        }
      ).observe(this.iframe);
  }
  onYoutubeStateChange(e) {
    switch (e.data) {
      case -1:
        this.attemptedToPlay &&
          (this.setAsLoaded(),
          this.closest(".banner").classList.add("video-interactable"));
        break;
      case 0:
        this.youtubePlay();
        break;
      case 1:
        this.setAsLoaded();
        break;
      case 3:
        this.attemptedToPlay = !0;
    }
  }
  youtubePlay() {
    this.background &&
      this.player &&
      "function" == typeof this.player.playVideo &&
      this.player.playVideo();
  }
  youtubePause() {
    this.background &&
      this.player &&
      "function" == typeof this.player.pauseVideo &&
      this.player.pauseVideo();
  }
  setupVimeoPlayer() {
    const e = this.dataset.videoId,
      t = setInterval(() => {
        window.Vimeo &&
          ((this.player = new Vimeo.Player(this, {
            id: e,
            autoplay: !0,
            autopause: !1,
            background: this.background,
            controls: !this.background,
            loop: !0,
            height: "100%",
            width: "100%",
          })),
          this.player.ready().then(this.onVimeoReady.bind(this)),
          clearInterval(t));
      }, 50);
  }
  onVimeoReady() {
    (this.iframe = this.querySelector("iframe")),
      this.iframe.setAttribute("tabindex", "-1"),
      this.background && this.player.setMuted(!0),
      this.setAsLoaded(),
      new IntersectionObserver(
        (e, t) => {
          e.forEach((e) => {
            e.isIntersecting ? this.vimeoPlay() : this.vimeoPause();
          });
        },
        {
          rootMargin: "0px 0px 50px 0px",
        }
      ).observe(this.iframe);
  }
  vimeoPlay() {
    this.background &&
      this.player &&
      "function" == typeof this.player.play &&
      this.player.play();
  }
  vimeoPause() {
    this.background &&
      this.player &&
      "function" == typeof this.player.pause &&
      this.player.pause();
  }
}
customElements.define("video-section", VideoSection);
class BundleProduct extends HTMLElement {
  constructor() {
    super(),
      (this.classes = {
        souldout: "price--sold-out",
        onsale: "price--on-sale",
        nocompare: "price--no-compare",
      }),
      (this.price = this.querySelector(".price")),
      (this.variants = this.querySelector("select")),
      this.variants &&
        this.variants.addEventListener(
          "change",
          this.onSelectChange.bind(this)
        );
  }
  onSelectChange(e) {
    var e = e.target,
      t = e.options[e.selectedIndex],
      i = parseInt(t.dataset.compare_at_price || 0),
      s = parseInt(t.dataset.price || 0),
      t = "true" === t.dataset.available,
      n = "true" === e.dataset.price_varies,
      e = "true" === e.dataset.compare_at_price_varies;
    this.price.classList.remove(this.classes.souldout),
      this.price.classList.remove(this.classes.onsale),
      this.price.classList.remove(this.classes.nocompare),
      !1 == t
        ? this.price.classList.add(this.classes.souldout)
        : s < i && t && this.price.classList.add(this.classes.onsale),
      0 == n && e && this.price.classList.add(this.classes.nocompare);
    this.querySelector(".price__regular").querySelector(
      ".price-item--regular"
    ).innerHTML = `<price-money><bdi>${theme.Currency.formatMoney(
      s,
      shopSettings.moneyFormat
    )}</bdi></price-money>`;
    t = this.querySelector(".price__sale");
    (t.querySelector(
      ".price-item--regular"
    ).innerHTML = `<price-money><bdi>${theme.Currency.formatMoney(
      i,
      shopSettings.moneyFormat
    )}</bdi></price-money>`),
      (t.querySelector(
        ".price-item--sale"
      ).innerHTML = `<price-money><bdi>${theme.Currency.formatMoney(
        s,
        shopSettings.moneyFormat
      )}</bdi></price-money>`);
  }
}
customElements.define("bundle-product", BundleProduct);
class BundleProducts extends HTMLElement {
  constructor() {
    super(),
      (this.miniCart = document.querySelector("mini-cart")),
      (this.button = this.querySelector("button")),
      this.button &&
        this.button.addEventListener("click", this.onButtonClick.bind(this)),
      (this.blocks = this.querySelectorAll("[data-block-id]")),
      this.blocks.forEach((e) =>
        e.addEventListener("mouseenter", this.onEnterHandler.bind(this))
      ),
      this.blocks.forEach((e) =>
        e.addEventListener("mouseleave", this.onLeaveHandler.bind(this))
      );
  }
  onEnterHandler(e) {
    this.classList.add("hovering");
    const t = e.target,
      i = t.dataset.blockId;
    this.blocks.forEach((e) => {
      (("BUNDLE-PRODUCT" === t.nodeName && "BUNDLE-PRODUCT" === e.nodeName) ||
        e.dataset.blockId === i) &&
        e.classList.add("active");
    });
  }
  onLeaveHandler() {
    this.classList.remove("hovering"),
      this.blocks.forEach((e) => e.classList.remove("active"));
  }
  onButtonClick(e) {
    e.preventDefault();
    var t,
      e = {
        items: [...this.querySelectorAll('[name="id"]')]
          .map((e) => e.value)
          .map((e) => ({
            id: e,
            quantity: 1,
          })),
      };
    document.body.classList.contains("template-cart") ||
    !shopSettings.cartDrawer
      ? Shopify.postLink2(routes.cart_add_url, {
          parameters: {
            ...e,
          },
        })
      : (this.handleErrorMessage(),
        this.button.setAttribute("disabled", !0),
        this.button.classList.add("loading"),
        (t = this.miniCart
          ? this.miniCart.getSectionsToRender().map((e) => e.id)
          : []),
        (e = JSON.stringify({
          ...e,
          sections: t,
          sections_url: window.location.pathname,
        })),
        fetch("" + routes.cart_add_url, {
          ...fetchConfig("javascript"),
          body: e,
        })
          .then((e) => e.json())
          .then((e) => {
            e.status
              ? this.handleErrorMessage(e.description)
              : this.miniCart && this.miniCart.renderContents(e);
          })
          .catch((e) => {
            console.error(e);
          })
          .finally(() => {
            this.button.classList.remove("loading"),
              this.button.removeAttribute("disabled");
          }));
  }
  handleErrorMessage(e = !1) {
    (this.errorMessageWrapper =
      this.errorMessageWrapper ||
      this.querySelector(".product-form__error-message-wrapper")),
      this.errorMessageWrapper
        ? ((this.errorMessage =
            this.errorMessage ||
            this.errorMessageWrapper.querySelector(
              ".product-form__error-message"
            )),
          this.errorMessageWrapper.toggleAttribute("hidden", !e),
          e && (this.errorMessage.textContent = e))
        : e && alert(e);
  }
}
customElements.define("bundle-products", BundleProducts);
class ShopTheLook extends HTMLElement {
  constructor() {
    super(),
      1 != this.dataset.blockCount &&
        theme.initWhenVisible({
          element: this,
          callback: this.init.bind(this),
          threshold: 600,
        });
  }
  init() {
    (this.products = this.querySelector(".image-with-text__products")),
      (this.blocks = this.querySelectorAll(
        "lookbook-component [data-block-index]"
      )),
      this.blocks.forEach((e) =>
        e.addEventListener("mouseenter", this.onEnterHandler.bind(this))
      ),
      this.products
        .querySelectorAll(".quick-view__summary")
        .forEach((e) =>
          e.addEventListener("click", this.onButtonClick.bind(this))
        ),
      this.initSlider();
  }
  onButtonClick(e) {
    e.preventDefault();
    (e = e.target.closest(".product-container")),
      (e = this.querySelector(
        `lookbook-component [data-block-index="${e.dataset.blockIndex}"]`
      ).closest("summary"));
    e && e.click();
  }
  onEnterHandler(e) {
    this.flickity &&
      "function" == typeof this.flickity.select &&
      ((e = parseInt(e.target.dataset.blockIndex)), this.flickity.select(e));
  }
  onFocusHandler(t) {
    this.blocks.forEach((e) => {
      e.classList.remove("focus"),
        parseInt(e.dataset.blockIndex) === t && e.classList.add("focus");
    });
  }
  initSlider() {
    this.flickity = new Flickity(this.products, {
      accessibility: !1,
      rightToLeft: theme.config.rtl,
      prevNextButtons: !1,
      pageDots: !0,
      wrapAround: !0,
      fade: !0,
      setGallerySize: !0,
      on: {
        ready: () => {
          this.onFocusHandler(0);
        },
        change: (e) => {
          this.onFocusHandler(e);
        },
      },
    });
  }
}
customElements.define("shop-the-look", ShopTheLook);
class SelectWrapper extends HTMLElement {
  constructor() {
    super(),
      theme.initWhenVisible({
        element: this,
        callback: this.init.bind(this),
        threshold: 200,
      }),
      (this.select = this.querySelector("select")),
      this.select &&
        this.select.addEventListener(
          "change",
          this.handleSelectChange.bind(this)
        );
  }
  init() {
    var e = window.getComputedStyle(this.select),
      t = this.select.options[this.select.selectedIndex].text,
      i = document.createElement("span"),
      e =
        ((i.style.fontFamily = e.fontFamily),
        (i.style.fontSize = e.fontSize),
        (i.style.fontWeight = e.fontWeight),
        (i.style.visibility = "hidden"),
        (i.style.position = "absolute"),
        (i.innerHTML = t),
        document.body.appendChild(i),
        i.clientWidth);
    this.style.setProperty("--width", e + "px"), i.remove();
  }
  handleSelectChange() {
    this.init();
  }
}
customElements.define("select-wrapper", SelectWrapper);
class ImageComparison extends HTMLElement {
  constructor() {
    super(),
      (this.active = !1),
      (this.button = this.querySelector("button")),
      (this.horizontal = "horizontal" === this.dataset.layout),
      this.init(),
      theme.initWhenVisible({
        element: this.querySelector(".image-comparison__animate"),
        callback: this.animate.bind(this),
        threshold: 0,
      });
  }
  animate() {
    this.setAttribute("animate", ""),
      this.classList.add("animating"),
      setTimeout(() => {
        this.classList.remove("animating");
      }, 1e3);
  }
  init() {
    theme.config.isTouch
      ? (this.button.addEventListener(
          "touchstart",
          this.startHandler.bind(this)
        ),
        document.body.addEventListener("touchend", this.endHandler.bind(this)),
        document.body.addEventListener("touchmove", this.onHandler.bind(this)))
      : (this.button.addEventListener(
          "mousedown",
          this.startHandler.bind(this)
        ),
        document.body.addEventListener("mouseup", this.endHandler.bind(this)),
        document.body.addEventListener("mousemove", this.onHandler.bind(this)));
  }
  startHandler() {
    (this.active = !0), this.classList.add("scrolling");
  }
  endHandler() {
    (this.active = !1), this.classList.remove("scrolling");
  }
  onHandler(e) {
    this.active &&
      ((e = (e.touches && e.touches[0]) || e),
      (e = this.horizontal
        ? e.pageX - this.offsetLeft
        : e.pageY - this.offsetTop),
      this.scrollIt(e));
  }
  scrollIt(e) {
    var t = this.horizontal ? this.clientWidth : this.clientHeight,
      e = Math.max(20, Math.min(e, t - 20));
    this.style.setProperty("--percent", (100 * e) / t + "%");
  }
}
customElements.define("image-comparison", ImageComparison);
class CartSampleProducts extends HTMLElement {
  constructor() {
    super(),
      (this.miniCart = document.querySelector("mini-cart")),
      (this.cartItems = document.querySelector("cart-items"));
    const e = this.querySelector(".cart-sample-products"),
      t = this.querySelectorAll(".cart-sample-product"),
      c = Array.from(this.querySelectorAll("div[data-product-id]")).map((e) =>
        parseInt(e.dataset.productId)
      ),
      r = document.querySelector("cart-sample-products [data-prev]"),
      i = document.querySelector("cart-sample-products [data-next]");

    function o(t) {
      let c;
      const { scrollLeft: r, clientWidth: i } = e;
      if ("prev" === t) c = r - i;
      else c = r + i;
      e.scroll({
        left: c,
        behavior: "smooth",
      });
    }
    e &&
      r &&
      i &&
      (r.addEventListener("click", () => o("prev")),
      i.addEventListener("click", () => o("next"))),
      0 === e.scrollLeft && r && r.setAttribute("disabled", !0),
      e.addEventListener("scroll", () => {
        e.scrollWidth - e.scrollLeft === e.clientWidth &&
          (i.classList.add("hide"), r.classList.remove("hide")),
          0 === e.scrollLeft &&
            (r.classList.add("hide"), i.classList.remove("hide"));
      }),
      t.forEach((e) => {
        const t = e.querySelector('input[type="checkbox"]'),
          c = e.dataset.productId;
        t.addEventListener("click", (e) => {
          if ((e.preventDefault(), c)) {
            if (
              document.body.classList.contains("template-cart") ||
              !shopSettings.cartDrawer
            )
              return void Shopify.postLink(routes.cart_add_url, {
                parameters: {
                  id: c,
                  quantity: 1,
                },
              });
            const e = this.miniCart
                ? this.miniCart.getSectionsToRender().map((e) => e.id)
                : [],
              t = JSON.stringify({
                id: c,
                quantity: 1,
                sections: e,
                sections_url: window.location.pathname,
              });
            fetch(`${routes.cart_add_url}`, {
              ...fetchConfig("javascript"),
              body: t,
            })
              .then((e) => e.json())
              .then((e) => {
                this.miniCart && this.miniCart.renderContents(e);
              })
              .catch((e) => {
                console.error(e);
              })
              .finally(() => {
                this.classList.remove("loading"),
                  this.removeAttribute("disabled");
              });
          }
        });
      }),
      this.checkforSamples(c, t);
  }
  checkforSamples(e, t) {
    let c = [];
    let r = 0,
      i = 0;
    document.querySelector("mini-cart");
    fetch("/cart.js")
      .then((e) => e.json())
      .then((o) => {
        const s = o.items;
        s.some((t) => e.includes(t.id))
          ? t.forEach((e) => {
              e.classList.remove("deactive"),
                e.classList.remove("active"),
                e
                  .querySelector('input[type="checkbox"]')
                  .removeAttribute("disabled");
            })
          : t.forEach((e) => {
              e.classList.remove("deactive"),
                e.classList.remove("active"),
                e
                  .querySelector('input[type="checkbox"]')
                  .removeAttribute("disabled"),
                (e.querySelector('input[type="checkbox"]').checked = !1);
            }),
          s.forEach((t, c) => {
            if (e.includes(t.id) && (r++, 2 == r)) {
              document
                .querySelectorAll('input[type="checkbox"]')
                .forEach((e) => {
                  e.setAttribute("disabled", !0);
                });
              document.querySelectorAll("div[data-product-id]").forEach((e) => {
                e.classList.contains("active") || e.classList.add("deactive");
              });
            }
            i++;
          }),
          i == r &&
            r > 0 &&
            fetch(window.Shopify.routes.root + "cart/clear.js", {
              method: "POST",
            }).then((e) => location.reload());
        for (let t = 0; t < i; t++) {
          let i = s[t];
          if (e.includes(i.id)) {
            let e = document.querySelector('[data-variant-id="' + i.id + '"]');
            const t = document.querySelector(`div[data-product-id="${i.id}"]`);
            t.classList.add("active"),
              t.classList.remove("deactive"),
              (t.querySelector('input[type="checkbox"]').checked = !0),
              console.log(i.product_title);
            const o = t.querySelector('input[type="checkbox"]');
            if (
              (o.setAttribute("disabled", !0), (o.checked = !0), i.quantity > 1)
            ) {
              const t = document
                .querySelector(
                  '[data-variant-id="' + i.id + '"] cart-remove-button'
                )
                .getAttribute("data-index");
              return e.closest("cart-items").updateQuantity(t, 1), !1;
            }
            r > 2 && c.push(i.key);
          }
        }
        if (r > 2) {
          const e = JSON.stringify({
            id: c.pop(),
            quantity: 0,
            sections: [
              "mini-cart",
              "cart-icon-bubble",
              "cart-live-region-text",
            ],
          });
          fetch(window.Shopify.routes.root + "cart/change.js", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: e,
          })
            .then((e) => {
              location.reload();
            })
            .catch((e) => {
              location.reload(), console.error("Error:", e);
            });
        }
      });
  }
}
customElements.define("cart-sample-products", CartSampleProducts);
void 0 === Shopify.getCart &&
  (Shopify.getCart = function (t, o) {
    if (!o)
      return jQuery.getJSON("/cart.js", function (o, f, n) {
        "function" == typeof t ? t(o, f, n) : Shopify.onCartUpdate(o);
      });
    "function" == typeof t
      ? t(o)
      : "function" == typeof Shopify.onCartUpdate && Shopify.onCartUpdate(o);
  });
jQuery(".announcement-slider ul li").length >= 2 &&
  setInterval(function () {
    var e = jQuery(".announcement-slider ul li"),
      t = e[0],
      n = e[1],
      r = jQuery(t).outerHeight(!0),
      o = jQuery(n).outerHeight(!0);
    jQuery(n).animate(
      { top: "-=" + o },
      {
        duration: 500,
        easing: "linear",
        queue: "announcementSliderAnimation",
        done: function () {
          var e2 = jQuery(".announcement-slider ul").children().first(),
            t2 = jQuery(e2[0]).clone().css("top", "");
          (n.style.top = 0),
            jQuery(".announcement-slider ul").append(t2),
            e2[0].remove();
        },
      }
    ),
      jQuery(t).animate(
        { top: "-=" + r },
        {
          duration: 500,
          easing: "linear",
          queue: "announcementSliderAnimation",
        }
      ),
      jQuery([n, t]).dequeue("announcementSliderAnimation");
  }, 1000);
