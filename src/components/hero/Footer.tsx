import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-8 mt-20 border-t border-indigo-100">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <Link href="/" className="text-xl font-bold text-indigo-600">
            Euphonia
          </Link>
          <p className="text-sm text-gray-600 mt-2">
            © 2024 Euphonia. All rights reserved.
          </p>
        </div>
        <nav className="flex flex-wrap justify-center md:justify-end space-x-6">
          <Link
            href="#"
            className="text-sm text-gray-600 hover:text-indigo-600 transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="#"
            className="text-sm text-gray-600 hover:text-indigo-600 transition-colors"
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            className="text-sm text-gray-600 hover:text-indigo-600 transition-colors"
          >
            Contact Us
          </Link>
        </nav>
      </div>
    </footer>
  );
}
