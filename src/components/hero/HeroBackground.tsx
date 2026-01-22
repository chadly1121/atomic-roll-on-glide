import React from 'react';

const HeroBackground = () => {
  return (
    <>
      {/* Simplified background - hidden on mobile for performance */}
      <div className="hidden md:block atomic-circle w-64 h-64 -top-20 -left-20 border-atomic-orange"></div>
      <div className="hidden md:block atomic-circle w-96 h-96 -bottom-40 -right-20 border-atomic-turquoise"></div>
    </>
  );
};

export default HeroBackground;
