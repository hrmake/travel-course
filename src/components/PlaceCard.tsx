import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star } from "lucide-react";

interface Place {
  id: string;
  name: string;
  category: string;
  rating: number;
  address: string;
  description: string;
  image?: string;
}

interface PlaceCardProps {
  place: Place;
}

const PlaceCard = ({ place }: PlaceCardProps) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "카페": return "bg-amber-100 text-amber-800";
      case "음식점": return "bg-orange-100 text-orange-800";
      case "관광지": return "bg-blue-100 text-blue-800";
      case "쇼핑": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="group hover:shadow-hover transition-all duration-300 cursor-pointer bg-gradient-card border-0 shadow-soft">
      <CardContent className="p-0">
        <div className="aspect-video bg-muted rounded-t-lg flex items-center justify-center overflow-hidden">
          {place.image ? (
            <img 
              src={place.image} 
              alt={place.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="text-muted-foreground text-center">
              <MapPin className="h-12 w-12 mx-auto mb-2" />
              <p className="text-sm">이미지 준비중</p>
            </div>
          )}
        </div>
        
        <div className="p-4 space-y-3">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
              {place.name}
            </h3>
            <Badge className={getCategoryColor(place.category)}>
              {place.category}
            </Badge>
          </div>
          
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-foreground font-medium">{place.rating}</span>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2">
            {place.description}
          </p>
          
          <div className="flex items-center text-xs text-muted-foreground">
            <MapPin className="h-3 w-3 mr-1" />
            <span>{place.address}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlaceCard;