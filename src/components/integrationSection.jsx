"use client";
import Lottie from "lottie-react"
import WaterEffectSection from "./demoscroll"
import integrationAnimation from '../animations/integrations.json'

export default function IntegrationSection() {
    return (
        <section className="pb-20 pt-100 px-4 md:px-20 bg-white relative">
            <div className="absolute -top-[100px] w-[89%] flex justify-center items-center">
                <WaterEffectSection />
            </div>
            <div className="container mx-auto flex flex-col items-center justify-center">
                <div className="text-center max-w-4xl flex flex-col justify-center">
                    <h5 className="text-[#2C6BFF] text-[16px] font-medium">Integrations</h5>
                    <h2 className="text-black text-[36px] font-medium mb-6">
                        Lorem ipsum dolor sit amet <span className="block"><span className="text-[#00000080]"> consectetur. </span></span>
                    </h2>
                </div>
                <div className="integrationSection flex flex-col justify-center items-center">
                    <Lottie animationData={integrationAnimation} loop={true} />
                </div>
            </div>
        </section>
    )
}