import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import CursorGradientBackground from "@/components/CursorGradientBackground";
import {
  LayoutDashboard,
  Users,
  Shield,
  Settings,
  BarChart3,
  Key,
  LogOut,
  Bell,
  Search,
  ChevronDown,
  Activity,
  UserCheck,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";
import { ChartContainer, ChartConfig } from "@/components/ui/chart";
import { Bar, BarChart } from "recharts";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activities, setActivities] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token) {
      navigate('/login');
      return;
    }

    if (userData) {
      setUser(JSON.parse(userData));
    }

    const fetchActivities = async () => {
      try {
        const response = await fetch('/api/activities');
        const data = await response.json();
        if (response.ok) {
          setActivities(data);
        }
      } catch (error) {
        console.error("Failed to fetch activities:", error);
      }
    };

    fetchActivities();
  }, [navigate]);

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: true },
    { icon: Users, label: "Users" },
    { icon: Shield, label: "Roles & Permissions" },
    { icon: Key, label: "API Keys" },
    { icon: BarChart3, label: "Analytics" },
    { icon: Settings, label: "Settings" },
  ];

  const stats = [
    {
      label: "Total Users",
      value: "12,847",
      change: "+12%",
      icon: Users,
      trend: "up",
    },
    {
      label: "Active Sessions",
      value: "1,234",
      change: "+8%",
      icon: Activity,
      trend: "up",
    },
    {
      label: "Auth Success Rate",
      value: "99.8%",
      change: "+0.2%",
      icon: UserCheck,
      trend: "up",
    },
    {
      label: "Security Alerts",
      value: "3",
      change: "-2",
      icon: AlertTriangle,
      trend: "down",
    },
  ];


  return (
    <div className="min-h-screen relative flex">
      <CursorGradientBackground />

      {/* Sidebar */}
      <aside className="w-64 glass-card border-r border-white/5 flex flex-col relative z-10">
        <div className="p-6 border-b border-white/5">
          <Logo />
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${item.active
                ? "bg-primary/20 text-foreground shadow-lg shadow-primary/10"
                : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <Link to="/">
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground"
              onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                navigate('/login');
              }}
            >
              <LogOut className="w-5 h-5 mr-3" />
              Sign Out
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative z-10">
        {/* Header */}
        <header className="glass-card border-b border-white/5 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                className="w-80 h-10 pl-10 pr-4 rounded-lg bg-white/5 border border-white/10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
            </Button>

            <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-sm font-semibold text-primary-foreground">
                AD
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-foreground">{user?.name || "Admin User"}</p>
                <p className="text-xs text-muted-foreground">{user?.role || "Administrator"}</p>
              </div>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 p-8 overflow-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-display font-bold text-foreground mb-2">
              Welcome back, {user?.name?.split(' ')[0] || "Admin"}
            </h1>
            <p className="text-muted-foreground">
              Here's what's happening with your security platform today.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="glass-card rounded-2xl p-6 hover:bg-white/[0.06] transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-primary-glow" />
                  </div>
                  <span
                    className={`flex items-center gap-1 text-sm font-medium ${stat.trend === "up" ? "text-green-500" : "text-destructive"
                      }`}
                  >
                    <TrendingUp
                      className={`w-4 h-4 ${stat.trend === "down" ? "rotate-180" : ""}`}
                    />
                    {stat.change}
                  </span>
                </div>
                <p className="text-2xl font-display font-bold text-foreground mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Activity & Quick Actions */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <div className="lg:col-span-2 glass-card rounded-2xl p-6">
              <h2 className="text-lg font-display font-semibold text-foreground mb-6">
                Recent Activity
              </h2>
              <div className="space-y-4">
                {activities.length > 0 ? activities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-3 border-b border-white/5 last:border-0"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-2 h-2 rounded-full ${activity.status === "success"
                          ? "bg-green-500"
                          : activity.status === "warning"
                            ? "bg-accent"
                            : "bg-primary"
                          }`}
                      />
                      <div>
                        <p className="text-sm text-foreground">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.user?.email}</p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{new Date(activity.createdAt).toLocaleTimeString()}</span>
                  </div>
                )) : (
                  <p className="text-sm text-muted-foreground">No recent activity found.</p>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-lg font-display font-semibold text-foreground mb-6">
                Quick Actions
              </h2>
              <div className="space-y-3">
                <Button variant="glass" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-3" />
                  Add New User
                </Button>
                <Button variant="glass" className="w-full justify-start">
                  <Shield className="w-4 h-4 mr-3" />
                  Create Role
                </Button>
                <Button variant="glass" className="w-full justify-start">
                  <Key className="w-4 h-4 mr-3" />
                  Generate API Key
                </Button>
                <Button variant="glass" className="w-full justify-start">
                  <BarChart3 className="w-4 h-4 mr-3" />
                  View Reports
                </Button>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
