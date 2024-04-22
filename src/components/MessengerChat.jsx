import React from 'react';
import { FacebookProvider, CustomChat } from 'react-facebook';

const MessengerChat = () =>  {
        return (
            <FacebookProvider appId="439583835315840" chatSupport>
                <CustomChat pageId="109171448503535" minimized={false}/>
            </FacebookProvider> 
        );
}

export default MessengerChat;