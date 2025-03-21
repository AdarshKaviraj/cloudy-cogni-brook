
import React from 'react';
import AIProcessingButton from '@/components/AIProcessingButton';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 p-4 sm:p-8">
      <div className="w-full max-w-3xl mx-auto text-center mb-12">
        <div className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-medium tracking-wider mb-4 animate-fade-in">
          AI AGENT DEMO
        </div>
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-900 mb-4 tracking-tight animate-fade-in" style={{ animationDelay: '0.1s' }}>
          Smart Energy Analyzer
        </h1>
        
        <p className="text-slate-600 max-w-2xl mx-auto text-base sm:text-lg animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Click the button below to simulate AI processing of your electricity consumption data
          and get insights on your carbon footprint.
        </p>
      </div>

      <div className="w-full max-w-2xl animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <AIProcessingButton />
      </div>
      
      <div className="mt-16 text-center opacity-80 text-sm text-slate-500 animate-fade-in" style={{ animationDelay: '0.4s' }}>
        <p>This demo shows a simulation of an AI agent processing steps.</p>
        <p>In a real application, this would connect to actual APIs and process real-time data.</p>
      </div>
    </div>
  );
};

export default Index;
