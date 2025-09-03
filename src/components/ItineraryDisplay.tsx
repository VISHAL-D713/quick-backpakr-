import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, DollarSign, Share2, Download, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export interface Activity {
  place: string;
  time: string;
  cost: number;
  note: string;
  category: string;
}

export interface DayPlan {
  day: number;
  activities: Activity[];
}

export interface Itinerary {
  city: string;
  days: DayPlan[];
  estimatedTotal: number;
  interests: string[];
}

interface ItineraryDisplayProps {
  itinerary: Itinerary;
  onBack: () => void;
}

const timeSlots = {
  morning: "Morning",
  afternoon: "Afternoon", 
  evening: "Evening"
};

const categoryColors = {
  heritage: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
  food: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  adventure: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  culture: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  nature: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
  shopping: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
  default: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
};

export const ItineraryDisplay = ({ itinerary, onBack }: ItineraryDisplayProps) => {
  const { toast } = useToast();

  const handleShare = async () => {
    const shareText = `Check out my ${itinerary.days.length}-day itinerary for ${itinerary.city}! 🌍✈️`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${itinerary.city} Travel Itinerary`,
          text: shareText,
          url: window.location.href,
        });
      } catch (error) {
        // Fallback to copying to clipboard
        await navigator.clipboard.writeText(`${shareText}\n\n${window.location.href}`);
        toast({
          title: "Link copied!",
          description: "Itinerary link has been copied to your clipboard.",
        });
      }
    } else {
      await navigator.clipboard.writeText(`${shareText}\n\n${window.location.href}`);
      toast({
        title: "Link copied!",
        description: "Itinerary link has been copied to your clipboard.",
      });
    }
  };

  const handleDownload = () => {
    toast({
      title: "Coming Soon!",
      description: "PDF download feature will be available soon.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent to-background py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mb-4 hover:bg-accent"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Form
          </Button>
          
          <Card className="card-gradient travel-shadow-elevated border-0">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle className="text-3xl font-bold text-foreground mb-2">
                    Your {itinerary.city} Adventure
                  </CardTitle>
                  <p className="text-muted-foreground">
                    {itinerary.days.length} days • Total Budget: ₹{itinerary.estimatedTotal.toLocaleString()}
                  </p>
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    onClick={handleShare}
                    className="flex items-center gap-2"
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </Button>
                  <Button 
                    onClick={handleDownload}
                    className="flex items-center gap-2 bg-primary hover:bg-primary/90"
                  >
                    <Download className="w-4 h-4" />
                    Download PDF
                  </Button>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {itinerary.interests.map((interest) => (
                  <Badge key={interest} variant="secondary" className="capitalize">
                    {interest.replace('_', ' ')}
                  </Badge>
                ))}
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Daily Itinerary */}
        <div className="space-y-8">
          {itinerary.days.map((day) => (
            <Card key={day.day} className="card-gradient travel-shadow border-0">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-primary flex items-center gap-3">
                  <span className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-bold">
                    {day.day}
                  </span>
                  Day {day.day}
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-6">
                  {day.activities.map((activity, index) => (
                    <div key={index} className="relative">
                      {/* Timeline connector */}
                      {index < day.activities.length - 1 && (
                        <div className="absolute left-6 top-16 w-0.5 h-8 bg-border"></div>
                      )}
                      
                      <div className="flex gap-4">
                        {/* Time indicator */}
                        <div className="flex-shrink-0 w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                          <Clock className="w-5 h-5 text-accent-foreground" />
                        </div>
                        
                        {/* Activity details */}
                        <div className="flex-1 space-y-3">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                            <div>
                              <h4 className="text-lg font-semibold text-foreground flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-muted-foreground" />
                                {activity.place}
                              </h4>
                              <p className="text-sm text-muted-foreground font-medium">
                                {activity.time}
                              </p>
                            </div>
                            
                            <div className="flex items-center gap-3">
                              <Badge 
                                className={categoryColors[activity.category as keyof typeof categoryColors] || categoryColors.default}
                              >
                                {activity.category}
                              </Badge>
                              <div className="flex items-center gap-1 text-sm font-semibold text-foreground">
                                <DollarSign className="w-4 h-4" />
                                ₹{activity.cost}
                              </div>
                            </div>
                          </div>
                          
                          {activity.note && (
                            <div className="bg-muted/50 rounded-lg p-3">
                              <p className="text-sm text-muted-foreground">
                                💡 {activity.note}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Daily total */}
                <div className="mt-6 pt-4 border-t border-border">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-foreground">Day {day.day} Total:</span>
                    <span className="font-bold text-lg text-primary">
                      ₹{day.activities.reduce((sum, activity) => sum + activity.cost, 0).toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trip Summary */}
        <Card className="card-gradient travel-shadow-elevated border-0 mt-8">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-foreground mb-2">Trip Summary</h3>
              <p className="text-muted-foreground mb-4">
                {itinerary.days.length} amazing days in {itinerary.city}
              </p>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-full text-xl font-bold">
                <DollarSign className="w-6 h-6" />
                Total: ₹{itinerary.estimatedTotal.toLocaleString()}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};