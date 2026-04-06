import { getCategoryBySlug, getServicesBySlug } from "@/lib/services";
import fs from 'fs';
import path from 'path';
import * as cheerio from 'cheerio';
import StaticPageFrame from '@/components/StaticPageFrame';
import ServicePageBanner from '@/components/servicebanner';
import PowerPackSection from '@/components/servPowerPack';
import PowerPackInfinitySection from '@/components/catPowerInfinity';
import CategoryDynamicVideo from '@/components/catDynamicVideo';
import WorldMap from '@/components/worldMap';
import IconCategorySection from '@/components/iconIndSection';
import EmailFormatSection from '@/components/emailFotmatSection';
import VerificationProcess from '@/components/dataVerificationSection';
import InstantAccessSection from '@/components/instantAccessSection';
import RoiServiceSection from '@/components/roiServSection';
import BusinessExpansionSection from '@/components/businessExpansionSection';
import EmailDatabaseSection from '@/components/emailDbSection';
import ClientForm from '@/components/clientForm';
import ServiceFaqSection from '@/components/serviceFaq';
import BenefitEmailCategory from '@/components/benefitEmailSection';
import EmailOpenRates from '@/components/emailOpenRates';

import { notFound } from "next/navigation";

const componentMap = {
    "service-category.category-banner": ServicePageBanner,
    "service-category.power-packed-section": PowerPackSection,
    "service-category.powerpack-infinity": PowerPackInfinitySection,
    "service-category.video-section": CategoryDynamicVideo,
    "service-category.country-section": WorldMap,
    "service-category.industries-covered": IconCategorySection,
    "service-category.email-format-section": EmailFormatSection,
    "service-category.data-verification": VerificationProcess,
    "service-category.instant-access": InstantAccessSection,
    "service-category.roi-section": RoiServiceSection,
    "service-category.business-expansion": BusinessExpansionSection,
    "service-category.exclusive-email": EmailDatabaseSection,
    "service-category.faq-section": ServiceFaqSection,
    "service-category.benefit-email": BenefitEmailCategory,
    "service-category.client-form": ClientForm,
    "service-category.email-open-rates": EmailOpenRates,
};

export async function generateMetadata({ params }) {
    const { locale, slug } = await params;
    
    // 1. You can fetch SEO from Strapi here if those functions exist in your codebase in the future.
    // let seoData = ...

    // 2. Fallback to extracting from static HTML file
    try {
        const filePath = path.join(process.cwd(), 'src', 'content', 'static-pages', locale, `${slug}.html`);
        if (fs.existsSync(filePath)) {
            const htmlContent = fs.readFileSync(filePath, 'utf-8');
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
                title: $('title').text() || `${slug} - Database Providers`,
                description: $('meta[name="description"]').attr('content') || '',
                keywords: $('meta[name="keywords"]').attr('content') || '',
                alternates,
                openGraph: {
                    title: $('meta[property="og:title"]').attr('content') || $('title').text(),
                    description: $('meta[property="og:description"]').attr('content') || $('meta[name="description"]').attr('content'),
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
                authors: [
                    { name: $('meta[name="author"]').attr('content') || 'Database Providers' }
                ],
            };
        }
    } catch (err) {
        console.error("Error reading static HTML for metadata:", err);
    }
    
    return {
        title: "Database Providers",
    }
}

export default async function Page({ params }) {
    const { locale, slug } = await params;

    // 1. Check for static HTML file FIRST (before Strapi, because fetchAPI calls notFound() on error)
    const filePath = path.join(process.cwd(), 'src', 'content', 'static-pages', locale, `${slug}.html`);
    if (fs.existsSync(filePath)) {
        try {
            const htmlContent = fs.readFileSync(filePath, 'utf-8');

            return (
                <div className="static-page-container">
                    <StaticPageFrame htmlContent={htmlContent} title={slug} />
                </div>
            );
        } catch (err) {
            console.error("Error rendering static HTML:", err);
        }
    }

    // 2. No static file — try Strapi API
    let data = await getServicesBySlug(slug);

    if (!data?.data?.[0]) {
        data = await getCategoryBySlug(slug);
    }

    const item = data?.data?.[0];
    if (!item) notFound();

    let sections = [];

    if (item.sections) {
         sections = item.sections
    } else if (item.components) {
        sections = item.components
    } else {
        return sections;
    }

    return (
        <>
            {sections.length === 0 ? (
                <h3 className="text-center py-50 text-white font-medium">
                    No sections available for this page.
                </h3>
            ) : (
                sections.map((sec, idx) => {
                    const Component = componentMap[sec.__component];
                    if (!Component) return null;

                    try {
                        return <Component key={idx} data={sec} />;
                    } catch (err) {
                        console.error("Error rendering component:", sec.__component, err);
                        return null;
                    }
                })
            )}
        </>
    );
}
