export default function Disclaimer() {
  return (
    <div className="min-h-screen flex flex-col text-gray-900">
      {/* Background Pattern */}

      <div className="relative z-10">
        <main className="flex-grow container mx-auto px-4 py-12 max-w-6xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-5xl font-bold mb-4">Disclaimer</h1>
            <p className="text-gray-600">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          {/* Content */}
          <div className="space-y-6 text-lg text-gray-800">
            <section>
              <h2 className="text-2xl font-semibold mb-2">
                General Disclaimer
              </h2>
              <p>
                Euphonia is an AI-based voice therapy application designed to
                assist with mental well-being. The services provided through the
                app are for informational and self-help purposes only and do not
                constitute professional medical advice, diagnosis, or treatment.
                Always consult a licensed therapist or medical professional for
                mental health concerns.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2">
                No Medical or Legal Advice
              </h2>
              <p>
                The information and insights provided by Euphonia should not be
                used as a substitute for professional medical, legal, or
                financial advice. Users are encouraged to seek the advice of a
                qualified professional regarding specific situations or
                concerns.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2">
                Limitation of Liability
              </h2>
              <p>
                Euphonia and its developers will not be held liable for any
                damages arising from the use or inability to use the app,
                including but not limited to direct, indirect, incidental,
                consequential, or punitive damages. Use of the app is at your
                own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2">
                Accuracy of Information
              </h2>
              <p>
                While we strive to provide accurate and up-to-date information,
                Euphonia makes no guarantees about the accuracy, reliability, or
                completeness of the content available on the app. Users are
                encouraged to verify information independently.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2">
                Third-Party Content
              </h2>
              <p>
                {`Euphonia may link to or integrate third-party services, content,
                or tools. We are not responsible for the availability, accuracy,
                or practices of third-party entities. Engaging with such content
                is at the user's discretion.`}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2">
                Updates and Changes
              </h2>
              <p>
                Euphonia reserves the right to modify or update this disclaimer
                at any time without prior notice. Users are advised to review
                this page periodically to stay informed of any changes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
              <p>
                If you have any questions or concerns about this disclaimer,
                please contact us at{" "}
                <a
                  href="mailto:support@euphonia.me"
                  className="text-blue-500 underline"
                >
                  support@euphoniaapp.com
                </a>
                .
              </p>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
