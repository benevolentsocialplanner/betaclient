import React, { useEffect, useState } from "react";
import { StatsCard } from "./components/StatCard";
import { TransactionList } from "./components/TransactionList";
import { UploadButton } from "./components/UploadButton";
import { CreditCard, DollarSign, ShoppingBag, TrendingUp } from "lucide-react";
import APIPROVIDER from "./utils/apiProvider";

const App: React.FC = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch transactions on load
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await APIPROVIDER.getTransactions();
        setTransactions(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Could not load transactions.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  // ** Calculate Dashboard Stats **
  const totalSpend = transactions.reduce((sum, tx) => sum + tx.amount, 0);
  const numTransactions = transactions.length;
  const avgTransaction = numTransactions > 0 ? (totalSpend / numTransactions).toFixed(2) : "0.00";
  const uniqueMerchants = new Set(transactions.map(tx => tx.description)).size;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Transaction Analyzer</h1>
        <UploadButton />
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard title="Total Spend" value={`$${totalSpend.toFixed(2)}`} icon={<DollarSign size={24} />} />
        <StatsCard title="Transactions" value={numTransactions} icon={<CreditCard size={24} />} />
        <StatsCard title="Avg. Transaction" value={`$${avgTransaction}`} icon={<TrendingUp size={24} />} />
        <StatsCard title="Merchants" value={uniqueMerchants} icon={<ShoppingBag size={24} />} />
      </div>

      {/* Loading & Error Handling */}
      {loading && <p className="mt-4 text-gray-500">Loading transactions...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      {/* Transaction List */}
      {!loading && !error && <TransactionList transactions={transactions} />}
    </div>
  );
};

export default App;
