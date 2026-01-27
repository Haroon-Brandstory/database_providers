import DatabaseSearch from "@/components/searchDatabase/dbSearch";

export default function SearchDatabase() {
    return (
        <>
            <section className="py-20">
                <div className="container mx-auto px-4 py-8">
                    {/* <div>Search For the Custom Database</div> */}
                    <DatabaseSearch />
                </div>
            </section>
        </>
    )
}