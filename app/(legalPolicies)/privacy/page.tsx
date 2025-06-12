"use client";

import { useTheme } from "@/contexts/ThemeContext";
import PageHeader from "@/components/PageHeader";

export default function PrivacyPolicyPage() {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <PageHeader
        title="Privacy Policy"
        subtitle="Your privacy is important to us. Learn how we protect and use your information."
        backgroundImage="/images/hero-bg.jpg"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
          {/* Last Updated */}
          <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-800 dark:text-blue-300">
              <strong>Last Updated:</strong> December 6, 2024
            </p>
          </div>

          {/* Introduction */}
          <div className="mb-8">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              This Privacy Policy explains how Ethiopian Cultural Tours ("we,"
              "our," or "us") collects, uses, discloses, and protects your
              personal information when you visit our website, use our services,
              or interact with us in any way. This policy applies to all users
              of our travel booking platform and related services.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              By using our services, you agree to the collection and use of
              information in accordance with this policy. We are committed to
              protecting your privacy and ensuring the security of your personal
              information.
            </p>
          </div>

          {/* Information We Collect */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 border-b-2 border-orange-500 pb-2">
              Information We Collect
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                  Personal Information
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  We collect personal information that you voluntarily provide
                  to us when you:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 ml-4">
                  <li>Create an account or register for our services</li>
                  <li>Make a booking or purchase our travel packages</li>
                  <li>Contact us for customer support or inquiries</li>
                  <li>
                    Subscribe to our newsletter or marketing communications
                  </li>
                  <li>
                    Participate in surveys, contests, or promotional activities
                  </li>
                </ul>
                <p className="text-gray-600 dark:text-gray-400 mt-3">
                  This information may include: full name, email address, phone
                  number, postal address, date of birth, passport information,
                  payment details, travel preferences, and emergency contact
                  information.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                  Usage Data
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  We automatically collect certain information when you visit
                  our website or use our services:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 ml-4">
                  <li>IP address and device information</li>
                  <li>Browser type and version</li>
                  <li>Pages visited and time spent on our website</li>
                  <li>Referring website and search terms used</li>
                  <li>Operating system and device identifiers</li>
                  <li>Location data (with your consent)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                  Cookies and Tracking Technologies
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  We use cookies, web beacons, and similar tracking technologies
                  to enhance your experience:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 ml-4">
                  <li>
                    <strong>Essential Cookies:</strong> Required for basic
                    website functionality
                  </li>
                  <li>
                    <strong>Performance Cookies:</strong> Help us analyze
                    website usage and improve performance
                  </li>
                  <li>
                    <strong>Functional Cookies:</strong> Remember your
                    preferences and settings
                  </li>
                  <li>
                    <strong>Marketing Cookies:</strong> Used to deliver relevant
                    advertisements
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Your Information */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 border-b-2 border-orange-500 pb-2">
              How We Use Your Information
            </h2>

            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                We use the collected information for various purposes,
                including:
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    Service Provision
                  </h3>
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1 text-sm">
                    <li>Process bookings and payments</li>
                    <li>Provide customer support</li>
                    <li>Manage your account</li>
                    <li>Deliver travel services</li>
                  </ul>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    Communication
                  </h3>
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1 text-sm">
                    <li>Send booking confirmations</li>
                    <li>Provide travel updates</li>
                    <li>Send marketing communications</li>
                    <li>Respond to inquiries</li>
                  </ul>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    Personalization
                  </h3>
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1 text-sm">
                    <li>Customize your experience</li>
                    <li>Recommend relevant packages</li>
                    <li>Remember your preferences</li>
                    <li>Improve our services</li>
                  </ul>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    Analytics & Security
                  </h3>
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1 text-sm">
                    <li>Analyze website usage</li>
                    <li>Prevent fraud and abuse</li>
                    <li>Ensure platform security</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Information Sharing */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 border-b-2 border-orange-500 pb-2">
              Information Sharing
            </h2>

            <div className="space-y-6">
              <p className="text-gray-600 dark:text-gray-400">
                We do not sell, trade, or rent your personal information to
                third parties. However, we may share your information in the
                following circumstances:
              </p>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                  Service Providers
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  We work with trusted third-party service providers who assist
                  us in operating our business:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 ml-4">
                  <li>Payment processors for secure transaction handling</li>
                  <li>
                    Cloud hosting providers for data storage and website hosting
                  </li>
                  <li>Email service providers for communication</li>
                  <li>Analytics providers for website performance analysis</li>
                  <li>Customer support platforms</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                  Business Partners
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  We may share information with our business partners to provide
                  you with travel services:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 ml-4">
                  <li>Hotels and accommodation providers</li>
                  <li>Transportation companies</li>
                  <li>Tour operators and local guides</li>
                  <li>Travel insurance providers</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                  Legal Requirements
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We may disclose your information when required by law, court
                  order, or government regulation, or when we believe disclosure
                  is necessary to protect our rights, your safety, or the safety
                  of others.
                </p>
              </div>
            </div>
          </section>

          {/* Data Security */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 border-b-2 border-orange-500 pb-2">
              Data Security
            </h2>

            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                We implement appropriate technical and organizational security
                measures to protect your personal information against
                unauthorized access, alteration, disclosure, or destruction:
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                  <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-2">
                    Technical Measures
                  </h3>
                  <ul className="list-disc list-inside text-green-700 dark:text-green-400 space-y-1 text-sm">
                    <li>SSL/TLS encryption for data transmission</li>
                    <li>Encrypted data storage</li>
                    <li>Regular security audits and updates</li>
                    <li>Secure payment processing</li>
                    <li>Access controls and authentication</li>
                  </ul>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-2">
                    Organizational Measures
                  </h3>
                  <ul className="list-disc list-inside text-blue-700 dark:text-blue-400 space-y-1 text-sm">
                    <li>Employee training on data protection</li>
                    <li>Limited access to personal information</li>
                    <li>Regular security policy reviews</li>
                    <li>Incident response procedures</li>
                    <li>Third-party security assessments</li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800 mt-4">
                <p className="text-yellow-800 dark:text-yellow-300 text-sm">
                  <strong>Important:</strong> While we strive to protect your
                  personal information, no method of transmission over the
                  internet or electronic storage is 100% secure. We cannot
                  guarantee absolute security.
                </p>
              </div>
            </div>
          </section>

          {/* Your Rights */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 border-b-2 border-orange-500 pb-2">
              Your Rights
            </h2>

            <div className="space-y-6">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                You have certain rights regarding your personal information.
                Depending on your location, these rights may include:
              </p>

              <div className="grid gap-4">
                <div className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                      Right to Access
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Request a copy of the personal information we hold about
                      you
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                      Right to Correction
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Request correction of inaccurate or incomplete information
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                      Right to Deletion
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Request deletion of your personal information (subject to
                      legal requirements)
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                      Right to Portability
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Request transfer of your data to another service provider
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    5
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                      Right to Opt-Out
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Unsubscribe from marketing communications at any time
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
                  How to Exercise Your Rights
                </h3>
                <p className="text-blue-700 dark:text-blue-400 text-sm mb-2">
                  To exercise any of these rights, please contact us using the
                  information provided in the "Contact Information" section
                  below. We will respond to your request within 30 days.
                </p>
                <p className="text-blue-700 dark:text-blue-400 text-sm">
                  You may also update some of your information directly through
                  your account settings when logged in.
                </p>
              </div>
            </div>
          </section>

          {/* Data Retention */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 border-b-2 border-orange-500 pb-2">
              Data Retention
            </h2>

            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                We retain your personal information only for as long as
                necessary to fulfill the purposes for which it was collected and
                to comply with legal obligations:
              </p>

              <div className="space-y-4">
                <div className="border-l-4 border-orange-500 pl-4">
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                    Account Information
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Retained while your account is active and for 3 years after
                    account closure
                  </p>
                </div>

                <div className="border-l-4 border-orange-500 pl-4">
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                    Booking and Transaction Data
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Retained for 7 years for tax and legal compliance purposes
                  </p>
                </div>

                <div className="border-l-4 border-orange-500 pl-4">
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                    Marketing Communications
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Retained until you unsubscribe or for 2 years of inactivity
                  </p>
                </div>

                <div className="border-l-4 border-orange-500 pl-4">
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                    Website Usage Data
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Typically retained for 2 years for analytics purposes
                  </p>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-400 text-sm mt-4">
                When we no longer need your personal information, we will
                securely delete or anonymize it in accordance with our data
                retention policies and applicable laws.
              </p>
            </div>
          </section>

          {/* International Data Transfers */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 border-b-2 border-orange-500 pb-2">
              International Data Transfers
            </h2>

            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Your personal information may be transferred to and processed in
                countries other than your own. These countries may have
                different data protection laws than your jurisdiction.
              </p>

              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  Safeguards We Implement
                </h3>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
                  <li>
                    We only transfer data to countries with adequate data
                    protection laws
                  </li>
                  <li>
                    We use standard contractual clauses approved by relevant
                    authorities
                  </li>
                  <li>
                    We ensure our service providers implement appropriate
                    security measures
                  </li>
                  <li>
                    We regularly review and update our data transfer practices
                  </li>
                </ul>
              </div>

              <p className="text-gray-600 dark:text-gray-400 text-sm">
                By using our services, you acknowledge and consent to the
                transfer of your personal information as described in this
                policy.
              </p>
            </div>
          </section>

          {/* Children's Privacy */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 border-b-2 border-orange-500 pb-2">
              Children's Privacy
            </h2>

            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Our services are not intended for children under the age of 13.
                We do not knowingly collect personal information from children
                under 13 years of age.
              </p>

              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
                <h3 className="font-semibold text-red-800 dark:text-red-300 mb-2">
                  If You Are a Parent or Guardian
                </h3>
                <p className="text-red-700 dark:text-red-400 text-sm mb-2">
                  If you believe your child has provided us with personal
                  information, please contact us immediately. We will take steps
                  to remove such information from our systems.
                </p>
                <p className="text-red-700 dark:text-red-400 text-sm">
                  For children between 13-18 years old, we recommend parental
                  supervision when using our services.
                </p>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
                  Family Travel Bookings
                </h3>
                <p className="text-blue-700 dark:text-blue-400 text-sm">
                  When booking travel for minors, the adult making the booking
                  is responsible for providing consent for the collection and
                  use of the minor's information as necessary for travel
                  services.
                </p>
              </div>
            </div>
          </section>

          {/* Changes to This Privacy Policy */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 border-b-2 border-orange-500 pb-2">
              Changes to This Privacy Policy
            </h2>

            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                We may update this Privacy Policy from time to time to reflect
                changes in our practices, technology, legal requirements, or
                other factors.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <h3 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">
                    How We Notify You
                  </h3>
                  <ul className="list-disc list-inside text-yellow-700 dark:text-yellow-400 space-y-1 text-sm">
                    <li>Email notification to registered users</li>
                    <li>Prominent notice on our website</li>
                    <li>In-app notifications (if applicable)</li>
                    <li>Updated "Last Modified" date</li>
                  </ul>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                  <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">
                    Your Options
                  </h3>
                  <ul className="list-disc list-inside text-green-700 dark:text-green-400 space-y-1 text-sm">
                    <li>Review changes before they take effect</li>
                    <li>Contact us with questions or concerns</li>
                    <li>Opt-out of services if you disagree</li>
                    <li>Update your preferences accordingly</li>
                  </ul>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Continued use of our services after changes become effective
                constitutes acceptance of the updated Privacy Policy. We
                encourage you to review this policy periodically.
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 border-b-2 border-orange-500 pb-2">
              Contact Information
            </h2>

            <div className="space-y-6">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                If you have any questions, concerns, or requests regarding this
                Privacy Policy or our data practices, please contact us using
                the information below:
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg border border-orange-200 dark:border-orange-800">
                  <h3 className="font-semibold text-orange-800 dark:text-orange-300 mb-4">
                    Privacy Officer
                  </h3>
                  <div className="space-y-2 text-orange-700 dark:text-orange-400">
                    <p>
                      <strong>Email:</strong> privacy@ethiopianculturaltours.com
                    </p>
                    <p>
                      <strong>Phone:</strong> +251-11-123-4567
                    </p>
                    <p>
                      <strong>Address:</strong>
                      <br />
                      Ethiopian Cultural Tours
                      <br />
                      Privacy Department
                      <br />
                      123 Bole Road
                      <br />
                      Addis Ababa, Ethiopia
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-4">
                    Response Times
                  </h3>
                  <div className="space-y-2 text-blue-700 dark:text-blue-400 text-sm">
                    <p>
                      <strong>General Inquiries:</strong> 2-3 business days
                    </p>
                    <p>
                      <strong>Data Access Requests:</strong> Up to 30 days
                    </p>
                    <p>
                      <strong>Data Deletion Requests:</strong> Up to 30 days
                    </p>
                    <p>
                      <strong>Urgent Privacy Concerns:</strong> Within 24 hours
                    </p>
                  </div>

                  <div className="mt-4 p-3 bg-blue-100 dark:bg-blue-800/50 rounded">
                    <p className="text-blue-800 dark:text-blue-300 text-xs">
                      <strong>Note:</strong> We may require verification of your
                      identity before processing certain requests to protect
                      your privacy and security.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  <strong>Alternative Contact Methods:</strong> You may also
                  reach us through our
                  <a
                    href="/contact"
                    className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 underline ml-1">
                    general contact form
                  </a>{" "}
                  or by mail at the address above. Please mark privacy-related
                  correspondence as "PRIVACY INQUIRY" for faster processing.
                </p>
              </div>
            </div>
          </section>

          {/* Footer Note */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              This Privacy Policy is effective as of the date listed above and
              supersedes any previous versions. Thank you for trusting Ethiopian
              Cultural Tours with your personal information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
