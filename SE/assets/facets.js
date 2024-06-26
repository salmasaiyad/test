class FacetFiltersForm extends HTMLElement {
    constructor() {
        super(), this.onActiveFilterClick = this.onActiveFilterClick.bind(this), this.debouncedOnSubmit = debounce(e => {
            this.onSubmitHandler(e)
        }, 500), this.querySelector("form").addEventListener("input", this.debouncedOnSubmit.bind(this))
    }

    static setListeners() {
        window.addEventListener("popstate", e => {
            e = e.state ? e.state.searchParams : FacetFiltersForm.searchParamsInitial;
            e !== FacetFiltersForm.searchParamsPrev && FacetFiltersForm.renderPage(e, null, !1)
        })
    }

    static renderPage(r, i, e = !0) {
        FacetFiltersForm.searchParamsPrev = r;
        var t = FacetFiltersForm.getSections(), s = document.getElementById("FacetDrawer"),
            a = document.getElementById("ProductCount"), o = document.getElementById("ProductCountMobile"),
            n = document.getElementById("ProductCountDesktop");
        document.getElementById("ProductGridContainer").querySelector(".collection").classList.add("loading"), a && a.classList.add("loading"), o && o.classList.add("loading"), n && n.classList.add("loading"), s && s.classList.add("loading"), t.forEach(e => {
            const t = `${window.location.pathname}?section_id=${e.section}&` + r;
            e = e => e.url === t;
            FacetFiltersForm.filterData.some(e) ? FacetFiltersForm.renderSectionFromCache(e, i) : FacetFiltersForm.renderSectionFromFetch(t, i)
        }), e && FacetFiltersForm.updateURLHash(r)
    }

    static renderSectionFromFetch(t, r) {
        fetch(t).then(e => e.text()).then(e => {
            FacetFiltersForm.filterData = [...FacetFiltersForm.filterData, {
                html: e,
                url: t
            }], FacetFiltersForm.renderFilters(e, r), FacetFiltersForm.renderProductGridContainer(e), FacetFiltersForm.renderProductCount(e)
        }).catch(e => {
            console.error(e)
        })
    }

    static renderSectionFromCache(e, t) {
        e = FacetFiltersForm.filterData.find(e).html;
        FacetFiltersForm.renderFilters(e, t), FacetFiltersForm.renderProductGridContainer(e), FacetFiltersForm.renderProductCount(e)
    }

    static renderProductGridContainer(e) {
        document.getElementById("ProductGridContainer").innerHTML = (new DOMParser).parseFromString(e, "text/html").getElementById("ProductGridContainer").innerHTML;
        e = document.querySelector("#FacetFiltersForm layout-switcher");
        e && e.onButtonClick(e.querySelector(".list-view__item--active"));

        let elem = document.querySelector('#product-grid');
        let infScroll = new InfiniteScroll( elem, {
            // options
            path: '.pagination__item--prev',
            append: '.grid__item',
            history: false,
            hideNav: '.pagination-wrapper',
            status: '.page-load-status',
        });

    }

    static renderProductCount(e) {
        var e = (new DOMParser).parseFromString(e, "text/html").getElementById("ProductCount").innerHTML,
            t = document.getElementById("ProductCount"), r = document.getElementById("ProductCountMobile"),
            i = document.getElementById("ProductCountDesktop");
        t && (t.innerHTML = e, t.classList.remove("loading")), r && (r.innerHTML = e, r.classList.remove("loading")), i && (i.innerHTML = e, i.classList.remove("loading"))
    }

    static renderFilters(e, r) {
        var e = (new DOMParser).parseFromString(e, "text/html"),
            t = e.querySelectorAll("#FacetFiltersForm .js-filter, #FacetFiltersFormMobile .js-filter");
        const i = e => {
            var t = r ? r.target.closest(".js-filter") : void 0;
            return !!t && e.dataset.index === t.dataset.index
        };
        var s = Array.from(t).filter(e => !i(e)), t = Array.from(t).find(i), s = (s.forEach(e => {
            document.querySelector(`.js-filter[data-index="${e.dataset.index}"]`).innerHTML = e.innerHTML
        }), FacetFiltersForm.renderActiveFacets(e), FacetFiltersForm.renderAdditionalElements(e), t && FacetFiltersForm.renderCounts(t, r.target.closest(".js-filter")), document.getElementById("FacetDrawer"));
        s && s.classList.remove("loading")
    }

    static renderActiveFacets(r) {
        [".active-facets-mobile", ".active-facets-desktop"].forEach(e => {
            var t = r.querySelector(e);
            t && (document.querySelector(e).innerHTML = t.innerHTML)
        })
    }

    static renderAdditionalElements(t) {
        [".mobile-facets__open", ".facets__open", ".sorting"].forEach(e => {
            t.querySelector(e) && (document.querySelector(e).innerHTML = t.querySelector(e).innerHTML)
        }), document.getElementById("FacetFiltersFormMobile").closest("facet-drawer").bindEvents()
    }

    static renderCounts(e, t) {
        var r = t.querySelector(".facets__selected");
        e.querySelector(".facets__selected") && r && (t.querySelector(".facets__selected").outerHTML = e.querySelector(".facets__selected").outerHTML)
    }

    static updateURLHash(e) {
        history.pushState({searchParams: e}, "", "" + window.location.pathname + (e && "?".concat(e)))
    }

    static getSections() {
        return [{section: document.getElementById("product-grid").dataset.id}]
    }

    onSubmitHandler(e) {
        e.preventDefault();
        var t = new FormData(e.target.closest("form")), t = new URLSearchParams(t).toString();
        FacetFiltersForm.renderPage(t, e)
    }

    onActiveFilterClick(e) {
        e.preventDefault(), FacetFiltersForm.renderPage(new URL(e.currentTarget.href).searchParams.toString())
    }
}

