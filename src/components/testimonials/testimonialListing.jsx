"use client";
import Image from "next/image"
import { useState } from "react"

export default function TestimonialsListingSection() {
    const [visibleCount, setVisibleCount] = useState(6);

    const dummyTestimonialData = [
        {
            image: '/testimonialPage/testimonialImage1.png',
            reviewerName: 'Amit Mitra',
            reviewerPosition: 'Chief Executive Officer',
            review: 'Working with Database Providers was a breeze.They have the best lead generation process available for most companies from FMCG lead generation to trade industry lead generation. Because of their intervention, we were able to scale our sales up by 30%.'
        },
        {
            image: '/testimonialPage/testimonialImage2.png',
            reviewerName: 'Sathwik K',
            reviewerPosition: 'Marketing Associate',
            review: "I can't believe it's been already 4 years since we first started getting our leads from Database Providers. We highly recommend them for targeted leads generation skills."
        },
        {
            image: '/testimonialPage/testimonialImage3.png',
            reviewerName: 'Amey Badami',
            reviewerPosition: 'Head - Operations and Projects',
            review: 'We thought we reached out to all our potential clients and there were none left. But Dataase Providers proved us wrong. And helped us gather new contacts.'
        },
        {
            image: '/testimonialPage/testimonialImage4.png',
            reviewerName: 'Archana Sharma ',
            reviewerPosition: 'Founder & Managing Director',
            review: 'We were searching for a lead generation company in Bangalore for a long time. But the ones we were getting back calls from were either not gurranteing targeted leads or were too vague about their lead generation process. But Database providers were serious about their 95% mail delivery rate. Which after 3 years of collaboration, we can vouch for. They are the best in the market.'
        },
        {
            image: '/testimonialPage/testimonialImage5.png',
            reviewerName: 'Vinay S R ',
            reviewerPosition: 'Managing Director',
            review: 'We’ve always believed great design starts with the right conversations. But getting through to decision-makers was our biggest roadblock. That changed when Database Providers stepped in. Their targeted list gave us access to the exact people we needed across real estate, construction, and coworking. In just two months, we booked 2.7X more walkthroughs and project discussions.'
        },
        {
            image: '/testimonialPage/testimonialImage6.png',
            reviewerName: 'Damodaran Subramanian',
            reviewerPosition: 'Chief Executive Officer',
            review: "If your company's not talking to potential customers, then you are lacking behind generating revenue. But if you start working with Database providers who target only potential customers, then you can easily achieve your sales goals just like we did."
        },
        {
            image: '/testimonialPage/newTestImage (32).png',
            reviewerName: 'Dr. Charlin Anthony',
            reviewerPosition: 'President & CEO',
            review: "Our emails were as lost as our strategy. We were constantly getting mail not found replies. But once we partnered up with Database Providers, they helped us promote our medical billing software to the right people like hospitals and clinics. Also with their help our email opening rates increased more than we expected. A stunning 77% hike in open rate."
        },
        {
            image: '/testimonialPage/newTestImage (33).png',
            reviewerName: 'Mohammed Kafil',
            reviewerPosition: 'Chief Executive Officer',
            review: "If there were mail fairies, Database Providers would be their leader. They know how to find the right leads for your business, no matter the niche you are in. I would say Database Providers are more than a lead generation company, they are an investment to your business growth. Their support helped us take Zapro’s procurement software to exactly the businesses that needed it."
        },
        {
            image: '/testimonialPage/newTestImage (34).png',
            reviewerName: 'Mohamed Ghouse',
            reviewerPosition: 'Chief Executive Officer',
            review: "Database Providers are very good at sourcing genuine prospects for businesses. We are glad to have partnered with them and get 3X more meetings booked regularly. Their targeted database helped us connect with the right corporate companies, hotels, restaurants, and tourism businesses, opening doors for meaningful strategic partnerships."
        },
        {
            image: '/testimonialPage/newTestImage (35).png',
            reviewerName: 'Steve Pignotti',
            reviewerPosition: 'Chief Growth Officer',
            review: "If your company's not talking to potential customers, then you are lacking behind generating revenue. But if you start working with Database Providers who target only potential customers, then you can easily achieve your sales goals just like we did. Their data helped us reach the right insurance claim professionals, which was key to growing Prema Consulting Group’s forensic engineering services."
        },
        {
            image: '/testimonialPage/newTestImage (36).png',
            reviewerName: 'George Varghese',
            reviewerPosition: 'Executive Director',
            review: "Our search for a trusted b2b lead generation company ended the moment we talked to Ajay from Database Providers and his team. We thank him and his team for getting us new b2b client data that actually got us sales."
        },
        {
            image: '/testimonialPage/newTestImage (37).png',
            reviewerName: 'Minosh Salam',
            reviewerPosition: 'Chief Operating Officer',
            review: "B2B global database is hard to reach but with Database Providers it was really easy. We reached 32% of our sales goals within the first month. Their support with BFSI and government tech decision-maker data in UAE and Saudi Arabia gave SquareOne the edge we needed in a competitive market."
        },
        {
            image: '/testimonialPage/newTestImage (38).png',
            reviewerName: 'Mrigank (Gank) Bothra',
            reviewerPosition: 'Owner',
            review: "We always believed Clipon had the right offering but we just weren’t getting in front of the right people. Database Providers changed that. Their leads were not just accurate, they were timely and relevant. Within weeks, our outreach felt less like guesswork and more like real conversations."
        },
        {
            image: '/testimonialPage/newTestImage (2).png',
            reviewerName: 'Suresh Katla',
            reviewerPosition: 'Partner',
            review: "Our outreach efforts weren’t converting the way we needed. After working with Database Providers, things turned around fast. We saw a 3X increase in qualified meetings and a 47% improvement in proposal conversions within the first quarter. Their lead quality gave our ABM strategy the momentum it was missing. Their SME database across retail, manufacturing, IT, healthcare, and even F&B was exactly what PKC India needed to expand its consulting footprint."
        },
        {
            image: '/testimonialPage/newTestImage (3).png',
            reviewerName: 'Santy Nelson',
            reviewerPosition: 'Business Head',
            review: "Our ABM campaigns used to feel like we were casting a wide net and hoping for the best. Database Providers helped us shift gears. Their data didn’t just fill our pipeline, it filled it with the right people. In just six weeks, we doubled our response rate and saw a 50% boost in sales-qualified meetings. It finally felt like our outreach was working for us. Their targeted IT decision-maker database across key industries and company sizes gave MicroGenesis TechSoft the focus we needed to grow in both India and Sweden."
        },
        {
            image: '/testimonialPage/newTestImage (4).png',
            reviewerName: 'Divya',
            reviewerPosition: 'Business Development Manager',
            review: "We were reaching out, but nothing was landing. It felt like shouting into the void. After partnering with Database Providers, that changed. Suddenly, our messages were getting opened, replied to, and converted. Within two months, we saw a 3.2X jump in meetings booked and our ABM campaigns finally started delivering real traction. Their metro-city HR decision-maker data helped Unicare Services connect with the right people and expand our facility management outreach."
        },
        {
            image: '/testimonialPage/newTestImage (5).png',
            reviewerName: ' Bala Subramonian',
            reviewerPosition: 'CEO',
            review: "We didn’t need more data. We needed direction. Database Providers gave us exactly that. Their ABM leads weren’t just relevant, they were ready. In just eight weeks, our team saw a 42% rise in decision-maker meetings and a clear uptick in deal velocity. For a business like ours, that kind of focus made all the difference. Their database of manufacturing sector decision-makers was a perfect fit for Tespa Robotics’ automation solutions."
        },
        {
            image: '/testimonialPage/newTestImage (6).png',
            reviewerName: 'Palamalai k',
            reviewerPosition: 'Marketing Manager',
            review: "Finding the right leads for a deep-tech product isn’t easy. We tried everything, but nothing quite clicked until Database Providers stepped in. Their ABM targeting was spot on. In just one quarter, we saw a 55% rise in qualified meetings and engagement from industries we had been trying to break into for months. Their work didn’t just support our pipeline, it accelerated it."
        },
        {
            image: '/testimonialPage/newTestImage (7).png',
            reviewerName: 'Sayjal Jain',
            reviewerPosition: 'Marketing Executive',
            review: "Running out of new prospects to contact for your employee engagement application? We highly recommend Database Providers. They delivered an MNC HR decision-maker database to enhance our outreach. "
        },
        {
            image: '/testimonialPage/newTestImage (1).png',
            reviewerName: 'Sanjeev Jacob',
            reviewerPosition: 'Business Manager',
            review: "Amazing, simply amazing is what I would call their efforts. You guys single handedly helped us straighten our email campaign by providing us with the correct decision maker emails details."
        },
        {
            image: '/testimonialPage/newTestImage (8).png',
            reviewerName: 'Shak H',
            reviewerPosition: 'Founder & CEO | Chief Testomaniac',
            review: "We wanted to target tech companies at just the right moment, when they were ready to scale and needed testing support. Database Providers helped us do exactly that. The list they delivered was sharp, timely, and relevant. Within the first month, we saw a 40% rise in positive replies and a strong pipeline of newly funded prospects ready to talk."
        },
        {
            image: '/testimonialPage/newTestImage (9).png',
            reviewerName: 'Jeenal Shah',
            reviewerPosition: 'Sr Marketing Manager',
            review: "Selling luxury holiday homes isn’t just about the product. It’s about reaching the right kind of buyer. Database Providers helped us do just that. Their UHNI database was incredibly well curated. Within weeks, our outreach saw a 3X jump in engagement and serious interest from the kind of clients we once struggled to connect with. It felt like doors opened overnight."
        },
        {
            image: '/testimonialPage/newTestImage (10).png',
            reviewerName: 'Tamil Selvi',
            reviewerPosition: 'Marketing Executive',
            review: "Reaching the right tech decision-makers had always been a slow climb for us. But once we started working with Database Providers, that changed. Their data was sharp, clean, and incredibly relevant. In just six weeks, our outreach response rate doubled and we finally saw consistent traction with the kind of prospects we had been chasing for months."
        },
        {
            image: '/testimonialPage/newTestImage (11).png',
            reviewerName: 'Kritika Seth',
            reviewerPosition: 'Executive Director',
            review: "In the aviation space, timing and precision are everything—even when it comes to partnerships. Database Providers helped us connect with the right airline companies through a focused and reliable database. Within a short span, our outreach led to a 2.5X increase in partnership conversations and opened doors that had been silent for far too long."
        },
        {
            image: '/testimonialPage/newTestImage (12).png',
            reviewerName: 'David Eric J',
            reviewerPosition: 'CEO / Founder',
            review: "We knew exactly who we wanted to speak to, but getting in front of them was the challenge. Database Providers solved that for us. Their list of IT and operations decision-makers was right on point. Within weeks, we saw a 2X increase in qualified responses and finally started having the strategic conversations we’d been aiming for."
        },
        {
            image: '/testimonialPage/newTestImage (13).png',
            reviewerName: 'Leo Peter Charles',
            reviewerPosition: 'Founder',
            review: "Breaking into the aviation sector takes more than just a great offering—it takes access to the right people. Database Providers helped us do exactly that. Their tailored database of airline and aviation decision-makers gave our outreach real direction. In just over a month, we saw a 3X increase in meaningful conversations and new partnership opportunities take flight."
        },
        {
            image: '/testimonialPage/newTestImage (14).png',
            reviewerName: 'Maya',
            reviewerPosition: 'Marketing Analyst',
            review: "We were struggling to connect with the right people in supply chain and warehouse management. After partnering with Database Providers, we saw a 3.5X jump in demo requests and a 60% increase in qualified leads within the first month. Their database gave our outreach the exact push it needed."
        },
        {
            image: '/testimonialPage/newTestImage (15).png',
            reviewerName: 'Vinita Darole',
            reviewerPosition: 'Corporate Communications Manager',
            review: "Reaching key infrastructure decision-makers in India was a slow process for us. Database Providers changed that completely. With their targeted data, we saw a 2.8X rise in response rates and a 45% increase in qualified meetings within just six weeks. It gave our outreach real momentum."
        },
        {
            image: '/testimonialPage/newTestImage (16).png',
            reviewerName: 'Mahesh Madhavan',
            reviewerPosition: 'Associate Vice President',
            review: "Our outreach had hit a plateau until we teamed up with Database Providers. Their accurate and well-segmented database helped us boost our connect rate by 3X and drove a 52% increase in qualified conversations within the first quarter. It gave our consulting pipeline the boost it needed."
        },
        {
            image: '/testimonialPage/newTestImage (17).png',
            reviewerName: 'Shiny VR',
            reviewerPosition: 'Sourcing Manager',
            review: "Reaching the right UHNI buyers in Chennai was a challenge until we partnered with Database Providers. Their data was spot on. Within just one month, we saw a 3.2X increase in high-intent enquiries and a 48% improvement in our lead-to-site-visit ratio. It gave our outreach the precision it needed."
        },
        {
            image: '/testimonialPage/newTestImage (18).png',
            reviewerName: 'Kumar',
            reviewerPosition: 'Sales and Operation Manager',
            review: "We needed to scale our outreach fast without compromising on lead quality. With Database Providers' targeted B2B email data, we saw a 2.5X jump in qualified leads and a 40% improvement in response rates within the first few weeks. It made our business development efforts far more efficient."
        },
        {
            image: '/testimonialPage/newTestImage (19).png',
            reviewerName: 'Gowtham',
            reviewerPosition: 'Director of Sales',
            review: "We were reaching out, but not landing the right conversations. After using Database Providers' targeted B2B email data, we saw a 3X boost in response rates and a 55% increase in qualified leads. It helped us connect with the kind of businesses that actually needed our tech services."
        },
        {
            image: '/testimonialPage/newTestImage (20).png',
            reviewerName: 'Sarvanan',
            reviewerPosition: 'Head of Digital Marketing Trainer',
            review: "Before Database Providers, our outreach felt like a shot in the dark. Their targeted email data helped us connect with the right business prospects. In just four weeks, we saw a 2.7X increase in responses and a 50% rise in demo bookings. It made our marketing efforts click where it mattered most."
        },
        {
            image: '/testimonialPage/newTestImage (21).png',
            reviewerName: 'Pooja',
            reviewerPosition: 'Co Founder',
            review: "Reaching marketing teams at startups and MNCs felt like chasing shadows until we worked with Database Providers. Their accurate email data gave our campaigns a real boost. Within a month, we saw a 3X jump in reply rates and a 45% increase in qualified leads. It helped us get ContextRead in front of the right eyes."
        },
        {
            image: '/testimonialPage/newTestImage (22).png',
            reviewerName: 'Sai',
            reviewerPosition: 'Sales Manager',
            review: "Our sales outreach wasn’t hitting the mark until we teamed up with Database Providers. Their accurate, targeted email data helped us reach the right B2B clients. In just three weeks, we saw a 3X increase in responses and a 58% rise in qualified leads. It gave our pipeline the boost we were looking for."
        },
        {
            image: '/testimonialPage/pcQ1.png',
            reviewerName: 'Bala',
            reviewerPosition: 'Head of Production',
            review: "We were trying to break into the product manufacturing space but weren’t getting the right traction. Database Providers changed that. With their targeted email data, we saw a 2.9X jump in meeting bookings and a 50% increase in qualified leads from Bangalore-based manufacturers. It gave our outreach real focus."
        },
        {
            image: '/testimonialPage/newTestImage (23).png',
            reviewerName: 'Prabhakaran',
            reviewerPosition: 'Business Development Manager',
            review: "We were struggling to reach the right people in the construction and interior space. After working with Database Providers, our outreach saw a 3.1X increase in responses and a 46% boost in qualified leads. Their targeted data helped us connect with decision-makers who actually mattered to our business."
        },
        {
            image: '/testimonialPage/newTestImage (24).png',
            reviewerName: 'Archana',
            reviewerPosition: 'Head of Human Resource',
            review: "We wanted to reach HR leaders who actually needed staffing solutions, not just collect cold leads. Database Providers helped us do exactly that. Their targeted email data led to a 3.4X increase in qualified conversations and a 52% rise in proposal requests within the first month. It gave our outreach real results."
        },
        {
            image: '/testimonialPage/newTestImage (25).png',
            reviewerName: 'Raj',
            reviewerPosition: 'CTO',
            review: "Our outreach used to feel scattered, with little to show for it. After using Database Providers' targeted email data, we saw a 3X boost in responses and a 49% increase in qualified leads. It helped us connect with decision-makers who were genuinely interested in our IT and software solutions."
        },
        {
            image: '/testimonialPage/newTestImage (26).png',
            reviewerName: 'Kumar',
            reviewerPosition: 'Head of Legal Operation',
            review: "We needed to connect with the right decision-makers for our legal services, but our outreach was falling short. After using Database Providers’ targeted email data, we saw a 2.8X increase in responses and a 44% rise in qualified client leads. It gave our firm the edge we needed to grow faster and smarter."
        },
        {
            image: '/testimonialPage/newTestImage (27).png',
            reviewerName: 'Karthik',
            reviewerPosition: 'Sales Manager',
            review: "Reaching startup founders who needed branding support was a challenge—until we partnered with Database Providers. Their targeted email data helped us connect with the right people. Within a month, we saw a 3.1X increase in responses and a 55% boost in qualified leads. It gave our sales efforts the visibility they needed."
        },
        {
            image: '/testimonialPage/newTestImage (28).png',
            reviewerName: 'Spoorthi',
            reviewerPosition: 'Public Relations Manager',
            review: "Getting the right leaders to our events was always the hardest part. Database Providers made it easier. Their targeted decision-maker email database helped us boost our outreach efficiency. We saw a 2.9X increase in RSVPs and a 48% jump in attendance from the exact profiles we were aiming for."
        },
        {
            image: '/testimonialPage/newTestImage (29).png',
            reviewerName: 'Jafer',
            reviewerPosition: 'Sales Manager',
            review: "We were trying to break into the manufacturing sector with our insurance solutions but weren’t reaching the right people. Database Providers changed that. Their targeted email data led to a 2.7X increase in responses and a 50% rise in meetings with admin and procurement heads. It gave our outreach real traction."
        },
        {
            image: '/testimonialPage/newTestImage (30).png',
            reviewerName: 'Payyal Daasgupta',
            reviewerPosition: 'Director',
            review: "We needed to connect with CXOs who value strategic communication, but our outreach was falling flat. Database Providers changed the game. Their targeted CXO-level email data led to a 3X increase in high-value responses and a 57% boost in discovery calls. It gave our PR efforts the senior-level visibility we needed."
        },
        {
            image: '/testimonialPage/newTestImage (31).png',
            reviewerName: 'Manoj',
            reviewerPosition: 'Head of Operation',
            review: "Most gifting companies talk about being thoughtful, but that only works when the right people are listening. With Database Providers, we finally reached them. Their targeted list of senior HR and procurement contacts gave our campaigns real weight. In just a few weeks, we saw a 3X boost in replies and conversations that actually turned into orders."
        },
    ] 

    const showMore = () => {
        setVisibleCount((prev) => prev + 6);
    }

    const showLess = () => {
        setVisibleCount(6);
    }

    return (
        <section className="bg-[#F0F4FF] py-16 px-6 flex justify-center items-center">
            <div className="container max-w-7xl mx-auto">
                <div className="space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {
                            dummyTestimonialData.slice(0, visibleCount).map((testimonial, index) => (
                                <div key={index} className="bg-white rounded-[20px] min-h-[400px]">
                                    <div className="flex flex-col items-center justify-center space-y-4 p-8">
                                        <div style={{ position: 'relative', width: '100%', height: '60px' }}>
                                            <Image src={testimonial.image} fill style={{ objectFit: 'contain' }} alt="clientImage" />
                                        </div>
                                        <div className="flex flex-col items-center justify-center">
                                            <h4 className="text-[#2C6BFF] text-[18px] font-bold text-center">{testimonial.reviewerName}</h4>
                                            <p className="text-[#51525C] text-[14px] font-[400] text-center">{testimonial.reviewerPosition}</p>
                                        </div>
                                    </div>
                                    <div className="pb-16 pt-8 px-9 border-t">
                                        <p className="text-[#51525C] text-[16px] font-[400] text-center">{testimonial.review}</p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="flex items-center justify-center">
                        {visibleCount < dummyTestimonialData.length && (
                            <button onClick={showMore} className="relative text-white px-15 py-3 cursor-pointer rounded-full font-medium text-[15px] overflow-hidden z-10 hover:scale-105 transition duration-300 ease-in">
                                <span className="relative z-10">Show More</span>
                                <span className="absolute inset-0 bg-gradient-to-r from-[#0055ff1a] via-[#0133E9] to-[#0055FF] bg-[length:200%_100%] bg-left transition-all duration-700 ease-in-out rounded-full blur-sm animate-gradient-loop">
                                </span>
                            </button>
                        )}
                        {visibleCount > dummyTestimonialData.length && (
                            <button onClick={showLess} className="relative text-white px-15 py-3 cursor-pointer rounded-full font-medium text-[15px] overflow-hidden z-10 hover:scale-105 transition duration-300 ease-in">
                                <span className="relative z-10">Show Less</span>
                                <span className="absolute inset-0 bg-gradient-to-r from-[#0055ff1a] via-[#0133E9] to-[#0055FF] bg-[length:200%_100%] bg-left transition-all duration-700 ease-in-out rounded-full blur-sm animate-gradient-loop">
                                </span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}