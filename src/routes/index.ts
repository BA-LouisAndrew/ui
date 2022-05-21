import { RouteRecordRaw } from "vue-router"

import Home from "./Home.vue"
import NewRule from "./NewRule.vue"
import Rule from "./Rule.vue"
import RuleList from "./RuleList.vue"
import Validation from "./Validation.vue"
import ValidationList from "./ValidationList.vue"

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/rules/new",
    component: NewRule
  },
  {
    path: "/rules/:ruleName",
    component: Rule,
  },
  {
    path: "/rules",
    component: RuleList,
  },

  {
    path: "/validations/:validationId",
    component: Validation,
  },
  {
    path: "/validations",
    component: ValidationList,
  },
]
