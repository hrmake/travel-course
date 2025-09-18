import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Route } from "lucide-react";

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="bg-card shadow-soft border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <MapPin className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">여행가이드</span>
            </Link>
            
            <div className="hidden md:flex space-x-4">
              <Link to="/">
                <Button
                  variant={location.pathname === "/" ? "default" : "ghost"}
                  className="font-medium"
                >
                  추천 장소
                </Button>
              </Link>
              <Link to="/routes">
                <Button
                  variant={location.pathname === "/routes" ? "default" : "ghost"}
                  className="font-medium"
                >
                  <Route className="h-4 w-4 mr-1" />
                  루트 추천
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;