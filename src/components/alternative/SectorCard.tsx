interface SectorCardProps {
  title: string;
  description: string;
}

export function SectorCard({ title, description }: SectorCardProps) {
  return (
    <div className="glass-card p-4 rounded-xl hover:bg-primary/5 transition-colors">
      <h3 className="text-lg font-semibold text-primary">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}