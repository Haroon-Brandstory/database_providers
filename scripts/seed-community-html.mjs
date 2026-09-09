/**
 * One-shot: write community HTML from current seed data.
 * Re-run only if you intentionally want to overwrite HTML from this seed.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const POSTS_DIR = path.join(ROOT, 'src/content/community/posts');
const GUIDES_DIR = path.join(ROOT, 'src/content/community/guides');
const BASE = 'https://www.thedatabaseproviders.com';
const TEAM = 'Database Providers';

const AUTHORS = [
    { name: 'Jordan Blake', avatar: '/community/avatars/01.svg' },
    { name: 'Priya Raman', avatar: '/community/avatars/02.svg' },
    { name: 'Marcus Chen', avatar: '/community/avatars/03.svg' },
    { name: 'Elena Vargas', avatar: '/community/avatars/04.svg' },
    { name: 'Sam Okonkwo', avatar: '/community/avatars/05.svg' },
    { name: 'Avery Kim', avatar: '/community/avatars/06.svg' },
    { name: 'Noah Patel', avatar: '/community/avatars/07.svg' },
    { name: 'Riley Brooks', avatar: '/community/avatars/08.svg' },
    { name: 'Camila Santos', avatar: '/community/avatars/01.svg' },
    { name: 'Drew Nguyen', avatar: '/community/avatars/02.svg' },
];

function esc(str) {
    return String(str ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function inlineMd(text) {
    return esc(text).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
}

function markdownToHtml(body) {
    const blocks = body.trim().split(/\n\n+/);
    return blocks
        .map((block) => {
            const trimmed = block.trim();
            if (trimmed.startsWith('## ')) {
                return `<h2>${inlineMd(trimmed.replace(/^##\s+/, ''))}</h2>`;
            }
            const lines = trimmed.split('\n').filter(Boolean);
            if (/^\d+\.\s/.test(lines[0])) {
                const items = lines
                    .map((line) => `<li>${inlineMd(line.replace(/^\d+\.\s+/, ''))}</li>`)
                    .join('');
                return `<ol>${items}</ol>`;
            }
            if (lines[0].startsWith('- ')) {
                const items = lines
                    .map((line) => `<li>${inlineMd(line.replace(/^-\s+/, ''))}</li>`)
                    .join('');
                return `<ul>${items}</ul>`;
            }
            return `<p>${inlineMd(trimmed)}</p>`;
        })
        .join('\n');
}

const posts = [
    {
        slug: 'how-long-does-list-delivery-usually-take',
        oldSlug: 'order-delivery-timeline',
        title: 'How long does list delivery usually take?',
        body: 'I placed an order for a targeted IT decision-maker list yesterday. Portal still shows processing. What is a normal turnaround, and when should I follow up with support?',
        categorySlug: 'account-access',
        createdAt: '2026-07-28',
        featured: true,
        metaDescription:
            'Most standard list orders complete within 1–2 business days. Custom multi-geo or enrichment jobs can take longer—follow up after 3 business days with your order ID.',
        acceptedAnswer: {
            authorName: TEAM,
            body: 'Most standard list orders complete within 1–2 business days. Custom multi-geo or enrichment jobs can take longer. If it passes 3 business days, reply with your order ID in a support ticket.',
            createdAt: '2026-07-28',
        },
    },
    {
        slug: 'seeing-higher-bounce-than-expected-after-export',
        oldSlug: 'high-bounce-after-export',
        title: 'Seeing higher bounce than expected after export',
        body: 'Exported a verified manufacturing segment and bounce sat around 8% on first send. Is that normal? Any checklist before blaming the file?',
        categorySlug: 'data-quality',
        createdAt: '2026-07-20',
        featured: true,
        metaDescription:
            'Before blaming the file, check suppression lists, domain warm-up, and whether old CRM contacts were mixed into the same campaign as your verified export.',
        acceptedAnswer: {
            authorName: TEAM,
            body: 'Check suppression and whether the sending domain was warmed. Also confirm you did not mix old CRM contacts into the same campaign. Bounce around that range often points to sending hygiene or list mixing rather than a single export issue.',
            createdAt: '2026-07-21',
        },
    },
    {
        slug: 'gdpr-friendly-outreach-with-purchased-b2b-lists',
        oldSlug: 'gdpr-compliant-outreach',
        title: 'GDPR-friendly outreach with purchased B2B lists',
        body: 'We sell into EU accounts. What do teams typically document when using B2B contact data for cold email under GDPR? Looking for practical process tips, not legal advice.',
        categorySlug: 'outreach-campaigns',
        createdAt: '2026-07-12',
        featured: true,
        metaDescription:
            'Operational GDPR hygiene for B2B lists: document lawful basis, honor opt-outs fast, prefer role-based contacts, and keep clear unsubscribe paths—always confirm with your counsel.',
        acceptedAnswer: {
            authorName: TEAM,
            body: 'Talk to your counsel. Operationally, teams keep a lawful-basis record, honor opt-outs fast, and avoid scraping personal inboxes. Use role-based B2B contacts and clear unsubscribe paths.',
            createdAt: '2026-07-12',
        },
    },
    {
        slug: 'password-reset-email-never-arrives',
        oldSlug: 'cannot-reset-portal-password',
        title: 'Password reset email never arrives',
        body: 'Tried forgot-password three times. Nothing in inbox or spam. Company uses Google Workspace. Anyone else hit this?',
        categorySlug: 'account-access',
        createdAt: '2026-07-05',
        featured: false,
        metaDescription:
            'If portal password-reset mail never arrives, allowlist the sender domain with IT and confirm the email matches the one on your original purchase.',
        acceptedAnswer: {
            authorName: TEAM,
            body: 'Ask IT to allowlist the sender domain. Also confirm the email matches the one on the original purchase. If it still fails, open a support ticket with your company name and order ID.',
            createdAt: '2026-07-05',
        },
    },
    {
        slug: 'apac-coverage-for-vp-marketing-titles',
        oldSlug: 'coverage-for-apac-titles',
        title: 'APAC coverage for VP Marketing titles',
        body: 'Need Singapore + Malaysia VP/Head of Marketing. Roughly how deep is coverage for mid-market SaaS?',
        categorySlug: 'data-quality',
        createdAt: '2026-06-30',
        featured: false,
        metaDescription:
            'Singapore and Malaysia VP/Head of Marketing coverage varies by firmographic filters—share ICP details with your AE for a count estimate before ordering.',
        acceptedAnswer: {
            authorName: TEAM,
            body: 'Coverage for Singapore and Malaysia marketing leadership is available and depth depends on company size, industry, and title mix. Share your ICP with your account executive for a count estimate before you order.',
            createdAt: '2026-06-30',
        },
    },
    {
        slug: 'can-i-filter-by-crm-or-marketing-stack',
        oldSlug: 'segment-by-technographics',
        title: 'Can I filter by CRM or marketing stack?',
        body: 'Want accounts already on HubSpot or Salesforce. Is technographic filtering available on list builds, or only firmographic?',
        categorySlug: 'outreach-campaigns',
        createdAt: '2026-06-22',
        featured: false,
        metaDescription:
            'Technographic filters such as HubSpot or Salesforce are available as add-ons on some packages—ask your AE; they are not included in every firmographic-only build.',
        acceptedAnswer: {
            authorName: TEAM,
            body: 'Ask your AE for intent/technographic add-ons. Not every package includes stack filters by default; many builds start firmographic and add technology filters when scoped.',
            createdAt: '2026-06-23',
        },
    },
    {
        slug: 'best-way-to-push-contacts-into-salesforce',
        oldSlug: 'export-to-salesforce',
        title: 'Best way to push contacts into Salesforce',
        body: 'We get CSV exports today. Anyone using a cleaner Salesforce import mapping for title, company, and LinkedIn URL fields?',
        categorySlug: 'integrations-tools',
        createdAt: '2026-06-15',
        featured: false,
        metaDescription:
            'For Salesforce imports, map Email as an external ID, match Company to Account Name, store LinkedIn URL in a custom field, and deduplicate before import.',
        acceptedAnswer: {
            authorName: TEAM,
            body: 'Map Email as external ID when possible, keep Company as Account Name match, and store LinkedIn URL in a custom field. Deduplicate before import.',
            createdAt: '2026-06-16',
        },
    },
    {
        slug: 'email-permutator-when-to-use-vs-verified-lists',
        oldSlug: 'email-permutator-tips',
        title: 'Email permutator — when to use it vs verified lists',
        body: 'Is the on-site email permutator meant for enrichment when I already have names, or as a replacement for verified lists?',
        categorySlug: 'integrations-tools',
        createdAt: '2026-06-08',
        featured: false,
        metaDescription:
            'Use the email permutator to enrich known names, then verify—do not treat it as a substitute for a verified database pull.',
        acceptedAnswer: {
            authorName: TEAM,
            body: 'Treat it as a helper for known names, then verify. It is not a substitute for a verified database pull.',
            createdAt: '2026-06-09',
        },
    },
    {
        slug: 'partial-credit-when-count-is-short',
        oldSlug: 'order-partial-refund',
        title: 'Partial credit when count is short',
        body: 'Ordered 5k contacts; delivery came in under count for a rare title combo. How do refunds or credits usually work?',
        categorySlug: 'account-access',
        createdAt: '2026-05-28',
        featured: false,
        metaDescription:
            'When a rare title combo delivers under count, contact support with your order ID—credits or replenishment options are handled case by case.',
        acceptedAnswer: {
            authorName: TEAM,
            body: 'For short counts on rare title combinations, open a support ticket with your order ID. We review delivery against the scoped filters and typically offer credit or replenishment options when the count falls short of what was confirmed.',
            createdAt: '2026-05-28',
        },
    },
    {
        slug: 'remove-duplicate-tool-vs-excel',
        oldSlug: 'remove-duplicate-tool',
        title: 'Remove-duplicate tool vs Excel',
        body: 'Anyone prefer the site remove-duplicate tool over spreadsheet dedupe before uploads to CRM?',
        categorySlug: 'integrations-tools',
        createdAt: '2026-05-18',
        featured: false,
        metaDescription:
            'Run the on-site remove-duplicate tool on email first, then optionally a second pass on domain and title in Sheets for edge cases before CRM upload.',
        acceptedAnswer: {
            authorName: TEAM,
            body: 'Run the tool first on email, then a second pass on domain+title in Sheets for edge cases before CRM upload.',
            createdAt: '2026-05-19',
        },
    },
];

const guides = [
    {
        slug: 'forgot-account-password',
        title: 'I forgot my account password — FAQ',
        summary:
            'Steps to reset access, recover your Database Providers portal login, and what to do if recovery email is missing.',
        authorName: TEAM,
        authorAvatar: '/pricing-plan/db_bubble.png',
        body: `Important: This is an official guide from Database Providers. We cannot reset your password for you. Use the official recovery flow, then contact support if you still need help.

## Quick steps
1. Go to the sign-in page and choose **Forgot password**.
2. Enter the email tied to your Database Providers account.
3. Open the reset link from your inbox (check spam).
4. Set a new password and sign in again.

## If you never get the email
- Confirm you are using the same email used on the original order.
- Wait a few minutes and request another reset.
- Contact support with your company name and recent order ID.

## Still locked out?
Open a support ticket with what you already tried. Do not share passwords or full payment details.`,
    },
    {
        slug: 'improve-list-deliverability',
        title: 'How to improve email list deliverability',
        summary:
            'Practical checklist for verification, suppression, and sending practices that keep bounce rates low.',
        authorName: TEAM,
        authorAvatar: '/pricing-plan/db_bubble.png',
        body: `Deliverability problems usually come from stale contacts, weak targeting, or aggressive sending — not from one bad export.

## Before you send
- Suppress known unsubscribes and hard bounces.
- Prefer recently verified segments for cold outreach.
- Align titles and industries with your ICP before volume ramps.

## Sending hygiene
- Warm domains gradually; avoid blasting a brand-new domain.
- Keep subject lines and body copy relevant to the persona.
- Monitor bounce and complaint rates after each batch.

## When bounce is high
Share sample bounce codes (without contact PII) with support so we can help diagnose.`,
    },
    {
        slug: 'choosing-the-right-segment',
        title: 'Choosing the right B2B segment',
        summary:
            'How to pick industry, title, and geography filters so your list matches campaign goals.',
        authorName: TEAM,
        authorAvatar: '/pricing-plan/db_bubble.png',
        body: `A good segment is narrow enough to personalize, wide enough to fill pipeline.

## Start from the offer
- Who can buy or influence this product?
- Which titles actually reply in your past campaigns?
- Which geos can you support with follow-up?

## Common mistakes
- Mixing too many industries in one send.
- Targeting C-level only when managers own the workflow.
- Ignoring company size when your pricing is SMB-only.

Talk with your account team about what has worked for your niche.`,
    },
];

function writePostHtml(post, author, index) {
    const canonical = `${BASE}/community/${post.slug}/`;
    const answer = post.acceptedAnswer;
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${esc(post.title)}</title>
  <meta name="description" content="${esc(post.metaDescription)}">
  <link rel="canonical" href="${canonical}">
  <meta name="robots" content="index, follow">
  <meta name="community:type" content="post">
  <meta name="community:category" content="${esc(post.categorySlug)}">
  <meta name="community:created" content="${esc(post.createdAt)}">
  <meta name="community:featured" content="${post.featured ? 'true' : 'false'}">
  <meta name="community:old-slug" content="${esc(post.oldSlug || '')}">
  <meta name="community:author" content="${esc(author.name)}">
  <meta name="community:avatar" content="${esc(author.avatar)}">
</head>
<body>
  <article class="community-question">
    <p>${esc(post.body)}</p>
  </article>
  ${
      answer
          ? `<section class="community-answer" data-author="${esc(answer.authorName)}" data-date="${esc(answer.createdAt)}">
    <p>${esc(answer.body)}</p>
  </section>`
          : ''
  }
</body>
</html>
`;
    fs.writeFileSync(path.join(POSTS_DIR, `${post.slug}.html`), html);
}

function writeGuideHtml(guide) {
    const canonical = `${BASE}/community/guides/${guide.slug}/`;
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${esc(guide.title)}</title>
  <meta name="description" content="${esc(guide.summary)}">
  <link rel="canonical" href="${canonical}">
  <meta name="robots" content="index, follow">
  <meta name="community:type" content="guide">
  <meta name="community:summary" content="${esc(guide.summary)}">
  <meta name="community:author" content="${esc(guide.authorName)}">
  <meta name="community:avatar" content="${esc(guide.authorAvatar)}">
</head>
<body>
  <article class="community-guide">
${markdownToHtml(guide.body)}
  </article>
</body>
</html>
`;
    fs.writeFileSync(path.join(GUIDES_DIR, `${guide.slug}.html`), html);
}

fs.mkdirSync(POSTS_DIR, { recursive: true });
fs.mkdirSync(GUIDES_DIR, { recursive: true });

posts.forEach((post, i) => writePostHtml(post, AUTHORS[i % AUTHORS.length], i));
guides.forEach(writeGuideHtml);

console.log(`Seeded ${posts.length} posts + ${guides.length} guides`);
