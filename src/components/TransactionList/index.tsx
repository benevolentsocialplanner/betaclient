import React from "react";

interface Transaction {
  description: string;
  amount: number;
  date: string;
}

interface TransactionListProps {
  transactions: Transaction[];
}

export const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  return (
    <div className="mt-5 bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-3">Transactions</h2>
      <p className="text-gray-500 text-sm mb-4">List of all transactions</p>

      <div className="max-h-96 overflow-y-auto">
        {transactions.length === 0 ? (
          <p className="text-gray-500">No transactions found.</p>
        ) : (
          <ul>
            {transactions.map((tx, index) => (
              <li key={index} className="flex justify-between p-2 border-b">
                <div>
                  <p className="font-semibold">{tx.description}</p>
                  <p className="text-gray-500 text-sm">{new Date(tx.date).toLocaleDateString()}</p>
                </div>
                <p className={`text-lg font-bold ${tx.amount < 0 ? "text-red-500" : "text-green-500"}`}>
                  ${tx.amount.toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
