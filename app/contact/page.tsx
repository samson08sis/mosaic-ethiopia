import PageHeader from "@/components/PageHeader";
import ContactInfo from "../../components/pages/contact/ContactInfo";
import ContactForm from "../../components/pages/contact/ContactForm.client";
import MapSection from "../../components/pages/contact/MapSection.client";

export default function ContactPage() {
  return (
    <div className="pt-20 pb-16 bg-theme">
      {/* Hero Section */}
      <PageHeader
        title="Contact Us"
        subtitle="Have questions or need assistance? We're here to help you plan your perfect journey."
        backgroundImage="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
        overlayColor="primary"
        overlayOpacity={0.7}
      />

      {/* Contact Form and Info */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information - Could be server-rendered but kept here for layout consistency */}
          <ContactInfo />

          {/* Contact Form - Must be client-side */}
          <ContactForm />
        </div>
      </div>

      {/* Map Section */}
      <MapSection />
    </div>
  );
}
