
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const PricingCalculator = () => {
  const [projectType, setProjectType] = useState<string>('interior');
  const [squareFootage, setSquareFootage] = useState<string>('');
  const [rooms, setRooms] = useState<string>('');
  const [wallCondition, setWallCondition] = useState<string>('good');
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  
  const calculatePrice = () => {
    if (!squareFootage || isNaN(parseFloat(squareFootage))) {
      return;
    }
    
    const sqft = parseFloat(squareFootage);
    let baseRate = 0;
    
    // Base rates per square foot
    switch (projectType) {
      case 'interior':
        baseRate = 4.5;
        break;
      case 'exterior':
        baseRate = 5.75;
        break;
      case 'commercial':
        baseRate = 5.75;
        break;
      case 'cabinet':
        baseRate = 35; // per linear foot instead
        break;
      default:
        baseRate = 4.5;
    }
    
    // Adjustments based on wall condition
    let conditionMultiplier = 1;
    switch (wallCondition) {
      case 'poor':
        conditionMultiplier = 1.3; // 30% more for poor condition
        break;
      case 'fair':
        conditionMultiplier = 1.15; // 15% more for fair condition
        break;
      default:
        conditionMultiplier = 1;
    }
    
    // Calculate total
    let total = 0;
    
    if (projectType === 'cabinet') {
      total = sqft * baseRate; // Linear feet for cabinets
    } else {
      total = sqft * baseRate * conditionMultiplier;
      
      // Add complexity based on number of rooms (if provided)
      if (rooms && !isNaN(parseInt(rooms))) {
        const roomCount = parseInt(rooms);
        if (roomCount > 3) {
          total += (roomCount - 3) * 100; // Additional complexity charge per room over 3
        }
      }
    }
    
    setEstimatedPrice(Math.round(total));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculatePrice();
  };
  
  return (
    <Card className="max-w-2xl mx-auto border-1 shadow-md">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            This calculator provides an estimate based on average project costs. For an accurate quote, please <a href="#contact" className="text-atomic-turquoise hover:underline">contact us</a>.
          </p>
          
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="projectType">Project Type</Label>
                <Select
                  value={projectType}
                  onValueChange={setProjectType}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="interior">Interior Painting</SelectItem>
                    <SelectItem value="exterior">Exterior Painting</SelectItem>
                    <SelectItem value="commercial">Commercial Painting</SelectItem>
                    <SelectItem value="cabinet">Cabinet Refinishing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="squareFootage">
                  {projectType === 'cabinet' ? 'Linear Footage (Cabinets)' : 'Square Footage'}
                </Label>
                <Input
                  id="squareFootage"
                  type="number"
                  placeholder="Enter square footage"
                  value={squareFootage}
                  onChange={(e) => setSquareFootage(e.target.value)}
                  min="1"
                />
              </div>
              
              {projectType !== 'cabinet' && (
                <div className="grid gap-2">
                  <Label htmlFor="rooms">Number of Rooms (Optional)</Label>
                  <Input
                    id="rooms"
                    type="number"
                    placeholder="Enter number of rooms"
                    value={rooms}
                    onChange={(e) => setRooms(e.target.value)}
                    min="1"
                  />
                </div>
              )}
              
              <div className="grid gap-2">
                <Label>Surface Condition</Label>
                <RadioGroup
                  value={wallCondition}
                  onValueChange={setWallCondition}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="good" id="good" />
                    <Label htmlFor="good" className="cursor-pointer">Good</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="fair" id="fair" />
                    <Label htmlFor="fair" className="cursor-pointer">Fair</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="poor" id="poor" />
                    <Label htmlFor="poor" className="cursor-pointer">Poor</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <button 
                type="submit"
                className="atomic-button w-full py-4"
              >
                <span className="relative z-10">Calculate Estimate</span>
              </button>
            </div>
          </form>
          
          {estimatedPrice !== null && (
            <div className="mt-6 p-4 rounded-lg bg-atomic-turquoise/10 text-center">
              <h4 className="text-lg font-bold mb-1">Estimated Cost</h4>
              <p className="text-3xl font-bold text-atomic-turquoise">${estimatedPrice.toLocaleString()}</p>
              <p className="text-sm text-gray-500 mt-2">
                This is a rough estimate. For an accurate quote, please contact us.
              </p>
            </div>
          )}
          
          <div className="border-t pt-4 mt-4">
            <p className="text-center">
              <span className="block font-medium">Need a professional quote?</span>
              <a 
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  if (window.location.pathname === '/') {
                    document.querySelector('#contact')?.scrollIntoView({behavior: 'smooth'});
                  } else {
                    window.location.href = '/#contact';
                  }
                }}
                className="text-atomic-orange hover:underline"
              >
                Contact us directly
              </a>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PricingCalculator;
