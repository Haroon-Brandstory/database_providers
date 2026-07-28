import fs from 'fs';
import path from 'path';
import * as cheerio from 'cheerio';

function resolveUnderCwd(...parts) {
    const cwd = /* turbopackIgnore: true */ process.cwd();
    return [cwd, ...parts].join(path.sep);
}

export function getStaticPageFilePath(locale, slug) {
    return resolveUnderCwd('src', 'content', 'static-pages', locale, `${slug}.html`);
}

export function readStaticPageHtml(locale, slug) {
    const filePath = getStaticPageFilePath(locale, slug);
    if (!fs.existsSync(/* turbopackIgnore: true */ filePath)) return null;
    return fs.readFileSync(/* turbopackIgnore: true */ filePath, 'utf-8');
}

export function extractStaticPageMetadata(htmlContent) {
    const $ = cheerio.load(htmlContent);

    const alternates = {
        canonical: $('link[rel="canonical"]').attr('href') || '',
        languages: {},
    };

    $('link[rel="alternate"][hreflang]').each((_, el) => {
        const hreflang = $(el).attr('hreflang');
        const href = $(el).attr('href');
        if (hreflang && href) {
            alternates.languages[hreflang] = href;
        }
    });

    return {
        title: $('title').text() || 'Database Providers',
        description: $('meta[name="description"]').attr('content') || '',
        keywords: $('meta[name="keywords"]').attr('content') || '',
        alternates,
        openGraph: {
            title: $('meta[property="og:title"]').attr('content') || $('title').text(),
            description:
                $('meta[property="og:description"]').attr('content') ||
                $('meta[name="description"]').attr('content'),
            url: $('meta[property="og:url"]').attr('content') || '',
            siteName: $('meta[property="og:site_name"]').attr('content') || 'The Database Providers',
            images: [
                {
                    url: $('meta[property="og:image"]').attr('content') || '',
                },
            ],
            type: $('meta[property="og:type"]').attr('content') || 'website',
        },
        robots: $('meta[name="robots"]').attr('content') || 'index, follow',
        authors: [{ name: $('meta[name="author"]').attr('content') || 'Database Providers' }],
    };
}
