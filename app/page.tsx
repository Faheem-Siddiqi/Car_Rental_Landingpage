"use client";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Car,
  ChevronDown,
  Clock,
  MapPin,
  Plane,
  ShieldCheck,
  Star,
  Users,
  Wallet,
} from "lucide-react";
import { Header } from "@/components/header";
import { FleetInquiryModal } from "@/components/fleet-inquiry-modal";
import { ScrollExperience } from "@/components/scroll-experience";
import fleetData from "@/data/fleet.json";
import faqData from "@/data/faqs.json";
import routesData from "@/data/routes.json";
const moveGlow = (event: React.PointerEvent<HTMLElement>) => {
  const bounds = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--glow-x", `${event.clientX - bounds.left}px`);
  event.currentTarget.style.setProperty("--glow-y", `${event.clientY - bounds.top}px`);
};
const wa = "https://wa.me/923075011252";
const routeWhatsAppUrl = (route: (typeof routesData.routes)[number]) => {
  const message = [
    "Hello Moveit Cars!",
    "",
    "*ROUTE INQUIRY*",
    "",
    `*${route.from} to ${route.to}*`,
    `• Estimated duration: ${route.duration}`,
    `• Distance: ${route.distanceKm.toLocaleString("en-PK")} km`,
    `• Starting price: Rs. ${route.startingPrice.toLocaleString("en-PK")}`,
    "",
    "Please confirm availability and share the final quote. Thank you!",
  ].join("\n");
  return `${wa}?text=${encodeURIComponent(message)}`;
};
const dynamicFleet = fleetData.categories.flatMap((category) =>
  category.vehicles.map((vehicle) => ({ ...vehicle, category: category.name })),
);
const featuredVehicle = fleetData.featuredVehicle;
const fleetCategories = [
  "All",
  ...fleetData.categories.map((category) => category.name),
];
const fleetWhatsAppUrl = (vehicle: (typeof dynamicFleet)[number]) => {
  const message = [
    "Hello Moveit Cars, I would like to book this vehicle:",
    `Car: ${vehicle.name}`,
    `Category: ${vehicle.category}`,
    `Starting price: Rs. ${vehicle.pricePerDay.toLocaleString("en-PK")}/day`,
    `Passengers: ${vehicle.passengers}`,
    `Details: ${vehicle.description}`,
    "Please confirm availability and the final quote.",
  ].join("\n");
  return `${wa}?text=${encodeURIComponent(message)}`;
};
const fleetFromJson = dynamicFleet.map(
  (vehicle) =>
    [
      vehicle.category,
      vehicle.name,
      vehicle.description,
      vehicle.pricePerDay.toLocaleString("en-PK"),
      vehicle.image,
      fleetWhatsAppUrl(vehicle),
      vehicle.passengers,
      vehicle,
    ] as const,
);
const services = [
  [
    "Airport Transfers",
    "On-time pickup from BBIAP, Allama Iqbal & Jinnah airports with live flight tracking.",
    Plane,
  ],
  [
    "Corporate Travel",
    "Premium corporate transport for meetings, conferences & executive events.",
    Users,
  ],
  [
    "Weddings & Events",
    "Elegant, timely transport for Shaadi events and large gatherings.",
    Star,
  ],
  [
    "Tours & Trips",
    "Explore Murree, Swat, Naran & beyond with a dedicated driver.",
    MapPin,
  ],
  [
    "School Transport",
    "Safe, verified transport for school outings and daily student runs.",
    ShieldCheck,
  ],
  [
    "Intercity Travel",
    "Comfortable intercity travel: Islamabad, Lahore, Karachi & more.",
    Car,
  ],
  [
    "Monthly Rental",
    "Flexible monthly car rental packages for individuals & businesses.",
    Wallet,
  ],
  [
    "Full-Day Hire",
    "Dedicated car & driver hire for the full day — flexible & convenient.",
    Clock,
  ],
] as const;
const faqs = faqData.faqs;
const testimonials = [
  {
    quote:
      "Moveit Cars dropped me to Islamabad Airport at 4 AM and the driver was already waiting outside my door. Punctual, polite, and the car was spotless.",
    name: "Ahmed R.",
    role: "Business Traveler, Islamabad",
    initials: "AR",
  },
  {
    quote:
      "We hired a coaster for my brother’s Walima function. 25 guests, on time, zero stress. The driver was professional and courteous throughout.",
    name: "Fatima S.",
    role: "Event Host, Lahore",
    initials: "FS",
  },
  {
    quote:
      "Used Moveit Cars for our company’s monthly executive transport. Clean vehicles, reliable drivers, and best of all — they are always on time.",
    name: "Usman T.",
    role: "Corporate Manager, Rawalpindi",
    initials: "UT",
  },
  {
    quote:
      "Booked an Islamabad–Lahore trip at short notice. Got a clean Corolla, polite driver, and we reached on time. Price was transparent and reasonable.",
    name: "Sara M.",
    role: "Family Traveler, Islamabad",
    initials: "SM",
  },
  {
    quote:
      "Arranged a Murree trip for our university group of 20. The Hi-Ace was comfortable, the driver knew the mountain roads well. A+ service!",
    name: "Bilal K.",
    role: "University Student, Islamabad",
    initials: "BK",
  },
];
function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-2 text-sm font-semibold text-neutral-500">
      <span className="h-px w-6 bg-current" />
      {children}
    </span>
  );
}
function Stat({
  n,
  t,
  dark = false,
}: {
  n: string;
  t: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`flex flex-col justify-between rounded-2xl p-6 ${dark ? "mouse-glow bg-black text-white" : "bg-neutral-100"}`}
      onPointerMove={dark ? moveGlow : undefined}
    >
      <b className="text-5xl tracking-[-.06em]">{n}</b>
      <p
        className={`mt-3 text-sm ${dark ? "text-neutral-300" : "text-neutral-600"}`}
      >
        {t}
      </p>
    </div>
  );
}
export default function Home() {
  const [filter, setFilter] = useState("All"),
    [faq, setFaq] = useState(0),
    [selectedVehicle, setSelectedVehicle] = useState<
      (typeof dynamicFleet)[number] | null
    >(null);
  return (
    <>
      <Header />
      <ScrollExperience />
      <main className="scroll-stage">
        <section id="home" className="bg-white pb-16 pt-28 sm:pt-36">
          <div className="shell">
            <Label>
              Islamabad&apos;s #1 Rated Car Rental{" "}
              <span className="hidden items-center gap-1 sm:flex">
                <Star className="h-4 w-4 fill-black" />
                4.9 · 2,400+ trips
              </span>
            </Label>
            <h1 className="mt-6 max-w-4xl text-[clamp(2.75rem,7vw,5.5rem)] font-extrabold leading-[.98] tracking-[-.04em]">
              Premium rent a car across{" "}
              <span className="inline-block rounded-xl bg-black px-3 py-0.5 align-middle text-white">
                Pakistan
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-600">
              Police-verified drivers. Zero hidden costs. Airport transfers,
              corporate travel & intercity trips — available 24/7, wherever you
              need to be.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="btn-dark group" href={wa}>
                Book instantly on WhatsApp{" "}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </a>
              <a className="btn-light" href="#fleet">
                View the fleet
              </a>
            </div>
            <div className="mt-14 grid gap-4 sm:grid-cols-12">
              <div className="relative col-span-12 overflow-hidden rounded-2xl sm:col-span-8">
                <img
                  src={featuredVehicle.image}
                  alt={`${featuredVehicle.name} for rent`}
                  className="aspect-[16/10] h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-white">
                  <div>
                    <small className="font-semibold uppercase tracking-wider">
                      Featured
                    </small>
                      <p className="text-2xl font-bold">
                        {featuredVehicle.name}
                      </p>
                  </div>
                  <div className="text-right">
                    <small>from</small>
                    <p className="text-2xl font-bold">
                        Rs. {featuredVehicle.pricePerDay.toLocaleString("en-PK")}
                      <span className="text-sm font-normal">/day</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-span-12 grid grid-cols-2 gap-4 sm:col-span-4 sm:grid-cols-1">
                <Stat
                  n="98%"
                  t="of customers rate us 5 stars for reliability & service."
                />
                <Stat
                  dark
                  n="2M+"
                  t="safe kilometres traveled across Pakistan."
                />
              </div>
            </div>
          </div>
        </section>
        <Ticker />
        <About />
        <Services />
        <section id="fleet" className="section bg-white">
          <div className="shell">
            <Label>The Fleet</Label>
            <div className="mt-5 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <h2 className="title max-w-2xl">
                Travel in comfort with our modern, well-maintained fleet.
              </h2>
              <div className="flex flex-wrap gap-2">
                {fleetCategories.map((x) => (
                  <button
                    onClick={() => setFilter(x)}
                    className={`rounded-full px-4 py-2 text-xs font-semibold ${filter === x ? "bg-black text-white" : "border hover:bg-neutral-50"}`}
                    key={x}
                  >
                    {x}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {fleetFromJson
                .filter((x) => filter === "All" || x[0] === filter)
                .map((x) => (
                  <article
                    className="group cursor-pointer overflow-hidden rounded-2xl border bg-white transition hover:shadow-xl"
                    key={x[1]}
                    role="button"
                    tabIndex={0}
                    aria-label={`View rental inquiry for ${x[1]}`}
                    onClick={() => setSelectedVehicle(x[7])}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        setSelectedVehicle(x[7]);
                      }
                    }}
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-neutral-100">
                      <img
                        src={x[4]}
                        alt={x[1]}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex justify-between">
                        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                          {x[0]}
                        </span>
                        <span className="flex items-center gap-1 text-xs">
                          <Users className="h-3 w-3" />
                          {x[6]}
                        </span>
                      </div>
                      <h3 className="mt-3 text-xl font-bold">{x[1]}</h3>
                      <p className="mt-2 min-h-10 text-sm text-neutral-600">
                        {x[2]}
                      </p>
                      <div className="mt-5 flex items-end justify-between">
                        <span className="text-xs text-neutral-500">
                          Starting from
                          <br />
                          <b className="text-xl text-black">Rs. {x[3]}</b>/day
                        </span>
                        <button
                          type="button"
                          aria-label={`Inquire about ${x[1]}`}
                          className="grid h-10 w-10 place-items-center rounded-full bg-black text-white"
                        >
                          <ArrowUpRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
            </div>
          </div>
        </section>
        <Steps />
        <Testimonials />
        <Routes />
        <section id="faq" className="section bg-white">
          <div className="shell grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <Label>FAQ</Label>
              <h2 className="title mt-6">Common questions, answered.</h2>
            </div>
            <div>
              {faqs.map((item, i) => (
                <div className="border-b" key={item.id}>
                  <button
                    onClick={() => setFaq(faq === i ? -1 : i)}
                    className="flex w-full items-center justify-between py-6 text-left font-semibold"
                  >
                    {item.question}
                    <ChevronDown
                      className={`h-5 w-5 transition ${faq === i ? "rotate-180" : ""}`}
                    />
                  </button>
                  {faq === i && (
                    <p className="pb-6 pr-10 text-sm leading-relaxed text-neutral-600">
                      {item.answer}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
        <Contact />
      </main>
      <Footer />
      {selectedVehicle && (
        <FleetInquiryModal
          vehicle={selectedVehicle}
          onClose={() => setSelectedVehicle(null)}
        />
      )}
    </>
  );
}
function Ticker() {
  const a = [
    ["/icons/marquee/shield-check.svg", "Police-verified drivers"],
    ["/icons/marquee/clock.svg", "24/7 availability"],
    ["/icons/marquee/star.svg", "98% 5-star rated"],
    ["/icons/marquee/map-pin.svg", "Pan-Pakistan coverage"],
    ["/icons/marquee/wallet.svg", "Zero hidden costs"],
    ["/icons/marquee/car.svg", "Modern, serviced fleet"],
  ];
  return (
    <div
      className="mouse-glow overflow-hidden border-y border-neutral-200 bg-black py-4 text-white"
      onPointerMove={moveGlow}
    >
      <div className="animate-marquee flex w-max gap-12">
        {[...a, ...a].map(([icon, text], i) => (
          <span
            className="flex items-center gap-2.5 whitespace-nowrap text-sm"
            key={i}
          >
            <img src={icon} alt="" aria-hidden="true" className="h-4 w-4" />
            {text}
            <i className="ml-12 text-neutral-600">/</i>
          </span>
        ))}
      </div>
    </div>
  );
}
function About() {
  return (
    <section id="about" className="section">
      <div className="shell grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
        <div className="relative">
          <img
            src="/images/about/professional-driver.jpg"
            alt="Professional driver"
            className="aspect-[4/5] w-full rounded-2xl object-cover"
          />
          <div className="absolute -bottom-5 right-0 rounded-2xl bg-black p-5 text-white sm:-right-8">
            <b className="text-4xl">10+</b>
            <p className="text-xs text-neutral-400">years on the road</p>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <Label>About Moveit Cars</Label>
          <h2 className="title mt-6">
            Dependable, comfortable & safe transport — built on an obsession
            with punctuality.
          </h2>
          <p className="copy">
            With professional drivers, a modern fleet, and an obsession with
            punctuality, we guarantee every journey is smooth, reliable &
            stress-free — trusted by Pakistanis nationwide.
          </p>
          <div className="mt-10 grid overflow-hidden rounded-2xl border sm:grid-cols-3">
            {[
              ["Verified drivers", "Licensed & police-checked", ShieldCheck],
              ["24/7 availability", "Anytime, anywhere", Clock],
              ["Pan-Pakistan", "Islamabad to Karachi", MapPin],
            ].map(([a, b, I]: any) => (
              <div
                className="border-b p-5 last:border-0 sm:border-b-0 sm:border-r"
                key={a}
              >
                <I className="h-5 w-5" />
                <b className="mt-3 block text-sm">{a}</b>
                <small className="text-neutral-500">{b}</small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
function Services() {
  return (
    <section id="services" className="section bg-neutral-50">
      <div className="shell">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <Label>Your journey. Our responsibility.</Label>
            <h2 className="title mt-6">
              The right transport, whenever you need it.
            </h2>
          </div>
          <p className="max-w-xs text-sm text-neutral-600">
            Reliable, safe and comfortable transport for families, groups, and
            businesses across Pakistan.
          </p>
        </div>
        <div className="mt-12 grid overflow-hidden rounded-2xl border sm:grid-cols-2 lg:grid-cols-4">
          {services.map(([n, d, I], i) => (
            <a
              href={wa}
              className="flex min-h-52 flex-col justify-between border-b border-r bg-white p-6 hover:bg-neutral-50"
              key={n}
            >
              <div className="flex justify-between">
                <I className="h-6 w-6" />
                <span className="text-2xl font-bold text-neutral-300">
                  0{i + 1}
                </span>
              </div>
              <div>
                <h3 className="font-bold">{n}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  {d}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
function Steps() {
  return (
    <section
      className="mouse-glow section bg-black text-white"
      onPointerMove={moveGlow}
    >
      <div className="shell">
        <Label>How booking works</Label>
        <h2 className="premium-dark-heading title mt-6">
          Book your car in three easy steps.
        </h2>
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-neutral-700 md:grid-cols-3">
          {[
            [
              "Share your details",
              "Enter your pickup, destination, date & number of passengers.",
            ],
            [
              "Get an instant quote",
              "We instantly match you with a verified, professional driver near you.",
            ],
            [
              "Confirm & ride",
              "Confirm via call or WhatsApp — your driver arrives on time, guaranteed.",
            ],
          ].map((x, i) => (
            <div className="bg-neutral-950 p-7" key={x[0]}>
              <span className="text-5xl font-bold text-neutral-700">
                0{i + 1}
              </span>
              <h3 className="mt-16 text-xl font-bold">{x[0]}</h3>
              <p className="mt-3 text-sm text-neutral-400">{x[1]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
function Testimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const testimonial = testimonials[active];
  const move = (direction: number) =>
    setActive(
      (current) =>
        (current + direction + testimonials.length) % testimonials.length,
    );

  useEffect(() => {
    if (paused) return;
    const timer = window.setTimeout(
      () => setActive((current) => (current + 1) % testimonials.length),
      3500,
    );
    return () => window.clearTimeout(timer);
  }, [active, paused]);

  return (
    <section
      className="section bg-white"
      aria-labelledby="testimonials-title"
    >
      <div className="shell grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
        <div className="flex flex-col justify-between">
          <div>
            <Label>Testimonials</Label>
            <h2 id="testimonials-title" className="title mt-6">
              Thousands of Pakistanis trust Moveit Cars every day.
            </h2>
          </div>
          <div
            className="mt-8 flex items-center gap-3"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
          >
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={() => move(-1)}
              className="grid h-11 w-11 place-items-center rounded-full border border-neutral-300 transition hover:bg-neutral-50"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={() => move(1)}
              className="grid h-11 w-11 place-items-center rounded-full border border-neutral-300 transition hover:bg-neutral-50"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
            <span className="ml-2 text-sm text-neutral-500">
              {String(active + 1).padStart(2, "0")} /{" "}
              {String(testimonials.length).padStart(2, "0")}
            </span>
          </div>
        </div>
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-8 sm:p-12">
            <div className="flex gap-1" aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className="h-4 w-4 fill-black text-black" />
              ))}
            </div>
            <blockquote className="mt-6 text-balance text-2xl leading-snug tracking-tight sm:text-3xl">
              “{testimonial.quote}”
            </blockquote>
            <div className="mt-8 flex items-center gap-4 border-t border-neutral-200 pt-6">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-black text-sm text-white">
                {testimonial.initials}
              </span>
              <div>
                <p>{testimonial.name}</p>
                <p className="text-sm text-neutral-500">{testimonial.role}</p>
              </div>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            {testimonials.map((item, index) => (
              <button
                type="button"
                key={item.name}
                aria-label={`Go to testimonial ${index + 1}`}
                onClick={() => setActive(index)}
                className={`h-1 rounded-full transition-all ${active === index ? "w-10 bg-black" : "w-5 bg-neutral-200 hover:bg-neutral-300"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
function Routes() {
  return (
    <section id="routes" className="section bg-neutral-50">
      <div className="shell">
        <Label>Popular routes</Label>
        <h2 className="title mt-6">Our most popular Pakistani routes.</h2>
        <div className="mt-10 divide-y border-y">
          {routesData.routes.map((route) => [
            route.from,
            route.to,
            route.duration,
            `${route.distanceKm.toLocaleString("en-PK")} km`,
            route.startingPrice.toLocaleString("en-PK"),
            routeWhatsAppUrl(route),
            route.id,
          ]).map((r, i) => (
            <a
              href={r[5]}
              target="_blank"
              rel="noreferrer"
              aria-label={`Inquire about travel from ${r[0]} to ${r[1]} on WhatsApp`}
              className="grid items-center gap-4 py-5 sm:grid-cols-[50px_1fr_auto_auto]"
              key={r[6]}
            >
              <span className="text-neutral-400">0{i + 1}</span>
              <b className="text-lg sm:text-xl">
                {r[0]} <span className="mx-3 text-neutral-300">→</span> {r[1]}
              </b>
              <span className="text-sm text-neutral-500">
                {r[2]} · {r[3]}
              </span>
              <span className="text-sm">
                from <b>Rs. {r[4]}</b>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
function Contact() {
  return (
    <section
      className="mouse-glow bg-black py-20 text-center text-white"
      onPointerMove={moveGlow}
    >
      <div className="shell">
        <span className="text-sm text-neutral-400">
          Available 24/7 across Pakistan
        </span>
        <h2 className="premium-dark-heading mx-auto mt-5 max-w-3xl text-4xl font-bold tracking-[-.05em] sm:text-6xl">
          Ready to travel? Let&apos;s get you there.
        </h2>
        <p className="mt-5 text-neutral-400">
          Instant booking. Verified drivers. No hidden fees.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            className="rounded-full bg-white px-7 py-4 text-sm font-semibold text-black"
            href={wa}
          >
            WhatsApp
          </a>
          <a
            className="rounded-full border border-neutral-700 px-7 py-4 text-sm font-semibold"
            href="tel:+923075011252"
            aria-label="Call Moveit Cars"
          >
            Call now
          </a>
        </div>
      </div>
    </section>
  );
}
function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-neutral-800 bg-black py-12 text-white">
      <img
        src="/images/footerOverlay.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 left-5 w-auto max-w-none -scale-x-100 object-cover object-center opacity-[.12] grayscale"
      />
      <div className="relative z-10 shell">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.1fr_.7fr_.8fr_1.4fr]">
          <div>
            <b className="flex gap-2 text-lg">
              <Car />
              Moveit Cars
            </b>
            <p className="mt-4 max-w-xs text-sm text-neutral-400">
              Your next journey starts here — fast, safe & comfortable.
            </p>
          </div>
          <div>
            <b>Navigate</b>
            <div className="mt-4 grid gap-2 text-sm text-neutral-400">
              {["About", "Services", "Fleet", "Routes", "FAQ"].map((x) => (
                <a
                  className="footer-link hover:text-white"
                  href={`#${x.toLowerCase()}`}
                  key={x}
                >
                  {x}
                </a>
              ))}
            </div>
          </div>
          <div>
            <b>Contact</b>
            <div className="mt-4 grid gap-2 text-sm text-neutral-400">
              <a
                className="footer-link hover:text-white"
                href="tel:+923075011252"
                aria-label="Call Moveit Cars"
              >
                Call now
              </a>
              <a
                className="footer-link hover:text-white"
                href={wa}
                aria-label="Contact Moveit Cars on WhatsApp"
              >
                WhatsApp
              </a>
              <a
                className="footer-link hover:text-white"
                href="mailto:Sales@moveitcars.com"
              >
                Sales@moveitcars.com
              </a>
            </div>
          </div>
          <div>
            <b>Find us</b>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Office+29+Executive+Complex+G-8+Markaz+Islamabad"
              target="_blank"
              rel="noreferrer"
              className="mt-4 block overflow-hidden rounded-2xl border border-white/10 bg-neutral-900"
            >
              <iframe
                title="Moveit Cars office in G-8 Markaz Islamabad"
                src="https://www.google.com/maps?q=Office%2029%2C%20Executive%20Complex%2C%20G-8%20Markaz%2C%20Islamabad&output=embed"
                className="h-44 w-full border-0 opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <span className="block px-4 py-3 text-xs leading-relaxed text-neutral-400">
                <span className="footer-link inline-block">
                  Office 29, 1st Floor Executive Complex, G-8 Markaz, Islamabad
                  44000
                </span>
              </span>
            </a>
          </div>
        </div>
        <div className="mt-10 border-t border-neutral-800 pt-6 text-xs text-neutral-500">
          © 2026 Moveit Cars. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
