import { useState, useEffect } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ProductFiltersProps {
  onFiltersChange: (filters: FilterState) => void;
  className?: string;
}

export interface FilterState {
  categories: string[];
  priceRange: string;
  ageGroups: string[];
}

export default function ProductFilters({ onFiltersChange, className = '' }: ProductFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: '',
    ageGroups: []
  });

  useEffect(() => {
    onFiltersChange(filters);
  }, [filters, onFiltersChange]);

  const handleCategoryChange = (category: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      categories: checked 
        ? [...prev.categories, category]
        : prev.categories.filter(c => c !== category)
    }));
  };

  const handlePriceRangeChange = (value: string) => {
    setFilters(prev => ({
      ...prev,
      priceRange: value
    }));
  };

  const handleAgeGroupChange = (ageGroup: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      ageGroups: checked
        ? [...prev.ageGroups, ageGroup]
        : prev.ageGroups.filter(ag => ag !== ageGroup)
    }));
  };

  return (
    <Card className={`sticky top-24 ${className}`}>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Category Filters */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Category</h4>
          <div className="space-y-2">
            {[
              'Chemistry Sets',
              'Robotics Kits', 
              'Arduino Projects',
              'Lab Equipment',
              'Physics Kits'
            ].map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={category}
                  checked={filters.categories.includes(category)}
                  onCheckedChange={(checked) => 
                    handleCategoryChange(category, checked as boolean)
                  }
                />
                <Label 
                  htmlFor={category} 
                  className="text-gray-700 cursor-pointer"
                >
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
          <RadioGroup 
            value={filters.priceRange}
            onValueChange={handlePriceRangeChange}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="under-4000" id="under-4000" />
              <Label htmlFor="under-4000" className="text-gray-700">
                Under ₹4,000
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="4000-12000" id="4000-12000" />
              <Label htmlFor="4000-12000" className="text-gray-700">
                ₹4,000 - ₹12,000
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="over-12000" id="over-12000" />
              <Label htmlFor="over-12000" className="text-gray-700">
                Over ₹12,000
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Age Group */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Age Group</h4>
          <div className="space-y-2">
            {[
              'Elementary (6-11)',
              'Middle School (12-14)',
              'High School (15-18)',
              'College+'
            ].map((ageGroup) => (
              <div key={ageGroup} className="flex items-center space-x-2">
                <Checkbox
                  id={ageGroup}
                  checked={filters.ageGroups.includes(ageGroup)}
                  onCheckedChange={(checked) => 
                    handleAgeGroupChange(ageGroup, checked as boolean)
                  }
                />
                <Label 
                  htmlFor={ageGroup} 
                  className="text-gray-700 cursor-pointer"
                >
                  {ageGroup}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
