import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = [
  "#22c55e",
  "#3b82f6",
  "#a855f7",
  "#f97316",
  "#ec4899",
  "#14b8a6",
  "#ef4444",
  "#eab308",
];

export default function ExpenseChart({ expenses }) {
  // Bar chart — spending by category
  const categoryData = Object.entries(
    expenses.reduce((acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + e.amount;
      return acc;
    }, {}),
  )
    .map(([name, value]) => ({ name, value: parseFloat(value.toFixed(2)) }))
    .sort((a, b) => b.value - a.value);

  // Pie chart — last 6 months spending
  const monthlyData = (() => {
    const months = {};
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = d.toLocaleString("default", {
        month: "short",
        year: "2-digit",
      });
      months[key] = 0;
    }
    expenses.forEach((e) => {
      const d = new Date(e.date);
      const key = d.toLocaleString("default", {
        month: "short",
        year: "2-digit",
      });
      if (key in months) months[key] += e.amount;
    });
    return Object.entries(months).map(([name, value]) => ({
      name,
      value: parseFloat(value.toFixed(2)),
    }));
  })();

  if (expenses.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border p-6 text-center text-gray-400 text-sm">
        No data yet. Add some expenses to see charts!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Bar chart — by category */}
      <div className="bg-white rounded-2xl shadow-sm border p-6">
        <h3 className="text-sm font-bold text-gray-700 mb-4">
          Spending by Category
        </h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart
            data={categoryData}
            margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
          >
            <XAxis
              dataKey="name"
              tick={{ fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              interval={0}
              angle={-25}
              textAnchor="end"
              height={50}
            />
            <YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
            <Tooltip
              formatter={(value) => [`₱${value.toFixed(2)}`, "Amount"]}
              contentStyle={{ borderRadius: "8px", fontSize: "12px" }}
            />
            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
              {categoryData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie chart — monthly trend */}
      <div className="bg-white rounded-2xl shadow-sm border p-6">
        <h3 className="text-sm font-bold text-gray-700 mb-4">
          Monthly Spending (Last 6 Months)
        </h3>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={monthlyData}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={3}
              dataKey="value"
            >
              {monthlyData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [`₱${value.toFixed(2)}`, "Spent"]}
              contentStyle={{ borderRadius: "8px", fontSize: "12px" }}
            />
            <Legend
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: "11px" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
