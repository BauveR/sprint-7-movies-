type Tab<T extends string> = { value: T; label: string };
type Props<T extends string> = {
  tabs: Tab<T>[];
  value: T;
  onChange: (v: T) => void;
};
export function TabsToggle<T extends string>({ tabs, value, onChange }: Props<T>) {
  return (
    <div className="inline-flex rounded-full bg-white/10 p-1 text-sm">
      {tabs.map(t => {
        const active = t.value === value;
        return (
          <button
            key={t.value}
            onClick={() => onChange(t.value)}
            className={[
              "px-3 py-1 rounded-full",
              active ? "bg-sky-500 text-white" : "text-white/80 hover:bg-white/10"
            ].join(" ")}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
