import { Fragment } from "react";

// Endless horizontal ticker. The list is rendered twice so the -50% loop is seamless.
export function Marquee({ items }: { items: string[] }) {
  const row = (ariaHidden: boolean) => (
    <div className="marquee-track items-center" aria-hidden={ariaHidden || undefined}>
      {items.map((item, i) => (
        <Fragment key={`${item}-${i}`}>
          <span className="shrink-0 whitespace-nowrap text-3xl font-light tracking-tight md:text-5xl">{item}</span>
          <span className="mx-10 h-2.5 w-2.5 shrink-0 rounded-full bg-foreground" aria-hidden="true" />
        </Fragment>
      ))}
    </div>
  );

  return (
    <div className="marquee overflow-hidden py-10">
      <div className="marquee-group flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
