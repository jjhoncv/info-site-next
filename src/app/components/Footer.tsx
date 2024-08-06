// components/Footer.tsx
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <Image
              src="/footer-logo.png"
              alt="FinExpert Logo"
              width={150}
              height={50}
            />
            <p className="mt-4 text-sm text-gray-400">
              Welcome to the leading company delivering services that combine
              quality, reliability and compliance!
            </p>
            <div className="flex mt-4 space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-400 hover:text-white"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contacts"
                  className="text-gray-400 hover:text-white"
                >
                  Contacts
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center">
                <i className="fas fa-phone-alt mr-2 text-blue-turquoise"></i>
                (123) 45678910
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope mr-2 text-blue-turquoise"></i>
                info@demolink.org
              </li>
              <li className="flex items-center">
                <i className="far fa-clock mr-2 text-blue-turquoise"></i>
                Mon - Sat: 9:00 - 18:00
              </li>
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mr-2 mt-1 text-blue-turquoise"></i>
                <span>
                  267 Park Avenue
                  <br />
                  New York, NY 90210
                </span>
              </li>
            </ul>
          </div>

          {/* Subscribe */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
            <p className="text-sm text-gray-400 mb-4">
              Get the latest updates and offers.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="E-Mail"
                className="flex-grow bg-gray-700 text-white px-3 py-2 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-turquoise text-white px-4 py-2 rounded-r hover:bg-blue-600 transition-colors"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-12 pt-8 text-center text-sm text-gray-400">
        <p>Zemez ©. All rights reserved.</p>
      </div>
    </footer>
  );
}
