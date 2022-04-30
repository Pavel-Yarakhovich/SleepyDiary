import Document, { Html, Head, Main, NextScript } from "next/document";
import Link from "next/link";

// Components
import { Heading, Flex } from "@chakra-ui/react";
import Navigation from "../components/navigation";
import UserMenu from "../components/userMenu";
class WebDocument extends Document {
  render() {
    return (
      <Html>
        <Head></Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default WebDocument;
