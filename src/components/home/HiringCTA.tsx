import { ArrowRight, Users } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export function HiringCTA() {
  return (
    <Section className="border-y border-white/5">
      <div className="glass overflow-hidden rounded-3xl p-8 md:flex md:items-center md:justify-between md:p-12">
        <div className="max-w-xl">
          <div className="mb-4 inline-flex rounded-xl bg-violet-500/20 p-3">
            <Users className="h-6 w-6 text-violet-400" />
          </div>
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            Join our remote engineering team
          </h2>
          <p className="mt-3 text-zinc-400">
            We&apos;re always looking for talented developers who love AI, clean code, and
            shipping fast. Work with modern stacks and global clients.
          </p>
        </div>
        <div className="mt-8 flex shrink-0 flex-col gap-3 sm:flex-row md:mt-0">
          <Button href="/careers" variant="primary" size="lg">
            View Open Roles
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button href="/contact" variant="outline" size="lg">
            Get in Touch
          </Button>
        </div>
      </div>
    </Section>
  );
}
