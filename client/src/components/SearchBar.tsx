import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { searchCities, type CityData } from "@/lib/weather";
import { useDebounce } from "@/hooks/use-debounce";

interface SearchBarProps {
  onSearch: (city: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState(() => {
    return localStorage.getItem('lastSearchedCity') || "";
  });
  const [suggestions, setSuggestions] = useState<CityData[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    // Load last searched city on mount
    const lastCity = localStorage.getItem('lastSearchedCity');
    if (lastCity) {
      onSearch(lastCity);
    }
  }, []);

  useEffect(() => {
    async function fetchSuggestions() {
      if (!isOpen || debouncedQuery.length < 2) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        const cities = await searchCities(debouncedQuery);
        setSuggestions(cities);
      } catch (error) {
        console.error("Failed to fetch suggestions:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSuggestions();
  }, [debouncedQuery, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      localStorage.setItem('lastSearchedCity', query.trim());
      onSearch(query.trim());
      setIsOpen(false);
    }
  };

  const handleSuggestionClick = (city: CityData) => {
    const cityString = `${city.name}, ${city.country}${city.state ? `, ${city.state}` : ''}`;
    setQuery(cityString);
    localStorage.setItem('lastSearchedCity', cityString);
    onSearch(cityString);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search city..."
          className="bg-white/80 backdrop-blur-sm border-[#c1e7f5]/50"
        />
        <Button 
          type="submit" 
          className="bg-[#c1e7f5] hover:bg-[#c1e7f5]/80 text-[#4cb5e8]"
          disabled={isLoading}
        >
          <Search className="h-4 w-4" />
        </Button>
      </form>

      <AnimatePresence>
        {isOpen && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-[#c1e7f5]/30 z-50 overflow-hidden"
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.05
                  }
                }
              }}
            >
              {suggestions.map((city) => (
                <motion.button
                  key={`${city.name}-${city.country}-${city.state}`}
                  onClick={() => handleSuggestionClick(city)}
                  className="w-full text-left px-4 py-2 hover:bg-[#c1e7f5]/10 text-[#4cb5e8] transition-colors"
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 }
                  }}
                  whileHover={{ scale: 1.01, x: 5 }}
                  whileTap={{ scale: 0.99 }}
                >
                  {city.name}, {city.country}
                  {city.state && `, ${city.state}`}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}