import { ThemeProvider } from "styled-components";
import { defaultTheme } from "../theme/themes";

export const context = [
  {
    icon: "box",
    title: "Themes",
    components: [ThemeProvider],
    params: [
      {
        name: "Default theme",
        props: { theme: defaultTheme },
        default: true,
      },
    ],
    options: {
      deep: true,
      disable: false,
      cancellable: false,
    },
  },
];
