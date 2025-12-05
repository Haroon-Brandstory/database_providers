import NotFoundChild from "@/components/notfoundchild";

export const metadata = {
  title: "404 - Page Not Found | Database Providers",
  description:
    "Page not found (404). Head back to Database Providers homepage and explore our verified global B2B email database services.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Custom404() {
  return <NotFoundChild />;
}