FacetFiltersForm.filterData = [], FacetFiltersForm.searchParamsInitial = window.location.search.slice(1), FacetFiltersForm.searchParamsPrev = window.location.search.slice(1), customElements.define("facet-filters-form", FacetFiltersForm), FacetFiltersForm.setListeners();

class FacetRemove extends HTMLElement {
    constructor() {
        super(), this.querySelector("a").addEventListener("click", e => {
            e.preventDefault(), (this.closest("facet-filters-form") || document.querySelector("facet-filters-form")).onActiveFilterClick(e)
        })
    }
}

customElements.define("facet-remove", FacetRemove);

class FacetToggle extends HTMLElement {
    constructor() {
        super();
        const t = {expanded: "aria-expanded"};
        this.addEventListener("click", () => {
            var e = this.closest("details");
            e.setAttribute(t.expanded, ("false" === e.getAttribute(t.expanded)).toString())
        })
    }
}

customElements.define("facet-toggle", FacetToggle);

class PriceRange extends HTMLElement {
    constructor() {
        super(), this.min = Number(this.dataset.min), this.max = Number(this.dataset.max), this.track = this.querySelector(".price-range__track"), this.handles = [...this.querySelectorAll(".price-range__thumbs")], this.startPos = 0, this.activeHandle, this.handles.forEach(e => {
            e.addEventListener("mousedown", this.startMove.bind(this))
        }), window.addEventListener("mouseup", this.stopMove.bind(this)), this.querySelectorAll("input").forEach(e => e.addEventListener("change", this.onRangeChange.bind(this)))
    }

    onRangeChange(e) {
        this.adjustToValidValues(e.currentTarget), this.setMinAndMaxValues()
    }

    startMove(e) {
        this.startPos = e.offsetX, this.activeHandle = e.target, this.moveListener = this.move.bind(this), window.addEventListener("mousemove", this.moveListener)
    }

    move(e) {
        var t = this.activeHandle.classList.contains("is-lower"), r = t ? "--progress-lower" : "--progress-upper",
            i = this.track.getBoundingClientRect(), s = this.activeHandle.getBoundingClientRect();
        let a = e.clientX - i.x - this.startPos;
        e = ((a = t ? (e = parseInt(this.style.getPropertyValue("--progress-upper")) * i.width / 100, a = Math.min(a, e - s.width), Math.max(a, 0 - s.width / 2)) : (e = parseInt(this.style.getPropertyValue("--progress-lower")) * i.width / 100, a = Math.max(a, e), Math.min(a, i.width - s.width / 2))) + s.width / 2) / i.width, s = this.calcHandleValue(e);
        this.style.setProperty(r, 100 * e + "%"), this.activeHandle.ariaValueNow = s;
        this.activeHandle.nextElementSibling.querySelector(".price-range__output-text").innerHTML = s;
        i = this.querySelectorAll("input"), r = t ? i[0] : i[1];
        r.value = s, this.adjustToValidValues(r), this.setMinAndMaxValues()
    }

