import Link from "next/link";

interface Section {
  id: string;
  title: string;
}

interface TableOfContentsProps {
  sections: Section[];
}

export default function TableOfContents({ sections }: TableOfContentsProps) {
  return (
    <nav className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-semibold mb-4">Table of Contents</h2>
      <ul className="space-y-2">
        {sections.map((section) => (
          <li key={section.id}>
            <Link
              href={`#${section.id}`}
              className="text-blue-600 font-normal hover:underline"
            >
              {section.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
