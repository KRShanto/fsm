"use client";

import React, { useState } from "react";
import { FiFileText } from "react-icons/fi";
import Image from "next/image";

interface Documentation {
  id: number;
  created_at: string;
  name: string | null;
  file_url: string | null;
  product: number | null;
}

interface StandardImage {
  id: number;
  created_at: string;
  image_url: string | null;
  product: number | null;
}

interface TabData {
  id: string;
  label: string;
  content: string;
  docs?: Documentation[];
  standard_images?: StandardImage[];
}

interface TabsLayoutProps {
  tabs: TabData[];
}

export default function TabsLayout({ tabs }: TabsLayoutProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || "");

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="flex border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === tab.id
                ? "border-b-2 border-yellow-400 text-blue-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="py-6">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`${activeTab === tab.id ? "block" : "hidden"}`}
          >
            {tab.id === "documentation" && tab.docs ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {tab.docs.length > 0 ? (
                  tab.docs.map((doc) => (
                    <a
                      key={doc.id}
                      href={doc.file_url || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-gray-50"
                    >
                      <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                        <FiFileText size={20} />
                      </div>
                      <div>
                        <div className="font-medium">
                          {doc.name || "Document"}
                        </div>
                        <div className="text-sm text-gray-500">Download</div>
                      </div>
                    </a>
                  ))
                ) : (
                  <div className="text-gray-500">
                    No documentation available
                  </div>
                )}
              </div>
            ) : tab.id === "standards" &&
              tab.standard_images &&
              tab.standard_images.length > 0 ? (
              <>
                <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {tab.standard_images.map((img) => (
                    <div key={img.id} className="flex flex-col items-center">
                      <div className="h-24 w-24 overflow-hidden rounded-lg border bg-white p-2 shadow-sm">
                        <Image
                          src={img.image_url || "/standard-default.png"}
                          alt="Standard certification"
                          width={80}
                          height={80}
                          className="h-full w-full object-contain"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  className="tiptap prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: tab.content }}
                />
              </>
            ) : (
              <div
                className="tiptap prose max-w-none"
                dangerouslySetInnerHTML={{ __html: tab.content }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
