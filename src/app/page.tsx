import { Component as HorizonHero } from "@/components/ui/horizon-hero-section";
import { FeaturesSectionWithHoverEffects } from "@/components/ui/feature-section-with-hover-effects";
import { Gallery4, type Gallery4Item } from "@/components/ui/gallery4";
import { Footer } from "@/components/ui/footer-section";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";

/* Decision D5 is the Chairman's: which deals may be named publicly. Until he
   answers, these are labelled placeholders. Directive §6 — no stock photography
   standing in for real assets, no fabricated track record. Nothing here claims
   to be a completed transaction. */
const portfolio: Gallery4Item[] = [
  {
    id: "placeholder-1",
    title: "Awaiting release approval",
    description:
      "Asset one. Naming, figures and imagery are held until the principal clears them for publication.",
    href: "#contact",
    status: "Placeholder",
  },
  {
    id: "placeholder-2",
    title: "Awaiting release approval",
    description:
      "Asset two. This card is a structural placeholder, not a transaction. It carries no numbers because none have been cleared.",
    href: "#contact",
    status: "Placeholder",
  },
  {
    id: "placeholder-3",
    title: "Awaiting release approval",
    description:
      "Asset three. Case studies appear here once counsel and the principal sign off on what may be published.",
    href: "#contact",
    status: "Placeholder",
  },
];

export default function Home() {
  return (
    <main className="relative bg-background text-foreground">
      {/* Nav */}
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 md:px-10">
        <a
          href="#top"
          className="font-display text-base tracking-tight text-da-ivory mix-blend-difference"
        >
          Dofrane Acquisitions
        </a>
        <ThemeSwitcher />
      </header>

      <div id="top" />
      <HorizonHero />

      {/* Statement band — 0.55 screens, per the rhythm law in PATTERNS.md */}
      <section className="relative z-10 bg-background px-6 py-[104px] md:py-[104px]">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-8 text-[13px] uppercase tracking-[0.22em] text-muted-foreground">
            The firm
          </p>
          <p className="font-display text-[clamp(1.875rem,3.6vw,2.75rem)] leading-[1.2] tracking-[-0.02em] text-balance">
            We buy commercial real estate we intend to hold, in markets we can
            drive to.
          </p>
        </div>
      </section>

      {/* Content band — positioning, three lanes */}
      <section id="positioning" className="relative z-10 bg-background px-6 pb-[104px]">
        <div className="mx-auto mb-14 max-w-3xl">
          <p className="text-lg leading-relaxed text-muted-foreground">
            Three things decide whether a deal works, and none of them is the
            purchase price on its own. This is where we spend our time.
          </p>
        </div>
        <FeaturesSectionWithHoverEffects />
      </section>

      {/* Portfolio */}
      <section id="work" className="relative z-10 bg-background">
        <Gallery4
          title="Selected work"
          description="Transactions are published only once the principal and counsel have cleared what may be named. The cards below are placeholders and describe no completed deal."
          items={portfolio}
        />
      </section>

      {/* Statement band */}
      <section className="relative z-10 bg-background px-6 py-[104px]">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-8 text-[13px] uppercase tracking-[0.22em] text-muted-foreground">
            Approach
          </p>
          <p className="font-display text-[clamp(1.875rem,3.6vw,2.75rem)] leading-[1.2] tracking-[-0.02em] text-balance">
            A deal that only works on the optimistic case does not work.
          </p>
        </div>
      </section>

      {/* Content band — approach, prose not bullets */}
      <section id="approach" className="relative z-10 bg-background px-6 pb-[168px]">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          <div>
            <h2 className="font-display text-[clamp(1.5rem,2.6vw,2.125rem)] leading-tight tracking-[-0.02em]">
              How we underwrite
            </h2>
          </div>
          <div className="max-w-[68ch] space-y-6 text-[17px] leading-[1.65] text-muted-foreground">
            <p>
              Assumptions are written down before an offer goes out, not after.
              Rent growth, vacancy, capital expenditure and exit are stated as
              numbers with a source, and the source is named. When a figure is a
              judgement rather than a comparable, it is marked as one.
            </p>
            <p>
              We underwrite to the case we expect, then test whether the deal
              survives the case we would rather not think about. If it only
              clears on the optimistic run, we pass. Most deals we look at, we
              pass on. That is the job working correctly, not the pipeline
              failing.
            </p>
            <p>
              Counsel reviews every agreement before signature. We close on the
              terms we contracted, and we do not reopen price after diligence to
              manufacture a discount. A reputation for closing on stated terms is
              worth more over a decade than any single retrade.
            </p>
            <p className="text-foreground">
              The return is not made at closing. It is made every month
              afterward, in operations, and that is where the model is proved
              right or wrong.
            </p>
          </div>
        </div>
      </section>

      {/* Contact — one clear action */}
      <section
        id="contact"
        className="relative z-10 border-y border-border bg-card px-6 py-[104px]"
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-8 text-[13px] uppercase tracking-[0.22em] text-muted-foreground">
            Contact
          </p>
          <h2 className="font-display text-[clamp(1.875rem,3.6vw,2.75rem)] leading-[1.2] tracking-[-0.02em] text-balance">
            If you own commercial property in Maryland, or you allocate to people
            who buy it, start here.
          </h2>
          <p className="mx-auto mt-7 max-w-xl text-[17px] leading-relaxed text-muted-foreground">
            We reply to everything, including a no.
          </p>

          {/* Open item: this surface has no inbox yet — the domain carries no MX
              record and the existing intake RPC belongs to the seller site and
              its schema. Marked rather than faked. */}
          <div className="mx-auto mt-10 inline-flex flex-col items-center gap-3">
            <span className="inline-block border border-da-champagne/40 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-da-champagne">
              Placeholder — contact route pending
            </span>
            <p className="max-w-md text-sm text-muted-foreground">
              No address is published here yet. The destination inbox is an open
              item; publishing one before it exists would send enquiries nowhere.
            </p>
          </div>
        </div>
      </section>

      <div className="relative z-10 bg-background">
        <Footer />
      </div>
    </main>
  );
}
