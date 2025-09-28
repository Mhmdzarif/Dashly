import "dotenv/config";
import express from "express";
import cors from "cors";
import Airtable from "airtable";

const app = express();
const PORT = process.env.PORT || 8787;

app.use(cors());
app.use(express.json());

Airtable.configure({ apiKey: process.env.AIRTABLE_API_KEY });
const base = Airtable.base(process.env.AIRTABLE_BASE_ID);

// Helper to fetch all records from a table, handling pagination.
async function fetchAll(tableName) {
  const records = [];
  await base(tableName)
    .select({ view: "Grid view" })
    .eachPage((page, next) => {
      page.forEach((r) => records.push(r));
      next();
    });
  return records;
}

app.get("/api/kpis", async (req, res) => {
  try {
    // Fetch base data in parallel for efficiency
    const [sales, leads] = await Promise.all([
      fetchAll("Sales"),
      fetchAll("Leads"),
    ]);

    // Calculate total revenue from sales
    const revenue = sales.reduce((sum, r) => sum + (parseFloat(r.get("Amount")) || 0), 0);

    // Group leads by their current status
    const leadsByStatus = {};
    leads.forEach((r) => {
      const status = r.get("Status") || "Unknown";
      leadsByStatus[status] = (leadsByStatus[status] || 0) + 1;
    });

    // Calculate the lead conversion rate
    const converted = leadsByStatus["Converted"] || 0;
    const conversionRate = (converted / (leads.length || 1)) * 100;

    // Structure revenue data for the time-series chart
    const revenueByDate = {};
    sales.forEach((r) => {
      const d = r.get("Date");
      if (!d) return;
      const dateKey = new Date(d).toISOString().slice(0, 10);
      const amount = parseFloat(r.get("Amount")) || 0;
      revenueByDate[dateKey] = (revenueByDate[dateKey] || 0) + amount;
    });

    // Find the top 5 products by total revenue
    const topProductsByRevenue = {};
    sales.forEach((r) => {
      const product = r.get("Product") || "Unknown";
      const amount = parseFloat(r.get("Amount")) || 0;
      topProductsByRevenue[product] = (topProductsByRevenue[product] || 0) + amount;
    });

    const topProducts = Object.entries(topProductsByRevenue).map(([name, revenue]) => ({ name, revenue })).sort((a, b) => b.revenue - a.revenue).slice(0, 5);

    // Count unique customers from sales records
    const totalCustomers = new Set(sales.map(r => r.get("Customer")).filter(Boolean)).size;

    res.json({ revenue, revenueByDate, leadsCount: leads.length, leadsByStatus, conversionRate: Number(conversionRate.toFixed(2)), topProducts, totalCustomers });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
