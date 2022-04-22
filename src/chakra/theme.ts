// * Customizing theme tokens

// 1. Import `extendTheme`
import { extendTheme } from "@chakra-ui/react";
// import our installed fonts
import "@fontsource/open-sans/300.css";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/700.css";
import { Button } from "./button";
// 2. Call `extendTheme` and pass your custom values
export const theme = extendTheme({
  colors: {
    //   our custom styles
    brand: {
      100: "#FF3c00",
    },
  },
  fonts: {
    //  to install fonts we used npm install @fontsource/open-sans @fontsource/raleway, see chakra docs
    body: "Open Sans, sans-serif",
  },
  styles: {
    global: () => ({
      body: {
        bg: "gray.200",
      },
    }),
  },
  components: {
    // custom button created in button.ts
    Button,
  },
});
