export default function SummaryCards({ expenses }) {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  const thisMonth = expenses.filter((e) => {
    const expDate = new Date(e.date);
    const now = new Date();
    return (
      expDate.getMonth() === now.getMonth() &&
      expDate.getFullYear() === now.getFullYear()
    );
  });

  const thisMonthTotal = thisMonth.reduce((sum, e) => sum + e.amount, 0);

  const topCategory =
    expenses.length > 0
      ? Object.entries(
          expenses.reduce((acc, e) => {
            acc[e.category] = (acc[e.category] || 0) + e.amount;
            return acc;
          }, {}),
        ).sort((a, b) => b[1] - a[1])[0][0]
      : "—";

  const cards = [
    {
      label: "Total Expenses",
      value: `₱${total.toFixed(2)}`,
      sub: `${expenses.length} transactions`,
      color: "bg-green-50 border-green-200",
      textColor: "text-green-700",
    },
    {
      label: "This Month",
      value: `₱${thisMonthTotal.toFixed(2)}`,
      sub: `${thisMonth.length} transactions`,
      color: "bg-blue-50 border-blue-200",
      textColor: "text-blue-700",
    },
    {
      label: "Top Category",
      value: topCategory,
      sub: "by total amount",
      color: "bg-purple-50 border-purple-200",
      textColor: "text-purple-700",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className={`rounded-2xl border p-5 ${card.color}`}
        >
          <p className="text-sm text-gray-500 mb-1">{card.label}</p>
          <p className={`text-2xl font-bold ${card.textColor}`}>{card.value}</p>
          <p className="text-xs text-gray-400 mt-1">{card.sub}</p>
        </div>
      ))}
    </div>
  );
}
