class AnnouncementBar extends HTMLElement {
  constructor() {
    super(),
      1 != this.dataset.blockCount &&
        ((!theme.config.mqlSmall && "true" != this.dataset.compact) ||
          this.initSlider(),
        document.addEventListener("matchSmall", () => {
          this.unload(), this.initSlider();
        }),
        document.addEventListener("unmatchSmall", () => {
          this.unload(), "true" === this.dataset.compact && this.initSlider();
        }));
  }
  unload() {
    this.flickity &&
      "function" == typeof this.flickity.destroy &&
      (this.flickity.destroy(),
      this.resetProgressbar(),
      this.removeListeners());
  }
  initSlider() {
    setTimeout(() => {
      this.flickity = new Flickity(this.querySelector(".announcement-slider"), {
        accessibility: !1,
        rightToLeft: theme.config.rtl,
        prevNextButtons: !1,
        pageDots: !1,
        wrapAround: !0,
        setGallerySize: !1,
      });
    }),
      (this.isPaused = !1),
      (this.forcePaused = !1),
      (this.duration = parseInt(this.dataset.autorotateSpeed)),
      (this.interval = 10),
      (this.prevButton = this.querySelector('button[name="previous"]')),
      (this.nextButton = this.querySelector('button[name="next"]')),
      (this.playButton = this.querySelector('button[name="play"]')),
      setTimeout(() => {
        (this.flickity = new Flickity(
          this.querySelector(".announcement-slider"),
          {
            accessibility: !1,
            rightToLeft: theme.config.rtl,
            prevNextButtons: !1,
            pageDots: !1,
            wrapAround: !0,
            setGallerySize: !1,
          }
        )),
          this.flickity.on("change", () => {
            this.isPaused || theme.config.mqlSmall || this.startProgressbar();
          });
      }),
      (this.onButtonClick = this.onButtonClick.bind(this)),
      this.prevButton &&
        this.prevButton.addEventListener("click", this.onButtonClick),
      this.nextButton &&
        this.nextButton.addEventListener("click", this.onButtonClick),
      this.playButton &&
        this.playButton.addEventListener("click", this.onButtonClick),
      this.addEventListener("slider:paused", this.onSliderPaused),
      theme.config.mqlSmall || this.startProgressbar(),
      new IntersectionObserver(this.handleIntersection.bind(this)).observe(
        this
      ),
      "true" !== this.dataset.autorotate && this.setForcePaused(!0);
  }
  removeListeners() {
    this.prevButton &&
      this.prevButton.removeEventListener("click", this.onButtonClick),
      this.nextButton &&
        this.nextButton.removeEventListener("click", this.onButtonClick),
      this.playButton &&
        this.playButton.removeEventListener("click", this.onButtonClick),
      this.removeEventListener("slider:paused", this.onSliderPaused);
  }
  onSliderPaused(t) {
    this.setAttribute("data-paused", t.detail.paused);
  }
  onButtonClick(t) {
    t.preventDefault();
    t = t.currentTarget;
    "next" === t.name
      ? this.flickity && this.flickity.next()
      : "previous" === t.name
      ? this.flickity && this.flickity.previous()
      : this.setForcePaused(!this.forcePaused);
  }
  setForcePaused(t) {
    (this.forcePaused = t), this.setPaused(t);
  }
  setPaused(t) {
    this.isPaused = t;
    t = new CustomEvent("slider:paused", { detail: { paused: t } });
    this.dispatchEvent(t);
  }
  resetProgressbar() {
    this.style.setProperty("--progress-width", "0%"), clearTimeout(this.tick);
  }
  startProgressbar() {
    this.resetProgressbar(),
      this.setForcePaused(!1),
      (this.percentTime = 0),
      (this.tick = window.setInterval(this.increase.bind(this), this.interval));
  }
  increase() {
    this.isPaused ||
      theme.config.mqlSmall ||
      ((this.step = (1e3 * this.duration) / this.interval),
      (this.percentTime += 100 / this.step),
      this.style.setProperty("--progress-width", this.percentTime + "%"),
      100 <= this.percentTime &&
        (this.flickity && this.flickity.next(), this.startProgressbar()));
  }
  handleIntersection(t, e) {
    t[0].isIntersecting
      ? this.forcePaused || this.setPaused(!1)
      : this.setPaused(!0);
  }
}
customElements.define("announcement-bar", AnnouncementBar);
