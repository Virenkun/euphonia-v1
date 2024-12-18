import PolicySection from "./policy-section";
import TableOfContents from "./table-of-contents";

export default function PrivacyPolicy() {
  const sections = [
    { id: "introduction", title: "Introduction" },
    { id: "information-we-collect", title: "Information We Collect" },
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
    <div className="min-h-screen flex flex-col bg-gray-50">
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
          content="Welcome to MI AI Voice Therapist. We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our voice therapy application. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the application."
        />
        <PolicySection
          id="information-we-collect"
          title="Information We Collect"
          content={`
            We collect several types of information for various purposes to provide and improve our Service to you:

            1. Personal Data: While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. This may include, but is not limited to:
               - Email address
               - First name and last name
               - Phone number
               - Address, State, Province, ZIP/Postal code, City
               - Usage Data
               - Voice recordings

            2. Usage Data: We may also collect information that your browser sends whenever you visit our Service or when you access the Service by or through a mobile device.

            3. Voice Data: When you use our AI Voice Therapist features, we collect and process your voice recordings to provide the therapy services.
          `}
        />
        <PolicySection
          id="how-we-use-your-information"
          title="How We Use Your Information"
          content={`
            We use the information we collect or receive:
            - To provide and maintain our Service
            - To notify you about changes to our Service
            - To provide customer support
            - To gather analysis or valuable information so that we can improve our Service
            - To monitor the usage of our Service
            - To detect, prevent and address technical issues
            - To provide you with news, special offers and general information about other goods, services and events which we offer
            - To improve our AI models and provide better voice therapy services
          `}
        />
        <PolicySection
          id="data-sharing"
          title="Data Sharing and Disclosure"
          content={`
            We may disclose your personal information in the following situations:
            - To Service Providers: We may share your information with third-party vendors, service providers, contractors or agents who perform services for us.
            - For Business Transfers: We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.
            - With Your Consent: We may disclose your personal information for any other purpose with your consent.
            - To Comply with Legal Obligations: We may disclose your information where we are legally required to do so.
          `}
        />
        <PolicySection
          id="data-retention"
          title="Data Retention"
          content="We will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your information to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our policies."
        />
        <PolicySection
          id="data-security"
          title="Data Security"
          content="We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure."
        />
        <PolicySection
          id="your-rights"
          title="Your Rights"
          content={`
            Depending on your location, you may have certain rights regarding your personal information:
            - The right to access, update or to delete the information we have on you
            - The right of rectification
            - The right to object
            - The right of restriction
            - The right to data portability
            - The right to withdraw consent

            To exercise these rights, please contact us using the information provided in the "Contact Us" section.
          `}
        />
        <PolicySection
          id="children-privacy"
          title="Children's Privacy"
          content="Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If you are a parent or guardian and you are aware that your child has provided us with personal data, please contact us."
        />
        <PolicySection
          id="international-data-transfers"
          title="International Data Transfers"
          content="Your information, including personal data, may be transferred to — and maintained on — computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ from those of your jurisdiction. If you are located outside United States and choose to provide information to us, please note that we transfer the data, including personal data, to United States and process it there."
        />
        <PolicySection
          id="cookies"
          title="Cookies and Tracking Technologies"
          content="We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. Cookies are files with small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent."
        />
        <PolicySection
          id="third-party-links"
          title="Third-Party Links and Services"
          content="Our Service may contain links to other sites that are not operated by us. If you click on a third party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit. We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services."
        />
        <PolicySection
          id="changes"
          title="Changes to This Policy"
          content="We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the 'Last updated' date. You are advised to review this Privacy Policy periodically for any changes."
        />
        <PolicySection
          id="contact"
          title="Contact Us"
          content="If you have any questions about this Privacy Policy, please contact us at privacy@miaivoicetherapist.com or by mail at: MI AI Voice Therapist, 123 AI Street, Tech City, TC 12345, United States."
        />
      </main>
    </div>
  );
}
