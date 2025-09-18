import { useState } from "react";
import Navigation from "@/components/Navigation";
import RegionSelector from "@/components/RegionSelector";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Route as RouteIcon } from "lucide-react";

const Routes = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showRoute, setShowRoute] = useState(false);

  const categories = [
    { id: "cafe", name: "카페", emoji: "☕" },
    { id: "restaurant", name: "음식점", emoji: "🍽️" },
    { id: "tourist", name: "관광지", emoji: "🏛️" },
    { id: "shopping", name: "쇼핑", emoji: "🛍️" },
    { id: "nature", name: "자연", emoji: "🌳" },
    { id: "culture", name: "문화", emoji: "🎭" },
  ];

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const generateRoute = () => {
    if (selectedRegion && selectedCategories.length > 0) {
      setShowRoute(true);
    }
  };

  const sampleRoute = [
    { name: "경복궁", time: "09:00", duration: "2시간", category: "관광지" },
    { name: "북촌한옥마을", time: "11:30", duration: "1시간", category: "관광지" },
    { name: "인사동 전통찻집", time: "13:00", duration: "1시간", category: "카페" },
    { name: "명동 칼국수", time: "14:30", duration: "1시간", category: "음식점" },
    { name: "명동 쇼핑거리", time: "16:00", duration: "2시간", category: "쇼핑" },
  ];

  return (
    <div className="min-h-screen bg-gradient-background">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <div className="text-center space-y-4 animate-fadeIn">
          <h1 className="text-4xl font-bold text-foreground">
            맞춤 여행 루트 추천
          </h1>
          <p className="text-lg text-muted-foreground">
            원하는 지역과 장소 유형을 선택하면 최적의 여행 루트를 제안해드립니다
          </p>
        </div>

        <Card className="shadow-soft border-0 bg-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <RouteIcon className="h-5 w-5 text-primary" />
              <span>루트 설정</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <RegionSelector 
              selectedRegion={selectedRegion}
              onRegionSelect={setSelectedRegion}
            />

            {selectedRegion && (
              <div className="space-y-4 animate-fadeIn">
                <h3 className="text-lg font-semibold text-foreground">
                  관심 있는 장소 유형을 선택하세요 (복수 선택 가능)
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategories.includes(category.id) ? "travel" : "outline"}
                      className="flex flex-col items-center p-4 h-auto space-y-2"
                      onClick={() => handleCategoryToggle(category.id)}
                    >
                      <span className="text-xl">{category.emoji}</span>
                      <span className="font-medium">{category.name}</span>
                    </Button>
                  ))}
                </div>

                {selectedCategories.length > 0 && (
                  <div className="flex justify-center pt-4">
                    <Button 
                      variant="hero"
                      size="lg"
                      onClick={generateRoute}
                    >
                      여행 루트 생성하기
                    </Button>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {showRoute && (
          <Card className="shadow-soft border-0 bg-card animate-fadeIn">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span>추천 여행 루트</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sampleRoute.map((stop, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-gradient-card rounded-lg shadow-soft">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                      {index + 1}
                    </div>
                    <div className="flex-1 space-y-1">
                      <h4 className="font-semibold text-foreground">{stop.name}</h4>
                      <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{stop.time}</span>
                        </div>
                        <span>•</span>
                        <span>{stop.duration}</span>
                      </div>
                    </div>
                    <Badge className="bg-accent/10 text-accent">
                      {stop.category}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Routes;