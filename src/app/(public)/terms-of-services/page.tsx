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
    { id: "contact", title: "Contact Information" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
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
            <h1 className="text-5xl font-bold mb-4">Terms of Service</h1>
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

            {/* Terms Sections */}
            <div className="lg:col-span-3 space-y-8">
              {sections.map((section) => (
                <TermsSection
                  key={section.id}
                  id={section.id}
                  title={section.title}
                  content={getContent(section.id)}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function getContent(sectionId: string) {
  switch (sectionId) {
    case "introduction":
      return `Welcome to Euphonia, an AI voice therapist app designed to provide mental health support. These Terms of Service ("Terms") govern your use of our app and services. By accessing or using Euphonia, you agree to comply with these Terms.`;

    case "acceptance":
      return `By accessing or using our app, you affirm that you are of legal age to form a binding contract and agree to these Terms. If you do not accept these Terms, you may not use our services.`;

    case "eligibility":
      return `Our services are intended for users aged 14 and older. By using the app, you confirm that you meet this age requirement.`;

    case "account":
      return `To use certain features, you must create an account by providing accurate and complete information. You are responsible for maintaining the confidentiality of your login credentials.`;

    case "services":
      return `Euphonia provides AI-driven voice therapy sessions to enhance mental well-being. These services are for informational purposes and do not constitute medical advice. Always consult a licensed professional for medical concerns.`;

    case "payment":
      return `Certain features may require payment. Payments are non-refundable unless required by law. Subscription fees may apply, and you agree to keep your payment information up to date.`;

    case "user-content":
      return `You may share personal insights or data during therapy sessions. You grant us a license to use this data solely for improving our services, in compliance with our Privacy Policy.`;

    case "prohibited-use":
      return `You agree not to:
        - Use the app for illegal purposes.
        - Reverse-engineer or exploit our services.
        - Upload harmful content, including viruses or malware.`;

    case "intellectual-property":
      return `All content, trademarks, and intellectual property associated with Euphonia are owned by us or licensed to us. You may not reproduce or distribute our content without permission.`;

    case "termination":
      return `We may suspend or terminate your access to the app if you violate these Terms. Upon termination, your account and data may be deleted, as permitted by law.`;

    case "disclaimer":
      return `Euphonia is provided "as is," and we disclaim all warranties, express or implied. While we strive for accuracy, we do not guarantee the reliability of our services.`;

    case "limitation":
      return `To the maximum extent permitted by law, we are not liable for indirect, incidental, or consequential damages arising from your use of the app.`;

    case "indemnification":
      return `You agree to indemnify and hold us harmless from any claims or damages resulting from your violation of these Terms.`;

    case "governing-law":
      return `These Terms are governed by and construed in accordance with the laws of your country of residence. Disputes shall be resolved in local courts.`;

    case "changes":
      return `We reserve the right to update these Terms periodically. Changes will be effective immediately upon posting.`;

    case "contact":
      return `If you have questions about these Terms, contact us at support@euphonia.me`;

    default:
      return `Content not available for this section.`;
  }
}
