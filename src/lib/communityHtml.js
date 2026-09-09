import fs from 'fs';
import path from 'path';
import * as cheerio from 'cheerio';
import 'server-only';

const COMMUNITY_ROOT = path.join(process.cwd(), 'src', 'content', 'community');
const TEAM_AVATAR = '/pricing-plan/db_bubble.png';
const DEFAULT_AVATAR = '/community/avatars/01.svg';

export function getCommunityPostFilePath(slug) {
    return path.join(COMMUNITY_ROOT, 'posts', `${slug}.html`);
}

export function getCommunityGuideFilePath(slug) {
    return path.join(COMMUNITY_ROOT, 'guides', `${slug}.html`);
}

export function readCommunityPostHtml(slug) {
    const filePath = getCommunityPostFilePath(slug);
    if (!fs.existsSync(/* turbopackIgnore: true */ filePath)) return null;
    return fs.readFileSync(/* turbopackIgnore: true */ filePath, 'utf-8');
}

export function readCommunityGuideHtml(slug) {
    const filePath = getCommunityGuideFilePath(slug);
    if (!fs.existsSync(/* turbopackIgnore: true */ filePath)) return null;
    return fs.readFileSync(/* turbopackIgnore: true */ filePath, 'utf-8');
}

function htmlInner($, el) {
    if (!el || !el.length) return '';
    return el.html()?.trim() || '';
}

function textInner($, el) {
    if (!el || !el.length) return '';
    return (el.text() || '').replace(/\s+/g, ' ').trim();
}

function parseAnswers($, fallbackDate) {
    const nodes = $('.community-answer').toArray();
    const explicitAccepted = nodes.some(
        (node) => $(node).attr('data-accepted') === 'true'
    );

    const answers = nodes.map((node, index) => {
        const $el = $(node);
        const authorName = $el.attr('data-author') || 'Community member';
        const isTeam = /database providers/i.test(authorName);
        const acceptedAttr = $el.attr('data-accepted');
        const accepted = explicitAccepted
            ? acceptedAttr === 'true'
            : index === 0;

        return {
            id: $el.attr('data-id') || `a${index + 1}`,
            authorName,
            authorAvatar:
                $el.attr('data-avatar') ||
                (isTeam ? TEAM_AVATAR : DEFAULT_AVATAR),
            createdAt: $el.attr('data-date') || fallbackDate,
            body: textInner($, $el),
            bodyHtml: htmlInner($, $el),
            accepted,
        };
    });

    answers.sort((a, b) => {
        if (a.accepted !== b.accepted) return a.accepted ? -1 : 1;
        return String(a.createdAt).localeCompare(String(b.createdAt));
    });

    return answers;
}

/** Full post for detail page (from HTML). */
export function parseCommunityPostDetail(slug, html) {
    const $ = cheerio.load(html);
    const title = $('title').text().trim();
    const metaDescription = $('meta[name="description"]').attr('content') || '';
    const categorySlug = $('meta[name="community:category"]').attr('content') || '';
    const createdAt = $('meta[name="community:created"]').attr('content') || '';
    const featured = $('meta[name="community:featured"]').attr('content') === 'true';
    const oldSlug = $('meta[name="community:old-slug"]').attr('content') || '';
    const authorName = $('meta[name="community:author"]').attr('content') || 'Community member';
    const authorAvatar =
        $('meta[name="community:avatar"]').attr('content') || DEFAULT_AVATAR;

    const $question = $('.community-question').first();
    const bodyHtml = htmlInner($, $question);
    const bodyText = textInner($, $question);
    const answers = parseAnswers($, createdAt);
    const acceptedAnswer = answers.find((a) => a.accepted) || null;

    return {
        slug,
        oldSlug: oldSlug || undefined,
        title,
        body: bodyText,
        bodyHtml,
        categorySlug,
        createdAt,
        featured,
        metaDescription,
        authorName,
        authorAvatar,
        answers,
        acceptedAnswer,
        replyCount: answers.length,
    };
}

/** Full guide for detail page (from HTML). */
export function parseCommunityGuideDetail(slug, html) {
    const $ = cheerio.load(html);
    const title = $('title').text().trim();
    const summary =
        $('meta[name="community:summary"]').attr('content') ||
        $('meta[name="description"]').attr('content') ||
        '';
    const authorName =
        $('meta[name="community:author"]').attr('content') || 'Database Providers';
    const authorAvatar =
        $('meta[name="community:avatar"]').attr('content') || TEAM_AVATAR;
    const $guide = $('.community-guide').first();
    const bodyHtml = htmlInner($, $guide);
    const bodyText = textInner($, $guide);

    return {
        slug,
        title,
        summary,
        authorName,
        authorAvatar,
        body: bodyText,
        bodyHtml,
    };
}

export function getCommunityPostDetail(slug) {
    const html = readCommunityPostHtml(slug);
    if (!html) return null;
    return parseCommunityPostDetail(slug, html);
}

export function getCommunityGuideDetail(slug) {
    const html = readCommunityGuideHtml(slug);
    if (!html) return null;
    return parseCommunityGuideDetail(slug, html);
}
