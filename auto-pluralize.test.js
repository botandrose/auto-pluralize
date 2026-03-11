import { Window } from "happy-dom"
import { describe, test, expect, beforeEach } from "bun:test"

const window = new Window()
const document = window.document

globalThis.HTMLElement = window.HTMLElement
globalThis.customElements = window.customElements

await import("./auto-pluralize.js")

function createElement(singular, attrs = {}) {
  const el = document.createElement("auto-pluralize")
  el.textContent = singular
  for (const [key, value] of Object.entries(attrs)) {
    if (value === true) {
      el.setAttribute(key, "")
    } else {
      el.setAttribute(key, String(value))
    }
  }
  document.body.appendChild(el)
  return el
}

beforeEach(() => {
  document.body.innerHTML = ""
})

describe("auto-pluralize", () => {
  test("basic pluralization", () => {
    const el = createElement("ticket", { count: 2 })
    expect(el.textContent).toBe("2 tickets")
  })

  test("singular when count is 1", () => {
    const el = createElement("ticket", { count: 1 })
    expect(el.textContent).toBe("1 ticket")
  })

  test("no-count hides the number", () => {
    const el = createElement("ticket", { count: 3, "no-count": true })
    expect(el.textContent).toBe("tickets")
  })

  test("plural attribute override", () => {
    const el = createElement("person", { count: 3, plural: "people" })
    expect(el.textContent).toBe("3 people")
  })

  test("plural attribute not used when count is 1", () => {
    const el = createElement("person", { count: 1, plural: "people" })
    expect(el.textContent).toBe("1 person")
  })

  test("reactive update when count changes", () => {
    const el = createElement("ticket", { count: 1 })
    expect(el.textContent).toBe("1 ticket")
    el.setAttribute("count", "5")
    expect(el.textContent).toBe("5 tickets")
  })

  test("irregular words", () => {
    const el = createElement("person", { count: 2 })
    expect(el.textContent).toBe("2 people")
  })

  test("zero count", () => {
    const el = createElement("ticket", { count: 0 })
    expect(el.textContent).toBe("0 tickets")
  })
})
