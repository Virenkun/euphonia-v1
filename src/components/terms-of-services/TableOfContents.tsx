"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Section {
  id: string;
  title: string;
}

interface TableOfContentsProps {
  sections: Section[];
}

export default function TableOfContents({ sections }: TableOfContentsProps) {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -80% 0px",
      }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav className="bg-white rounded-lg">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">On this page</h2>
      <ul className="space-y-3">
        {sections.map((section) => (
          <li key={section.id}>
            <Link
              href={`#${section.id}`}
              className={`block text-sm ${
                activeSection === section.id
                  ? "text-gray-900 font-medium"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {section.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
