import React from "react";

type Props = {
  title: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
};

export function Section({ title, actions, children }: Props) {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        {actions}
      </div>
      {children}
    </section>
  );
}
