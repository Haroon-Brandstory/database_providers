"use client";
import Image from 'next/image';
import React from 'react';

export default function AnalyzeArticleWithAi({ section }) {

  const { chatGPT, claude, copilot, gemini, perplexity } = section

  const aiProviders = [
    { name: 'Gemini', logo: "/blog/articleAnalyzer1.svg", url: gemini },
    { name: 'ChatGPT', logo: "/blog/articleAnalyzer2.svg", url: chatGPT },
    { name: 'Claude', logo: "/blog/articleAnalyzer3.svg", url: claude },
    { name: 'Copilot', logo: "/blog/articleAnalyzer4.svg", url: copilot },
    { name: 'perplexity', logo: "/blog/articleAnalyzer5.svg", url: perplexity },
  ];


  return (
    <div className="bg-white rounded-[20px] shadow-sm border border-[#0000000D] p-6 md:p-8 mb-8">
      <h3 className="text-[24px] md:text-[28px] font-medium text-black mb-8">
        Analyze this article with
      </h3>

      <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
        {aiProviders.map((provider) => (
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
        ))}
      </div>
    </div>
  );
}