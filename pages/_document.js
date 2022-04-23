import Document, { Html, Head, Main, NextScript } from "next/document";
import { Heading } from "@chakra-ui/react";

class WebDocument extends Document {
  render() {
    return (
      <Html>
        <Head></Head>
        <body>
          <header
            style={{
              padding: "5px 15px",
            }}
          >
            <Heading mb={4} fontSize={36} fontWeight="bold">
              Сонный дневник
            </Heading>
          </header>

          <Main />

          <footer style={{ marginTop: "auto", padding: "5px" }}>
            <Heading mt={4}>Сделал папа</Heading>
          </footer>
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default WebDocument;
