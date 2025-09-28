import React from "react";
import { 
  Container, Typography, Grid, Paper, List, ListItem, 
  ListItemText, LinearProgress, Stack 
} from "@mui/material";
import { 
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from "recharts";

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444"]; 

export default function Dashboard({ initialKpis }) {
  const kpis = initialKpis || {};

  // Prepare data for the charts
  const revenueByDate = kpis.revenueByDate || {};
  const leadsByStatus = kpis.leadsByStatus || {};
  const topProducts = Array.isArray(kpis.topProducts) ? kpis.topProducts : [];
  const revenueSeries = Object.keys(revenueByDate)
    .sort()
    .map((d) => ({ date: d, revenue: revenueByDate[d] }));

  const leadsPieData = Object.keys(leadsByStatus).map((key, i) => ({
    name: key,
    value: leadsByStatus[key],
    fill: COLORS[i % COLORS.length],
  }));

  const maxProductRevenue = topProducts.length > 0 ? topProducts[0].revenue : 1;

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom fontWeight="bold">
        Dashly - Dashboard
      </Typography>

      {/* Main KPI cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 3, borderLeft: "5px solid #10b981" }}>
            <Typography variant="subtitle2">Total Revenue</Typography>
            <Typography variant="h5" color="#10b981">
              ${kpis.revenue?.toLocaleString() || "0"}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 3, borderLeft: "5px solid #3b82f6" }}>
            <Typography variant="subtitle2">Total Leads</Typography>
            <Typography variant="h5" color="#3b82f6">
              {kpis.leadsCount?.toLocaleString() || "0"}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 3, borderLeft: "5px solid #f59e0b" }}>
            <Typography variant="subtitle2">Conversion Rate</Typography>
            <Typography variant="h5" color="#f59e0b">
              {kpis.conversionRate ?? 0}%
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 3, borderLeft: "5px solid #ef4444" }}>
            <Typography variant="subtitle2">Total Customers</Typography>
            <Typography variant="h5" color="#ef4444">
              {kpis.totalCustomers?.toLocaleString() || "0"}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Chart and data grid section */}
      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <Paper elevation={3} sx={{ p: 3, height: 420 }}>
            <Typography variant="h6"> Revenue Trend</Typography>
            <ResponsiveContainer width="100%" height="90%">
              <LineChart data={revenueSeries}>
                <XAxis dataKey="date" />
                <YAxis tickFormatter={(v) => `$${v}`} />
                <Tooltip formatter={(v) => `$${v}`} />
                <Line type="monotone" dataKey="revenue" stroke="#3b82f6" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={3}>
          <Paper elevation={3} sx={{ p: 3, height: 420 }}>
            <Typography variant="h6"> Leads Breakdown</Typography>
            <ResponsiveContainer width="100%" height="90%">
              <PieChart>
                <Pie
                  data={leadsPieData}
                  dataKey="value"
                  outerRadius={80}
                  labelLine={true}
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {leadsPieData.map((e, i) => (
                    <Cell key={i} fill={e.fill} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value}`, `${name}`]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={3}>
          <Paper elevation={3} sx={{ p: 3, height: 420 }}>
            <Typography variant="h6">🏆 Top Products</Typography>
            {topProducts.length > 0 ? (
              <List>
                {topProducts.map((p, i) => (
                  <ListItem key={p.name}>
                    <Stack direction="column" sx={{ width: "100%" }}>
                      <ListItemText
                        primary={`${i + 1}. ${p.name}`}
                        secondary={`$${p.revenue.toLocaleString()}`}
                      />
                      <LinearProgress
                        variant="determinate"
                        value={(p.revenue / maxProductRevenue) * 100}
                        sx={{
                          height: 6,
                          borderRadius: 3,
                          "& .MuiLinearProgress-bar": {
                            backgroundColor: COLORS[i % COLORS.length],
                          },
                        }}
                      />
                    </Stack>
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography color="textSecondary">No product data</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
