/**
 * Vue 3's strict template type-checking rejects camelCase ARIA props
 * (ariaLabel, ariaHaspopup, etc.) even though the template compiler
 * translates `:aria-label` → `ariaLabel` internally. This augmentation
 * adds those camelCase props to every intrinsic HTML interface so Volar
 * and vue-tsc stop flagging them as errors.
 */

declare module '@vue/runtime-dom' {
  // Base - all elements inherit from this
  interface HTMLAttributes {
    ariaLabel?: string
    ariaHaspopup?: string | boolean
    ariaExpanded?: string | boolean
    ariaSelected?: string | boolean
    ariaHidden?: string | boolean
    ariaDescribedby?: string
    ariaLabelledby?: string
    ariaControls?: string
    ariaLive?: string
    ariaPressed?: string | boolean
    ariaCurrent?: string | boolean
    ariaDisabled?: string | boolean
    ariaInvalid?: string | boolean
    ariaModal?: string | boolean
    ariaRequired?: string | boolean
    ariaReadonly?: string | boolean
  }

  // Explicit augmentation for element-specific interfaces
  // that TypeScript may not propagate from HTMLAttributes
  interface AnchorHTMLAttributes extends HTMLAttributes {}
  interface ButtonHTMLAttributes extends HTMLAttributes {}
  interface InputHTMLAttributes extends HTMLAttributes {}
  interface TextareaHTMLAttributes extends HTMLAttributes {}
  interface SelectHTMLAttributes extends HTMLAttributes {}
  interface FormHTMLAttributes extends HTMLAttributes {}
  interface ImgHTMLAttributes extends HTMLAttributes {}
}
