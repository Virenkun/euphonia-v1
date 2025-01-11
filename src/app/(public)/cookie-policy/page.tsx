import PolicySection from "@/components/privacy-policy/policy-section";
import TableOfContents from "@/components/privacy-policy/table-of-contents";

export default function CookiePolicy() {
  const sections = [
    { id: "introduction", title: "Introduction" },
    { id: "what-are-cookies", title: "What Are Cookies?" },
    { id: "how-we-use-cookies", title: "How We Use Cookies" },
    { id: "types-of-cookies", title: "Types of Cookies" },
    { id: "third-party-cookies", title: "Third-Party Cookies" },
    { id: "managing-cookies", title: "Managing Cookies" },
    { id: "changes-to-policy", title: "Changes to This Policy" },
    { id: "contact", title: "Contact Information" },
  ];

  return (
    <div className="min-h-screen flex flex-col  text-gray-900">
      {/* Background Pattern */}
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
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-5xl font-bold mb-4">Cookie Policy</h1>
            <p className="text-gray-600">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Table of Contents */}
            <div className="lg:col-span-1">
              <div className="sticky top-20">
                <TableOfContents sections={sections} />
              </div>
            </div>

            {/* Policy Sections */}
            <div className="lg:col-span-3 space-y-8">
              {sections.map((section) => (
                <PolicySection
                  key={section.id}
                  id={section.id}
                  title={section.title}
                  content={getCookiePolicyContent(section.id)}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function getCookiePolicyContent(sectionId: string) {
  switch (sectionId) {
    case "introduction":
      return `Welcome to the Cookie Policy for Euphonia. This policy explains how we use cookies and similar technologies to enhance your experience on our platform. By using Euphonia, you agree to the use of cookies as described in this policy.`;

    case "what-are-cookies":
      return `Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences and improve your overall browsing experience.`;

    case "how-we-use-cookies":
      return `We use cookies to:
        - Understand user behavior and improve the app.
        - Personalize your experience based on your preferences.
        - Analyze traffic and performance metrics.`;

    case "types-of-cookies":
      return `We use the following types of cookies:
        - **Essential Cookies**: Required for the app to function properly.
        - **Performance Cookies**: Help us analyze app performance and user interactions.
        - **Functional Cookies**: Remember your preferences and settings.
        - **Targeting Cookies**: Used for personalized advertising and content recommendations.`;

    case "third-party-cookies":
      return `We may use third-party cookies from services like Google Analytics to better understand our users. These cookies are governed by the third-party's privacy policy.`;

    case "managing-cookies":
      return `You can manage or disable cookies through your browser settings. However, disabling cookies may impact your experience on the app. For more information, refer to your browser's help section.`;

    case "changes-to-policy":
      return `We may update this Cookie Policy from time to time. Any changes will be effective immediately upon posting. Please review this policy periodically for updates.`;

    case "contact":
      return `If you have any questions or concerns about our use of cookies, contact us at support@euphonia.me.`;

    default:
      return `Content not available for this section.`;
  }
}
