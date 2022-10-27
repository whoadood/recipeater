// Packages
import React, { useState } from "react";
import { useDarkmode } from "../../hooks/useDark";
import {
  ChatBubbleLeftEllipsisIcon,
  HandThumbUpIcon,
  ShareIcon,
} from "@heroicons/react/20/solid";

// Utils
import { classNames } from "../../utils/classNames";
import { Action } from "../../hooks/recipeReducer";

export default function NewPageHeader({
  recipeDispatch,
}: {
  recipeDispatch: React.Dispatch<Action>;
}) {
  const tabs = [
    {
      name: "Title",
      icon: <ShareIcon className="h-6 w-6" />,
      onClick: () => recipeDispatch({ type: "TITLE" }),
    },
    {
      name: "Likes",
      icon: <HandThumbUpIcon className="h-6 w-6" />,
      onClick: () => recipeDispatch({ type: "FAVORITE" }),
    },
    {
      name: "Comments",
      icon: <ChatBubbleLeftEllipsisIcon className="h-6 w-6" />,
      onClick: () => recipeDispatch({ type: "COMMENT" }),
    },
  ];
  const [activeTab, setActiveTab] = useState("Title");
  const { darkmode } = useDarkmode();

  return (
    <div className="px-4 sm:px-0">
      <div>
        <nav
          className={`isolate flex divide-x ${
            darkmode ? "divide-gray-600" : "divide-gray-200"
          } rounded-lg shadow`}
          aria-label="Tabs"
        >
          {tabs.map((tab, tabIdx) => (
            <label
              key={tab.name}
              className={classNames(
                tab.name === activeTab
                  ? `${darkmode ? "text-white" : "text-gray-700"}`
                  : `${
                      darkmode ? "hover:text-gray-200" : "hover:text-gray-700"
                    } text-gray-500`,
                tabIdx === 0 ? "rounded-l-lg" : "",
                tabIdx === tabs.length - 1 ? "rounded-r-lg" : "",
                `group relative flex min-w-0 flex-1 cursor-pointer flex-col items-center justify-center overflow-hidden py-4 px-6 text-center text-sm font-medium focus:z-10 ${
                  darkmode ? "bg-black/50" : ""
                }`
              )}
              htmlFor={`${tab.name} tab`}
              onClick={() => {
                setActiveTab(tab.name);
                tab.onClick();
              }}
            >
              <input
                type="radio"
                className="appearance-none"
                aria-label={
                  tab.name === activeTab ? `${tab.name} tab` : undefined
                }
              />
              <span>{tab.icon}</span>
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
