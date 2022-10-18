// Packages
import React from "react";
import { InformationCircleIcon } from "@heroicons/react/20/solid";

export default function ErrMessage({ message }: { message: any }) {
  return (
    <div className="flex items-center justify-start text-red-500">
      <InformationCircleIcon className="mr-2 h-4 w-4" />
      <span>{message}</span>
    </div>
  );
}
