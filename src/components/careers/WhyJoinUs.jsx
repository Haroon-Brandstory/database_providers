import WhyJoinCard from "./WhyJoinCard";

export default function WhyJoinUs({ title, description, cards = [] }) {
    return (
        <section className="bg-white text-[#080808] px-4 md:px-8 py-14 md:py-20">
            <div className="container mx-auto">
                <div className="mx-auto max-w-2xl text-center mb-10 md:mb-14">
                    <h2 className="text-[32px] md:text-[42px] font-medium tracking-[-0.84px] leading-tight">
                        {title}
                    </h2>
                    {description ? (
                        <p className="mt-4 text-[#6d6d6d] text-base md:text-lg leading-relaxed">
                            {description}
                        </p>
                    ) : null}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5 auto-rows-fr">
                    {cards.map((card) => (
                        <WhyJoinCard key={card.id || card.title} {...card} />
                    ))}
                </div>
            </div>
        </section>
    );
}
