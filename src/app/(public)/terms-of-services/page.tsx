import TableOfContents from "@/components/terms-of-services/TableOfContents";
import TermsSection from "@/components/terms-of-services/TermSection";

export default function TermsOfService() {
  const sections = [
    { id: "introduction", title: "Introduction" },
    { id: "acceptance", title: "Acceptance of Terms" },
    { id: "eligibility", title: "Eligibility" },
    { id: "account", title: "Account Registration" },
    { id: "services", title: "Services Description" },
    { id: "payment", title: "Payment Terms" },
    { id: "user-content", title: "User Content" },
    { id: "prohibited-use", title: "Prohibited Use" },
    { id: "intellectual-property", title: "Intellectual Property" },
    { id: "termination", title: "Termination" },
    { id: "disclaimer", title: "Disclaimer of Warranties" },
    { id: "limitation", title: "Limitation of Liability" },
    { id: "indemnification", title: "Indemnification" },
    { id: "governing-law", title: "Governing Law" },
    { id: "changes", title: "Changes to Terms" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <div className="fixed inset-0 z-0">
        <svg
          className="absolute inset-0 h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid"
              width="64"
              height="64"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 64 0 L 0 0 0 64"
                fill="none"
                stroke="rgba(0, 0, 0, 0.05)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      <div className="relative z-10">
        <main className="flex-grow container mx-auto px-4 py-12 max-w-6xl">
          <div className="mb-12 text-center">
            <h1 className="text-5xl font-bold mb-4">Terms of Service</h1>
            <p className="text-gray-600">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="sticky top-20">
                <TableOfContents sections={sections} />
              </div>
            </div>

            <div className="lg:col-span-3 space-y-8">
              {sections.map((section) => (
                <TermsSection
                  key={section.id}
                  id={section.id}
                  title={section.title}
                  content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisi vel ultricies lacinia, nisl nunc aliquam nunc, vitae aliquam nisl nunc vitae nisl. Sed euismod, nunc sit amet aliquam tincidunt, nisl nunc aliquam nunc, vitae aliquam nisl nunc vitae nisl."
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
