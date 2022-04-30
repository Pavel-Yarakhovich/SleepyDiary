import Link from "next/link";

// Components
import { Heading, Flex } from "@chakra-ui/react";
import Navigation from "../components/navigation";
import UserMenu from "../components/userMenu";

const Layout = ({ children }) => (
  <>
    <header>
      <Link href="/">
        <a>
          <Heading fontSize={36} fontWeight="bold">
            Сонный дневник
          </Heading>
        </a>
      </Link>

      <UserMenu />
    </header>

    {children}

    <footer>
      <Flex alignItems="center" h="100%" fontSize={22}>
        <Heading fontSize={14}>Сделал папа</Heading>
        <Navigation />
      </Flex>
    </footer>
  </>
);

export default Layout;
