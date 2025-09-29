import React from "react";
import { FooterIcon } from "./footer/footer-icon";
import { FooterColumn } from "./footer/footer-column";

export type linkIcon = {
  name: string;
  width: number;
  height: number;
};
export type content = { slug: string; name: string };

function Footer() {
  const categories: content[] = [
    { slug: "laptops", name: "Laptops" },
    { slug: "pc", name: "PC & Computers" },
    { slug: "phones", name: "Cell Phones" },
    { slug: "tablets", name: "Tablets" },
    { slug: "gaming", name: "Gaming & VR" },
    { slug: "networks", name: "Networks" },
    { slug: "cameras", name: "Cameras" },
    { slug: "sounds", name: "Sounds" },
    { slug: "office", name: "Office" },
  ];
  const company: content[] = [
    { slug: "about", name: "About Us" },
    { slug: "contact", name: "Contact" },
    { slug: "career", name: "Career" },
    { slug: "blog", name: "Blog" },
    { slug: "sitemap", name: "Sitemap" },
    { slug: "locations", name: "Store Locations" },
  ];

  const help: content[] = [
    { slug: "service", name: "Customer Service" },
    { slug: "policy", name: "Policy" },
    { slug: "terms", name: "Terms & Conditions" },
    { slug: "tracking", name: "Track Order" },
    { slug: "faq", name: "FAQ:s" },
    { slug: "account", name: "My Account" },
    { slug: "support", name: "Product Support" },
  ];

  const partner: content[] = [
    { slug: "seller", name: "Become Seller" },
    { slug: "affiliate", name: "Affiliate" },
    { slug: "advertise", name: "Advertise" },
    { slug: "partnership", name: "Partnership" },
  ];

  const circleIcon: linkIcon[] = [
    { name: "Twitter", width: 35, height: 36 },
    { name: "Facebook", width: 36, height: 36 },
    { name: "Instagram", width: 36, height: 36 },
    { name: "Youtube", width: 36, height: 36 },
    { name: "Pinterest", width: 36, height: 36 },
  ];

  const colorIcon: linkIcon[] = [
    { name: "Paypal", width: 14, height: 16 },
    { name: "Mastercard", width: 27, height: 16 },
    { name: "Visa", width: 42, height: 16 },
    { name: "Stripe", width: 40, height: 16 },
    { name: "Klarna", width: 72, height: 16 },
  ];
  return (
    <footer className="flex flex-col grow full-width border-t-1 bg-white">
      <div className="flex-row border-b-1">
        <div className="flex flex-col py-12 justify-evenly sm:flex-row">
          <div className="flex flex-col gap-5 py-4 grow">
            <h2 className="text-2xl font-bold uppercase">Group 4 Webstore</h2>
            <p className="flex flex-col">
              <span className="uppercase">Hotline 24/7</span>
              <span className="text-xl font-bold text-green-800 xs:text-3xl">
                <a className="hover:underline" href="tel:04681234567">
                  (046) 8123 45 67
                </a>
              </span>
            </p>
            <p className="flex flex-col gap-0 text-sm">
              <span>Placeholdergatan 2</span>
              <span>123 45, Stockholm</span>
              <a className="hover:underline" href="mailto:testkontakt@test.se">
                testkontakt@test.se
              </a>
            </p>
            <div className="flex gap-3">
              {circleIcon.map((icon) => (
                <FooterIcon key={icon.name} icon={icon} />
              ))}
            </div>
          </div>
          <nav className="gap-6 py-4 grid grid-cols-1 xs:grid-cols-2 xs:gap-12 lg:grid-cols-4">
            <FooterColumn header="Categories" content={categories} />
            <FooterColumn header="Company" content={company} />
            <FooterColumn header="Help Center" content={help} />
            <FooterColumn header="Partner" content={partner} />
          </nav>
        </div>
      </div>
      <div className="grid grid-cols-1 py-6 gap-6 sm:grid-cols-2 sm:gap-0">
        <p className="text-sm text-center order-2 sm:text-start sm:order-1">
          © 2025 <span className="font-bold">Group 4</span>. All Rights Reserved
        </p>
        <div className="flex gap-4 items-center justify-center order-1 sm:justify-end sm:order-2">
          {colorIcon.map((item) => (
            <FooterIcon key={item.name} icon={item} />
          ))}
        </div>
      </div>
    </footer>
  );
}
export default Footer;
