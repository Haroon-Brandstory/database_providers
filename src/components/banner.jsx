"use client";
import { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import Lottie from 'lottie-react';
import animationData from '../animations/dash_in_banner.json';
// Import Autoplay from Swiper
import SwiperCore from 'swiper';
import { Autoplay as SwiperAutoplay } from 'swiper/modules';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
SwiperCore.use([SwiperAutoplay]);

const LottieAnimation = () => (
    <div className='lg:min-h-[510px] min-h-[200px]'>
        <Lottie animationData={animationData} loop={true} />
    </div>
);

const CLIENT_LOGOS = [
    '/banner_images/client_testimonial_icon1.svg',
    '/banner_images/client_testimonial_icon2.svg',
    '/banner_images/client_testimonial_icon3.svg',
    '/banner_images/client_testimonial_icon4.svg',
    '/banner_images/client_testimonial_icon5.svg',
    '/banner_images/client_testimonial_icon6.svg',
    '/banner_images/client_testimonial_icon7.svg',
    '/banner_images/client_testimonial_icon8.svg',
    '/banner_images/client_testimonial_icon9.svg',
    '/banner_images/client_testimonial_icon10.svg',
    '/banner_images/client_testimonial_icon12.svg',
    '/banner_images/client_testimonial_icon13.svg',
    '/banner_images/client_testimonial_icon14.svg',
    '/banner_images/client_testimonial_icon15.svg',
    '/banner_images/client_testimonial_icon16.svg',
    '/banner_images/client_testimonial_icon17.svg',
    '/banner_images/client_testimonial_icon18.svg',
    '/banner_images/client_testimonial_icon19.svg',
    '/banner_images/client_testimonial_icon20.svg',
];

export default function HomeBanner() {
    const gridRef = useRef(null);
    const gridMapRef = useRef(new Map());
    const gridSize = 50; // 50px squares

    const t = useTranslations();


    useEffect(() => {
        const grid = gridRef.current;
        const container = grid?.parentElement;
        if (!grid || !container) return;

        const updateGridSize = () => {
            const rect = container.getBoundingClientRect();
            const cols = Math.ceil(rect.width / gridSize);
            const rows = Math.ceil(rect.height / gridSize);

            // Clear grid before regenerating
            grid.innerHTML = '';
            gridMapRef.current.clear();

            for (let y = 0; y < rows; y++) {
                for (let x = 0; x < cols; x++) {
                    const key = `${x}-${y}`;
                    const div = document.createElement('div');
                    div.className = 'absolute w-[50px] h-[50px] pointer-events-none';
                    div.style.left = `${x * gridSize}px`;
                    div.style.top = `${y * gridSize}px`;
                    div.style.zIndex = '0';
                    div.style.transition = 'opacity 1s ease-out';
                    div.style.opacity = '0';
                    grid.appendChild(div);
                    gridMapRef.current.set(key, div);
                }
            }
        };

        const handleMouseMove = (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const xIndex = Math.floor(x / gridSize);
            const yIndex = Math.floor(y / gridSize);
            const key = `${xIndex}-${yIndex}`;
            const cell = gridMapRef.current.get(key);

            if (cell) {
                if (cell.style.opacity === '0' || !cell.dataset.active) {
                    cell.style.backgroundColor = '#0133E9';
                    cell.style.opacity = '1';
                    cell.dataset.active = 'true';

                    setTimeout(() => {
                        cell.style.opacity = '0';
                        cell.dataset.active = '';
                    }, 300);
                }
            }
        };

        updateGridSize();
        const resizeObserver = new ResizeObserver(updateGridSize);
        resizeObserver.observe(container);

        container.addEventListener('mousemove', handleMouseMove);

        return () => {
            container.removeEventListener('mousemove', handleMouseMove);
            resizeObserver.disconnect();
        };
    }, []);

    return (
        <div className="relative bg-gradient-to-b from-black via-[#00132A] to-[#133dd6] text-white min-h-screen flex flex-col items-center justify-center px-4 md:px-20 pt-20 pb-20 overflow-hidden pt-50">
            {/* Background Cube Grid */}
            <div ref={gridRef} className="absolute inset-0 z-0 overflow-hidden" />

            <div className="text-center max-w-4xl z-9">
                {/* <h1 className="font-display text-3xl md:text-5xl font-bold mb-4 font-medium">{t('home.title')}</h1> */}
                <h1 className="font-display text-3xl md:text-5xl font-bold mb-4 font-medium">{t('home.banner.heading', { defaultMessage: 'Refine Your B2B Marketing Strategy' })}</h1>
                {/* <h1 className="text-3xl md:text-5xl font-medium mb-6">{t('home.banner.subheading', { defaultMessage: 'With Trusted Data Services' })}</h1> */}
                <p className="mb-8 text-gray-300 font-light text-[18px]">{t('home.banner.subheading', { defaultMessage: 'Get high-priority data and increase leads and revenue.' })}</p>
                <Link href={'/contact-us'}>
                    <button className="relative text-white px-10 py-3 cursor-pointer rounded-full font-medium text-[15px] overflow-hidden z-10 hover:scale-105 transition duration-300 ease-in drop-shadow-[0px_0px_25px_#0133E9CC]">
                        <span className="relative z-10">{t('home.banner.cta', { defaultMessage: 'Get a free sample data' })}</span>
                        <span className="absolute inset-0 bg-gradient-to-r from-[#0055ff1a] via-[#0133E9] to-[#0055FF] bg-[length:200%_100%] bg-left transition-all duration-700 ease-in-out rounded-full blur-sm animate-gradient-loop">
                        </span>
                    </button>
                </Link>
                {/* <button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-3 rounded-full font-medium text-[15px] drop-shadow-[0px_0px_25px_#0133E9CC] transition z-100 relative">Get a free sample data</button> */}
            </div>

            <div className="mt-12 w-full max-w-4xl relative z-40 rounded-xl bg-white prev-drop-shadow shadow-xl overflow-hidden">
                <div className="absolute -top-6 left-0 w-full h-10 bg-[#0133E9] opacity-30 blur-2xl pointer-events-none z-[-1]"></div>
                <LottieAnimation />
            </div>

            <div className="mt-20 w-full max-w-5xl z-9">
                <p className="text-center mb-10 text-[18px] font-light text-[#BBC7E5]-400">Clients We Worked With</p>
                <Swiper
                    autoplay={{ delay: 0 }}
                    speed={1500}
                    loop={true}
                    slidesPerView={3}
                    spaceBetween={30}
                    breakpoints={{
                        640: { slidesPerView: 3 },
                        768: { slidesPerView: 4 },
                        1024: { slidesPerView: 5 },
                    }}
                    className="[&_.swiper-wrapper]:items-center"
                >
                    {CLIENT_LOGOS.map((logo, idx) => (
                        <SwiperSlide key={idx} className="flex justify-center items-center">
                            <Image src={logo} alt={`client-${idx}`} width={100} height={100} unoptimized style={{ width: "100px", height: "auto" }} className="object-contain grayscale hover:grayscale-0 transition duration-300" />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}
