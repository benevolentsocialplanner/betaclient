import React, { useRef, useState } from "react";
import APIPROVIDER from "../../utils/apiProvider";

export const UploadButton: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;

    const file = event.target.files[0];

    if (!file.name.endsWith(".csv")) {
      setMessage("❌ Please select a valid CSV file.");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      await APIPROVIDER.upload(file);
      setMessage("✅ CSV uploaded successfully!");

      // ** Optionally reload the page or fetch transactions again **
      window.location.reload(); // Refresh to show new transactions
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "❌ File upload failed.");
    } finally {
      setLoading(false);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <button
        onClick={triggerFileSelect}
        disabled={loading}
        className="bg-black text-white px-4 py-2 rounded-lg shadow hover:bg-gray-800 transition"
      >
        {loading ? "Uploading..." : "Upload CSV"}
      </button>
      <input
        type="file"
        accept=".csv"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
      {message && <p className="text-sm mt-2 text-gray-600">{message}</p>}
    </div>
  );
};
