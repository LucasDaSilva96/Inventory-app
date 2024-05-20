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
    <article
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "40px",
        backgroundColor: "",
        width: "450px",
        height: "300px",
        overflowY: "auto",
        padding: "10px",
        border: "1px solid #71717a4d",
        borderRadius: "10px",
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
      }}
    >
      <h1 className="text-center py-1 text-lg antialiased italic underline">
        {h1}
      </h1>
      <ResponsiveContainer>
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
  );
}

export default DashboardBox;
