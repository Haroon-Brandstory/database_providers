"use client";
import Image from 'next/image';
import React, { useState } from 'react';

export default function AnalyzeArticleWithAi({ section }) {

  const { chatGPT, claude, copilot, gemini, perplexity } = section
  const [copiedProvider, setCopiedProvider] = useState(null);

  const aiProviders = [
    { name: 'ChatGPT', logo: "/blog/articleAnalyzer2.svg", url: chatGPT },
    { name: 'perplexity', logo: "/blog/articleAnalyzer5.svg", url: perplexity },
    { name: 'Google', logo: "/blog/google_noBg.svg", url: gemini },
    { name: 'Claude', logo: "/blog/articleAnalyzer3.svg", url: claude, copyOnly: true },
    { name: 'Copilot', logo: "/blog/articleAnalyzer4.svg", url: copilot, copyOnly: true },
  ];

  const handleCopyPrompt = async (provider) => {
    try {
      await navigator.clipboard.writeText(provider.url);
      setCopiedProvider(provider.name);
      setTimeout(() => setCopiedProvider(null), 2000);
    } catch (err) {
      console.error('Failed to copy prompt:', err);
    }
  };

  return (
    <div className="bg-white rounded-[20px] shadow-sm border border-[#0000000D] p-6 md:p-8 mb-8 relative">
      <h3 className="text-[24px] md:text-[28px] font-medium text-black mb-8">
        Analyze this article with
      </h3>

      <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
        {aiProviders.map((provider) =>
          provider.copyOnly ? (
            <button
              key={provider.name}
              type="button"
              onClick={() => handleCopyPrompt(provider)}
              className="flex items-center lg:gap-2.5 lg:px-6 lg:py-3 px-4 py-2 rounded-full border border-[#0000000D] hover:shadow-md hover:border-[#0000001A] transition-all bg-white cursor-pointer relative"
            >
              <span className="flex items-center justify-center">
                <Image src={provider.logo} alt={provider.name} width={100} height={38} className="object-contain" />
              </span>
              {copiedProvider === provider.name && (
                <span
                  className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg"
                  style={{ animation: 'fadeInOut 2s ease-in-out forwards' }}
                >
                  Prompt copied to clipboard!
                </span>
              )}
            </button>
          ) : (
            <a
              key={provider.name}
              href={provider.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center lg:gap-2.5 lg:px-6 lg:py-3 px-4 py-2 rounded-full border border-[#0000000D] hover:shadow-md hover:border-[#0000001A] transition-all bg-white"
            >
              <span className="flex items-center justify-center">
                <Image src={provider.logo} alt={provider.name} width={100} height={38} className="object-contain" />
              </span>
            </a>
          )
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translateX(-50%) translateY(4px); }
          15% { opacity: 1; transform: translateX(-50%) translateY(0); }
          85% { opacity: 1; transform: translateX(-50%) translateY(0); }
          100% { opacity: 0; transform: translateX(-50%) translateY(-4px); }
        }
      `}</style>
    </div>
  );
}