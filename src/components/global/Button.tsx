// Packages
import React from "react";

export default function Button({
  alt = false,
  text,
  onClick,
  disabled,
  type,
}: {
  alt?: boolean;
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled ? disabled : false}
      type={type ? type : "button"}
      className={`inline-flex items-center rounded-md border ${
        alt
          ? ` border-gray-300 px-4 py-2 text-sm font-medium shadow-sm hover:bg-black/30 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2`
          : "border-transparent bg-cyan-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
      }`}
    >
      {text}
    </button>
  );
}
