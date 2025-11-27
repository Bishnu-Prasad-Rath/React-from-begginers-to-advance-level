import React from "react";
import { useNavigate } from "react-router-dom";
import ScrollReveal from "../components/scroll-reveal";
import heroImage from "../assets/89781.jpg";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Hero Section */}
      <section
        className="relative w-full h-screen flex flex-col items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 md:px-0 space-y-6">
          <ScrollReveal
            size="2xl"
            align="center"
            variant="accent"
            containerClassName="text-white"
          >
            Welcome to MegaBlog
          </ScrollReveal>

          <ScrollReveal
            size="lg"
            align="center"
            variant="muted"
            containerClassName="text-white"
          >
            Share your thoughts, read blogs from others, and explore amazing
            content!
          </ScrollReveal>

          {/* Call-to-Action Button */}
          <button
            onClick={() => navigate("/addpost")}
            className="mt-4 px-6 py-3 bg-black text-white rounded-lg shadow-lg 
                       hover:bg-black transition-all duration-300 transform 
                       hover:-translate-y-1 hover:scale-105"
          >
            Create Your Blog
          </button>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-white w-full flex flex-col items-center px-4 text-center">
        <ScrollReveal size="xl" variant="primary">
          About MegaBlog
        </ScrollReveal>

        <p className="mt-4 text-gray-700 leading-relaxed text-lg max-w-4xl">
          MegaBlog is a platform for bloggers to create, share, and discover
          blogs. Whether you are a tech enthusiast, lifestyle blogger, or just
          love writing, MegaBlog gives you the space to express yourself and
          connect with readers worldwide.
        </p>

        {/* Features */}
        <div className="mt-10 flex flex-col md:flex-row justify-center gap-6">
          {[
            {
              title: "Write Blogs",
              desc: "Express your ideas and share knowledge with others.",
            },
            {
              title: "Read Blogs",
              desc: "Discover trending blogs and explore different topics.",
            },
            {
              title: "Connect",
              desc: "Engage with other bloggers and build a community.",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-lg 
                         transition-all duration-300 text-center"
            >
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
