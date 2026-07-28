'use client';

import { useRef, useEffect } from 'react';

const SITE_ORIGINS = [
    'https://www.thedatabaseproviders.com',
    'https://thedatabaseproviders.com',
];

function resolveParentHref(href) {
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
        return null;
    }

    try {
        const url = new URL(href, window.location.origin);
        const isSameSite =
            url.origin === window.location.origin ||
            SITE_ORIGINS.some((origin) => url.origin === origin);

        if (isSameSite) {
            return `${url.pathname}${url.search}${url.hash}`;
        }

        return url.href;
    } catch {
        return href;
    }
}

export default function StaticPageFrame({ htmlContent, title }) {
    const iframeRef = useRef(null);

    useEffect(() => {
        const iframe = iframeRef.current;
        if (!iframe) return;

        const resizeIframe = () => {
            try {
                const doc = iframe.contentDocument || iframe.contentWindow?.document;
                if (doc?.body) {
                    iframe.style.height = doc.body.scrollHeight + 'px';
                }
            } catch (e) {
                // silently fail for cross-origin
            }
        };

        const onLinkClick = (event) => {
            const anchor = event.target.closest?.('a[href]');
            if (!anchor) return;

            const href = anchor.getAttribute('href');
            const parentHref = resolveParentHref(href);
            if (!parentHref) return;

            event.preventDefault();
            window.top.location.href = parentHref;
        };

        const onLoad = () => {
            resizeIframe();
            try {
                const doc = iframe.contentDocument || iframe.contentWindow?.document;
                doc?.addEventListener('click', onLinkClick);
            } catch (e) {
                // ignore
            }
        };

        iframe.addEventListener('load', onLoad);

        // srcDoc may already be loaded before listener attaches
        if (iframe.contentDocument?.readyState === 'complete') {
            onLoad();
        }

        const interval = setInterval(resizeIframe, 500);

        return () => {
            iframe.removeEventListener('load', onLoad);
            try {
                const doc = iframe.contentDocument || iframe.contentWindow?.document;
                doc?.removeEventListener('click', onLinkClick);
            } catch (e) {
                // ignore
            }
            clearInterval(interval);
        };
    }, [htmlContent]);

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
