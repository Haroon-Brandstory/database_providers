"use client";

import CountryCodeSelect from "@/components/CountryCodeSelect";
import {
    DEFAULT_COUNTRY_CODE,
    digitsOnly,
    formatNationalNumber,
    getCountryByCode,
    normalizeNationalNumber,
    validateNationalNumber,
} from "@/lib/countryDialCodes";
import gsap from "gsap";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { CHAT_STEPS, buildLeadMessage } from "./leadChatFlow";
import { getFaqFallback, getFaqQuickQuestions, matchFaq } from "./matchFaq";

const EMAIL_RE = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const SESSION_KEY = "dp-lead-chat-session";
const SESSION_TTL_MS = 60 * 60 * 1000;

const EMPTY_ANSWERS = {
    intent: "",
    companyName: "",
    businessEmail: "",
    countryCode: DEFAULT_COUNTRY_CODE,
    mobileNumber: "",
    name: "",
    notes: "",
};

const FAQ_WELCOME =
    "Hi again! Ask me anything about lists, pricing, delivery, or formats.";

function readLeadSession() {
    try {
        const raw = localStorage.getItem(SESSION_KEY);
        if (!raw) return null;
        const data = JSON.parse(raw);
        if (!data || typeof data !== "object") return null;
        return data;
    } catch {
        return null;
    }
}

function writeLeadSession(data) {
    try {
        localStorage.setItem(SESSION_KEY, JSON.stringify(data));
    } catch {
        /* ignore quota / private mode */
    }
}

function isSessionExpired(session, now = Date.now()) {
    if (!session?.lastActivityAt) return true;
    return now - Number(session.lastActivityAt) > SESSION_TTL_MS;
}

function BotAvatar() {
    return (
        <span
            className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#0133E9] ring-2 ring-white shadow-[0_4px_12px_rgba(1,51,233,0.35)]"
            aria-hidden
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src="/pricing-plan/db_bubble.png"
                alt=""
                width={32}
                height={32}
                className="h-8 w-8 object-cover"
                draggable={false}
            />
        </span>
    );
}

function ChatProgress({ stepIndex, total, done }) {
    const pct = done ? 100 : Math.min(100, Math.round((stepIndex / Math.max(total, 1)) * 100));
    return (
        <div className="h-1 w-full overflow-hidden bg-white/15">
            <div
                className="h-full rounded-r-full bg-gradient-to-r from-[#5B8CFF] to-[#A8C5FF] transition-all duration-500 ease-out"
                style={{ width: `${pct}%` }}
            />
        </div>
    );
}

