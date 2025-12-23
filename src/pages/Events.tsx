import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import { Search, SlidersHorizontal, Calendar, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface Event {
  id: string;
  title: string;
  description: string | null;
  date: string;
  time: string;
  location: string;
  image_url: string | null;
  capacity: number;
  category: string | null;
  organizer_id: string;
}

interface EventWithRsvp extends Event {
  rsvpCount: number;
}

const categories = ["All", "Technology", "Design", "Networking", "Entertainment", "Business", "Wellness", "Tech", "Music"];

const Events = () => {
  const { user, isOrganizer, isStudent, loading: authLoading } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [events, setEvents] = useState<EventWithRsvp[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data: eventsData, error } = await supabase
        .from("events")
        .select("*")
        .order("date", { ascending: true });

      if (error) throw error;

      // Fetch RSVP counts for each event
      const eventsWithRsvp: EventWithRsvp[] = await Promise.all(
        (eventsData || []).map(async (event) => {
          const { count } = await supabase
            .from("rsvps")
            .select("*", { count: "exact", head: true })
            .eq("event_id", event.id)
            .eq("status", "going");

          return {
            ...event,
            rsvpCount: count || 0,
          };
        })
      );

      setEvents(eventsWithRsvp);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (event.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "All" || event.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Helmet>
        <title>Discover Events - EventHub</title>
        <meta name="description" content="Browse and discover amazing events near you. From tech conferences to creative workshops, find the perfect event." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            {/* Page Header */}
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
                Discover <span className="gradient-text">Events</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                {isStudent
                  ? "Browse and join amazing events happening around you"
                  : isOrganizer
                  ? "Manage your events and see how many students have joined"
                  : "Find and join amazing events happening around you"}
              </p>

              {/* Create Event Button for Organizers */}
              {isOrganizer && (
                <Button variant="hero" className="mt-6" asChild>
                  <Link to="/create-event">
                    <Plus className="w-5 h-5 mr-2" />
                    Create Your Event
                  </Link>
                </Button>
              )}
            </div>

            {/* Search and Filters */}
            <div className="glass-card p-4 mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search Input */}
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search events, locations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-12 pl-12 pr-4 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  />
                </div>

                {/* Filter Toggle */}
                <Button
                  variant={showFilters ? "default" : "outline"}
                  className="h-12 md:w-auto"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </div>

              {/* Expanded Filters */}
              {showFilters && (
                <div className="mt-4 pt-4 border-t border-border animate-fade-in">
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          selectedCategory === category
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                Showing <span className="text-foreground font-medium">{filteredEvents.length}</span> events
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>Sorted by date</span>
              </div>
            </div>

            {/* Events Grid */}
            {loading ? (
              <div className="text-center py-16">
                <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-muted-foreground mt-4">Loading events...</p>
              </div>
            ) : filteredEvents.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredEvents.map((event, index) => (
                  <div
                    key={event.id}
                    className="animate-fade-in-up opacity-0"
                    style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'forwards' }}
                  >
                    <EventCard
                      id={event.id}
                      title={event.title}
                      description={event.description || ""}
                      date={formatDate(event.date)}
                      time={formatTime(event.time)}
                      location={event.location}
                      imageUrl={event.image_url || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800"}
                      attendees={event.rsvpCount}
                      capacity={event.capacity}
                      category={event.category || "General"}
                      showJoinButton={isStudent}
                      showAttendeeCount={isOrganizer}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                  No events found
                </h3>
                <p className="text-muted-foreground mb-6">
                  {isOrganizer 
                    ? "Create your first event to get started!" 
                    : "Try adjusting your search or filters"}
                </p>
                {isOrganizer ? (
                  <Button variant="hero" asChild>
                    <Link to="/create-event">
                      <Plus className="w-5 h-5 mr-2" />
                      Create Your First Event
                    </Link>
                  </Button>
                ) : (
                  <Button variant="outline" onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}>
                    Clear Filters
                  </Button>
                )}
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Events;
