import { GlobalThemeOverrides } from "naive-ui"

export const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: "#1D9C48",
    fontFamily: "'Roboto Mono', monospace",
  },
  Button: {
    fontWeight: "bold",
  },
  Divider: {
    color: "rgba(0, 0, 0, 0.2)",
  },
  Form: {
    labelTextAlignHorizontal: "left",
  },
  Input: {},
  Card: {
    color: "#F8F8F8",
    borderColor: "rgba(29, 156, 72, 0.5)",
  },
  Radio: {
    buttonColorActive: "#1D9C48",
    buttonTextColorActive: "#FFF",
  },
}