    calcHandleValue(e) {
        return Math.round(e * (this.max - this.min) + this.min)
    }

    stopMove() {
        window.removeEventListener("mousemove", this.moveListener);
        var e = this.closest("form");
        this.activeHandle && e && e.dispatchEvent(new Event("input"))
    }

    setMinAndMaxValues() {
        var e = this.querySelectorAll("input"), t = e[0], e = e[1];
        e.value && t.setAttribute("max", e.value), t.value && e.setAttribute("min", t.value), "" === t.value && e.setAttribute("min", 0), "" === e.value && t.setAttribute("max", e.getAttribute("max"))
    }

    adjustToValidValues(e) {
        var t = Number(e.value), r = Number(e.getAttribute("min")), i = Number(e.getAttribute("max"));
        t < r && (e.value = r), i < t && (e.value = i)
    }
}

customElements.define("price-range", PriceRange);

class LayoutSwitcher extends HTMLElement {
    constructor() {
        super(), this.cookieName = "beyours:collection-layout", this.initLayoutMode(), this.querySelectorAll(".list-view__item").forEach(e => e.addEventListener("click", this.onButtonClick.bind(this)))
    }

    onButtonClick(e) {
        e = e.target || e;
        this.changeLayoutMode(e, e.dataset.layoutMode)
    }

    initLayoutMode() {
        var e, t;
        isStorageSupported("local") && null !== (e = window.localStorage.getItem(this.cookieName)) && (t = this.querySelector(`.list-view__item[data-layout-mode="${e}"]`)) && this.changeLayoutMode(t, e)
    }

    changeLayoutMode(t, r) {
        const i = document.getElementById("product-grid");
        if (!i.classList.contains("collection--empty")) {
            ["list", "grid", "grid--1-col", "grid--2-col", "grid--3-col-tablet", "grid--2-col-desktop", "grid--3-col-desktop", "grid--4-col-desktop"].forEach(e => {
                i.classList.remove(e)
            });
            let e = [];
            switch (r) {
                case"list":
                    e = ["grid", "grid--1-col", "grid--2-col-desktop", "list"];
                    break;
                case"grid-2":
                    e = ["grid", "grid--2-col"];
                    break;
                case"grid-3":
                    e = ["grid", "grid--2-col", "grid--3-col-tablet", "grid--3-col-desktop"];
                    break;
                case"grid-4":
                    e = ["grid", "grid--2-col", "grid--3-col-tablet", "grid--4-col-desktop"]
            }
            e.forEach(e => {
                i.classList.add(e)
            }), this.querySelectorAll(".list-view__item").forEach(e => e.classList.remove("list-view__item--active")), t.classList.add("list-view__item--active"), isStorageSupported("local") && window.localStorage.setItem(this.cookieName, r)
        }
    }
}

customElements.define("layout-switcher", LayoutSwitcher);

class StickyFacetFilters extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        this.onScrollHandler = this.onScroll.bind(this), window.addEventListener("scroll", this.onScrollHandler, !1), this.onScrollHandler()
    }

    disconnectedCallback() {
        window.removeEventListener("scroll", this.onScrollHandler)
    }

    onScroll() {
        (window.pageYOffset || document.documentElement.scrollTop) >= this.parentNode.offsetTop ? requestAnimationFrame(this.reveal.bind(this)) : requestAnimationFrame(this.reset.bind(this))
    }

    reveal() {
        this.classList.add("shopify-section-filters-sticky")
    }

    reset() {
        this.classList.remove("shopify-section-filters-sticky")
    }
}

customElements.define("sticky-facet-filters", StickyFacetFilters);