export const INTENT_OPTIONS = [
    { id: "buy-list", label: "Buy a list" },
    { id: "pricing", label: "Get pricing" },
    { id: "demo", label: "Book a demo" },
    { id: "other", label: "Something else" },
];

export const CHAT_STEPS = [
    {
        id: "intent",
        type: "buttons",
        bot: "Hi! I can help you find the right B2B database. What do you need?",
        options: INTENT_OPTIONS,
        field: "intent",
    },
    {
        id: "companyName",
        type: "text",
        bot: "What's your company name?",
        placeholder: "Company name",
        field: "companyName",
        required: true,
    },
    {
        id: "businessEmail",
        type: "email",
        bot: "What's your work email?",
        placeholder: "you@company.com",
        field: "businessEmail",
        required: true,
    },
    {
        id: "phone",
        type: "phone",
        bot: "Best number to reach you?",
        field: "mobileNumber",
        required: true,
    },
    {
        id: "name",
        type: "text",
        bot: "And your name?",
        placeholder: "Full name",
        field: "name",
        required: true,
    },
    {
        id: "notes",
        type: "textarea",
        bot: "Anything else we should know? (optional)",
        placeholder: "Industry, list size, timeline…",
        field: "notes",
        required: false,
        allowSkip: true,
    },
];

export function intentLabel(intentId) {
    return INTENT_OPTIONS.find((o) => o.id === intentId)?.label || intentId || "Enquiry";
}

export function buildLeadMessage({ intent, notes }) {
    const intentText = intentLabel(intent);
    const extra = String(notes || "").replace(/\s+/g, " ").trim();
    if (extra) return `Chatbot · ${intentText}. ${extra}`;
    return `Chatbot · ${intentText}. Looking for more details from sales.`;
}
