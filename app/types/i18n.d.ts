import "vue"
import type { Composer } from "vue-i18n"

declare module "vue" {
  interface ComponentCustomProperties {
    $t: Composer["t"]
    $te: Composer["te"]
    $d: Composer["d"]
    $n: Composer["n"]
    $tm: Composer["tm"]
    $rt: Composer["rt"]
    $i18n: Composer
  }
}

export {}
