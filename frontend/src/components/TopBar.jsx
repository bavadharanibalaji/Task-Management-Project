import ThemeToggle from "./ThemeToggle";
import UserProfile from "./UserProfile";

const TopBar = ({ subtitle }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-m font-display font-semibold ms:text-2xl">Manage Your Tasks</h1>
        <p className="text-text-muted text-sm ms:m">{subtitle}</p>
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <UserProfile />
      </div>
    </div>
  );
};

export default TopBar;