import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

function DashboardBox({ data, fillColor, h1 }) {
  return (
    <div>
      <h1 className="text-center py-1 text-lg antialiased italic">{h1}</h1>
      <article
        style={{
          display: "flex",
          flexDirection: "column",
          maxHeight: "350px",
          minWidth: "400px",
          overflowY: "auto",
          border: "1px solid #71717a4d",
          borderRadius: "10px",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        }}
      >
        <ResponsiveContainer width="100%" height={340}>
          <PieChart>
            <Pie
              data={data}
              nameKey="label"
              dataKey="value"
              innerRadius={55}
              outerRadius={80}
              cx="50%"
              cy="50%"
              paddingAngle={3}
            >
              {data.map((entry, index) => (
                <Cell key={entry.value} fill={fillColor}></Cell>
              ))}
            </Pie>
            <Tooltip />
            <Legend
              verticalAlign="middle"
              align="left"
              layout="vertical"
              iconSize={8}
              iconType="circle"
            />
          </PieChart>
        </ResponsiveContainer>
      </article>
    </div>
  );
}

export default DashboardBox;