export default function LeadChatWidget() {
    const pathname = usePathname() || "";
    const [open, setOpen] = useState(false);
    const [panelVisible, setPanelVisible] = useState(false);
    const [stepIndex, setStepIndex] = useState(0);
    const [answers, setAnswers] = useState(EMPTY_ANSWERS);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);
    const [phase, setPhase] = useState("lead"); // lead | faq | done
    const [faqMode, setFaqMode] = useState("prompt"); // prompt | ask
    const [showFaqChips, setShowFaqChips] = useState(false);
    const [honeypot, setHoneypot] = useState("");
    const [started, setStarted] = useState(false);
    const [leadSubmitted, setLeadSubmitted] = useState(false);
    const [sessionReady, setSessionReady] = useState(false);
    const listRef = useRef(null);
    const inputRef = useRef(null);
    const panelRef = useRef(null);
    const bubbleRef = useRef(null);
    const faqChipsTimerRef = useRef(null);
    const leadSubmittedRef = useRef(false);

    const hideOnThankYou = /thank-you\/?$/i.test(pathname);

    const selectedCountry = useMemo(
        () => getCountryByCode(answers.countryCode),
        [answers.countryCode]
    );

    const phoneMaxLength = useMemo(() => {
        const groups = selectedCountry.groups || [];
        const maxDigits = selectedCountry.phoneMax || 15;
        const spaces = Math.max(groups.length - 1, 0);
        return maxDigits + spaces;
    }, [selectedCountry]);

    const currentStep = CHAT_STEPS[stepIndex];

    const setChatOpen = useCallback((nextOpen) => {
        if (nextOpen) {
            setPanelVisible(true);
            setOpen(true);
            const session = readLeadSession();
            if (session && !isSessionExpired(session)) {
                writeLeadSession({ ...session, lastActivityAt: Date.now() });
            }
            return;
        }
        setOpen(false);
    }, []);

    const scrollToBottom = useCallback(() => {
        requestAnimationFrame(() => {
            if (listRef.current) {
                listRef.current.scrollTop = listRef.current.scrollHeight;
            }
        });
    }, []);

    const pushBot = useCallback(
        (text) => {
            setMessages((prev) => [...prev, { role: "bot", text }]);
            scrollToBottom();
        },
        [scrollToBottom]
    );

    const pushUser = useCallback(
        (text) => {
            setMessages((prev) => [...prev, { role: "user", text }]);
            scrollToBottom();
        },
        [scrollToBottom]
    );

    const clearFaqChipsTimer = useCallback(() => {
        if (faqChipsTimerRef.current) {
            clearTimeout(faqChipsTimerRef.current);
            faqChipsTimerRef.current = null;
        }
    }, []);

    const persistSession = useCallback((patch = {}) => {
        const prev = readLeadSession() || {};
        const next = {
            ...prev,
            ...patch,
            lastActivityAt: Date.now(),
            leadSubmitted:
                patch.leadSubmitted !== undefined
                    ? Boolean(patch.leadSubmitted)
                    : leadSubmittedRef.current,
        };
        writeLeadSession(next);
    }, []);

    const startFaqKeywordFlow = useCallback(() => {
        clearFaqChipsTimer();
        setStepIndex(CHAT_STEPS.length);
        setAnswers(EMPTY_ANSWERS);
        setInput("");
        setError("");
        setLoading(false);
        setDone(false);
        setPhase("faq");
        setFaqMode("ask");
        setShowFaqChips(true);
        setHoneypot("");
        setStarted(true);
        setMessages([{ role: "bot", text: FAQ_WELCOME }]);
    }, [clearFaqChipsTimer]);

    const resetChat = useCallback(() => {
        clearFaqChipsTimer();
        setInput("");
        setError("");
        setLoading(false);
        setHoneypot("");

        if (leadSubmittedRef.current) {
            startFaqKeywordFlow();
            persistSession({
                leadSubmitted: true,
                messages: [{ role: "bot", text: FAQ_WELCOME }],
                phase: "faq",
                faqMode: "ask",
                showFaqChips: true,
                done: false,
                started: true,
                stepIndex: CHAT_STEPS.length,
                answers: EMPTY_ANSWERS,
            });
            return;
        }

        setStepIndex(0);
        setAnswers(EMPTY_ANSWERS);
        setMessages([{ role: "bot", text: CHAT_STEPS[0].bot }]);
        setDone(false);
        setPhase("lead");
        setFaqMode("prompt");
        setShowFaqChips(false);
        setStarted(true);
        persistSession({
            leadSubmitted: false,
            messages: [{ role: "bot", text: CHAT_STEPS[0].bot }],
            phase: "lead",
            faqMode: "prompt",
            showFaqChips: false,
            done: false,
            started: true,
            stepIndex: 0,
            answers: EMPTY_ANSWERS,
        });
    }, [clearFaqChipsTimer, persistSession, startFaqKeywordFlow]);

    const startConversation = useCallback(() => {
        if (started) return;
        if (leadSubmittedRef.current) {
            startFaqKeywordFlow();
            persistSession({
                leadSubmitted: true,
                messages: [{ role: "bot", text: FAQ_WELCOME }],
                phase: "faq",
                faqMode: "ask",
                showFaqChips: true,
                done: false,
                started: true,
                stepIndex: CHAT_STEPS.length,
            });
            return;
        }
        setStarted(true);
        setMessages([{ role: "bot", text: CHAT_STEPS[0].bot }]);
        persistSession({
            leadSubmitted: false,
            messages: [{ role: "bot", text: CHAT_STEPS[0].bot }],
            phase: "lead",
            started: true,
            stepIndex: 0,
        });
    }, [started, startFaqKeywordFlow, persistSession]);

    // Hydrate / expire session from localStorage
    useEffect(() => {
        const now = Date.now();
        const session = readLeadSession();
        const submitted = Boolean(session?.leadSubmitted);
        leadSubmittedRef.current = submitted;
        setLeadSubmitted(submitted);

        if (!session || isSessionExpired(session, now)) {
            writeLeadSession({
                leadSubmitted: submitted,
                lastActivityAt: now,
            });
            setSessionReady(true);
            return;
        }

        // Restore in-progress chat within 1 hour
        if (Array.isArray(session.messages) && session.messages.length > 0) {
            setMessages(session.messages);
            setPhase(session.phase === "faq" || session.phase === "done" ? session.phase : submitted ? "faq" : "lead");
            setFaqMode(session.faqMode === "ask" ? "ask" : "prompt");
            setShowFaqChips(Boolean(session.showFaqChips));
            setDone(Boolean(session.done));
            setStarted(Boolean(session.started));
            setStepIndex(
                Number.isFinite(session.stepIndex) ? session.stepIndex : submitted ? CHAT_STEPS.length : 0
            );
            if (session.answers && typeof session.answers === "object") {
                setAnswers({ ...EMPTY_ANSWERS, ...session.answers });
            }
        } else if (submitted) {
            // Form done, transcript cleared / empty → keyword FAQ
            setPhase("faq");
            setFaqMode("ask");
            setShowFaqChips(true);
            setDone(false);
            setStarted(true);
            setStepIndex(CHAT_STEPS.length);
            setMessages([{ role: "bot", text: FAQ_WELCOME }]);
        }

        setSessionReady(true);
    }, []);

    useEffect(() => {
        leadSubmittedRef.current = leadSubmitted;
    }, [leadSubmitted]);

    // Persist live chat while session active
    useEffect(() => {
        if (!sessionReady || !started) return;
        persistSession({
            leadSubmitted: leadSubmittedRef.current,
            messages,
            phase,
            faqMode,
            showFaqChips,
            done,
            started,
            stepIndex,
            answers,
        });
    }, [
        sessionReady,
        started,
        messages,
        phase,
        faqMode,
        showFaqChips,
        done,
        stepIndex,
        answers,
        persistSession,
    ]);

    // Clear chat after 1 hour of last activity
    useEffect(() => {
        if (!sessionReady) return undefined;

        const clearIfExpired = () => {
            const session = readLeadSession();
            if (!session || !isSessionExpired(session)) return;

            const submitted = Boolean(session.leadSubmitted);
            leadSubmittedRef.current = submitted;
            setLeadSubmitted(submitted);
            clearFaqChipsTimer();
            setInput("");
            setError("");
            setLoading(false);
            setHoneypot("");

            writeLeadSession({
                leadSubmitted: submitted,
                lastActivityAt: Date.now(),
            });

            if (submitted) {
                startFaqKeywordFlow();
            } else {
                setStepIndex(0);
                setAnswers(EMPTY_ANSWERS);
                setDone(false);
                setPhase("lead");
                setFaqMode("prompt");
                setShowFaqChips(false);
                setStarted(true);
                setMessages([{ role: "bot", text: CHAT_STEPS[0].bot }]);
                writeLeadSession({
                    leadSubmitted: false,
                    lastActivityAt: Date.now(),
                    messages: [{ role: "bot", text: CHAT_STEPS[0].bot }],
                    phase: "lead",
                    faqMode: "prompt",
                    showFaqChips: false,
                    done: false,
                    started: true,
                    stepIndex: 0,
                    answers: EMPTY_ANSWERS,
                });
            }
        };

        clearIfExpired();
        const id = setInterval(clearIfExpired, 30_000);
        return () => clearInterval(id);
    }, [sessionReady, clearFaqChipsTimer, startFaqKeywordFlow]);

    useEffect(() => {
        if (!sessionReady) return;
        if (open) startConversation();
    }, [open, startConversation, sessionReady]);

    useEffect(() => {
        if (hideOnThankYou) return undefined;
        const t = setTimeout(() => setChatOpen(true), 500);
        return () => clearTimeout(t);
    }, [hideOnThankYou, setChatOpen]);

    // Panel open / close transition (fixes mount jump)
    useLayoutEffect(() => {
        const el = panelRef.current;
        if (!panelVisible || !el) return undefined;

        gsap.killTweensOf(el);

        if (open) {
            gsap.fromTo(
                el,
                {
                    autoAlpha: 0,
                    y: 18,
                    scale: 0.94,
                    transformOrigin: "100% 100%",
                },
                {
                    autoAlpha: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.36,
                    ease: "power3.out",
                }
            );
            return undefined;
        }

        const tween = gsap.to(el, {
            autoAlpha: 0,
            y: 14,
            scale: 0.94,
            duration: 0.26,
            ease: "power2.in",
            transformOrigin: "100% 100%",
            onComplete: () => setPanelVisible(false),
        });
        return () => tween.kill();
    }, [open, panelVisible]);

    // Closed-state heartbeat
    useEffect(() => {
        const el = bubbleRef.current;
        if (!el) return undefined;

        gsap.killTweensOf(el);

        if (open) {
            gsap.set(el, { scale: 1 });
            return undefined;
        }

        const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.15 });
        tl.to(el, { scale: 1.1, duration: 0.22, ease: "power2.out" })
            .to(el, { scale: 1, duration: 0.22, ease: "power2.in" })
            .to(el, { scale: 1.1, duration: 0.22, ease: "power2.out" })
            .to(el, { scale: 1, duration: 0.28, ease: "power2.inOut" });

        return () => {
            tl.kill();
            gsap.set(el, { scale: 1 });
        };
    }, [open]);

    useEffect(() => {
        if (open && phase === "lead" && !done && currentStep?.type !== "buttons") {
            const t = setTimeout(() => inputRef.current?.focus(), 80);
            return () => clearTimeout(t);
        }
        if (open && phase === "faq" && faqMode === "ask") {
            const t = setTimeout(() => inputRef.current?.focus(), 80);
            return () => clearTimeout(t);
        }
    }, [open, done, stepIndex, currentStep?.type, phase, faqMode]);

    useEffect(() => {
        scrollToBottom();
    }, [messages, open, scrollToBottom]);

    const validateCurrent = (value, step, nextAnswers) => {
        if (step.type === "buttons") {
            if (!value) return "Please choose an option";
            return "";
        }
        if (step.type === "phone") {
            return validateNationalNumber(nextAnswers.mobileNumber, nextAnswers.countryCode);
        }
        const trimmed = String(value || "").trim();
        if (step.required && !trimmed) return "This field is required";
        if (step.type === "email" && trimmed && !EMAIL_RE.test(trimmed)) {
            return "Enter a valid business email";
        }
        return "";
    };

    useEffect(() => () => clearFaqChipsTimer(), [clearFaqChipsTimer]);

    const finishFaq = useCallback(() => {
        clearFaqChipsTimer();
        setShowFaqChips(false);
        pushBot("Thanks again — our team will follow up soon.");
        setPhase("done");
        setDone(true);
        setInput("");
        setError("");
    }, [pushBot, clearFaqChipsTimer]);

    const startFaqAsk = useCallback(() => {
        clearFaqChipsTimer();
        setFaqMode("ask");
        setShowFaqChips(true);
        setError("");
        pushBot("Type your question (or tap a quick one below).");
    }, [pushBot, clearFaqChipsTimer]);

    const answerFaq = useCallback(
        (rawQuery) => {
            const query = String(rawQuery || "").replace(/\s+/g, " ").trim();
            if (!query) {
                setError("Enter a question or skip.");
                return;
            }
            setError("");
            pushUser(query);
            setInput("");
            clearFaqChipsTimer();
            setShowFaqChips(false);

            const hit = matchFaq(query);
            setTimeout(() => {
                if (hit) {
                    pushBot(hit.answer);
                } else {
                    pushBot(getFaqFallback());
                }
                setTimeout(() => {
                    pushBot("Ask another question, or tap Done.");
                }, 320);
                // Show quick-question chips again after 5s
                faqChipsTimerRef.current = setTimeout(() => {
                    setShowFaqChips(true);
                    faqChipsTimerRef.current = null;
                }, 5000);
            }, 220);
        },
        [pushBot, pushUser, clearFaqChipsTimer]
    );

    const submitLead = async (finalAnswers) => {
        setLoading(true);
        setError("");
        try {
            const markSubmittedAndFaq = () => {
                leadSubmittedRef.current = true;
                setLeadSubmitted(true);
                pushBot("Thanks! Our team will reach out shortly.");
                setPhase("faq");
                setFaqMode("prompt");
                persistSession({ leadSubmitted: true, phase: "faq", faqMode: "prompt" });
                setTimeout(() => {
                    pushBot("Want a quick answer from our FAQ before you go?");
                }, 350);
            };

            if (honeypot.trim()) {
                markSubmittedAndFaq();
                return;
            }

            const message = buildLeadMessage(finalAnswers);
            const mondayData = {
                first_name: finalAnswers.name.trim(),
                email: finalAnswers.businessEmail.trim(),
                phone: `${getCountryByCode(finalAnswers.countryCode).dial}${digitsOnly(finalAnswers.mobileNumber)}`,
                company: finalAnswers.companyName.trim(),
                years: "0",
                services: "Contact Enquiry",
                specialties: message,
            };

            const res = await fetch("/apiv2/monday", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(mondayData),
            });

            if (!res.ok) {
                setError("Could not send. Please try again.");
                return;
            }

            markSubmittedAndFaq();
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const advance = async (rawValue, displayText, answersOverride) => {
        if (!currentStep || loading || phase !== "lead") return;

        const nextAnswers = { ...(answersOverride || answers) };
        if (currentStep.type !== "phone" && currentStep.field) {
            nextAnswers[currentStep.field] =
                currentStep.type === "buttons"
                    ? rawValue
                    : String(rawValue || "").replace(/\s+/g, " ").trim();
        }

        const err = validateCurrent(rawValue, currentStep, nextAnswers);
        if (err) {
            setError(err);
            return;
        }

        setError("");
        setAnswers(nextAnswers);
        pushUser(displayText);

        const nextIndex = stepIndex + 1;
        setInput("");

        if (nextIndex >= CHAT_STEPS.length) {
            setStepIndex(nextIndex);
            await submitLead(nextAnswers);
            return;
        }

        setStepIndex(nextIndex);
        setTimeout(() => {
            pushBot(CHAT_STEPS[nextIndex].bot);
        }, 280);
    };

    const handleButtonPick = (option) => {
        advance(option.id, option.label);
    };

    const handleSkip = () => {
        advance("", "Skip");
    };

    const handleTextSubmit = (e) => {
        e.preventDefault();
        if (phase === "faq" && faqMode === "ask") {
            answerFaq(input);
            return;
        }
        if (!currentStep || currentStep.type === "buttons" || currentStep.type === "phone") return;
        advance(input, input.trim() || (currentStep.allowSkip ? "Skip" : input));
    };

    const handlePhoneSubmit = (e) => {
        e.preventDefault();
        const normalized = formatNationalNumber(
            normalizeNationalNumber(answers.mobileNumber, answers.countryCode),
            answers.countryCode
        );
        const next = { ...answers, mobileNumber: normalized };
        const dial = getCountryByCode(next.countryCode).dial;
        advance(normalized, `${dial} ${normalized}`, next);
    };

    const onPhoneChange = (e) => {
        const { name, value } = e.target;
        if (name === "countryCode") {
            setAnswers((prev) => {
                const nextDigits = normalizeNationalNumber(prev.mobileNumber, value);
                return {
                    ...prev,
                    countryCode: value,
                    mobileNumber: formatNationalNumber(nextDigits, value),
                };
            });
            setError("");
            return;
        }
        if (name === "mobileNumber") {
            const digits = normalizeNationalNumber(value, answers.countryCode);
            setAnswers((prev) => ({
                ...prev,
                mobileNumber: formatNationalNumber(digits, prev.countryCode),
            }));
            setError("");
        }
    };

    if (hideOnThankYou) return null;

    const totalSteps = CHAT_STEPS.length;

    return (
        <div className="lead-chat fixed bottom-5 right-5 z-[9998] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
            {panelVisible && (
                <div
                    ref={panelRef}
                    className="flex h-[min(540px,calc(100vh-7rem))] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-[28px] border border-white/20 bg-white shadow-[0_20px_60px_rgba(0,22,103,0.28)] will-change-transform"
                    role="dialog"
                    aria-label="Lead chat"
                    aria-hidden={!open}
                >
                    <header className="relative overflow-hidden bg-gradient-to-br from-[#001667] via-[#0128B8] to-[#0133E9] text-white">
                        <div
                            className="pointer-events-none absolute -right-8 -top-10 h-28 w-28 rounded-full bg-white/10 blur-2xl"
                            aria-hidden
                        />
                        <div
                            className="pointer-events-none absolute -bottom-10 left-6 h-20 w-20 rounded-full bg-[#5B8CFF]/30 blur-2xl"
                            aria-hidden
                        />
                        <div className="relative flex items-center justify-between gap-3 px-4 pb-3 pt-4">
                            <div className="flex min-w-0 items-center gap-3">
                                <span className="relative shrink-0">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src="/pricing-plan/db_bubble.png"
                                        alt=""
                                        width={44}
                                        height={44}
                                        className="h-11 w-11 rounded-full object-cover ring-2 ring-white/30"
                                        draggable={false}
                                    />
                                    <span className="absolute bottom-0.5 right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#001667] bg-[#22C55E]" />
                                </span>
                                <div className="min-w-0">
                                    <p className="truncate text-[15px] font-medium tracking-tight">
                                        Database Providers
                                    </p>
                                    <p className="truncate text-[12px] text-white/75">
                                        Sales assistant · Online now
                                    </p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setChatOpen(false)}
                                className="shrink-0 cursor-pointer rounded-full p-2 text-white/80 transition hover:bg-white/15 hover:text-white"
                                aria-label="Close chat"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                                    <path
                                        d="M6 6l12 12M18 6L6 18"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </button>
                        </div>
                        <ChatProgress
                            stepIndex={stepIndex}
                            total={totalSteps}
                            done={done || phase !== "lead"}
                        />
                    </header>

                    {/* honeypot */}
                    <label className="sr-only" aria-hidden="true">
                        Company website
                        <input
                            tabIndex={-1}
                            autoComplete="off"
                            value={honeypot}
                            onChange={(e) => setHoneypot(e.target.value)}
                        />
                    </label>

                    <div
                        ref={listRef}
                        className="relative flex-1 space-y-3.5 overflow-y-auto bg-[linear-gradient(180deg,#F4F7FF_0%,#EEF2FB_45%,#F8F9FC_100%)] px-3.5 py-4"
                    >
                        <div
                            className="pointer-events-none absolute inset-0 opacity-[0.35]"
                            style={{
                                backgroundImage:
                                    "radial-gradient(circle at 1px 1px, rgba(1,51,233,0.08) 1px, transparent 0)",
                                backgroundSize: "18px 18px",
                            }}
                            aria-hidden
                        />

                        <div className="relative z-[1] space-y-3.5">
                            {messages.map((msg, i) => (
                                <div
                                    key={`${msg.role}-${i}`}
                                    className={`flex items-end gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    {msg.role === "bot" && <BotAvatar />}
                                    <div
                                        className={`max-w-[82%] px-3.5 py-2.5 text-[14px] leading-relaxed ${
                                            msg.role === "user"
                                                ? "rounded-[18px] rounded-br-md bg-gradient-to-br from-[#0133E9] to-[#001667] text-white shadow-[0_6px_16px_rgba(1,51,233,0.28)]"
                                                : "rounded-[18px] rounded-bl-md border border-[#E4E9F5] bg-white text-[#151A2D] shadow-[0_4px_14px_rgba(0,22,103,0.06)]"
                                        }`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))}

                            {!done &&
                                phase === "lead" &&
                                currentStep?.type === "buttons" &&
                                messages.length > 0 && (
                                <div className="ml-10 grid grid-cols-2 gap-2">
                                    {currentStep.options.map((opt) => (
                                        <button
                                            key={opt.id}
                                            type="button"
                                            disabled={loading}
                                            onClick={() => handleButtonPick(opt)}
                                            className="cursor-pointer rounded-full border border-[#0133E9]/25 bg-white/95 px-3 py-2.5 text-left text-[13px] font-medium text-[#0133E9] shadow-[0_2px_8px_rgba(1,51,233,0.08)] transition hover:-translate-y-0.5 hover:border-[#0133E9] hover:bg-[#0133E9] hover:text-white hover:shadow-[0_8px_18px_rgba(1,51,233,0.25)] disabled:opacity-50"
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {phase === "faq" && faqMode === "prompt" && !loading && (
                                <div className="ml-10 flex flex-wrap gap-2">
                                    <button
                                        type="button"
                                        onClick={startFaqAsk}
                                        className="cursor-pointer rounded-full border border-[#0133E9]/25 bg-white/95 px-3.5 py-2.5 text-[13px] font-medium text-[#0133E9] shadow-[0_2px_8px_rgba(1,51,233,0.08)] transition hover:bg-[#0133E9] hover:text-white"
                                    >
                                        Ask a question
                                    </button>
                                    <button
                                        type="button"
                                        onClick={finishFaq}
                                        className="cursor-pointer rounded-full border border-[#D8DEEE] bg-white/95 px-3.5 py-2.5 text-[13px] font-medium text-[#51525C] transition hover:border-[#0133E9]/40 hover:text-[#0133E9]"
                                    >
                                        No thanks
                                    </button>
                                </div>
                            )}

                            {phase === "faq" && faqMode === "ask" && showFaqChips && (
                                <div className="ml-10 flex flex-wrap gap-2">
                                    {getFaqQuickQuestions().map((q) => (
                                        <button
                                            key={q}
                                            type="button"
                                            onClick={() => answerFaq(q)}
                                            className="cursor-pointer rounded-full border border-[#0133E9]/20 bg-white/95 px-3 py-2 text-left text-[12px] font-medium text-[#0133E9] transition hover:bg-[#0133E9] hover:text-white"
                                        >
                                            {q}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {loading && (
                                <div className="flex items-end gap-2">
                                    <BotAvatar />
                                    <div className="flex items-center gap-1 rounded-[18px] rounded-bl-md border border-[#E4E9F5] bg-white px-4 py-3 shadow-sm">
                                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#0133E9]" />
                                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#0133E9] [animation-delay:150ms]" />
                                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#0133E9] [animation-delay:300ms]" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {error && (
                        <p className="bg-[#FFF5F5] px-4 py-2 text-[13px] text-[#C62828]" role="alert">
                            {error}
                        </p>
                    )}

                    {!done &&
                        phase === "lead" &&
                        currentStep &&
                        currentStep.type !== "buttons" && (
                        <div className="border-t border-[#E8ECF6] bg-white/95 p-3 backdrop-blur-sm">
                            {currentStep.type === "phone" ? (
                                <form onSubmit={handlePhoneSubmit} className="flex flex-col gap-2.5">
                                    <div className="flex items-stretch gap-2 overflow-visible">
                                        <CountryCodeSelect
                                            name="countryCode"
                                            value={answers.countryCode}
                                            onChange={onPhoneChange}
                                        />
                                        <input
                                            ref={inputRef}
                                            type="tel"
                                            name="mobileNumber"
                                            value={answers.mobileNumber}
                                            onChange={onPhoneChange}
                                            maxLength={phoneMaxLength}
                                            inputMode="numeric"
                                            autoComplete="tel-national"
                                            placeholder={selectedCountry.example || "Mobile number"}
                                            className="min-w-0 flex-1 rounded-[20px] bg-[#F6F6F6] px-4 py-3 text-[14px] text-black outline-none transition focus:ring-2 focus:ring-[#0133E9]/25"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="cursor-pointer rounded-full bg-[#0133E9] py-3 text-[14px] font-medium text-white shadow-[0_8px_20px_rgba(1,51,233,0.28)] transition hover:bg-[#001444] disabled:opacity-60"
                                    >
                                        Continue
                                    </button>
                                </form>
                            ) : (
                                <form onSubmit={handleTextSubmit} className="flex flex-col gap-2.5">
                                    {currentStep.type === "textarea" ? (
                                        <textarea
                                            ref={inputRef}
                                            rows={2}
                                            value={input}
                                            onChange={(e) => {
                                                setInput(e.target.value);
                                                setError("");
                                            }}
                                            placeholder={currentStep.placeholder}
                                            className="w-full resize-none rounded-[20px] bg-[#F6F6F6] px-4 py-3 text-[14px] text-black outline-none transition focus:ring-2 focus:ring-[#0133E9]/25"
                                        />
                                    ) : (
                                        <input
                                            ref={inputRef}
                                            type={currentStep.type === "email" ? "email" : "text"}
                                            value={input}
                                            onChange={(e) => {
                                                setInput(e.target.value);
                                                setError("");
                                            }}
                                            placeholder={currentStep.placeholder}
                                            className="w-full rounded-[20px] bg-[#F6F6F6] px-4 py-3 text-[14px] text-black outline-none transition focus:ring-2 focus:ring-[#0133E9]/25"
                                        />
                                    )}
                                    <div className="flex gap-2">
                                        {currentStep.allowSkip && (
                                            <button
                                                type="button"
                                                onClick={handleSkip}
                                                disabled={loading}
                                                className="flex-1 cursor-pointer rounded-full border border-[#D8DEEE] py-3 text-[14px] font-medium text-[#51525C] transition hover:border-[#0133E9]/40 hover:text-[#0133E9] disabled:opacity-60"
                                            >
                                                Skip
                                            </button>
                                        )}
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="flex-[2] cursor-pointer rounded-full bg-[#0133E9] py-3 text-[14px] font-medium text-white shadow-[0_8px_20px_rgba(1,51,233,0.28)] transition hover:bg-[#001444] disabled:opacity-60"
                                        >
                                            {stepIndex === CHAT_STEPS.length - 1 ? "Send" : "Continue"}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    )}

                    {phase === "faq" && faqMode === "ask" && (
                        <div className="border-t border-[#E8ECF6] bg-white/95 p-3 backdrop-blur-sm">
                            <form onSubmit={handleTextSubmit} className="flex flex-col gap-2.5">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => {
                                        setInput(e.target.value);
                                        setError("");
                                    }}
                                    placeholder="Ask about delivery, pricing, format…"
                                    className="w-full rounded-[20px] bg-[#F6F6F6] px-4 py-3 text-[14px] text-black outline-none transition focus:ring-2 focus:ring-[#0133E9]/25"
                                />
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={finishFaq}
                                        className="flex-1 cursor-pointer rounded-full border border-[#D8DEEE] py-3 text-[14px] font-medium text-[#51525C] transition hover:border-[#0133E9]/40 hover:text-[#0133E9]"
                                    >
                                        Done
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-[2] cursor-pointer rounded-full bg-[#0133E9] py-3 text-[14px] font-medium text-white shadow-[0_8px_20px_rgba(1,51,233,0.28)] transition hover:bg-[#001444]"
                                    >
                                        Ask
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {done && (
                        <div className="border-t border-[#E8ECF6] bg-white p-3">
                            <button
                                type="button"
                                onClick={resetChat}
                                className="w-full cursor-pointer rounded-full border border-[#0133E9]/30 py-3 text-[14px] font-medium text-[#0133E9] transition hover:bg-[#0133E9] hover:text-white"
                            >
                                Start new chat
                            </button>
                        </div>
                    )}
                </div>
            )}

            <div className="flex items-center gap-2.5">
                <button
                    type="button"
                    tabIndex={open ? -1 : 0}
                    onClick={() => {
                        if (!open) setChatOpen(true);
                    }}
                    className={`whitespace-nowrap rounded-full bg-white px-4 py-2.5 text-[14px] font-medium text-[#151A2D] shadow-[0_8px_24px_rgba(0,22,103,0.18)] transition-all duration-250 ${
                        open
                            ? "pointer-events-none translate-x-2 scale-95 opacity-0"
                            : "translate-x-0 scale-100 cursor-pointer opacity-100 hover:shadow-[0_10px_28px_rgba(0,22,103,0.22)]"
                    }`}
                    aria-hidden={open}
                    aria-label="Chat with us"
                >
                    Chat with us 👋
                </button>
                <button
                    ref={bubbleRef}
                    type="button"
                    onClick={() => setChatOpen(!open)}
                    className={`relative flex h-14 w-14 shrink-0 cursor-pointer items-center justify-center rounded-full shadow-[0_8px_24px_rgba(1,51,233,0.45)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0133E9] focus-visible:ring-offset-2 ${
                        open
                            ? "bg-[#0133E9] text-white hover:bg-[#001444]"
                            : "overflow-hidden bg-transparent p-0"
                    }`}
                    aria-label={open ? "Close chat" : "Open chat"}
                    aria-expanded={open}
                >
                    <span
                        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${
                            open ? "opacity-100" : "pointer-events-none opacity-0"
                        }`}
                        aria-hidden={!open}
                    >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M6 6l12 12M18 6L6 18"
                                stroke="currentColor"
                                strokeWidth="2.2"
                                strokeLinecap="round"
                            />
                        </svg>
                    </span>
                    <span
                        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${
                            open ? "pointer-events-none opacity-0" : "opacity-100"
                        }`}
                        aria-hidden={open}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/pricing-plan/db_bubble.png"
                            alt=""
                            width={56}
                            height={56}
                            className="h-14 w-14 object-contain"
                            draggable={false}
                        />
                    </span>
                </button>
            </div>
        </div>
    );
}
