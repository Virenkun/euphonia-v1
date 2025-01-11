import React from "react";

const OurMission = () => {
  return (
    <div className="py-16 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-800 sm:text-5xl">
            Our Mission: Empowering Minds Through Innovation
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            At <span className="text-indigo-600 font-semibold">Euphonia</span>,
            we aim to transform mental health care by making it accessible,
            personalized, and empathetic. Our technology bridges the gap,
            ensuring no one feels alone in their mental health journey.
          </p>
        </div>

        {/* Vision Section */}
        <div className="mb-16">
          <div className="bg-indigo-100 rounded-xl p-8 text-center shadow-md">
            <h2 className="text-3xl font-bold text-indigo-800">Our Vision</h2>
            <p className="mt-4 text-gray-700 text-xl">
              To create a world where mental well-being is a priority and
              accessible to all, powered by innovative AI solutions offering
              understanding, compassion, and care.
            </p>
          </div>
        </div>

        {/* Core Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Empathy-Driven Innovation",
                description:
                  "Creating technology that listens, understands, and responds with care.",
              },
              {
                title: "Inclusivity and Accessibility",
                description:
                  "Making mental health resources available to everyone, everywhere.",
              },
              {
                title: "User Privacy and Trust",
                description:
                  "Protecting your data and maintaining confidentiality is our promise.",
              },
              {
                title: "Ethical AI Development",
                description:
                  "Building AI that respects ethical guidelines and ensures safe interactions.",
              },
              {
                title: "Continuous Improvement",
                description:
                  "Embracing feedback and innovation to meet evolving user needs.",
              },
              {
                title: "Evidence-Based Practices",
                description:
                  "Ensuring every interaction aligns with mental health best practices.",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
              >
                <h3 className="text-xl font-semibold text-indigo-800 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* What We Offer Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
            What We Offer
          </h2>
          <div className="space-y-8">
            {[
              {
                title: "AI-Powered Conversations",
                description:
                  "Intelligent chatbots offering personalized mental health support.",
              },
              {
                title: "Accessible Anytime, Anywhere",
                description: "Support available 24/7, wherever you are.",
              },
              {
                title: "Evidence-Based Practices",
                description:
                  "Integrating therapeutic approaches into our AI framework.",
              },
            ].map((offer, index) => (
              <div
                key={index}
                className="flex items-start bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {offer.title}
                  </h3>
                  <p className="text-gray-600 text-lg">{offer.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why We Exist Section */}
        <div className="bg-indigo-600 text-white rounded-lg p-8 text-center shadow-md">
          <h2 className="text-3xl font-bold">Why We Exist</h2>
          <p className="mt-4 text-md">
            Mental health challenges affect millions daily, yet stigma and
            limited resources often prevent people from seeking help. At{" "}
            <span className="font-semibold">Euphonia</span>, we envision a
            future where technology becomes a trusted companion, empowering
            individuals to take charge of their mental well-being.
          </p>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-xl text-gray-800 font-semibold">
            Together, let’s redefine how the world approaches mental health—one
            conversation at a time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OurMission;
