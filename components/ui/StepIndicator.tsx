import clsx from "clsx";

export function StepIndicator({
  total,
  actual,
}: {
  total: number;
  actual: number;
}) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }, (_, i) => i + 1).map((paso) => (
        <div
          key={paso}
          className={clsx(
            "h-1.5 rounded-full transition-all duration-300",
            paso === actual
              ? "w-8 bg-spectrum-violet"
              : paso < actual
              ? "w-4 bg-ink/30"
              : "w-4 bg-ink/10"
          )}
        />
      ))}
    </div>
  );
}
