export default function EmailOpenRates({ data }) {
    return (
        <section className="bg-[#F7F7F8] py-16 px-6">
            <div className="container max-w-7xl mx-auto">
                <div>
                    <h2 className="text-black lg:text-[36px] mb-8 text-center text-[26px] font-medium mb-6">{data.sectionTitle}</h2>
                </div>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
                    {
                        data.openRates.map((item, index) =>
                            <div key={index} className="bg-[url('/servicesection/emailRatesCard-bg.png')] bg-center bg-norepeat bg-cover rounded-[20px] p-6 border border-2 min-h-[215px] border-[#E8E8E8]">
                                <div className="flex justify-end items-start flex-col h-full">
                                    <h3 className="lg:text-[32px] text-start text-[26px] font-medium text-white">{item.percentageRate}</h3>
                                    <p className="lg:text-[20px] text-[16px] text-white text-start">{item.categorySector}</p>
                                </div>
                            </div>
                        )}
                </div>
            </div>
        </section >
    )
}