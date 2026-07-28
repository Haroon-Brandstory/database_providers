import fs from 'fs';
import path from 'path';
import * as cheerio from 'cheerio';
import StaticPageFrame from '@/components/StaticPageFrame';
import { LEGAL_PAGE_SLUGS, isLegalPageSlug } from '@/lib/staticPages';
import { extractStaticPageMetadata, getStaticPageFilePath } from '@/lib/staticPage';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
    return LEGAL_PAGE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
    const { slug } = await params;

    if (!isLegalPageSlug(slug)) {
        return { title: 'Database Providers' };
    }

    try {
        const filePath = getStaticPageFilePath('en', slug);
        if (fs.existsSync(filePath)) {
            const htmlContent = fs.readFileSync(filePath, 'utf-8');
            return extractStaticPageMetadata(htmlContent);
        }
    } catch (err) {
        console.error('Error reading legal page metadata:', err);
    }

    return { title: 'Database Providers' };
}

export default async function LegalPage({ params }) {
    const { slug } = await params;

    if (!isLegalPageSlug(slug)) {
        notFound();
    }

    const filePath = path.join(process.cwd(), 'src', 'content', 'static-pages', 'en', `${slug}.html`);
    if (!fs.existsSync(filePath)) {
        notFound();
    }

    try {
        const htmlContent = fs.readFileSync(filePath, 'utf-8');
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
        console.error('Error rendering legal page:', err);
        notFound();
    }
}
