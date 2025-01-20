import React from "react";
import ReactCountryFlag from "react-country-flag";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { countries } from "@/constant/countries";

interface CountrySelectProps {
  onValueChange: (value: string) => void;
}

export function CountrySelect({ onValueChange }: CountrySelectProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-white/80" htmlFor="country">
        Country <span className="text-red-500">*</span>
      </label>
      <Select name="country" onValueChange={onValueChange}>
        <SelectTrigger
          className={`w-full h-[52px] bg-[#4342B9] border-0 rounded-[14px] text-white placeholder:text-gray-400 px-4 focus-visible:ring-1 focus-visible:ring-white focus:ring-white focus-visible:border-transparent focus-visible:outline-none`}
        >
          <SelectValue placeholder="Select your country" />
        </SelectTrigger>
        <SelectContent className="bg-black/40 text-white backdrop-blur-md rounded-lg border border-white/20 shadow-lg">
          {countries.map((country) => (
            <SelectItem key={country.code} value={country.code}>
              <div className="flex items-center">
                <ReactCountryFlag
                  countryCode={country.code}
                  svg
                  style={{
                    width: "1.5em",
                    height: "1.5em",
                    marginRight: "0.5em",
                  }}
                />
                {country.name}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
