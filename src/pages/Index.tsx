import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import FeatureCard from "@/components/FeatureCard";
import CursorGradientBackground from "@/components/CursorGradientBackground";
import { 
  Shield, 
  Lock, 
  Users, 
  Fingerprint, 
  ArrowRight, 
  Sparkles,
  Key,
  UserCheck,
  LayoutDashboard
} from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Military-grade encryption with advanced threat detection and real-time monitoring.",
    },
    {
      icon: Users,
      title: "Role-Based Access",
      description: "Granular RBAC with custom roles, permissions, and hierarchical structures.",
    },
    {
      icon: Key,
      title: "Secure Authentication",
      description: "Multi-factor authentication with JWT tokens and session management.",
    },
    {
      icon: UserCheck,
      title: "User Management",
      description: "Comprehensive admin panel for user provisioning and access control.",
    },
    {
      icon: Fingerprint,
      title: "Identity Verification",
      description: "Advanced identity verification with biometric and OAuth integrations.",
    },
    {
      icon: LayoutDashboard,
      title: "Admin Dashboard",
      description: "Intuitive dashboard with analytics, audit logs, and system insights.",
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <CursorGradientBackground />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                Sign In
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="hero" size="lg">
                Get Started
                <ArrowRight className="ml-1 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 animate-float">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm text-muted-foreground">
                Next-Generation Security Platform
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
              <span className="text-foreground">Secure Access.</span>
              <br />
              <span className="gradient-text">Total Control.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              AURYX delivers enterprise-grade authentication and authorization 
              with an intuitive interface. Protect your assets with precision.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register">
                <Button variant="hero" size="xl" className="group">
                  <Lock className="w-5 h-5 mr-2" />
                  Start Securing Now
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="glass" size="xl">
                  Sign In to Dashboard
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-3 gap-8 max-w-xl mx-auto">
              {[
                { value: "99.9%", label: "Uptime SLA" },
                { value: "256-bit", label: "Encryption" },
                { value: "SOC 2", label: "Compliant" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-display font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Built for Modern Security
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Comprehensive security features designed for scale and simplicity.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card-elevated rounded-3xl p-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Ready to Transform Your Security?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              Join thousands of organizations who trust AURYX to protect their most sensitive assets.
            </p>
            <Link to="/register">
              <Button variant="hero" size="xl">
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-8 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Logo size="sm" />
          <p className="text-sm text-muted-foreground">
            © 2026 AURYX Security. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
