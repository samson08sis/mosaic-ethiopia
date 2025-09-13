import Link from "next/link";

export default function CTASection() {
  return (
    <div className="mt-16 text-center">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Ready to Experience Ethiopia?
      </h3>
      <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-8">
        Explore our carefully curated tour packages and embark on an
        unforgettable journey through Ethiopia's rich cultural heritage,
        breathtaking landscapes, and ancient historical sites.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link
          href="/packages"
          className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors">
          View Tour Packages
        </Link>
        <Link
          href="/contact-us"
          className="px-8 py-3 border border-primary-600 text-primary-600 hover:bg-primary-50 dark:border-primary-400 dark:text-primary-400 dark:hover:bg-gray-800 rounded-lg transition-colors">
          Contact Us
        </Link>
      </div>
    </div>
  );
}
