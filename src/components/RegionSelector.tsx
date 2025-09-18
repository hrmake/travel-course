import { Button } from "@/components/ui/button";

interface RegionSelectorProps {
  selectedRegion: string | null;
  onRegionSelect: (region: string) => void;
}

const regions = [
  { id: "seoul", name: "서울", emoji: "🏙️" },
  { id: "busan", name: "부산", emoji: "🌊" },
  { id: "jeju", name: "제주", emoji: "🌺" },
  { id: "gyeongju", name: "경주", emoji: "🏛️" },
  { id: "daegu", name: "대구", emoji: "🌸" },
  { id: "incheon", name: "인천", emoji: "✈️" },
];

const RegionSelector = ({ selectedRegion, onRegionSelect }: RegionSelectorProps) => {
  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold text-foreground mb-4">어디로 떠나볼까요?</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {regions.map((region) => (
          <Button
            key={region.id}
            variant={selectedRegion === region.id ? "toss" : "outline"}
            className="flex flex-col items-center p-6 h-auto space-y-2 hover:bg-accent transition-colors duration-200"
            onClick={() => onRegionSelect(region.id)}
          >
            <span className="text-2xl">{region.emoji}</span>
            <span className="font-medium">{region.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default RegionSelector;