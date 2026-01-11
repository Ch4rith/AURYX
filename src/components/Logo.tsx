import { Shield } from "lucide-react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

const Logo = ({ size = "md", showText = true }: LogoProps) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-14 h-14",
  };

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-3xl",
  };

  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <div
          className={`${sizeClasses[size]} rounded-xl bg-gradient-to-br from-primary via-primary-glow to-secondary flex items-center justify-center shadow-lg shadow-primary/30`}
        >
          <Shield className="w-1/2 h-1/2 text-primary-foreground" strokeWidth={2.5} />
        </div>
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary to-secondary opacity-50 blur-lg -z-10" />
      </div>
      {showText && (
        <span
          className={`${textSizeClasses[size]} font-display font-bold tracking-tight text-foreground`}
        >
          AURYX
        </span>
      )}
    </div>
  );
};

export default Logo;
