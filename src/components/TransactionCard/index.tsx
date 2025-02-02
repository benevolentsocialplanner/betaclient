import React from "react";

interface TransactionProps {
  originalName: string;
  normalizedName: string;
  tags: string[];
}

export const TransactionCard: React.FC<TransactionProps> = ({ originalName, normalizedName, tags }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-3">
      <p className="text-gray-500 text-sm">Original</p>
      <p className="text-lg font-semibold">{originalName}</p>
      
      <div className="flex flex-wrap gap-2 my-2">
        {tags.map((tag, index) => (
          <span key={index} className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-md">
            {tag}
          </span>
        ))}
      </div>

      <p className="text-gray-400 text-sm text-right">Normalized</p>
      <p className="text-lg font-bold text-right">{normalizedName}</p>
    </div>
  );
};

