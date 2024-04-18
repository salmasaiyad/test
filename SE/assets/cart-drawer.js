class MiniCart extends HTMLElement{constructor(){super(),this.drawer=document.querySelector("cart-drawer"),new IntersectionObserver(this.handleIntersection.bind(this)).observe(this)}handleIntersection(e,t){e[0].isIntersecting&&(t.unobserve(this),fetch(this.dataset.url).then(e=>e.text()).then(e=>{document.getElementById("mini-cart").innerHTML=this.getSectionInnerHTML(e,".shopify-section")}).catch(e=>{console.error(e)}))}open(){this.drawer.querySelector("details").hasAttribute("open")||(this.drawer.querySelector("summary").click(),setTimeout(()=>{setHeaderHeight()},250))}renderContents(t){this.productId=t.id,this.getSectionsToRender().forEach(e=>{document.getElementById(e.id).innerHTML=this.getSectionInnerHTML(t.sections[e.id],e.selector)}),this.header&&this.header.reveal(),this.open()}getSectionsToRender(){return[{id:"mini-cart",section:"mini-cart",selector:".shopify-section"},{id:"cart-icon-bubble",section:"cart-icon-bubble",selector:".shopify-section"}]}getSectionInnerHTML(e,t=".shopify-section"){return(new DOMParser).parseFromString(e,"text/html").querySelector(t).innerHTML}}customElements.define("mini-cart",MiniCart);