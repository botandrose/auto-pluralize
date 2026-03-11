# auto-pluralize

Custom HTML element that automatically pluralizes its inner text based on a `count` attribute.

## Install

```
npm install auto-pluralize
```

## Usage

```html
<script type="module">
  import "auto-pluralize"
</script>

<!-- renders "3 tickets" -->
<auto-pluralize count="3">ticket</auto-pluralize>

<!-- renders "1 ticket" -->
<auto-pluralize count="1">ticket</auto-pluralize>

<!-- renders "tickets" (no number) -->
<auto-pluralize count="3" no-count>ticket</auto-pluralize>

<!-- renders "3 people" (custom plural override) -->
<auto-pluralize count="3" plural="people">person</auto-pluralize>
```

## Attributes

| Attribute  | Required | Description |
|------------|----------|-------------|
| `count`    | yes      | The number to pluralize against |
| `no-count` | no       | When present, hides the number and shows only the word |
| `plural`   | no       | Override the automatically-determined plural form |

The element is reactive — updating attributes via JavaScript will re-render the text:

```js
document.querySelector("auto-pluralize").setAttribute("count", "5")
```
