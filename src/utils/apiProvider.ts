import axios from "axios";


// Generic error handler
const handleError = (error: any) => {
    console.error("API Error:", error);
    throw new Error(error.response?.data?.message || "Something went wrong. Please try again.");
};

const APIPROVIDER = {
    /**
     * Fetch all transactions
     */
    getTransactions: async () => {
        try {
            const response = await axios.get("/api/transaction/list");
            return response.data;
        } catch (error) {
            handleError(error);
        }
    },

    /**
     * Upload CSV file
     */
    upload: async (file: File) => {
        try {
            const formData = new FormData();
            formData.append("file", file);

            const response = await axios.post("/api/transaction/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            return response.data;
        } catch (error) {
            handleError(error);
        }
    },
};

export default APIPROVIDER;
