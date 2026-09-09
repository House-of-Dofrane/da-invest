import { cn } from "@/lib/utils";
import { IconRulerMeasure, IconContract, IconBuildingEstate } from "@tabler/icons-react";

/* C14: the supplied grid is four columns for eight features. §5 of the
   directive specifies three lanes, so the column count and the border-index
   logic move to three. Reported, not silent. */

export function FeaturesSectionWithHoverEffects() {
  const features = [
    {
      title: "Sourcing",
      description:
        "Off-market first. We work owner lists, county records and direct relationships in a defined footprint rather than bidding into marketed processes.",
      icon: <IconBuildingEstate stroke={1.25} />,
    },
    {
      title: "Underwriting",
      description:
        "One model, one set of assumptions, written down before the offer. If a deal only works on the optimistic case, it does not work.",
      icon: <IconRulerMeasure stroke={1.25} />,
    },
    {
      title: "Execution",
      description:
        "Contract to close on stated terms. Counsel reviews every agreement. We do not renegotiate after diligence to manufacture a discount.",
      icon: <IconContract stroke={1.25} />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 relative z-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col md:border-r border-border py-10 relative group/feature",
        index === 0 && "md:border-l",
      )}
    >
      <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-card to-transparent pointer-events-none" />
      <div className="mb-5 relative z-10 px-10 text-muted-foreground">{icon}</div>
      <div className="text-lg font-medium mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-10 w-0.5 rounded-tr-full rounded-br-full bg-border group-hover/feature:bg-da-oxblood transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-foreground">
          {title}
        </span>
      </div>
      <p className="text-sm text-muted-foreground max-w-xs relative z-10 px-10 leading-relaxed">
        {description}
      </p>
    </div>
  );
};
