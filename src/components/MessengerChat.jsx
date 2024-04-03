import React from 'react';
import { FacebookProvider, CustomChat } from 'react-facebook';

const MessengerChat = () =>  {
        return (
            <FacebookProvider appId="439583835315840" chatSupport>
                <CustomChat pageId="104193128635029" minimized={false}/>
            </FacebookProvider> 
        );
}

export default MessengerChat;