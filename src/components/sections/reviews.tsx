import { StarIcon } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { ReviewsCarousel } from "@/components/sections/reviews-carousel";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { Dictionary } from "@/i18n/get-dictionary";
import { interpolate } from "@/i18n/format";

const hasCjk = (text: string) => /[一-鿿]/.test(text);

export function ReviewsSection({ dict }: { dict: Dictionary }) {
  const { reviews, a11y } = dict;

  return (
    <section id="reviews" className="overflow-hidden bg-muted py-16 md:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <ReviewsCarousel
          count={reviews.items.length}
          labels={{
            region: reviews.title,
            previous: a11y.previousReviews,
            next: a11y.nextReviews,
          }}
          heading={
            <div className="space-y-2">
              <Reveal
                as="h2"
                className="text-3xl leading-tight font-extrabold text-primary md:text-4xl"
              >
                {reviews.title}
              </Reveal>
              <Reveal
                as="p"
                delay={0.05}
                className="text-base leading-relaxed text-muted-foreground"
              >
                {reviews.subtitle}
              </Reveal>
            </div>
          }
        >
          {reviews.items.map((review, i) => (
            <Reveal
              as="li"
              key={review.name}
              delay={Math.min(i, 3) * 0.08}
              className="flex"
            >
              <Card className="clay-card w-full gap-5 rounded-3xl ring-0 [--card-spacing:--spacing(6)]">
                <CardContent className="space-y-4">
                  <div
                    role="img"
                    aria-label={interpolate(a11y.rating, {
                      rating: reviews.rating,
                    })}
                    className="flex items-center gap-1"
                  >
                    {Array.from({ length: 5 }, (_, s) => (
                      <StarIcon
                        key={s}
                        aria-hidden="true"
                        className="size-5 fill-secondary-300 text-secondary-500"
                      />
                    ))}
                    <span className="ml-2 text-sm font-extrabold text-primary tabular-nums">
                      {reviews.rating}
                    </span>
                  </div>

                  <div className="space-y-3 text-base leading-relaxed text-primary/90">
                    {review.comments.map((comment) => (
                      <p
                        key={comment}
                        lang={hasCjk(comment) ? "zh-Hans" : "en"}
                      >
                        {comment}
                      </p>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="mt-auto justify-between gap-3 border-t-0 bg-transparent px-(--card-spacing) pt-0">
                  <p className="font-extrabold text-primary">{review.name}</p>
                  <Badge className="h-7 bg-accent px-3 text-sm font-bold text-accent-foreground">
                    {review.grade}
                  </Badge>
                </CardFooter>
              </Card>
            </Reveal>
          ))}
        </ReviewsCarousel>
      </div>
    </section>
  );
}
