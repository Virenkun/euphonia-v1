"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { RainbowButton } from "../ui/rainbow-button";
import UserFeedbackPage from "../user-feedback-modal";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userFeedbackOpen, setUserFeedbackOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/80 backdrop-blur-md shadow-md" : ""
      }`}
    >
      <UserFeedbackPage
        open={userFeedbackOpen}
        onOpenChange={setUserFeedbackOpen}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-[700] text-indigo-600">
            euphonia{" "}
            <span className="ml-1 p-1 px-3 align-middle self-center text-[10px] font-normal rounded-full bg-black text-white">
              beta
            </span>
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/why-euphonia"
              className="text-gray-600 hover:text-indigo-600 transition-colors font-[600]"
            >
              Why
            </Link>
            <Link
              href="/our-mission"
              className="text-gray-600 hover:text-indigo-600 transition-colors font-[600]"
            >
              Mission
            </Link>
            <Link
              href="/blog"
              className="text-gray-600 hover:text-indigo-600 transition-colors font-[600]"
            >
              Blogs
            </Link>
            <Link
              href=""
              className="text-gray-600 hover:text-indigo-600 transition-colors font-[600]"
              onClick={() => {
                setUserFeedbackOpen(true);
              }}
            >
              Feedback
            </Link>
          </nav>
          <div className="hidden md:block">
            <Link href="/signin/password_signin">
              <Button
                variant="outline"
                className="mr-4 px-8  bg-transparent border-black text-md font-[600] h-10 hover:bg-transparent"
              >
                Log In
              </Button>
            </Link>
            <Link href="/signin/signup">
              <RainbowButton className="text-md font-[700]">
                Get Started
              </RainbowButton>
            </Link>
          </div>
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6 text-indigo-600" />
          </button>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="flex flex-col px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/why-euphonia"
              className="text-gray-600 hover:text-indigo-600 transition-colors font-[400]"
            >
              Why
            </Link>
            <Link
              href="/our-mission"
              className="text-gray-600 hover:text-indigo-600 transition-colors font-[400]"
            >
              Mission
            </Link>
            <Link
              href="/blog"
              className="text-gray-600 hover:text-indigo-600 transition-colors font-[400]"
            >
              Blogs
            </Link>
            <Link
              href=""
              className="text-gray-600 hover:text-indigo-600 transition-colors font-[400]"
              onClick={() => {
                setUserFeedbackOpen(true);
              }}
            >
              Feedback
            </Link>
          </div>
          <div className="px-4 py-3">
            <Link href="/signin/password_signin">
              <Button
                variant="outline"
                className="w-full mb-2 bg-white text-indigo-600 border-indigo-600 hover:bg-indigo-50"
              >
                Log In
              </Button>
            </Link>
            <Link href="/signin/signup">
              <Button className="w-full bg-indigo-600 text-white hover:bg-indigo-700">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
