"use client";
import React from "react";
import type { ComponentProps, ReactNode } from "react";
/* B09: `motion/react` is the `motion` package, not framer-motion. Pinned. */
import { motion, useReducedMotion } from "motion/react";

interface FooterLink {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface FooterSection {
  label: string;
  links: FooterLink[];
}

/* Placeholder links removed. These are the routes this surface actually has or
   will have; the supplied Product/Pricing/Testimonials set does not apply. */
const footerLinks: FooterSection[] = [
  {
    label: "Firm",
    links: [
      { title: "Approach", href: "#approach" },
      { title: "Criteria", href: "#positioning" },
      { title: "Contact", href: "#contact" },
    ],
  },
  {
    label: "Selling a property",
    links: [{ title: "Dofrane Acquisitions for sellers", href: "https://dofraneacquisitions.com" }],
  },
  {
    label: "Legal",
    links: [
      { title: "Privacy", href: "#" },
      { title: "Terms", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative w-full max-w-7xl mx-auto flex flex-col items-center justify-center border-t border-border px-6 py-14 lg:py-16">
      <div className="grid w-full gap-10 xl:grid-cols-3 xl:gap-8">
        <AnimatedContainer className="space-y-4">
          {/* The mark is an open line item owned by Dofrane and Alara. This is a
              typographic holding mark, never presented as the identity. */}
          <div className="font-display text-2xl tracking-tight text-foreground">
            Dofrane Acquisitions
          </div>
          <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
            Commercial real estate acquisition and asset management. Maryland and the
            Mid-Atlantic.
          </p>
          <p className="text-muted-foreground/70 text-xs">
            © {new Date().getFullYear()} Dofrane Acquisitions. All rights reserved.
          </p>
        </AnimatedContainer>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 xl:col-span-2">
          {footerLinks.map((section, index) => (
            <AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
              <div className="mb-10 md:mb-0">
                <h3 className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  {section.label}
                </h3>
                <ul className="mt-4 space-y-2 text-sm">
                  {section.links.map((link) => (
                    <li key={link.title}>
                      <a
                        href={link.href}
                        className="text-foreground/80 hover:text-foreground inline-flex items-center transition-colors duration-300"
                      >
                        {link.icon && <link.icon className="me-1 size-4" />}
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedContainer>
          ))}
        </div>
      </div>
    </footer>
  );
}

type ViewAnimationProps = {
  delay?: number;
  className?: ComponentProps<typeof motion.div>["className"];
  children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }}
      whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
