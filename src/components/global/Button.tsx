// Packages
import React from "react";

export default function Button({
  alt = false,
  text,
  onClick,
}: {
  alt?: boolean;
  text: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`inline-flex items-center rounded-md border ${
        alt
          ? " border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
          : "border-transparent bg-cyan-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
      }`}
    >
      {text}
    </button>
  );
}
