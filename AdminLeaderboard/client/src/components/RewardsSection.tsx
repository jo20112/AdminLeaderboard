import { Card } from "@/components/ui/card";
import { Trophy, Medal, Award, Gift, Zap, Clock } from "lucide-react";

export default function RewardsSection() {
  const rewards = [
    {
      rank: 1,
      icon: Trophy,
      title: "المركز الأول",
      emoji: "🥇",
      points: "30,000",
      bonus: "VIP 4 لمدة 5 أيام",
      bgClass: "bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950/20 dark:to-amber-950/20",
      borderClass: "border-yellow-400/40",
      textClass: "text-yellow-600 dark:text-yellow-400",
      iconBg: "bg-yellow-100 dark:bg-yellow-900/30",
    },
    {
      rank: 2,
      icon: Medal,
      title: "المركز الثاني",
      emoji: "🥈",
      points: "20,000",
      bonus: null,
      bgClass: "bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-950/20 dark:to-gray-950/20",
      borderClass: "border-slate-400/40",
      textClass: "text-slate-600 dark:text-slate-400",
      iconBg: "bg-slate-100 dark:bg-slate-900/30",
    },
    {
      rank: 3,
      icon: Award,
      title: "المركز الثالث",
      emoji: "🥉",
      points: "15,000",
      bonus: null,
      bgClass: "bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20",
      borderClass: "border-orange-400/40",
      textClass: "text-orange-600 dark:text-orange-400",
      iconBg: "bg-orange-100 dark:bg-orange-900/30",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <Gift className="h-6 w-6 text-primary" />
          <h3 className="text-3xl font-bold">جوائز المسابقة</h3>
          <Gift className="h-6 w-6 text-primary" />
        </div>
        <p className="text-muted-foreground flex items-center justify-center gap-2">
          <Clock className="h-4 w-4" />
          توزع كل 10 أيام حسب الترتيب النهائي
        </p>
      </div>

      {/* Rewards Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {rewards.map((reward) => {
          const Icon = reward.icon;
          return (
            <Card
              key={reward.rank}
              className={`relative overflow-hidden border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${reward.bgClass} ${reward.borderClass}`}
              data-testid={`card-reward-${reward.rank === 1 ? 'first' : reward.rank === 2 ? 'second' : 'third'}`}
            >
              <div className="p-6 space-y-4 text-center">
                {/* Icon */}
                <div className="flex justify-center">
                  <div className={`p-3 rounded-xl ${reward.iconBg}`}>
                    <Icon className={`h-8 w-8 ${reward.textClass}`} />
                  </div>
                </div>

                {/* Title */}
                <div>
                  <h4 className={`text-xl font-bold ${reward.textClass}`}>
                    {reward.emoji} {reward.title}
                  </h4>
                </div>

                {/* Points */}
                <div className="space-y-1">
                  <div className={`text-4xl font-black ${reward.textClass}`}>
                    {reward.points}
                  </div>
                  <p className="text-sm font-semibold text-muted-foreground">كوينز</p>
                </div>

                {/* Bonus */}
                {reward.bonus && (
                  <div className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg border-2 ${reward.borderClass} ${reward.bgClass}`}>
                    <Zap className={`h-4 w-4 ${reward.textClass}`} />
                    <span className={`text-sm font-bold ${reward.textClass}`}>
                      {reward.bonus}
                    </span>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Notice */}
      <Card className="max-w-3xl mx-auto bg-amber-50/50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
        <div className="p-5 space-y-3">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30">
              <Award className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="flex-1 space-y-2">
              <h4 className="font-bold text-amber-900 dark:text-amber-300">شروط المسابقة</h4>
              <ul className="space-y-1.5 text-sm text-amber-800 dark:text-amber-400">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5">•</span>
                  <span>الفائز لا يمكنه الترشح مرة أخرى إلا بعد مرور <strong>20 يوم</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5">•</span>
                  <span>الجوائز توزع تلقائياً في نهاية كل دورة</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5">•</span>
                  <span>الترتيب يتحدد بناءً على إجمالي النقاط المكتسبة</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
