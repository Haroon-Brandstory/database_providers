import { useTranslations } from "next-intl"

export default function useCases() {
    const t = useTranslations();

    const emailBusiness_Content = [
        {
            title: t('home.section6.data1.title'),
            description: t('home.section6.data1.description'),
        },
        {
            title: t('home.section6.data2.title'),
            description: t('home.section6.data2.description'),
        },
        {
            title: t('home.section6.data3.title'),
            description: t('home.section6.data3.description'),
        },
        {
            title: t('home.section6.data4.title'),
            description: t('home.section6.data4.description'),
        },
        {
            title: t('home.section6.data5.title'),
            description: t('home.section6.data5.description'),
        },
        {
            title: t('home.section6.data6.title'),
            description: t('home.section6.data6.description'),
        },
        {
            title: t('home.section6.data7.title'),
            description: t('home.section6.data7.description'),
        },
        {
            title: t('home.section6.data8.title'),
            description: t('home.section6.data8.description'),
        },
        {
            title: t('home.section6.data9.title'),
            description: t('home.section6.data9.description'),
        },
        {
            title: t('home.section6.data10.title'),
            description: t('home.section6.data10.description'),
        },
    ]

    return (
        <section className="py-20 px-4 md:px-20 bg-white">
            <div className="container mx-auto flex flex-col items-center justify-center">
                <div className="text-center max-w-4xl flex flex-col justify-center">
                    <h5 className="text-[#2C6BFF] text-[16px] font-medium">Use Cases</h5>
                    <h2 className="text-black lg:text-[36px] text-[28px] font-medium mb-6">
                        How Businesses Use Our  <span className="block"><span className="text-[#00000080]">Email Databases</span></span>
                    </h2>
                </div>
                <div className="bg-[#F0F0FF] w-full lg:p-10 p-3 rounded-[20px]">
                    <div className="grid md:grid-cols-2 grid-cols-1  ">
                        {emailBusiness_Content.map((item, index) => (
                            <div key={index} className="parent-text flex flex-col border-b-1 border-[#00000033] m-5">
                                <h3 className="lg:text-[24px] text-[20px] font-[500] text-black mb-6">{item.title}</h3>
                                <p className="text-[#51525C] text-[16px] mb-8">{item.description}</p>
                            </div>
                        ))
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}