import { getAllCompanyData } from "@/lib/services";
import DatabaseTable from "./databaseTable";

export default async function DatabaseSearch() {
    const companyData = await getAllCompanyData();
    const companies = companyData?.data || [];
    // console.log(companies);

    return (
        <div className="container mx-auto w-full p-4 font-sans text-gray-200">
            <DatabaseTable initialCompanies={companies} />
        </div>
    );
}