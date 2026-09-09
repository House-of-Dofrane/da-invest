"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export interface Gallery4Item {
  id: string;
  title: string;
  description: string;
  href: string;
  /* B07 / §6: no stock photography and no CDN imagery. `image` is optional and,
     when absent, the card renders a labelled placeholder field. */
  image?: string;
  status?: string;
}

/* B08: `items` was typed required despite the component defaulting it, so
   <Gallery4 /> failed typecheck under strict. Optional now. */
export interface Gallery4Props {
  title?: string;
  description?: string;
  items?: Gallery4Item[];
}

const data: Gallery4Item[] = [];

const Gallery4 = ({
  title = "Selected work",
  description = "",
  items = data,
}: Gallery4Props) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!carouselApi) return;
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);

  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="mb-10 flex items-end justify-between md:mb-14">
          <div className="flex flex-col gap-4">
            <h2 className="font-display text-3xl font-normal tracking-tight md:text-4xl lg:text-5xl">
              {title}
            </h2>
            {description ? (
              <p className="max-w-lg text-muted-foreground">{description}</p>
            ) : null}
          </div>
          <div className="hidden shrink-0 gap-2 md:flex">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => carouselApi?.scrollPrev()}
              disabled={!canScrollPrev}
              className="disabled:pointer-events-auto"
              aria-label="Previous"
            >
              <ArrowLeft className="size-5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => carouselApi?.scrollNext()}
              disabled={!canScrollNext}
              className="disabled:pointer-events-auto"
              aria-label="Next"
            >
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full">
        <Carousel
          setApi={setCarouselApi}
          opts={{ breakpoints: { "(max-width: 768px)": { dragFree: true } } }}
        >
          <CarouselContent className="ml-0 pl-6 2xl:ml-[max(2rem,calc(50vw-700px))]">
            {items.map((item) => (
              <CarouselItem
                key={item.id}
                className="max-w-[320px] pl-5 lg:max-w-[380px]"
              >
                <div className="group rounded-sm">
                  <div className="relative h-full min-h-[27rem] max-w-full overflow-hidden rounded-sm border border-border bg-card md:aspect-[5/4] lg:aspect-[16/9]">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="absolute h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,transparent,transparent_9px,var(--border)_9px,var(--border)_10px)]" />
                    )}
                    {/* C16: the supplied overlay used hsl(var(--primary)/α). Under
                        the current token format --primary is a full colour, not an
                        HSL triplet, so that produced an invalid value and no
                        gradient. Rewritten with color-mix. */}
                    <div
                      className="absolute inset-0 h-full"
                      style={{
                        background:
                          "linear-gradient(to bottom, transparent 0%, color-mix(in oklab, var(--da-ink) 55%, transparent) 55%, color-mix(in oklab, var(--da-ink) 94%, transparent) 100%)",
                      }}
                    />
                    <div className="absolute inset-x-0 bottom-0 flex flex-col items-start p-7 md:p-8">
                      {item.status ? (
                        <span className="mb-4 inline-block border border-da-champagne/40 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-da-champagne">
                          {item.status}
                        </span>
                      ) : null}
                      <div className="mb-2 font-display text-xl text-da-ivory">{item.title}</div>
                      <div className="text-sm leading-relaxed text-da-silver">
                        {item.description}
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="mt-8 flex justify-center gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              className={`h-1.5 w-1.5 rounded-full transition-colors ${
                currentSlide === index ? "bg-da-champagne" : "bg-border"
              }`}
              onClick={() => carouselApi?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export { Gallery4 };
