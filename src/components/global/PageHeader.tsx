// Packages
import React from "react";

export default function PageHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="px-4 pb-2 sm:px-6 lg:mx-auto lg:px-8">{children}</div>
    </div>
  );
}
