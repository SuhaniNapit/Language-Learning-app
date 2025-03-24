import React, { useEffect } from 'react';

const ElfsightChatbot = () => {
    useEffect(() => {
        // Load Elfsight script if it hasn't been loaded yet
        if (!document.querySelector('script[src="https://static.elfsight.com/platform/platform.js"]')) {
            const script = document.createElement('script');
            script.src = "https://static.elfsight.com/platform/platform.js";
            script.async = true;
            document.body.appendChild(script);
        }
    }, []);

    return (
        <div className="chatbot-container">
            <div 
                className="elfsight-app-8f61c18a-d9e7-4c2c-ad92-30c6dde14cdb" 
                data-elfsight-app-lazy
            ></div>
        </div>
    );
};

export default ElfsightChatbot;