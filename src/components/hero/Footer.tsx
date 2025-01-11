import Link from "next/link";

export default function Footer() {
  return (
    <footer className="p-8 mt-20 border-t border-indigo-100">
      <div className="flex flex-col md:flex-row  items-center gap-40">
        <div className="mb-4 md:mb-0">
          <Link href="/" className="text-xl font-bold text-indigo-600">
            euphonia
          </Link>
          <p className="text-sm text-gray-600 mt-2">
            © 2024 Euphonia. All rights reserved.
          </p>
        </div>

        <nav className="flex flex-col flex-wrap justify-center items-start md:justify-end space-y-2">
          <h1 className="font-semibold">about</h1>
          <Link
            href="#"
            className="text-sm text-gray-600 hover:text-indigo-600 transition-colors font-medium"
          >
            why euphonia?
          </Link>
          <Link
            href="#"
            className="text-sm text-gray-600 hover:text-indigo-600 transition-colors font-medium"
          >
            our mission
          </Link>
          <Link
            href="#"
            className="text-sm text-gray-600 hover:text-indigo-600 transition-colors font-medium"
          >
            our team
          </Link>
        </nav>
        <nav className="flex flex-col flex-wrap justify-center items-start md:justify-end space-y-2">
          <h1 className="font-medium">socials</h1>
          <Link
            href="#"
            className="text-sm text-gray-600 hover:text-indigo-600 transition-colors font-medium"
          >
            x (twitter)
          </Link>
          <Link
            href="#"
            className="text-sm text-gray-600 hover:text-indigo-600 transition-colors font-medium"
          >
            instagram
          </Link>
          <Link
            href="#"
            className="text-sm text-gray-600 hover:text-indigo-600 transition-colors font-medium"
          >
            linkedin
          </Link>
        </nav>
        <nav className="flex flex-col flex-wrap justify-center items-start md:justify-end space-y-2">
          <h1 className="font-medium">legal</h1>
          <Link
            href="#"
            className="text-sm text-gray-600 hover:text-indigo-600 transition-colors font-medium"
          >
            privacy policy
          </Link>
          <Link
            href="#"
            className="text-sm text-gray-600 hover:text-indigo-600 transition-colors font-medium"
          >
            terms of service
          </Link>
          <Link
            href="#"
            className="text-sm text-gray-600 hover:text-indigo-600 transition-colors font-medium"
          >
            cookie policy
          </Link>
          <Link
            href="#"
            className="text-sm text-gray-600 hover:text-indigo-600 transition-colors font-medium"
          >
            disclaimer
          </Link>
        </nav>
      </div>
    </footer>
  );
}
