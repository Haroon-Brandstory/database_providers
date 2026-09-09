import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as cheerio from 'cheerio';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const POSTS_DIR = path.join(ROOT, 'src/content/community/posts');
const GUIDES_DIR = path.join(ROOT, 'src/content/community/guides');
const OUTPUT = path.join(ROOT, 'src/lib/community-index.json');

function listHtml(dir) {
    if (!fs.existsSync(dir)) return [];
    return fs
        .readdirSync(dir)
        .filter((f) => f.endsWith('.html'))
        .map((f) => f.replace(/\.html$/, ''))
        .sort();
}

function textOf($el) {
    return ($el.text() || '').replace(/\s+/g, ' ').trim();
}

function parsePost(slug, html) {
    const $ = cheerio.load(html);
    const title = $('title').text().trim();
    const metaDescription = $('meta[name="description"]').attr('content') || '';
    const categorySlug = $('meta[name="community:category"]').attr('content') || '';
    const createdAt = $('meta[name="community:created"]').attr('content') || '';
    const featured = $('meta[name="community:featured"]').attr('content') === 'true';
    const oldSlug = $('meta[name="community:old-slug"]').attr('content') || '';
    const authorName = $('meta[name="community:author"]').attr('content') || 'Community member';
    const authorAvatar =
        $('meta[name="community:avatar"]').attr('content') || '/community/avatars/01.svg';
    const questionText = textOf($('.community-question'));
    const $answers = $('.community-answer');
    const answerTexts = $answers
        .toArray()
        .map((node) => textOf($(node)))
        .filter(Boolean);

    return {
        slug,
        oldSlug: oldSlug || undefined,
        title,
        categorySlug,
        createdAt,
        featured,
        metaDescription,
        authorName,
        authorAvatar,
        replyCount: $answers.length,
        searchText: [title, questionText, ...answerTexts].filter(Boolean).join(' '),
    };
}

function parseGuide(slug, html) {
    const $ = cheerio.load(html);
    const title = $('title').text().trim();
    const summary =
        $('meta[name="community:summary"]').attr('content') ||
        $('meta[name="description"]').attr('content') ||
        '';
    const authorName =
        $('meta[name="community:author"]').attr('content') || 'Database Providers';
    const authorAvatar =
        $('meta[name="community:avatar"]').attr('content') || '/pricing-plan/db_bubble.png';
    const bodyText = textOf($('.community-guide'));

    return {
        slug,
        title,
        summary,
        authorName,
        authorAvatar,
        searchText: [title, summary, bodyText].filter(Boolean).join(' '),
    };
}

const posts = listHtml(POSTS_DIR).map((slug) => {
    const html = fs.readFileSync(path.join(POSTS_DIR, `${slug}.html`), 'utf8');
    return parsePost(slug, html);
});

const guides = listHtml(GUIDES_DIR).map((slug) => {
    const html = fs.readFileSync(path.join(GUIDES_DIR, `${slug}.html`), 'utf8');
    return parseGuide(slug, html);
});

const payload = {
    generatedAt: new Date().toISOString(),
    posts,
    guides,
};

fs.writeFileSync(OUTPUT, `${JSON.stringify(payload, null, 2)}\n`);
console.log(
    `Generated community-index.json (posts:${posts.length}, guides:${guides.length})`
);
