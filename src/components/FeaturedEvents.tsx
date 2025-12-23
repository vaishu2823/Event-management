import EventCard from "./EventCard";

const mockEvents = [
  {
    id: "1",
    title: "Tech Innovation Summit 2024",
    description: "Join industry leaders for a day of insights into emerging technologies, AI, and the future of digital transformation.",
    date: "Jan 15, 2024",
    time: "9:00 AM",
    location: "San Francisco Convention Center",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop",
    attendees: 342,
    capacity: 500,
    category: "Technology",
  },
  {
    id: "2",
    title: "Creative Design Workshop",
    description: "A hands-on workshop exploring the latest design trends, tools, and techniques with expert mentors.",
    date: "Jan 20, 2024",
    time: "2:00 PM",
    location: "Downtown Art Gallery, NYC",
    imageUrl: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop",
    attendees: 45,
    capacity: 50,
    category: "Design",
  },
  {
    id: "3",
    title: "Startup Networking Mixer",
    description: "Connect with fellow entrepreneurs, investors, and industry professionals in a relaxed evening setting.",
    date: "Jan 25, 2024",
    time: "6:00 PM",
    location: "The Rooftop Lounge, Austin",
    imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop",
    attendees: 120,
    capacity: 200,
    category: "Networking",
  },
  {
    id: "4",
    title: "Music & Arts Festival",
    description: "A weekend celebration of live music, art installations, and cultural performances from around the world.",
    date: "Feb 10, 2024",
    time: "12:00 PM",
    location: "Central Park, Los Angeles",
    imageUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&auto=format&fit=crop",
    attendees: 2100,
    capacity: 3000,
    category: "Entertainment",
  },
  {
    id: "5",
    title: "Leadership & Management Bootcamp",
    description: "An intensive 2-day program designed for aspiring leaders and managers to develop essential skills.",
    date: "Feb 15, 2024",
    time: "8:30 AM",
    location: "Business Hub, Chicago",
    imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop",
    attendees: 28,
    capacity: 30,
    category: "Business",
  },
  {
    id: "6",
    title: "Wellness & Yoga Retreat",
    description: "Escape the city for a rejuvenating weekend of yoga, meditation, and wellness activities.",
    date: "Feb 22, 2024",
    time: "7:00 AM",
    location: "Mountain View Resort, Colorado",
    imageUrl: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&auto=format&fit=crop",
    attendees: 35,
    capacity: 40,
    category: "Wellness",
  },
];

const FeaturedEvents = () => {
  return (
    <section className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            Discover Events
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-3 mb-4">
            Upcoming Events Near You
          </h2>
          <p className="text-muted-foreground">
            From tech conferences to creative workshops, find the perfect event 
            to learn, connect, and grow.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockEvents.map((event, index) => (
            <div
              key={event.id}
              className="animate-fade-in-up opacity-0"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
            >
              <EventCard {...event} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents;
