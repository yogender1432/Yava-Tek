
import {
  Paintbrush,
  ShieldCheck,
  Sparkles,
  Leaf,
  Home,
  Palette,
  Award,
  Users,
  Building2,
  ArrowRight,
} from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Sparkles,
      title: "Premium Quality",
      description:
        "High-quality paint solutions designed to deliver beautiful finishes and long-lasting performance.",
    },
    {
      icon: ShieldCheck,
      title: "Long Lasting Protection",
      description:
        "Our products are designed to help protect surfaces while maintaining their finish and appearance.",
    },
    {
      icon: Palette,
      title: "Beautiful Colours",
      description:
        "Explore a wide range of shades and finishes to create spaces that reflect your personality.",
    },
    {
      icon: Leaf,
      title: "Responsible Solutions",
      description:
        "We focus on developing practical paint solutions with attention to quality and responsible formulation.",
    },
  ];

  const products = [
    {
      title: "Interior Paints",
      description:
        "Create elegant and comfortable interiors with beautiful, durable finishes.",
      icon: Home,
    },
    {
      title: "Exterior Paints",
      description:
        "Protect and transform exterior walls with durable weather-resistant finishes.",
      icon: Building2,
    },
    {
      title: "Primers",
      description:
        "Prepare your surfaces for a smoother and stronger paint finish.",
      icon: ShieldCheck,
    },
    {
      title: "Textures",
      description:
        "Add depth, character and a premium decorative look to your walls.",
      icon: Paintbrush,
    },
  ];

  return (
    <div className="bg-white text-gray-800">

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-yellow-400 blur-3xl" />
          <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-blue-400 blur-3xl" />
        </div>

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:px-10 lg:py-28">

          {/* Left */}
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-yellow-400/40 bg-white/10 px-4 py-2 text-sm font-medium text-yellow-300 backdrop-blur">
              <Sparkles size={16} />
              Colours for a Brighter Tomorrow
            </div>

            <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
              Bringing Walls
              <span className="block text-yellow-400">
                To Life
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-blue-100">
              At Yava Paints, we believe every wall is an opportunity to
              express creativity, personality and style. Our goal is to bring
              beautiful colours and dependable protection to every space.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="/products"
                className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-6 py-3 font-semibold text-blue-950 transition hover:bg-yellow-300"
              >
                Explore Products
                <ArrowRight size={18} />
              </a>

              <a
                href="/contact"
                className="rounded-full border border-white/40 px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-blue-950"
              >
                Contact Us
              </a>
            </div>
          </div>

          {/* Right */}
          <div className="relative">
            <div className="overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-3 shadow-2xl backdrop-blur">
              <img
                src="https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=1200&auto=format&fit=crop"
                alt="Paint colours and interior"
                className="h-[420px] w-full rounded-2xl object-cover"
              />
            </div>

            <div className="absolute -bottom-6 -left-5 rounded-2xl bg-white p-5 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-blue-100 p-3 text-blue-800">
                  <Award size={25} />
                </div>

                <div>
                  <p className="text-xl font-bold text-gray-900">
                    YAVA
                  </p>
                  <p className="text-sm text-gray-500">
                    Quality • Colour • Trust
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-2">

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1561214115-f2f134cc4912?q=80&w=1200&auto=format&fit=crop"
              alt="Modern colourful interior"
              className="h-[480px] w-full rounded-3xl object-cover shadow-xl"
            />

            <div className="absolute -bottom-7 -right-6 rounded-2xl bg-blue-950 px-7 py-5 text-white shadow-xl">
              <p className="text-3xl font-bold text-yellow-400">
                YAVA
              </p>
              <p className="text-sm text-blue-100">
                Paints Private Limited
              </p>
            </div>
          </div>

          <div>
            <p className="font-semibold uppercase tracking-[0.25em] text-blue-700">
              About Yava Paints
            </p>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
              We turn ordinary spaces into
              <span className="text-blue-700"> beautiful experiences.</span>
            </h2>

            <p className="mt-6 leading-8 text-gray-600">
              Yava Paints is focused on providing quality paint and surface
              solutions for modern homes, commercial spaces and everyday
              environments.
            </p>

            <p className="mt-4 leading-8 text-gray-600">
              From primers and distempers to interior and exterior emulsions,
              textures and protective solutions, our product range is designed
              to give customers choices for different surfaces, applications
              and styles.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-5">
              <div className="rounded-2xl bg-gray-50 p-5">
                <Palette className="mb-3 text-blue-700" size={28} />
                <h3 className="font-bold text-gray-900">
                  Creative Colours
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Colours designed to transform spaces.
                </p>
              </div>

              <div className="rounded-2xl bg-gray-50 p-5">
                <ShieldCheck className="mb-3 text-blue-700" size={28} />
                <h3 className="font-bold text-gray-900">
                  Surface Protection
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Solutions focused on durability and protection.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================= MISSION / VISION ================= */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10">

          <div className="mx-auto max-w-3xl text-center">
            <p className="font-semibold uppercase tracking-[0.25em] text-blue-700">
              What Drives Us
            </p>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
              Our Mission & Vision
            </h2>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">

            {/* Mission */}
            <div className="rounded-3xl bg-blue-950 p-8 text-white shadow-xl">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400 text-blue-950">
                <Sparkles size={28} />
              </div>

              <h3 className="text-2xl font-bold">
                Our Mission
              </h3>

              <p className="mt-4 leading-8 text-blue-100">
                To provide dependable and attractive paint solutions that help
                customers create spaces they are proud of, while continually
                improving our products and customer experience.
              </p>
            </div>

            {/* Vision */}
            <div className="rounded-3xl bg-white p-8 shadow-xl">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                <Award size={28} />
              </div>

              <h3 className="text-2xl font-bold text-gray-900">
                Our Vision
              </h3>

              <p className="mt-4 leading-8 text-gray-600">
                To build a trusted paint brand known for quality, innovation,
                attractive colours and solutions that bring lasting value to
                homes and businesses.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">

        <div className="mx-auto max-w-3xl text-center">
          <p className="font-semibold uppercase tracking-[0.25em] text-blue-700">
            Why Yava
          </p>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
            Made for Beautiful Spaces
          </h2>

          <p className="mt-4 text-gray-600">
            Combining colour, performance and practical surface solutions.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-3xl border border-gray-100 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 transition group-hover:bg-blue-700 group-hover:text-white">
                  <Icon size={27} />
                </div>

                <h3 className="mt-6 text-xl font-bold text-gray-900">
                  {feature.title}
                </h3>

                <p className="mt-3 leading-7 text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= PRODUCTS ================= */}
      <section className="bg-blue-950">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10">

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="font-semibold uppercase tracking-[0.25em] text-yellow-400">
                Our Solutions
              </p>

              <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                Products for Every Space
              </h2>
            </div>

            <a
              href="/products"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-blue-950 transition hover:bg-yellow-400"
            >
              View All Products
              <ArrowRight size={18} />
            </a>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => {
              const Icon = product.icon;

              return (
                <div
                  key={product.title}
                  className="rounded-3xl border border-white/10 bg-white/10 p-7 backdrop-blur transition hover:bg-white/15"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400 text-blue-950">
                    <Icon size={27} />
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-white">
                    {product.title}
                  </h3>

                  <p className="mt-3 leading-7 text-blue-100">
                    {product.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <div className="grid overflow-hidden rounded-3xl bg-gray-50 sm:grid-cols-2 lg:grid-cols-4">

          <div className="p-8 text-center">
            <Palette className="mx-auto text-blue-700" size={32} />
            <p className="mt-4 text-4xl font-extrabold text-gray-900">
              89+
            </p>
            <p className="mt-2 text-gray-500">
              Product Variants
            </p>
          </div>

          <div className="border-gray-200 p-8 text-center sm:border-l">
            <Users className="mx-auto text-blue-700" size={32} />
            <p className="mt-4 text-4xl font-extrabold text-gray-900">
              100+
            </p>
            <p className="mt-2 text-gray-500">
              Product Options
            </p>
          </div>

          <div className="border-gray-200 p-8 text-center lg:border-l">
            <Building2 className="mx-auto text-blue-700" size={32} />
            <p className="mt-4 text-4xl font-extrabold text-gray-900">
              8+
            </p>
            <p className="mt-2 text-gray-500">
              Product Categories
            </p>
          </div>

          <div className="border-gray-200 p-8 text-center sm:border-l">
            <Award className="mx-auto text-blue-700" size={32} />
            <p className="mt-4 text-4xl font-extrabold text-gray-900">
              YAVA
            </p>
            <p className="mt-2 text-gray-500">
              Quality & Colour
            </p>
          </div>

        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="px-6 pb-20 md:px-10">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-r from-blue-950 to-blue-800 px-8 py-16 text-center shadow-2xl md:px-16">

          <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-yellow-400/20 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-blue-400/20 blur-3xl" />

          <div className="relative">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Ready to Transform Your Space?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-blue-100">
              Discover colours and surface solutions designed to bring your
              walls to life.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="/products"
                className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-7 py-3 font-bold text-blue-950 transition hover:bg-yellow-300"
              >
                Explore Products
                <ArrowRight size={18} />
              </a>

              <a
                href="/contact"
                className="rounded-full border border-white/40 px-7 py-3 font-semibold text-white transition hover:bg-white hover:text-blue-950"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;

