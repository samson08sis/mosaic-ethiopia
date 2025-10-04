import { Mail, Phone, MapPin, Send } from "lucide-react";
import LocalizedLink from "@/components/LocalizedLink"; //<LocalizedLink

const iconClass = "h-6 w-6 text-primary";
const addresses = [
  {
    name: "Email",
    icon: <Mail className={iconClass} />,
    addressList: [
      {
        url: "mailto:info@mosaicethiopia.com",
        label: "info@mosaicethiopia.com",
        external: false,
      },
      {
        url: "mailto:support@mosaicethiopia.com",
        label: "support@mosaicethiopia.com",
        external: false,
      },
    ],
  },
  {
    name: "Phone",
    icon: <Phone className={iconClass} />,
    addressList: [
      {
        url: "tel:+251 (11) 123-4567",
        label: "+251 (11) 123-4567",
        external: false,
      },
      {
        url: "tel:+251 (11) 987-6543",
        label: "+251 (11) 987-6543",
        external: false,
      },
    ],
  },
  {
    name: "Address",
    icon: <MapPin className={iconClass} />,
    addressList: [
      // { label: "123 Adwa Street" },
      // { label: "Addis Ababa, AC 12345" },
      // { label: "Ethiopia" },
      { label: "Addis Ababa, Ethiopia", url: "", external: false },
    ],
  },
  {
    name: "Telegram",
    icon: <Send className={iconClass} />,
    addressList: [
      {
        label: "Latest News",
        url: "https://t.me/mosaicethiopia",
        external: true,
      },
      {
        label: "Support Bot",
        url: "https://t.me/mosaicethiopia_bot",
        external: true,
      },
    ],
  },
];

export default function ContactInfo() {
  return (
    <div>
      <h2 className="font-arizonia text-4xl text-primary mb-8">Get in Touch</h2>
      <p className="mb-8">
        Whether you have questions about our travel packages, need assistance
        with booking, or want to customize your journey, our team is ready to
        assist you. Fill out the form or use the contact information below to
        reach us.
      </p>

      <div className="space-y-6">
        {addresses.map((address) => (
          <div className="flex items-start" key={address.name}>
            <div className="flex-shrink-0 bg-primary-100 dark:bg-primary-900 p-3 rounded-full">
              {address.icon}
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium">{address.name}</h3>
              {address.addressList.map((item) =>
                item.url ? (
                  <LocalizedLink
                    target={item?.external ? "_blank" : "_self"}
                    key={crypto.randomUUID()}
                    href={item.url}
                    className="text-gray-700 dark:text-gray-300 block">
                    {item.label}
                  </LocalizedLink>
                ) : (
                  <p
                    className="text-gray-700 dark:text-gray-300"
                    key={crypto.randomUUID()}>
                    {item.label}
                  </p>
                )
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <h3 className="text-lg font-medium mb-4">Follow Us</h3>
        <div className="flex space-x-4">
          {/* Social media links.............. */}
        </div>
      </div>
    </div>
  );
}
