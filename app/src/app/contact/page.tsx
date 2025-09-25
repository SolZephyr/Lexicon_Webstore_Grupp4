import ContactFormClient from "@/components/contact/contact-form";
import ContactInfo from "@/components/contact/contact-info";
import { ContentWrapper } from "@/components/content-wrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Webshop - Contact Us",
  description: "Reach out to us!",
};

export default async function ContactPage() {
  return (
    <ContentWrapper className="flex flex-col gap-4 py-12 md:py-16 md:gap-8">
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="text-[2.5rem] font-bold">Contact our team</h2>
        <p className="text-center text-sm text-muted-foreground max-w-[70ch]">
          What types of questions can you have? Why not send us an email or ring
          in if you have any specific questions or rights? We&apos;re here to
          help and assist you in meeting your requirements.
        </p>
      </div>
      <div className="flex flex-col md:flex-row px-0 xl:px-32 gap-12 md:gap-24 py-12">
        <ContactFormClient />
        <ContactInfo />
      </div>
    </ContentWrapper>
  );
}
