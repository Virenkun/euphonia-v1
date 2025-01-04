import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Logo from "./Logo";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Find Your Perfect Therapist</h1>
            <p className="text-xl mt-2">
              Connect with licensed professionals for online therapy sessions
            </p>
          </div>
          <Logo />
        </div>
        <div className="max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search therapists by name or specialty"
              className="pl-10 py-2 w-full bg-white text-gray-800 rounded-full"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
