import { Cloud, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavigationProps {
  activeSection: string;
  onChangeSection: (section: string) => void;
}

export function Navigation({ activeSection, onChangeSection }: NavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t border-sky-200 p-4">
      <div className="container mx-auto flex justify-center gap-8">
        <Button
          variant={activeSection === "weather" ? "secondary" : "ghost"}
          className="flex flex-col items-center gap-1"
          onClick={() => onChangeSection("weather")}
        >
          <Cloud className="h-5 w-5" />
          <span className="text-xs">Weather</span>
        </Button>
        <Button
          variant={activeSection === "config" ? "secondary" : "ghost"}
          className="flex flex-col items-center gap-1"
          onClick={() => onChangeSection("config")}
        >
          <Settings className="h-5 w-5" />
          <span className="text-xs">Config</span>
        </Button>
      </div>
    </div>
  );
}