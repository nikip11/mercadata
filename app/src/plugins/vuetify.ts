// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { VDateInput } from "vuetify/labs/VDateInput";

export const vuetify = createVuetify({
  components: {
    ...components,
    VDateInput,
    // components.VDataTable
  },
  directives,
});
