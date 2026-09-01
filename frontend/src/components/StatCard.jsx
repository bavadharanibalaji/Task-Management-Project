const StatCard = ({ label, count, icon: Icon, color }) => {
  return (
    <div
      className="rounded-lg p-4 flex-1 text-white shadow-sm relative overflow-hidden"
      style={{ backgroundColor: color }}
    >
      <Icon
        size={90}
        className="absolute -bottom-3 -right-3 text-white/15 pointer-events-none"
      />

      <div className="relative flex items-center justify-between mb-2">
        <p className="text-white/100 text-lg md:text-lg">{label}</p>
        <Icon size={20} className="text-white" />
      </div>
      <p className="relative text-2xl font-display font-semibold">{count}</p>
    </div>
  );
};

export default StatCard;