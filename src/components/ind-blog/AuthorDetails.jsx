"use client";
import React from 'react';
import Image from 'next/image';
import { FaWhatsapp, FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { IoLinkOutline } from 'react-icons/io5';
import toast from 'react-hot-toast';

export default function AuthorDetails({ author, updatedAt }) {
  const authorName = author?.AuthorName || "- No Author";
  const authorImage = author?.AuthorImage?.url || "/blog/dpLogo.svg";

  const formatDate = (dateString) => {
    if (!dateString) return "31/02/2026";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const [shareUrl, setShareUrl] = React.useState("");

  React.useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  const socialLinks = [
    { icon: <FaWhatsapp />, url: `https://api.whatsapp.com/send?text=${shareUrl}`, color: 'bg-[#0A1343]' },
    { icon: <FaFacebookF />, url: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, color: 'bg-[#0A1343]' },
    { icon: <FaLinkedinIn />, url: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`, color: 'bg-[#0A1343]' },
    { icon: <FaXTwitter />, url: `https://twitter.com/intent/tweet?url=${shareUrl}`, color: 'bg-[#0A1343]' },
    { icon: <FaInstagram />, url: '#', color: 'bg-[#0A1343]' },
  ];

  const copyToClipboard = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(shareUrl);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-6 mb-4 border-b border-[#0000001A] gap-4">
      <div className="flex items-center gap-4">
        <div className="relative w-14 h-14 rounded-full overflow-hidden border border-[#00000014]">
          <Image
            src={authorImage}
            alt={authorName}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col">
          <h4 className="text-[18px] font-medium text-black">{authorName}</h4>
          <p className="text-[#00000066] text-[14px]">Updated on {formatDate(updatedAt)}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {socialLinks.map((social, index) => (
          <a
            key={index}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${social.color} w-8 h-8 rounded-full flex items-center justify-center text-white text-[16px] hover:opacity-80 transition-all`}
          >
            {social.icon}
          </a>
        ))}
        <button
          onClick={copyToClipboard}
          className="bg-[#0A1343] w-8 h-8 rounded-full flex items-center justify-center text-white text-[18px] hover:opacity-80 transition-all"
        >
          <IoLinkOutline />
        </button>
      </div>
    </div>
  );
}
