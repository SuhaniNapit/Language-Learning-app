import React, { useEffect } from 'react';

const ElfsightChatbot = () => {
    useEffect(() => {
        // Load the Elfsight platform script
        const script = document.createElement('script');
        script.src = 'https://static.elfsight.com/platform/platform.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script); // Cleanup on unmount
        };
    }, []);

    return (
        <div className="elfsight-app-8f61c18a-d9e7-4c2c-ad92-30c6dde14cdb" data-elfsight-app-lazy>
            {/* The chatbot will be rendered here */}
        </div>
    );
};

export default ElfsightChatbot;