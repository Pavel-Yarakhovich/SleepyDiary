import { Global } from "@emotion/react";
const Fonts = () => (
  <Global
    styles={`
      @font-face {
        font-family: 'Futura';
        font-style: light;
        font-weight: 100;
        font-display: swap;
        src: url('./public/fonts/Futura/FuturaPT-Light.ttf') format('ttf');
      }
      /* latin */
      @font-face {
        font-family: 'Futura';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        ssrc: url('./public/fonts/Futura/FuturaPT-Medium.ttf') format('ttf');
      }
      /* latin */
      @font-face {
        font-family: 'Futura';
        font-style: bold;
        font-weight: 700;
        font-display: swap;
        ssrc: url('./public/fonts/Futura/FuturaPT-Bold.ttf') format('ttf');
      }
      `}
  />
);
export default Fonts;
