"use client";

import type React from "react";

import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import PageHeader from "@/components/PageHeader";

const iconClass = "h-6 w-6 text-primary";
const addresses = [
  {
    name: "Email",
    icon: <Mail className={iconClass} />,
    addressList: ["info@mosaicethiopia.com", "support@mosaicethiopia.com"],
  },
  {
    name: "PhoneEmail",
    icon: <Phone className={iconClass} />,
    addressList: ["+251 (11) 123-4567", "+251 (11) 987-6543"],
  },
  {
    name: "Address",
    icon: <MapPin className={iconClass} />,
    addressList: ["123 Adwa Street", "Addis Ababa, AC 12345", "Ethiopia"],
  },
  {
    name: "Telegram",
    icon: <Send className={iconClass} />,
    addressList: [
      "https://t.me/mosaicethiopia",
      "https://t.me/mosaicethiopia_bot",
    ],
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setSubmitError(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({ name: "", email: "", subject: "", message: "" }); // Clear the form
      } else {
        setSubmitError(true);
      }
    } catch (error) {
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-20 pb-16 bg-theme">
      {/* Hero Section */}
      {/* <div className="bg-primary-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-arizonia text-5xl md:text-6xl mb-4">
            Contact Us
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Have questions or need assistance? We're here to help you plan your
            perfect journey.
          </p>
        </div>
      </div> */}
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
          {/* Contact Information */}
          <div>
            <h2 className="font-arizonia text-4xl text-primary mb-8">
              Get in Touch
            </h2>
            <p className="mb-8">
              Whether you have questions about our travel packages, need
              assistance with booking, or want to customize your journey, our
              team is ready to assist you. Fill out the form or use the contact
              information below to reach us.
            </p>

            <div className="space-y-6">
              {addresses.map((address) => (
                <div className="flex items-start" key={address.name}>
                  <div className="flex-shrink-0 bg-primary-100 dark:bg-primary-900 p-3 rounded-full">
                    {address.icon}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium">{address.name}</h3>
                    {address.addressList.map((addressItem) => (
                      <p
                        className="text-gray-700 dark:text-gray-300"
                        key={addressItem}>
                        {addressItem}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <h3 className="text-lg font-medium mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                {/* Social media links remain the same... */}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-card-foreground mb-6">
              Send Us a Message
            </h2>

            {submitSuccess && (
              <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 p-4 rounded-lg mb-6">
                Thank you for your message! We'll get back to you as soon as
                possible.
              </div>
            )}

            {submitError && (
              <div className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 p-4 rounded-lg mb-6">
                There was an error sending your message. Please try again later.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-card-foreground mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-card-foreground mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-card-foreground mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-card-foreground mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                  required></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-70">
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5 mr-2" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="w-full h-96 mt-16">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127725.32080079896!2d38.70786319734353!3d9.03314076727154!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b850725f2e325%3A0x71cd4f7cda2270f9!2sAddis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2s!4v1619826381244!5m2!1sen!2s"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          title="Mosaic Ethiopia Location"></iframe>
      </div>
    </div>
  );
}
