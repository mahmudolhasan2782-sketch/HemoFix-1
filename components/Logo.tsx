import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Logo Icon Container */}
      <div className="relative w-12 h-12 bg-brand-orange rounded-lg overflow-hidden shadow-md flex items-end justify-center">
        {/* Shark Fin / Abstract Shape */}
        <svg viewBox="0 0 100 100" className="w-full h-full p-1" preserveAspectRatio="none">
           {/* Purple Fin */}
           <path d="M20,80 Q35,10 80,45 L80,80 Z" fill="#6D597A" />
           {/* Waves */}
           <path d="M10,75 Q25,85 40,75 T70,75 T100,75 V90 H10 Z" fill="#7C6A8A" opacity="0.8" />
           <path d="M10,82 Q25,92 40,82 T70,82 T100,82 V95 H10 Z" fill="#584863" />
        </svg>
      </div>
      
      {/* Text Brand */}
      <div className="flex flex-col">
        <span className="text-2xl font-bold text-brand-deepPurple leading-none" style={{ fontFamily: 'cursive' }}>Hemontu Inco.</span>
        <span className="text-xs font-semibold text-brand-darkOrange tracking-widest uppercase">HemoFix</span>
      </div>
    </div>
  );
};