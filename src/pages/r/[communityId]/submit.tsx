// * ========== Imports ==========

import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import PageContent from '../../../components/Layout/PageContent';
import NewPostForm from '../../../components/Posts/NewPostForm';
import { auth } from '../../../firebase/clientApp';

// *========== Variables & Functions ==========

const SubmitPostPage:React.FC = () => {

    const [user] = useAuthState(auth);

    // * ========== HTML ==========

    return (
        <PageContent>
            <>
            <Box p="14px 0px" borderBottom="1px solid" >
                <Text>Create a post</Text>
            </Box>
            { user && <NewPostForm user={user} />}
            </>
            <>
            {/* About */}
            </>
        </PageContent>
    )
}
export default SubmitPostPage;