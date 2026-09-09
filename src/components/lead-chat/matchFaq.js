import chatFaq from './chatFaq.json';

function normalize(text) {
    return String(text || '')
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function tokenize(text) {
    return normalize(text)
        .split(' ')
        .filter((t) => t.length > 1);
}

/**
 * Keyword score FAQ match. Returns best FAQ above threshold, or null.
 * @param {string} query
 * @param {{ minScore?: number }} [opts]
 */
export function matchFaq(query, opts = {}) {
    const minScore = opts.minScore ?? 2;
    const q = normalize(query);
    if (!q || q.length < 2) return null;

    const qTokens = new Set(tokenize(q));
    let best = null;
    let bestScore = 0;

    for (const faq of chatFaq.faqs || []) {
        let score = 0;
        const questionNorm = normalize(faq.question);

        if (questionNorm && (q.includes(questionNorm) || questionNorm.includes(q))) {
            score += 6;
        }

        for (const kw of faq.keywords || []) {
            const k = normalize(kw);
            if (!k) continue;
            if (q.includes(k)) {
                score += k.includes(' ') ? 3 : 2;
                continue;
            }
            const kwTokens = tokenize(k);
            const overlap = kwTokens.filter((t) => qTokens.has(t)).length;
            if (overlap && overlap === kwTokens.length) score += 2;
            else if (overlap) score += 1;
        }

        // light boost when category words appear
        const cat = normalize(faq.category);
        if (cat && qTokens.has(cat)) score += 0.5;

        if (score > bestScore) {
            bestScore = score;
            best = faq;
        }
    }

    if (!best || bestScore < minScore) return null;
    return { ...best, score: bestScore };
}

export function getFaqFallback() {
    return (
        chatFaq.fallback ||
        "I don't have that in our FAQ yet. Our team will follow up with you."
    );
}

export function getFaqQuickQuestions() {
    return Array.isArray(chatFaq.quickQuestions) ? chatFaq.quickQuestions : [];
}

export { chatFaq };
