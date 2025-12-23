import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Share2, 
  Heart, 
  ArrowLeft,
  CheckCircle2,
  XCircle,
  HelpCircle
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet-async";

const mockEvent = {
  id: "1",
  title: "Tech Innovation Summit 2024",
  description: `Join industry leaders and innovators for an extraordinary day of insights, networking, and discovery at the Tech Innovation Summit 2024.

This flagship event brings together the brightest minds in technology to explore emerging trends, breakthrough innovations, and the future of digital transformation.

What to expect:
• Keynote speeches from tech industry pioneers
• Interactive workshops on AI, blockchain, and cloud computing  
• Networking sessions with 500+ professionals
• Live product demonstrations and startup pitches
• Exclusive access to our innovation showcase

Whether you're a developer, entrepreneur, or tech enthusiast, this summit offers invaluable opportunities to learn, connect, and stay ahead of the curve.`,
  date: "January 15, 2024",
  time: "9:00 AM - 6:00 PM PST",
  location: "San Francisco Convention Center",
  address: "747 Howard St, San Francisco, CA 94103",
  imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop",
  attendees: 342,
  capacity: 500,
  category: "Technology",
  organizer: {
    name: "TechEvents Inc.",
    avatar: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&auto=format&fit=crop",
  },
  speakers: [
    { name: "Sarah Chen", role: "AI Research Lead", company: "OpenAI" },
    { name: "Marcus Johnson", role: "CTO", company: "Stripe" },
    { name: "Emily Park", role: "VP Engineering", company: "Notion" },
  ],
};

type RSVPStatus = "going" | "not_going" | "maybe" | null;

const EventDetails = () => {
  const { id } = useParams();
  const [rsvpStatus, setRsvpStatus] = useState<RSVPStatus>(null);
  const [isLiked, setIsLiked] = useState(false);
  const { toast } = useToast();

  const spotsLeft = mockEvent.capacity - mockEvent.attendees;

  const handleRSVP = (status: RSVPStatus) => {
    setRsvpStatus(status);
    
    const messages = {
      going: "You're going! We'll send you a confirmation email.",
      not_going: "No problem! Maybe next time.",
      maybe: "We've noted your interest. Hope to see you there!",
    };

    toast({
      title: status === "going" ? "RSVP Confirmed! 🎉" : "RSVP Updated",
      description: messages[status!],
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied!",
      description: "Event link copied to clipboard.",
    });
  };

  return (
    <>
      <Helmet>
        <title>{mockEvent.title} - EventHub</title>
        <meta name="description" content={mockEvent.description.substring(0, 160)} />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-20">
          {/* Hero Image */}
          <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
            <img
              src={mockEvent.imageUrl}
              alt={mockEvent.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
            
            {/* Back Button */}
            <div className="absolute top-6 left-6">
              <Link
                to="/events"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-background/80 backdrop-blur-sm text-foreground hover:bg-background transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Events
              </Link>
            </div>

            {/* Category Badge */}
            <div className="absolute top-6 right-6">
              <span className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg">
                {mockEvent.category}
              </span>
            </div>
          </div>

          <div className="container mx-auto px-4 -mt-24 relative z-10 pb-16">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Title Card */}
                <div className="glass-card-elevated p-6 md:p-8">
                  <h1 className="text-2xl md:text-4xl font-display font-bold text-foreground mb-4">
                    {mockEvent.title}
                  </h1>
                  
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-5 h-5 text-primary" />
                      <span>{mockEvent.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-5 h-5 text-primary" />
                      <span>{mockEvent.time}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 text-muted-foreground mb-6">
                    <MapPin className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-foreground font-medium">{mockEvent.location}</p>
                      <p className="text-sm">{mockEvent.address}</p>
                    </div>
                  </div>

                  {/* Organizer */}
                  <div className="flex items-center gap-3 pt-6 border-t border-border">
                    <img
                      src={mockEvent.organizer.avatar}
                      alt={mockEvent.organizer.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20"
                    />
                    <div>
                      <p className="text-sm text-muted-foreground">Organized by</p>
                      <p className="font-medium text-foreground">{mockEvent.organizer.name}</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="glass-card p-6 md:p-8">
                  <h2 className="text-xl font-display font-semibold text-foreground mb-4">
                    About This Event
                  </h2>
                  <div className="prose prose-invert max-w-none">
                    {mockEvent.description.split('\n').map((paragraph, index) => (
                      <p key={index} className="text-muted-foreground mb-4 last:mb-0">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Speakers */}
                <div className="glass-card p-6 md:p-8">
                  <h2 className="text-xl font-display font-semibold text-foreground mb-6">
                    Featured Speakers
                  </h2>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {mockEvent.speakers.map((speaker, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-xl bg-secondary/50 border border-border text-center"
                      >
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent mx-auto mb-3 flex items-center justify-center text-2xl font-bold text-primary-foreground">
                          {speaker.name.charAt(0)}
                        </div>
                        <h3 className="font-medium text-foreground">{speaker.name}</h3>
                        <p className="text-sm text-muted-foreground">{speaker.role}</p>
                        <p className="text-sm text-primary">{speaker.company}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* RSVP Card */}
                <div className="glass-card-elevated p-6 sticky top-24">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-primary" />
                      <span className="font-medium text-foreground">
                        {mockEvent.attendees} attending
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {spotsLeft} spots left
                    </span>
                  </div>

                  {/* Capacity Bar */}
                  <div className="h-2 bg-secondary rounded-full overflow-hidden mb-6">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-[hsl(190_80%_45%)] rounded-full transition-all duration-500"
                      style={{ width: `${(mockEvent.attendees / mockEvent.capacity) * 100}%` }}
                    />
                  </div>

                  {/* RSVP Buttons */}
                  <div className="space-y-3 mb-6">
                    <p className="text-sm text-muted-foreground text-center mb-4">
                      Will you be attending?
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        variant={rsvpStatus === "going" ? "success" : "outline"}
                        className="flex flex-col items-center gap-1 h-auto py-3"
                        onClick={() => handleRSVP("going")}
                      >
                        <CheckCircle2 className="w-5 h-5" />
                        <span className="text-xs">Going</span>
                      </Button>
                      <Button
                        variant={rsvpStatus === "maybe" ? "warning" : "outline"}
                        className="flex flex-col items-center gap-1 h-auto py-3"
                        onClick={() => handleRSVP("maybe")}
                      >
                        <HelpCircle className="w-5 h-5" />
                        <span className="text-xs">Maybe</span>
                      </Button>
                      <Button
                        variant={rsvpStatus === "not_going" ? "destructive" : "outline"}
                        className="flex flex-col items-center gap-1 h-auto py-3"
                        onClick={() => handleRSVP("not_going")}
                      >
                        <XCircle className="w-5 h-5" />
                        <span className="text-xs">Can't Go</span>
                      </Button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setIsLiked(!isLiked)}
                    >
                      <Heart className={`w-4 h-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                      Save
                    </Button>
                    <Button variant="outline" className="flex-1" onClick={handleShare}>
                      <Share2 className="w-4 h-4" />
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default EventDetails;
