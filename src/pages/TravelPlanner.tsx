import { useState } from "react";
import { TravelHero } from "@/components/TravelHero";
import { TravelForm, TravelFormData } from "@/components/TravelForm";
import { ItineraryDisplay, Itinerary } from "@/components/ItineraryDisplay";
import { generateMockItinerary } from "@/data/mockItineraries";

type PlannerState = "hero" | "form" | "results";

const TravelPlanner = () => {
  const [currentState, setCurrentState] = useState<PlannerState>("hero");
  const [isLoading, setIsLoading] = useState(false);
  const [generatedItinerary, setGeneratedItinerary] = useState<Itinerary | null>(null);

  const handleGetStarted = () => {
    setCurrentState("form");
  };

  const handleFormSubmit = async (formData: TravelFormData) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const itinerary = generateMockItinerary(
      formData.city,
      formData.days,
      formData.budget,
      formData.interests
    );
    
    setGeneratedItinerary(itinerary);
    setIsLoading(false);
    setCurrentState("results");
  };

  const handleBackToForm = () => {
    setCurrentState("form");
  };

  if (currentState === "hero") {
    return <TravelHero onGetStarted={handleGetStarted} />;
  }

  if (currentState === "form") {
    return <TravelForm onSubmit={handleFormSubmit} isLoading={isLoading} />;
  }

  if (currentState === "results" && generatedItinerary) {
    return <ItineraryDisplay itinerary={generatedItinerary} onBack={handleBackToForm} />;
  }

  return null;
};

export default TravelPlanner;