import pluralize from "pluralize"

class AutoPluralize extends HTMLElement {
  static observedAttributes = ["count", "no-count", "plural"]

  connectedCallback() {
    this.singular = this.textContent.trim()
    this.render()
  }

  attributeChangedCallback() {
    if (this.singular) this.render()
  }

  render() {
    const count = Number(this.getAttribute("count"))
    const plural = this.getAttribute("plural")
    const noCount = this.hasAttribute("no-count")

    const word = plural && count !== 1
      ? plural
      : pluralize(this.singular, count)

    this.textContent = noCount ? word : `${count} ${word}`
  }
}

customElements.define("auto-pluralize", AutoPluralize)
