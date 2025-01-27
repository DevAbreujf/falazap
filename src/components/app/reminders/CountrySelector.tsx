import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { getCountries } from 'react-phone-number-input';
import { getCountryCallingCode } from 'react-phone-number-input/input';
import en from 'react-phone-number-input/locale/en.json';
import type { Country } from 'react-phone-number-input';
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CountrySelectorProps {
  selectedCountry: Country;
  onCountryChange: (country: Country) => void;
}

export function CountrySelector({ selectedCountry, onCountryChange }: CountrySelectorProps) {
  const countries = getCountries();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="flex items-center gap-2 w-[280px] justify-between bg-white/50 backdrop-blur-sm border-white/20 hover:border-primary/20"
        >
          <div className="flex items-center gap-2">
            <img
              src={`https://flagcdn.com/${selectedCountry.toLowerCase()}.svg`}
              alt={en[selectedCountry]}
              className="w-4 h-3"
            />
            <span className="text-sm text-muted-foreground">
              {en[selectedCountry]} (+{getCountryCallingCode(selectedCountry)})
            </span>
          </div>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-0">
        <Command>
          <CommandInput placeholder="Buscar país..." className="h-9" />
          <CommandEmpty>Nenhum país encontrado.</CommandEmpty>
          <CommandGroup className="max-h-[300px] overflow-auto">
            {countries.map((country) => (
              <CommandItem
                key={country}
                value={country}
                onSelect={() => onCountryChange(country)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <img
                  src={`https://flagcdn.com/${country.toLowerCase()}.svg`}
                  alt={en[country]}
                  className="w-4 h-3"
                />
                <span>{en[country]}</span>
                <span className="text-sm text-muted-foreground ml-auto">
                  +{getCountryCallingCode(country)}
                </span>
                {selectedCountry === country && (
                  <Check className="h-4 w-4 text-primary ml-2" />
                )}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}