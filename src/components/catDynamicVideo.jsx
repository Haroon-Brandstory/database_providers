export default function CategoryDynamicVideo({data}) {
    return (
        <>
            <section className="bg-white py-16 px-6 justify-center flex">
                <div className="container lg:h-[600px] max-w-7xl flex justify-center flex-col items-center">
                    <div className="w-[100%] h-[100%] rounded-lg">
                        <iframe
                            width="100%"
                            height="100%"
                            src={data.videoUrl}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="rounded-[20px]"
                        ></iframe>
                    </div>
                </div>
            </section>
        </>
    );
}