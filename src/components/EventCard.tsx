import { Link } from "react-router-dom";
import { Calendar, MapPin, Users, ArrowRight, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EventCardProps {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  imageUrl: string;
  attendees: number;
  capacity: number;
  category: string;
  showJoinButton?: boolean;
  showAttendeeCount?: boolean;
}

const EventCard = ({
  id,
  title,
  description,
  date,
  time,
  location,
  imageUrl,
  attendees,
  capacity,
  category,
  showJoinButton = false,
  showAttendeeCount = false,
}: EventCardProps) => {
  const spotsLeft = capacity - attendees;
  const isFilling = spotsLeft < capacity * 0.3;

  return (
    <div className="group glass-card overflow-hidden hover:border-primary/30 transition-all duration-500 hover:shadow-[0_8px_40px_-8px_hsl(174_72%_56%/0.2)] hover:-translate-y-1">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 text-xs font-medium bg-primary/90 text-primary-foreground rounded-full backdrop-blur-sm">
            {category}
          </span>
        </div>

        {/* Spots indicator */}
        {isFilling && (
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 text-xs font-medium bg-amber-500/90 text-white rounded-full backdrop-blur-sm animate-pulse">
              Filling Fast
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        <div>
          <h3 className="text-lg font-display font-semibold text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        </div>

        {/* Event Details */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 text-primary" />
            <span>{date} • {time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="line-clamp-1">{location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="w-4 h-4 text-primary" />
            <span>{attendees} attending • {spotsLeft} spots left</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-[hsl(190_80%_45%)] rounded-full transition-all duration-500"
            style={{ width: `${(attendees / capacity) * 100}%` }}
          />
        </div>

        {/* Attendee count for organizers */}
        {showAttendeeCount && (
          <div className="flex items-center gap-2 p-3 bg-primary/10 rounded-lg border border-primary/20">
            <UserCheck className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-foreground">
              {attendees} student{attendees !== 1 ? "s" : ""} joined
            </span>
          </div>
        )}

        {/* CTA */}
        <Button 
          variant={showJoinButton ? "hero" : "outline"} 
          className="w-full group/btn" 
          asChild
        >
          <Link to={`/events/${id}`}>
            {showJoinButton ? "Join Event" : "View Details"}
            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default EventCard;
