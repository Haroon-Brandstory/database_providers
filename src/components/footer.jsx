import FooterCopyRight from "./footerCopyRight";
import FooterFilter from "./footerFilter";
import FooterMenu from "./footerMenu";
import FooterReview from "./footerReview";

export default async function Footer() {

    return (
        <footer className="bg-black text-white flex justify-center flex-col items-center ">
            <FooterFilter />
            <FooterMenu />
            <FooterReview />
            <FooterCopyRight />
        </footer>
    );
}