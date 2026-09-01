import { useAuth } from "../context/AuthContext";

const UserProfile = () => {
  const { user } = useAuth();
  const initial = user?.name?.charAt(0).toUpperCase() || "U";

  return (
    <div className="flex items-center gap-3 border border-border rounded-full pl-1 pr-4 py-1">
      <div className="h-9 w-9 rounded-full bg-orange-400 flex items-center justify-center font-display font-semibold text-m">
        {initial}
      </div>
      <div className="leading-tight">
        <p className="text-sm font-medium ms:text-lg">{user?.name}</p>
        <p className="text-x text-green-400 capitalize">{user?.role}</p>
      </div>
    </div>
  );
};

export default UserProfile;