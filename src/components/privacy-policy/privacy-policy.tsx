import PolicySection from "./policy-section";
import TableOfContents from "./table-of-contents";

export default function PrivacyPolicy() {
  const sections = [
    { id: "introduction", title: "Introduction" },
    { id: "information-we-collect", title: "Information We Collect" },
    { id: "legal-basis-for-processing", title: "Legal Basis for Processing" },
    { id: "how-we-use-your-information", title: "How We Use Your Information" },
    { id: "data-sharing", title: "Data Sharing and Disclosure" },
    { id: "data-retention", title: "Data Retention" },
    { id: "data-security", title: "Data Security" },
    { id: "your-rights", title: "Your Rights" },
    { id: "children-privacy", title: "Children's Privacy" },
    {
      id: "international-data-transfers",
      title: "International Data Transfers",
    },
    { id: "cookies", title: "Cookies and Tracking Technologies" },
    { id: "third-party-links", title: "Third-Party Links and Services" },
    { id: "changes", title: "Changes to This Policy" },
    { id: "contact", title: "Contact Us" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Privacy Policy
        </h1>
        <p className="text-gray-600 mb-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        <TableOfContents sections={sections} />
        <PolicySection
          id="introduction"
          title="Introduction"
          content="Welcome to Euphonia, the AI voice therapist app. We are dedicated to protecting your privacy and safeguarding your personal data. This Privacy Policy outlines how we collect, use, share, and protect your information in compliance with applicable data protection laws globally. Please review this policy carefully before using our services."
        />
        <PolicySection
          id="information-we-collect"
          title="Information We Collect"
          content={`
            We collect the following types of information:

            1. **Personal Data**: Identifiable information such as:
               - Name, email, and contact details
               - Voice recordings and session history
               - Geolocation data (if necessary for functionality)

            2. **Sensitive Data**: For therapy purposes, some sensitive information such as mental health insights may be processed. We obtain explicit consent for processing such data.

            3. **Usage Data**: Information about app usage, such as:
               - Device type, IP address, and browser type
               - Interaction logs with the app

            4. **Cookies and Tracking**: Details about how you navigate the app for analytics purposes.
          `}
        />
        <PolicySection
          id="legal-basis-for-processing"
          title="Legal Basis for Processing"
          content={`
            We process your data based on:
            - Your consent, which you can withdraw at any time.
            - Performance of a contract, such as providing therapy sessions.
            - Compliance with legal obligations, including fraud prevention.
            - Legitimate interests, such as improving our services.
          `}
        />
        <PolicySection
          id="how-we-use-your-information"
          title="How We Use Your Information"
          content={`
            Your data is used for:
            - Providing and enhancing voice therapy services
            - Improving app functionality and user experience
            - Compliance with legal requirements and security
            - Personalized recommendations and session analysis
          `}
        />
        <PolicySection
          id="data-sharing"
          title="Data Sharing and Disclosure"
          content={`
            We may share data with:
            - Third-party service providers for analytics and hosting
            - Authorities, when legally obligated
            - Business partners, under strict confidentiality agreements
          `}
        />
        <PolicySection
          id="data-retention"
          title="Data Retention"
          content="Your data will be retained only as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law."
        />
        <PolicySection
          id="data-security"
          title="Data Security"
          content="We implement robust technical measures to protect your data. However, no system is entirely secure, and we encourage you to use strong passwords and maintain good online practices."
        />
        <PolicySection
          id="your-rights"
          title="Your Rights"
          content={`
            Depending on your location, your rights may include:
            - Access, correction, or deletion of your data
            - Portability of data to another service
            - Restriction or objection to data processing
            - Filing complaints with local authorities
          `}
        />
        <PolicySection
          id="children-privacy"
          title="Children's Privacy"
          content="We do not knowingly collect data from individuals under 13 years of age. If you believe your child has provided information, contact us immediately."
        />
        <PolicySection
          id="international-data-transfers"
          title="International Data Transfers"
          content="We may transfer data internationally. When transferring data, we ensure adequate safeguards are in place, such as standard contractual clauses or equivalent mechanisms."
        />
        <PolicySection
          id="cookies"
          title="Cookies and Tracking Technologies"
          content="We use cookies to enhance your experience. You can manage your cookie preferences in your browser settings."
        />
        <PolicySection
          id="third-party-links"
          title="Third-Party Links and Services"
          content="We are not responsible for the privacy practices of external sites. Review their policies before sharing information."
        />
        <PolicySection
          id="changes"
          title="Changes to This Policy"
          content="We may update this policy periodically. The updated policy will be effective immediately upon posting."
        />
        <PolicySection
          id="contact"
          title="Contact Us"
          content="For questions or concerns, contact us at viren.soni@euphonia.me"
        />
      </main>
    </div>
  );
}
