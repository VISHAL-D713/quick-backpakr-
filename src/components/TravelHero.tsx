import { Button } from "@/components/ui/button";
import { MapPin, Clock, DollarSign } from "lucide-react";

interface TravelHeroProps {
  onGetStarted: () => void;
}

export const TravelHero = ({ onGetStarted }: TravelHeroProps) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center travel-gradient overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-white/5 blur-xl"></div>
      <div className="absolute bottom-32 right-16 w-24 h-24 rounded-full bg-white/10 blur-lg"></div>
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Smart Travel
            <span className="block bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Itinerary Generator
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed max-w-2xl mx-auto">
            Plan your perfect trip in minutes. Get personalized day-by-day itineraries 
            tailored to your interests, budget, and schedule.
          </p>
          
          {/* Feature highlights */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="flex items-center gap-3 text-white/90">
              <MapPin className="w-6 h-6" />
              <span className="text-lg">Any Destination</span>
            </div>
            <div className="flex items-center gap-3 text-white/90">
              <Clock className="w-6 h-6" />
              <span className="text-lg">Day-by-Day Planning</span>
            </div>
            <div className="flex items-center gap-3 text-white/90">
              <DollarSign className="w-6 h-6" />
              <span className="text-lg">Budget Friendly</span>
            </div>
          </div>
          
          {/* CTA Button */}
          <Button 
            onClick={onGetStarted}
            size="lg"
            className="bg-white text-travel-blue hover:bg-white/90 px-8 py-6 text-lg font-semibold rounded-2xl travel-shadow-elevated transition-all duration-300 hover:scale-105"
          >
            Plan My Trip
          </Button>
        </div>
      </div>
    </div>
  );
};