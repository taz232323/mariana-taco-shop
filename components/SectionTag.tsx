// The order-ticket index that sits above each section. It is the thread that
// ties the whole page together as one menu while letting each section compose
// differently below it. Color is inherited from the parent (currentColor).

export function SectionTag({
  index,
  label,
  className = "",
}: {
  index: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="ticket-num text-sm font-medium tabular-nums opacity-90">
        {index}
      </span>
      <span className="h-px w-10 bg-current opacity-30" aria-hidden="true" />
      <span className="ticket opacity-80">{label}</span>
    </div>
  );
}
