import { Itinerary } from "@/components/ItineraryDisplay";

export const generateMockItinerary = (city: string, days: number, budget: number, interests: string[]): Itinerary => {
  const mockActivities = {
    heritage: [
      { place: "Historic Fort", cost: 200, note: "Best visited early morning to avoid crowds" },
      { place: "Ancient Temple", cost: 50, note: "Dress modestly and remove shoes" },
      { place: "Palace Museum", cost: 300, note: "Audio guide recommended for rich history" },
      { place: "Archaeological Site", cost: 150, note: "Carry water and wear comfortable shoes" },
      { place: "Heritage Walk", cost: 500, note: "Guided tour includes traditional stories" }
    ],
    food: [
      { place: "Local Street Food Market", cost: 400, note: "Try the famous local delicacies" },
      { place: "Traditional Restaurant", cost: 800, note: "Reservations recommended for dinner" },
      { place: "Cooking Class", cost: 1200, note: "Learn to make authentic regional dishes" },
      { place: "Food Tour", cost: 1000, note: "Includes 5-6 different local eateries" },
      { place: "Rooftop Cafe", cost: 600, note: "Great city views with your meal" }
    ],
    adventure: [
      { place: "Mountain Hiking Trail", cost: 300, note: "Start early to catch the sunrise" },
      { place: "River Rafting", cost: 1500, note: "Life jackets provided, bring extra clothes" },
      { place: "Rock Climbing", cost: 1200, note: "All equipment included, suitable for beginners" },
      { place: "Paragliding", cost: 2000, note: "Weather dependent, book in advance" },
      { place: "Zip Lining", cost: 800, note: "Thrilling experience with scenic views" }
    ],
    culture: [
      { place: "Art Gallery", cost: 200, note: "Features contemporary local artists" },
      { place: "Cultural Performance", cost: 600, note: "Traditional dance and music show" },
      { place: "Handicraft Workshop", cost: 800, note: "Create your own souvenir" },
      { place: "Local Festival", cost: 100, note: "Immerse in authentic cultural celebration" },
      { place: "Music Concert", cost: 1000, note: "Local musicians performing traditional songs" }
    ],
    nature: [
      { place: "Botanical Garden", cost: 100, note: "Best time to visit is early morning" },
      { place: "National Park", cost: 400, note: "Guided safari includes wildlife spotting" },
      { place: "Waterfall Trek", cost: 300, note: "Moderate difficulty, carry snacks and water" },
      { place: "Lake Boat Ride", cost: 250, note: "Peaceful experience, especially at sunset" },
      { place: "Bird Watching", cost: 200, note: "Binoculars provided, ideal during dawn" }
    ],
    shopping: [
      { place: "Local Bazaar", cost: 800, note: "Perfect for souvenirs and local crafts" },
      { place: "Artisan Market", cost: 600, note: "Handmade items directly from creators" },
      { place: "Shopping Mall", cost: 1200, note: "Modern amenities with global brands" },
      { place: "Antique Store", cost: 1500, note: "Unique vintage finds and collectibles" },
      { place: "Textile Shop", cost: 1000, note: "Traditional fabrics and clothing" }
    ],
    nightlife: [
      { place: "Rooftop Bar", cost: 1200, note: "Great cocktails with panoramic city views" },
      { place: "Night Market", cost: 500, note: "Street food and shopping after dark" },
      { place: "Live Music Venue", cost: 800, note: "Local bands and intimate atmosphere" },
      { place: "Dance Club", cost: 1000, note: "Popular spot, dress code applies" },
      { place: "Night Tour", cost: 700, note: "See the city's illuminated landmarks" }
    ],
    photography: [
      { place: "Scenic Viewpoint", cost: 100, note: "Golden hour lighting is spectacular" },
      { place: "Photography Walk", cost: 600, note: "Professional guide shows best spots" },
      { place: "Sunrise Spot", cost: 200, note: "Early start required but worth the effort" },
      { place: "Architecture Tour", cost: 500, note: "Focus on historical and modern buildings" },
      { place: "Portrait Session", cost: 800, note: "Local photographer captures your trip" }
    ]
  };

  const timeSlots = ["9:00–11:00 AM", "11:30 AM–1:00 PM", "2:00–4:00 PM", "4:30–6:30 PM", "7:00–9:00 PM"];
  
  const dayPlans = [];
  let totalCost = 0;

  for (let dayNum = 1; dayNum <= days; dayNum++) {
    const dayActivities = [];
    const usedActivities = new Set();
    const dailyBudget = budget / days;
    let dailyCost = 0;
    
    // Generate 3-4 activities per day
    const activitiesPerDay = Math.min(4, Math.max(3, Math.floor(dailyBudget / 400)));
    
    for (let activityIndex = 0; activityIndex < activitiesPerDay; activityIndex++) {
      // Pick a random interest
      const interest = interests[Math.floor(Math.random() * interests.length)];
      const availableActivities = mockActivities[interest as keyof typeof mockActivities] || mockActivities.heritage;
      
      // Find an unused activity
      let attempts = 0;
      let selectedActivity;
      do {
        selectedActivity = availableActivities[Math.floor(Math.random() * availableActivities.length)];
        attempts++;
      } while (usedActivities.has(selectedActivity.place) && attempts < 10);
      
      if (!usedActivities.has(selectedActivity.place)) {
        usedActivities.add(selectedActivity.place);
        
        const activity = {
          place: selectedActivity.place,
          time: timeSlots[activityIndex] || timeSlots[timeSlots.length - 1],
          cost: Math.min(selectedActivity.cost, dailyBudget - dailyCost),
          note: selectedActivity.note,
          category: interest
        };
        
        dayActivities.push(activity);
        dailyCost += activity.cost;
      }
    }
    
    dayPlans.push({
      day: dayNum,
      activities: dayActivities
    });
    
    totalCost += dailyCost;
  }

  return {
    city,
    days: dayPlans,
    estimatedTotal: Math.min(totalCost, budget),
    interests
  };
};