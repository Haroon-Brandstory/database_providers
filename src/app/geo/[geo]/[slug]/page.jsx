import * as cheerio from 'cheerio';
import StaticPageFrame from '@/components/StaticPageFrame';
import { GEO_PREFIXES, isGeoPrefix } from '@/lib/geoPrefixes';
import {
    extractStaticPageMetadata,
    readStaticPageHtml,
} from '@/lib/staticPage';
import { STATIC_PAGE_SLUGS_BY_LOCALE } from '@/lib/staticPages';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
    return GEO_PREFIXES.flatMap((geo) =>
        (STATIC_PAGE_SLUGS_BY_LOCALE[geo] ?? []).map((slug) => ({ geo, slug }))
    );
}

export async function generateMetadata({ params }) {
    const { geo, slug } = await params;

    if (!isGeoPrefix(geo)) {
        return { title: 'Database Providers' };
    }

    try {
        const htmlContent = readStaticPageHtml(geo, slug);
        if (htmlContent) {
            return extractStaticPageMetadata(htmlContent);
        }
    } catch (err) {
        console.error('Error reading geo page metadata:', err);
    }

    return { title: 'Database Providers' };
}

export default async function GeoStaticPage({ params }) {
    const { geo, slug } = await params;

    if (!isGeoPrefix(geo)) {
        notFound();
    }

    const htmlContent = readStaticPageHtml(geo, slug);
    if (!htmlContent) {
        notFound();
    }

    try {
        const $ = cheerio.load(htmlContent);
        const bodyContent = $('body').html();

        return (
            <div className="static-page-container pt-[80px]">
                <div
                    className="seo-content-source"
                    style={{ display: 'none' }}
                    dangerouslySetInnerHTML={{ __html: bodyContent }}
                />
                <StaticPageFrame htmlContent={htmlContent} title={slug} />
            </div>
        );
    } catch (err) {
        console.error('Error rendering geo page:', err);
        notFound();
    }
}
