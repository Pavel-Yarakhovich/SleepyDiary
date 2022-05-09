import { useState, useEffect } from 'react';

// Components
import { Heading, Flex } from "@chakra-ui/react";
import { Link } from 'components/Link';
import { Navigation } from 'components/Navigation';
import { UserMenu } from 'components/UserMenu';
import { userService } from 'services';

export { Nav };

function Nav() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const subscription = userService.user.subscribe(x => setUser(x));
        return () => subscription.unsubscribe();
    }, []);

    function logout() {
        userService.logout();
    }

    // only show nav when logged in
    if (!user) return null;

    return (
        <header>
            <Flex alignItems={'center'} w="100%">
                    <Link href="/" exact>
                        <Heading fontSize={36} fontWeight="bold">
                            Sleepy Diary
                        </Heading>
                    </Link>
                    <Navigation />
                    <UserMenu user={user} logout={logout} />
            </Flex>
        </header>
    );
}