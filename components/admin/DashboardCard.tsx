interface DashboardCardProps {
  title: string;
  value: number;
  color?: string;
}

export default function DashboardCard({
  title,
  value,
  color = "#e01e41",
}: DashboardCardProps) {
  return (
    <div className="bg-white rounded-3xl p-6 border border-[#000f22]/10">
      <p className="text-sm text-[#000f22]/60">
        {title}
      </p>

      <h2
        className="mt-3 text-4xl font-bold"
        style={{ color }}
      >
        {value}
      </h2>
    </div>
  );
}