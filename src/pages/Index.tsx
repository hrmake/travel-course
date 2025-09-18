import { useState } from "react";
import Navigation from "@/components/Navigation";
import RegionSelector from "@/components/RegionSelector";
import PlaceCard from "@/components/PlaceCard";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter } from "lucide-react";

const Index = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = ["전체", "카페", "음식점", "관광지", "쇼핑"];

  const samplePlaces = [
    {
      id: "1",
      name: "경복궁",
      category: "관광지",
      rating: 4.8,
      address: "서울시 종로구 사직로 161",
      description: "조선 왕조의 첫 번째 정궁으로, 웅장한 건축미와 역사적 가치를 자랑합니다."
    },
    {
      id: "2", 
      name: "북촌한옥마을",
      category: "관광지",
      rating: 4.5,
      address: "서울시 종로구 계동길 37",
      description: "전통 한옥이 보존된 아름다운 마을로, 한국의 전통 문화를 체험할 수 있습니다."
    },
    {
      id: "3",
      name: "카페 온유",
      category: "카페", 
      rating: 4.7,
      address: "서울시 종로구 인사동길 12",
      description: "전통차와 현대적 감각이 어우러진 인사동의 대표 카페입니다."
    },
    {
      id: "4",
      name: "광장시장",
      category: "음식점",
      rating: 4.6,
      address: "서울시 종로구 창경궁로 88",
      description: "빈대떡, 마약김밥 등 서울의 대표 길거리 음식을 맛볼 수 있는 전통시장입니다."
    }
  ];

  const filteredPlaces = samplePlaces.filter(place => {
    const matchesSearch = place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         place.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === "전체" || place.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        <div className="text-center space-y-3 pt-4">
          <h1 className="text-3xl font-bold text-foreground">추천 여행지</h1>
          <p className="text-base text-muted-foreground">
            원하는 지역을 선택하고 특별한 장소들을 발견해보세요
          </p>
        </div>

        <RegionSelector 
          selectedRegion={selectedRegion}
          onRegionSelect={setSelectedRegion}
        />

        {selectedRegion && (
          <div className="space-y-6 animate-fadeIn">
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="장소명이나 키워드로 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Badge
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      className="cursor-pointer hover:bg-accent transition-colors"
                      onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Places Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPlaces.map((place) => (
                <PlaceCard key={place.id} place={place} />
              ))}
            </div>

            {filteredPlaces.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  검색 조건에 맞는 장소를 찾을 수 없습니다.
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;