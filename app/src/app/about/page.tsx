import { ContentWrapper } from "@/components/content-wrapper";
import { Button } from "@/components/ui/button";
import { CircleCheck, Eye, LockKeyhole, LucideIcon } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Webshop - About Us",
  description: "Who are we?",
};

const cards = [
  {
    icon: Eye,
    title: "Our Vision",
    description:
      "We strive to create a future where innovation and collaboration empower people to achieve more together than they ever could alone.",
  },
  {
    icon: LockKeyhole,
    title: "Our Mission",
    description:
      "Our mission is to nurture meaningful connections, inspire growth, and provide the tools that help individuals and teams thrive with purpose.",
  },
  {
    icon: CircleCheck,
    title: "Our Goals",
    description:
      "We aim to drive lasting impact by setting ambitious targets, measuring our progress, and staying true to values that guide every decision.",
  },
] as const;

export default function AboutPage() {
  return (
    <ContentWrapper className="flex flex-col py-12 md:py-16 gap-4 md:gap-16">
      <section className="flex flex-col items-center gap-4 text-center mb-4 md:mb-0">
        <h1 className="text-[2.5rem] font-bold">About Us</h1>
        <p className="text-center text-sm text-muted-foreground max-w-[70ch]">
          Get to know our story, our mission, and the passionate team behind our
          webstore.
        </p>
      </section>
      <section className="flex flex-col md:flex-row items-center gap-8 mb-8">
        <div className="flex-1 w-full relative aspect-[3/2]">
          <Image
            src="/team.webp"
            alt="Our Team"
            fill
            className="rounded shadow-lg object-cover"
            priority
          />
        </div>
        <div className="flex-1">
          <h2 className="text-[1.75rem] font-bold mb-3 text-primary">Our Team</h2>
          <p className="mb-4 text-neutral-800 text-sm">
            Our team is made up of passionate individuals who bring diverse
            skills and experiences to everything we do. We believe that
            collaboration, creativity, and a shared commitment to quality are
            what drive us forward. Each member of our team plays an important
            role in shaping the way we grow and serve our customers. Together,
            we strive to create an environment where ideas can flourish and
            challenges are met with energy and determination. We value open
            communication, continuous learning, and supporting one another to
            reach our goals. At the heart of it all, we are a team that cares
            about making a difference through the work we do every day.
          </p>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-4 mb-8">
        {cards.map((card, index) => (
          <InfoCard
            key={index}
            icon={card.icon}
            title={card.title}
            description={card.description}
          />
        ))}
      </section>

      <section className="bg-accent rounded p-8 mb-8">
        <h2 className="text-xl font-bold mb-4 text-primary">Our Story</h2>
        <p className="mb-2 text-neutral-800 text-sm">
          Our story is built on a simple idea: making everyday shopping easier,
          more enjoyable, and more accessible for everyone. From the very
          beginning, we&apos;ve focused on creating a place where quality and
          convenience come together.
        </p>
        <p className="mb-2 text-neutral-800 text-sm">
          Over time, we&apos;ve grown into a community of people who believe
          that shopping should be straightforward and stress-free. Today, we
          continue to evolve while staying true to our goal of delivering
          products you can trust, with service that puts you first.
        </p>
      </section>
      <section className="flex flex-col items-center justify-center gap-2 mb-8">
        <h2 className="text-3xl font-bold mb-2">Any questions?</h2>
        <p className="text-muted-foreground mb-6 max-w-md text-sm text-center">
          We’d love to hear from you. Whether you have a question about our
          products, your order, or just want to say hello - our team is here to
          help.
        </p>
        <Link href="/contact">
          <Button size="lg" className="cursor-pointer" variant="brand">
            Contact Us
          </Button>
        </Link>
      </section>
    </ContentWrapper>
  );
}

interface InfoCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

function InfoCard({ icon: Icon, title, description }: InfoCardProps) {
  return (
    <div className="flex flex-col items-center border-4 rounded overflow-hidden border-accent">
      <div className="bg-brand-600 w-full flex h-32 items-center justify-center rounded-t">
        <Icon size={48} className="text-white" />
      </div>
      <div className="flex flex-col items-center p-6 rounded-b">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-center text-sm text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}
