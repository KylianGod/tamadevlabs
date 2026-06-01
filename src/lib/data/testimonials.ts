export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "TamadevLabs shipped our AI support MVP in weeks, not months. Their technical depth and communication made them feel like an extension of our team.",
    author: "Sarah Chen",
    role: "Co founder & CTO",
    company: "Flowbase",
  },
  {
    quote:
      "We needed senior full stack engineers who could own features end to end. TamadevLabs delivered exactly that: clean code, fast iterations, zero drama.",
    author: "Marcus Rivera",
    role: "VP Engineering",
    company: "Cartify",
  },
  {
    quote:
      "From architecture to launch, they helped us build a SaaS platform our customers actually love. Booking a discovery call was the best decision we made.",
    author: "Elena Okonkwo",
    role: "Founder & CEO",
    company: "MedPulse Analytics",
  },
];
