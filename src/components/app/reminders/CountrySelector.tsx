import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import getCountries from 'react-phone-number-input/modules/getCountries';
import { getCountryCallingCode } from 'react-phone-number-input/input';
import en from 'react-phone-number-input/locale/en.json';

interface CountrySelectorProps {
  selectedCountry: string;
  onCountryChange: (country: string) => void;
}

export function CountrySelector({ selectedCountry, onCountryChange }: CountrySelectorProps) {
  const countries = getCountries();

  return (
    <Select value={selectedCountry} onValueChange={onCountryChange}>
      <SelectTrigger className="w-full">
        <SelectValue>
          <div className="flex items-center gap-2">
            <img
              src={`https://flagcdn.com/${selectedCountry.toLowerCase()}.svg`}
              alt={en[selectedCountry]}
              className="w-4 h-3"
            />
            <span>+{getCountryCallingCode(selectedCountry)}</span>
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {countries.map((country) => (
          <SelectItem key={country} value={country}>
            <div className="flex items-center gap-2">
              <img
                src={`https://flagcdn.com/${country.toLowerCase()}.svg`}
                alt={en[country]}
                className="w-4 h-3"
              />
              <span>{en[country]} (+{getCountryCallingCode(country)})</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}