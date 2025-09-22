import { ContentWrapper } from "@/components/content-wrapper";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Webshop - About Us",
  description: "Who are we?",
};

export default function AboutPage() {
  return (
    <ContentWrapper className="py-12">
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-primary">About Us</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Get to know our story, our mission, and the passionate team behind our webstore.
        </p>
      </section>

      <section className="flex flex-col md:flex-row items-center gap-8 mb-12">
        <div className="md:w-1/2">
          <Image
            src="/team.webp"
            alt="Our Team"
            width={600}
            height={400}
            className="rounded-xl shadow-lg object-cover"
            priority
          />
        </div>
        <div className="md:w-1/2">
          <h2 className="text-2xl font-semibold mb-3 text-primary">Our Team</h2>
          <p className="mb-4 text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam venenatis ut elit quis euismod. Nullam quis ligula sit amet urna rutrum sodales et non leo. Curabitur iaculis condimentum libero, sit amet vehicula erat commodo sed. Donec sit amet odio congue, feugiat lectus in, feugiat sem. Cras consequat efficitur scelerisque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur fermentum a nisl sed volutpat. Duis sodales odio varius ante vehicula pulvinar. Ut ultrices lacus in elit euismod maximus. Vestibulum non sem ut magna blandit posuere consequat et tortor. Vivamus vehicula mattis massa, et vehicula quam luctus ut.
          </p>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="bg-primary-green border rounded-lg shadow p-6 flex flex-col items-center">
          <svg className="w-12 h-12 text-primary mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          <h3 className="text-xl font-bold mb-2">Our Vision</h3>
          <p className="text-center">
            Proin a dignissim massa. Vestibulum sagittis elit quam, vitae rutrum libero venenatis quis. Maecenas tincidunt sem augue, sit amet finibus risus tempus a.
          </p>
        </div>
        <div className="bg-primary-green border rounded-lg shadow p-6 flex flex-col items-center">
          <svg className="w-12 h-12 text-primary mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <rect x="5" y="11" width="14" height="12" rx="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" />
            <circle cx="12" cy="17" r="1.5" />
          </svg>
          <h3 className="text-xl font-bold mb-2">Our Values</h3>
          <p className="text-center">
            Sed eu ornare lacus. Donec eleifend maximus suscipit. Nam placerat pulvinar mauris et condimentum. Nam condimentum, eros sit amet pretium vehicula.
          </p>
        </div>
        <div className="bg-primary-green border rounded-lg shadow p-6 flex flex-col items-center">
          <svg className="w-12 h-12 text-primary mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="12" cy="12" r="10" />
          </svg>
          <h3 className="text-xl font-bold mb-2">Our Promise</h3>
          <p className="text-center">
            Donec a elit nec neque placerat commodo in vitae nibh. Nulla a orci sapien. Sed rutrum enim eget elit sagittis porta. Donec pellentesque ex vel turpis porta.
          </p>
        </div>
      </section>

      <section className="bg-primary/10 rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-4 text-primary">Our Story</h2>
        <p className="mb-2 text-gray-700">
          Curabitur convallis orci at purus rutrum, non ornare purus sollicitudin. Pellentesque mollis nisl nec lacinia blandit. Suspendisse ornare quis magna ut consectetur. Nullam condimentum fringilla hendrerit. In a imperdiet massa. Etiam consectetur ac arcu eget mollis.
        </p>
        <p className="mb-2 text-gray-700">
          Vivamus consequat, orci ut porttitor faucibus, massa augue consectetur diam, in facilisis turpis ligula vel diam. Cras libero tellus, vulputate in aliquet quis, efficitur sed mauris. Phasellus eu cursus lorem.
        </p>
      </section>
    </ContentWrapper>
  );
}