'use client';

import { useRef, useEffect } from 'react';

export default function StaticPageFrame({ htmlContent, title }) {
    const iframeRef = useRef(null);

    useEffect(() => {
        const iframe = iframeRef.current;
        if (!iframe) return;

        const resizeIframe = () => {
            try {
                const doc = iframe.contentDocument || iframe.contentWindow?.document;
                if (doc?.body) {
                    // Set height to scrollHeight to avoid internal scrollbars
                    iframe.style.height = doc.body.scrollHeight + 'px';
                }
            } catch (e) {
                // silently fail for cross-origin
            }
        };

        iframe.addEventListener('load', resizeIframe);

        // Also observe for resize changes inside the iframe (e.g. accordions expanding)
        const interval = setInterval(resizeIframe, 500);

        return () => {
            iframe.removeEventListener('load', resizeIframe);
            clearInterval(interval);
        };
    }, []);

    return (
        <div className="static-page-wrapper">
            <iframe
                ref={iframeRef}
                srcDoc={htmlContent}
                style={{
                    width: '100%',
                    border: 'none',
                    minHeight: '100vh',
                    display: 'block',
                    overflow: 'hidden'
                }}
                title={title}
            />
        </div>
    );
}
