import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Calendar, DollarSign, Heart } from "lucide-react";

export interface TravelFormData {
  city: string;
  days: number;
  budget: number;
  interests: string[];
}

interface TravelFormProps {
  onSubmit: (data: TravelFormData) => void;
  isLoading?: boolean;
}

const interestOptions = [
  { id: "heritage", label: "Heritage & History", icon: "🏛️" },
  { id: "food", label: "Food & Cuisine", icon: "🍽️" },
  { id: "adventure", label: "Adventure & Sports", icon: "🏔️" },
  { id: "culture", label: "Arts & Culture", icon: "🎨" },
  { id: "nature", label: "Nature & Parks", icon: "🌳" },
  { id: "shopping", label: "Shopping", icon: "🛍️" },
  { id: "nightlife", label: "Nightlife", icon: "🌃" },
  { id: "photography", label: "Photography", icon: "📸" }
];

export const TravelForm = ({ onSubmit, isLoading }: TravelFormProps) => {
  const [formData, setFormData] = useState<TravelFormData>({
    city: "",
    days: 3,
    budget: 5000,
    interests: []
  });

  const handleInterestChange = (interestId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      interests: checked 
        ? [...prev.interests, interestId]
        : prev.interests.filter(id => id !== interestId)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.city && formData.interests.length > 0) {
      onSubmit(formData);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent to-background py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <Card className="card-gradient travel-shadow-elevated border-0">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl font-bold text-foreground mb-2">
              Plan Your Perfect Trip
            </CardTitle>
            <p className="text-muted-foreground text-lg">
              Tell us about your travel preferences and we'll create a personalized itinerary
            </p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Destination */}
              <div className="space-y-3">
                <Label htmlFor="city" className="text-lg font-semibold flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Destination City
                </Label>
                <Input
                  id="city"
                  placeholder="e.g., Paris, Tokyo, New York"
                  value={formData.city}
                  onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                  className="text-lg py-6 rounded-xl border-border/50 focus:border-primary"
                  required
                />
              </div>

              {/* Duration and Budget */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-lg font-semibold flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Trip Duration
                  </Label>
                  <Select value={formData.days.toString()} onValueChange={(value) => 
                    setFormData(prev => ({ ...prev, days: parseInt(value) }))
                  }>
                    <SelectTrigger className="text-lg py-6 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1,2,3,4,5,6,7].map(day => (
                        <SelectItem key={day} value={day.toString()}>
                          {day} {day === 1 ? 'Day' : 'Days'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="budget" className="text-lg font-semibold flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-primary" />
                    Budget (₹)
                  </Label>
                  <Input
                    id="budget"
                    type="number"
                    min="1000"
                    step="500"
                    value={formData.budget}
                    onChange={(e) => setFormData(prev => ({ ...prev, budget: parseInt(e.target.value) || 0 }))}
                    className="text-lg py-6 rounded-xl border-border/50 focus:border-primary"
                  />
                </div>
              </div>

              {/* Interests */}
              <div className="space-y-4">
                <Label className="text-lg font-semibold flex items-center gap-2">
                  <Heart className="w-5 h-5 text-primary" />
                  What interests you? (Select at least one)
                </Label>
                <div className="grid grid-cols-2 gap-4">
                  {interestOptions.map((interest) => (
                    <div key={interest.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                      <Checkbox
                        id={interest.id}
                        checked={formData.interests.includes(interest.id)}
                        onCheckedChange={(checked) => handleInterestChange(interest.id, checked as boolean)}
                        className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      />
                      <Label htmlFor={interest.id} className="cursor-pointer flex items-center gap-2 text-sm font-medium">
                        <span className="text-lg">{interest.icon}</span>
                        {interest.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                disabled={!formData.city || formData.interests.length === 0 || isLoading}
                className="w-full py-6 text-lg font-semibold rounded-xl bg-primary hover:bg-primary/90 travel-glow transition-all duration-300"
              >
                {isLoading ? "Generating Your Itinerary..." : "Generate Itinerary"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};