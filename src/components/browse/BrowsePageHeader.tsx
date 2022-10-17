// Packages
import React, { useState } from "react";

// Utils
import { classNames } from "../../utils/classNames";

const tabs = [{ name: "Recent" }, { name: "Likes" }, { name: "Comments" }];

export default function NewPageHeader() {
  const [activeTab, setActiveTab] = useState("Recent");

  return (
    <div className="px-4 sm:px-0">
      <div>
        <nav
          className="isolate flex divide-x divide-gray-200 rounded-lg shadow"
          aria-label="Tabs"
        >
          {tabs.map((tab, tabIdx) => (
            <label
              key={tab.name}
              className={classNames(
                tab.name === activeTab
                  ? "text-gray-900"
                  : "text-gray-500 hover:text-gray-700",
                tabIdx === 0 ? "rounded-l-lg" : "",
                tabIdx === tabs.length - 1 ? "rounded-r-lg" : "",
                "group relative min-w-0 flex-1 cursor-pointer overflow-hidden bg-white py-4 px-6 text-center text-sm font-medium hover:bg-gray-50 focus:z-10"
              )}
              htmlFor={`${tab.name} tab`}
              onClick={() => setActiveTab(tab.name)}
            >
              <input
                type="radio"
                className="appearance-none"
                aria-label={
                  tab.name === activeTab ? `${tab.name} tab` : undefined
                }
              />
              <span>{tab.name}</span>
              <span
                aria-hidden="true"
                className={classNames(
                  tab.name === activeTab ? "bg-cyan-500" : "bg-transparent",
                  "absolute inset-x-0 bottom-0 h-0.5"
                )}
              />
            </label>
          ))}
        </nav>
      </div>
    </div>
  );
}
