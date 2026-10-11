type ServiceCardProps = {
  title: string;
  tags: readonly string[];
  dark: boolean;
};

// Light cards turn black on hover. The "More" bubble is drawn by ServicesGrid.
export function ServiceCard({ title, tags, dark }: ServiceCardProps) {
  return (
    <div
      className={`group relative flex h-full min-h-[360px] flex-col justify-between gap-16 overflow-hidden p-10 transition-colors duration-500 md:p-14 ${
        dark ? "bg-foreground text-background" : "bg-surface hover:bg-foreground hover:text-background"
      }`}
    >
      <h3 className="text-4xl font-light tracking-tight md:text-5xl">{title}</h3>
      <ul className="flex flex-wrap gap-3">
        {tags.map((tag) => (
          <li
            key={tag}
            className={`rounded-full border border-foreground/25 px-6 py-3 text-xl font-light whitespace-nowrap transition-colors duration-500 ${
              dark ? "border-background/30" : "group-hover:border-background/30"
            }`}
          >
            {tag}
          </li>
        ))}
      </ul>
    </div>
  );
}
