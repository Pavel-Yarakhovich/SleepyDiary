// Components
import { Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button, } from "@chakra-ui/react";

export { UserMenu };

function UserMenu({ user, logout }) {

  return (
      <Menu>
        <MenuButton fontSize='22px' p="6px 15px" borderRadius="6px" bg="white">
        {user.username}
        </MenuButton>
        <MenuList>
          <MenuItem><Button ml={3}><a onClick={logout}>Logout</a></Button></MenuItem>
        </MenuList>
      </Menu>
  );
};
