import Lottie from 'lottie-react';
import animationData from '@/animations/dash_in_banner.json'


export default function LottieAnimation({animationData}) {
    return (
        <div className='w-full'>
            <Lottie animationData={animationData} loop={true} autoplay={true} style={{ width: '100%', height: 'auto' }} />
        </div>
    );
}