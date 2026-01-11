import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => {
  return (
    <div className="group relative p-6 rounded-2xl glass-card hover:bg-white/[0.08] transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
      {/* Gradient border effect on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 via-transparent to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl" />
      
      <div className="mb-4 w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-secondary/30 transition-all duration-300">
        <Icon className="w-6 h-6 text-primary-glow group-hover:text-foreground transition-colors duration-300" />
      </div>
      
      <h3 className="text-lg font-display font-semibold text-foreground mb-2 group-hover:text-glow transition-all duration-300">
        {title}
      </h3>
      
      <p className="text-muted-foreground text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
