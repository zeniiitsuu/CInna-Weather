import { useState } from "react";
import { CalendarIcon, Clock, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface CalendarProps {
  className?: string;
}

export function Calendar({ className }: CalendarProps) {
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState<"month" | "week">("month");

  // For demo purposes
  const appointments = [
    {
      id: 1,
      title: "UI/UX Discussion for Upcoming Project - Notel",
      time: "11:00AM - 12:00PM",
      date: new Date(),
      type: "meeting"
    }
  ];

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - d.getDay() + i);
    return d;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn("bg-white rounded-3xl p-6", className)}
    >
      <div className="flex items-center justify-between mb-8">
        <Switch checked={view === "month"} onCheckedChange={() => setView(view === "month" ? "week" : "month")} />
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5 text-[#4cb5e8]" />
          <select className="bg-transparent border-none text-lg font-semibold focus:outline-none">
            <option>January, 2024</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-4">
        {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
          <div key={day} className="text-center text-sm font-medium text-[#4cb5e8]/70">
            {day}
          </div>
        ))}
        {days.map((day, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "h-10 rounded-full flex items-center justify-center text-sm",
              day.toDateString() === new Date().toDateString()
                ? "bg-[#4cb5e8] text-white"
                : "hover:bg-[#4cb5e8]/10 text-[#4cb5e8]"
            )}
          >
            {format(day, "d")}
          </motion.button>
        ))}
      </div>

      <div className="mt-8 space-y-4">
        {appointments.map((apt) => (
          <motion.div
            key={apt.id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-gray-50 rounded-2xl p-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium text-[#4cb5e8]">{apt.title}</h3>
                <div className="flex items-center gap-2 mt-2 text-sm text-[#4cb5e8]/70">
                  <Clock className="h-4 w-4" />
                  <span>{apt.time}</span>
                </div>
              </div>
              <div className="flex -space-x-2">
                {/* Avatar placeholders */}
                <div className="h-8 w-8 rounded-full bg-[#4cb5e8]/20" />
                <div className="h-8 w-8 rounded-full bg-[#4cb5e8]/30" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="mt-6 w-full bg-[#4cb5e8] text-white rounded-2xl py-4 font-medium"
      >
        + Create New Event
      </motion.button>
    </motion.div>
  );
}