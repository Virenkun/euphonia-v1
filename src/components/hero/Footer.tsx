import Link from "next/link";

export default function Footer() {
  return (
    <footer className="p-8 mt-20 border-t border-indigo-100 z-50 bg-gradient-to-b from-indigo-50 via-purple-50 to-blue-50">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="col-span-1 sm:col-span-2 lg:col-span-1">
          <Link href="/" className="text-xl font-bold text-indigo-600">
            euphonia
          </Link>
          <p className="text-sm text-gray-600 mt-2">
            © 2024 Euphonia. All rights reserved.
          </p>
        </div>
        <nav className="flex flex-col space-y-2">
          <h2 className="font-semibold text-gray-800 mb-2">about</h2>
          <Link
            href="/why-euphonia"
            className="text-sm text-gray-600 hover:text-indigo-600 transition-colors font-medium"
          >
            why euphonia?
          </Link>
          <Link
            href="/our-mission"
            className="text-sm text-gray-600 hover:text-indigo-600 transition-colors font-medium"
          >
            our mission
          </Link>
          <Link
            href="/team"
            className="text-sm text-gray-600 hover:text-indigo-600 transition-colors font-medium"
          >
            our team
          </Link>
        </nav>
        <nav className="flex flex-col space-y-2">
          <h2 className="font-semibold text-gray-800 mb-2">socials</h2>
          <Link
            href="https://x.com/euphoniadotme"
            className="text-sm text-gray-600 hover:text-indigo-600 transition-colors font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            x (twitter)
          </Link>
          <Link
            href="https://www.instagram.com/euphonia.me/#"
            className="text-sm text-gray-600 hover:text-indigo-600 transition-colors font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            instagram
          </Link>
          <Link
            href="https://www.linkedin.com/company/euphoniadotme/?viewAsMember=true"
            className="text-sm text-gray-600 hover:text-indigo-600 transition-colors font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            linkedin
          </Link>
        </nav>
        <nav className="flex flex-col space-y-2">
          <h2 className="font-semibold text-gray-800 mb-2">legal</h2>
          <Link
            href="/privacy-policy"
            className="text-sm text-gray-600 hover:text-indigo-600 transition-colors font-medium"
          >
            privacy policy
          </Link>
          <Link
            href="/terms-of-services"
            className="text-sm text-gray-600 hover:text-indigo-600 transition-colors font-medium"
          >
            terms of service
          </Link>
          <Link
            href="/cookie-policy"
            className="text-sm text-gray-600 hover:text-indigo-600 transition-colors font-medium"
          >
            cookie policy
          </Link>
          <Link
            href="/disclaimer"
            className="text-sm text-gray-600 hover:text-indigo-600 transition-colors font-medium"
          >
            disclaimer
          </Link>
        </nav>
      </div>
    </footer>
  );
}
