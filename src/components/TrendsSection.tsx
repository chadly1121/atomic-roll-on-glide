
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TrendItem {
  id: number;
  title: string;
  description: string;
  image: string;
}

const colorTrends: TrendItem[] = [
  {
    id: 1,
    title: "Sage Green",
    description: "This calming, nature-inspired hue brings the outdoors in, creating a refreshing atmosphere in any room.",
    image: "https://www.roll-onpainting.com/wp-content/uploads/2020/12/interior-paint-5-e1608121023242.jpg"
  },
  {
    id: 2,
    title: "Terracotta",
    description: "This warm, earthy tone adds coziness and a touch of Mediterranean flair to your space.",
    image: "https://www.roll-onpainting.com/wp-content/uploads/2020/12/interior-paint-3-scaled.jpg"
  },
  {
    id: 3,
    title: "Muted Blue",
    description: "Soft, dusty blues create a serene environment perfect for bedrooms and living spaces.",
    image: "https://www.roll-onpainting.com/wp-content/uploads/2020/12/interior-painting-process3-scaled.jpg"
  }
];

const styleTrends: TrendItem[] = [
  {
    id: 1,
    title: "Color Blocking",
    description: "Create visual interest by painting geometric shapes or blocks of color on your walls.",
    image: "https://www.roll-onpainting.com/wp-content/uploads/2020/12/interior-painting-process3-scaled.jpg"
  },
  {
    id: 2,
    title: "Textured Finishes",
    description: "Add depth and character to your walls with textured paint techniques.",
    image: "https://www.roll-onpainting.com/wp-content/uploads/2020/12/interior-paint-3-scaled.jpg"
  },
  {
    id: 3,
    title: "Two-Tone Walls",
    description: "Split your walls horizontally with contrasting colors for a modern, designer look.",
    image: "https://www.roll-onpainting.com/wp-content/uploads/2020/12/exterior-painting-5-scaled.jpg"
  }
];

const techniqueTrends: TrendItem[] = [
  {
    id: 1,
    title: "Limewash",
    description: "This ancient technique creates a matte, textured finish with subtle color variations.",
    image: "https://www.roll-onpainting.com/wp-content/uploads/2020/12/services_feature3.jpg"
  },
  {
    id: 2,
    title: "Venetian Plaster",
    description: "Achieve an elegant, marble-like finish with this sophisticated painting technique.",
    image: "https://www.roll-onpainting.com/wp-content/uploads/2020/12/interior-paint-5-e1608121023242.jpg"
  },
  {
    id: 3,
    title: "Color Washing",
    description: "Create a soft, watercolor effect on your walls for a subtle, artistic look.",
    image: "https://www.roll-onpainting.com/wp-content/uploads/2020/12/commercial-painting.jpg"
  }
];

const TrendsSection = () => {
  return (
    <section id="trends" className="py-24 relative overflow-hidden">
      <div className="atomic-circle w-80 h-80 -bottom-40 -right-20 border-atomic-orange/30"></div>
      <div className="atomic-starburst w-72 h-72 top-20 left-1/4"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-heading">Paint Trends</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Stay ahead with the latest painting trends and innovative techniques for your next project.
          </p>
        </div>
        
        <Tabs defaultValue="colors" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-12">
            <TabsTrigger value="colors" className="text-base">Color Trends</TabsTrigger>
            <TabsTrigger value="styles" className="text-base">Style Trends</TabsTrigger>
            <TabsTrigger value="techniques" className="text-base">Techniques</TabsTrigger>
          </TabsList>
          
          <TabsContent value="colors">
            <div className="grid md:grid-cols-3 gap-6">
              {colorTrends.map(trend => (
                <div key={trend.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={trend.image} 
                      alt={trend.title} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-atomic-navy">{trend.title}</h3>
                    <p className="text-gray-600">{trend.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="styles">
            <div className="grid md:grid-cols-3 gap-6">
              {styleTrends.map(trend => (
                <div key={trend.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={trend.image} 
                      alt={trend.title} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-atomic-navy">{trend.title}</h3>
                    <p className="text-gray-600">{trend.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="techniques">
            <div className="grid md:grid-cols-3 gap-6">
              {techniqueTrends.map(trend => (
                <div key={trend.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={trend.image} 
                      alt={trend.title} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-atomic-navy">{trend.title}</h3>
                    <p className="text-gray-600">{trend.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="text-center mt-12">
          <p className="mb-4 text-gray-600">Want to incorporate these trends in your space?</p>
          <a 
            href="#contact" 
            className="atomic-button"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span className="relative z-10">Schedule a Consultation</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default TrendsSection;
