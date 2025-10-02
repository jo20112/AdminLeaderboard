import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Medal, Award, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface PodiumCardProps {
  rank: 1 | 2 | 3;
  name: string;
  points: number;
  initials: string;
  adminId?: string;
  avatarUrl?: string;
}

export default function PodiumCard({ rank, name, points, initials, adminId, avatarUrl }: PodiumCardProps) {
  const config = {
    1: {
      bgClass: "bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950/30 dark:to-amber-950/30",
      borderClass: "border-yellow-400/50",
      textClass: "text-yellow-600 dark:text-yellow-400",
      badgeClass: "bg-yellow-100 border-yellow-300 text-yellow-700 dark:bg-yellow-900/30 dark:border-yellow-600 dark:text-yellow-400",
      icon: Trophy,
      label: "🥇 المركز الأول",
    },
    2: {
      bgClass: "bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-950/30 dark:to-gray-950/30",
      borderClass: "border-slate-400/50",
      textClass: "text-slate-600 dark:text-slate-400",
      badgeClass: "bg-slate-100 border-slate-300 text-slate-700 dark:bg-slate-900/30 dark:border-slate-600 dark:text-slate-400",
      icon: Medal,
      label: "🥈 المركز الثاني",
    },
    3: {
      bgClass: "bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30",
      borderClass: "border-orange-400/50",
      textClass: "text-orange-600 dark:text-orange-400",
      badgeClass: "bg-orange-100 border-orange-300 text-orange-700 dark:bg-orange-900/30 dark:border-orange-600 dark:text-orange-400",
      icon: Award,
      label: "🥉 المركز الثالث",
    },
  };

  const c = config[rank];
  const Icon = c.icon;

  return (
    <div className="relative pt-6">
      {/* Icon badge at top - outside card */}
      <div className="absolute -top-0 left-1/2 -translate-x-1/2 z-10">
        <div className={cn(
          "p-3 rounded-full border-3 border-background shadow-xl",
          c.bgClass,
          c.borderClass
        )}>
          <Icon className={cn("h-6 w-6", c.textClass)} />
        </div>
      </div>

      <Card
        className={cn(
          "relative overflow-visible border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
          c.bgClass,
          c.borderClass,
          rank === 1 && "md:scale-105"
        )}
        data-testid={`card-podium-${rank}`}
      >
        <div className="pt-10 pb-6 px-6 space-y-4 text-center">
        {/* Avatar */}
        <div className="flex justify-center">
          <Avatar className="h-20 w-20 border-2 border-background shadow-md">
            {avatarUrl && <AvatarImage src={avatarUrl} alt={name} />}
            <AvatarFallback className={cn(
              "text-2xl font-bold",
              c.bgClass,
              c.textClass
            )}>
              {initials}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Name */}
        <div className="space-y-2">
          <h3 className={cn(
            "text-lg font-bold",
            c.textClass
          )} data-testid={`text-podium-name-${rank}`}>
            {name}
          </h3>
          
          {/* ID Badge */}
          {adminId && (
            <div className={cn(
              "inline-block px-3 py-1 rounded-md border text-xs font-mono font-medium",
              c.badgeClass
            )}>
              ID: {adminId}
            </div>
          )}
        </div>

        {/* Rank Label */}
        <p className={cn(
          "text-sm font-bold",
          c.textClass
        )}>
          {c.label}
        </p>

        {/* Points */}
        <div className="space-y-1">
          <div className={cn(
            "text-4xl font-black",
            c.textClass
          )} data-testid={`text-podium-points-${rank}`}>
            {points.toLocaleString()}
          </div>
          <p className="text-xs font-medium text-muted-foreground">نقطة</p>
        </div>

        {/* Stars */}
        <div className="flex justify-center gap-1 pt-2">
          {[...Array(rank === 1 ? 3 : rank === 2 ? 2 : 1)].map((_, i) => (
            <Star
              key={i}
              className={cn("h-4 w-4", c.textClass)}
              fill="currentColor"
            />
          ))}
        </div>
        </div>
      </Card>
    </div>
  );
}
