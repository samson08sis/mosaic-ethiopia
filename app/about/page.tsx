"use client";

import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="pt-20 pb-16 bg-theme">
      {/* Hero Section */}
      <div className="bg-primary-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-arizonia text-5xl md:text-6xl mb-4">About Us</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Discover the story behind Mosaic Ethiopia and our passion for
            creating unforgettable journeys.
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-arizonia text-4xl text-primary mb-6">
              Our Story
            </h2>
            <p className="mb-4">
              Mosaic Ethiopia was founded in 2010 by a group of passionate
              travelers who believed that exploring the world should be
              accessible to everyone. What started as a small blog sharing
              travel tips and hidden gems has grown into a full-service travel
              platform helping thousands of adventurers discover new
              destinations every year.
            </p>
            <p className="mb-4">
              Our mission is simple: to inspire and enable people to explore the
              world, experience different cultures, and create memories that
              last a lifetime. We believe that travel has the power to transform
              lives, broaden perspectives, and foster understanding between
              people from all walks of life.
            </p>
            <p>
              Today, our team of experienced travel experts works tirelessly to
              curate exceptional travel experiences tailored to your preferences
              and interests. Whether you're seeking adventure, relaxation,
              cultural immersion, or a bit of everything, we're here to make
              your travel dreams a reality.
            </p>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1522199710521-72d69614c702?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
              alt="Mosaic Ethiopias' Team"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-arizonia text-4xl text-primary text-center mb-12">
            Our Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-card-foreground mb-4">
                Authenticity
              </h3>
              <p className="text-muted-foreground">
                We believe in authentic travel experiences that connect you with
                local cultures, traditions, and people. Our packages are
                designed to go beyond tourist attractions and provide genuine
                insights into each destination.
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-card-foreground mb-4">
                Sustainability
              </h3>
              <p className="text-muted-foreground">
                We are committed to responsible tourism that respects and
                preserves the environment, wildlife, and local communities. We
                partner with eco-friendly accommodations and support
                conservation initiatives worldwide.
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-card-foreground mb-4">
                Excellence
              </h3>
              <p className="text-muted-foreground">
                We strive for excellence in every aspect of your journey. From
                meticulous planning to 24/7 support during your travels, our
                team is dedicated to ensuring your experience exceeds
                expectations at every turn.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Meet the Team Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="font-arizonia text-4xl text-primary text-center mb-12">
          Meet the Team
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Team members remain the same... */}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-arizonia text-4xl mb-6">
            Ready to Start Your Adventure?
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Join thousands of satisfied travelers who have experienced the world
            with Mosaic Ethiopia.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/book"
              className="px-8 py-3 bg-white text-primary font-medium rounded-lg hover:bg-gray-100 transition-colors">
              Book Now
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 border-2 border-white font-medium rounded-lg hover:bg-white/10 transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
