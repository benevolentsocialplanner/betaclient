import React from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
}

export const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-3 w-full">
      {icon && <div className="text-gray-600">{icon}</div>}
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-xl font-bold">${value}</p>
      </div>
    </div>
  );
};


