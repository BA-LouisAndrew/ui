import { GlobalThemeOverrides } from "naive-ui"

export const themeOverrides: GlobalThemeOverrides = {
  common: {
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
    // color: "#292929",
    color: "#FAFAFA"
  },
  Radio: {
    buttonColorActive: "#1D9C48",
    buttonTextColorActive: "#FFF",
  },
}
