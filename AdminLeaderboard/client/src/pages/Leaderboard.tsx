import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, TrendingUp, Calendar, Award, LogIn, Search, Filter, Sparkles, Trophy, Medal } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import StatsCard from "@/components/StatsCard";
import PodiumCard from "@/components/PodiumCard";
import RewardsSection from "@/components/RewardsSection";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { fetchPublicAdmins, PublicAdmin } from "@/lib/adminService";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Leaderboard() {
  const [, setLocation] = useLocation();
  const [admins, setAdmins] = useState<PublicAdmin[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [timeRemaining, setTimeRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    loadAdmins();
  }, []);

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const competitionStartDate = new Date('2025-10-01T00:00:00');
      const now = new Date();
      const daysPassed = Math.max(0, Math.floor((now.getTime() - competitionStartDate.getTime()) / (1000 * 60 * 60 * 24)));
      const daysInCurrentCycle = ((daysPassed % 10) + 10) % 10;
      const daysToAdd = daysInCurrentCycle === 0 ? 10 : 10 - daysInCurrentCycle;
      
      const nextCycleEnd = new Date(competitionStartDate);
      nextCycleEnd.setDate(nextCycleEnd.getDate() + daysPassed + daysToAdd);
      nextCycleEnd.setHours(23, 59, 59, 999);
      
      const diff = nextCycleEnd.getTime() - now.getTime();
      
      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        setTimeRemaining({ days, hours, minutes, seconds });
      }
    };

    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, []);

  const loadAdmins = async () => {
    try {
      setLoading(true);
      const data = await fetchPublicAdmins();
      setAdmins(data);
    } catch (error) {
      console.error('Error loading admins:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAdmins = admins.filter(admin => {
    const matchesSearch = admin.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterBy === "all" || 
      (filterBy === "top10" && admins.indexOf(admin) < 10) ||
      (filterBy === "top3" && admins.indexOf(admin) < 3);
    return matchesSearch && matchesFilter;
  });

  const topThree = admins.slice(0, 3);
  const totalAdmins = admins.length;
  const totalPoints = admins.reduce((sum, admin) => sum + admin.total_points, 0);

  const getRankBadge = (index: number) => {
    if (index === 0)
      return (
        <Badge className="bg-gold/20 text-gold border-gold/30 gap-1 animate-pulse" data-testid="badge-rank-1">
          <Trophy className="h-3 w-3" fill="currentColor" />1
        </Badge>
      );
    if (index === 1)
      return (
        <Badge className="bg-silver/20 text-silver-foreground border-silver/30 gap-1" data-testid="badge-rank-2">
          <Medal className="h-3 w-3" />2
        </Badge>
      );
    if (index === 2)
      return (
        <Badge className="bg-bronze/20 text-bronze border-bronze/30 gap-1" data-testid="badge-rank-3">
          <Medal className="h-3 w-3" />3
        </Badge>
      );
    return (
      <span className="text-sm font-semibold text-muted-foreground" data-testid={`text-rank-${index + 1}`}>
        #{index + 1}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background">
      <header className="border-b bg-card/80 backdrop-blur-md sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div 
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => setLocation("/login")}
            >
              <div className="p-2 rounded-xl bg-gradient-to-br from-gold/20 to-primary/20 shadow-lg group-hover:shadow-xl transition-all group-hover:scale-105">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-l from-primary to-gold bg-clip-text text-transparent group-hover:from-gold group-hover:to-primary transition-all" data-testid="text-page-title">
                  لوحة المسابقة
                </h1>
                <p className="text-sm text-muted-foreground group-hover:text-primary transition-all">
                  نظام تتبع أداء المتسابقين
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 space-y-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-gold/5 to-primary/5 p-8 border-2 border-primary/20 shadow-xl">
          <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))] pointer-events-none" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 text-center space-y-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="h-6 w-6 text-gold animate-pulse" />
              <h2 className="text-3xl md:text-4xl font-bold">مسابقة شهر أكتوبر هيا تنافس</h2>
              <Sparkles className="h-6 w-6 text-gold animate-pulse" />
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              تنافس على المراكز الأولى واحصل على جوائز قيمة كل 10 أيام
            </p>
            <div className="flex flex-col items-center gap-6 pt-2">
              <div className="flex items-center gap-2 md:gap-4">
                <div className="flex flex-col items-center px-4 py-3 rounded-xl bg-card/80 backdrop-blur border-2 border-primary/30 min-w-[80px]">
                  <p className="text-3xl md:text-4xl font-black text-primary">{timeRemaining.days}</p>
                  <p className="text-xs text-muted-foreground font-semibold">أيام</p>
                </div>
                <span className="text-2xl font-bold text-primary">:</span>
                <div className="flex flex-col items-center px-4 py-3 rounded-xl bg-card/80 backdrop-blur border-2 border-primary/30 min-w-[80px]">
                  <p className="text-3xl md:text-4xl font-black text-primary">{String(timeRemaining.hours).padStart(2, '0')}</p>
                  <p className="text-xs text-muted-foreground font-semibold">ساعات</p>
                </div>
                <span className="text-2xl font-bold text-primary">:</span>
                <div className="flex flex-col items-center px-4 py-3 rounded-xl bg-card/80 backdrop-blur border-2 border-primary/30 min-w-[80px]">
                  <p className="text-3xl md:text-4xl font-black text-primary">{String(timeRemaining.minutes).padStart(2, '0')}</p>
                  <p className="text-xs text-muted-foreground font-semibold">دقائق</p>
                </div>
                <span className="text-2xl font-bold text-primary">:</span>
                <div className="flex flex-col items-center px-4 py-3 rounded-xl bg-card/80 backdrop-blur border-2 border-primary/30 min-w-[80px]">
                  <p className="text-3xl md:text-4xl font-black text-gold animate-pulse">{String(timeRemaining.seconds).padStart(2, '0')}</p>
                  <p className="text-xs text-muted-foreground font-semibold">ثواني</p>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-gold via-yellow-400 to-gold rounded-2xl blur-xl opacity-75 group-hover:opacity-100 animate-pulse transition-opacity" />
                <div className="relative px-8 py-6 rounded-2xl bg-gradient-to-br from-gold/30 via-yellow-500/30 to-gold/30 backdrop-blur-xl border-4 border-gold shadow-2xl shadow-gold/50 transform transition-all hover:scale-105">
                  <div className="absolute top-2 left-1/2 -translate-x-1/2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                  <div className="text-center space-y-2 mt-4">
                    <p className="text-sm font-bold text-gold/80 tracking-wider uppercase">🏆 الجائزة الكبرى 🏆</p>
                    <div className="relative">
                      <p className="text-4xl md:text-5xl font-black bg-gradient-to-r from-yellow-200 via-gold to-yellow-200 bg-clip-text text-transparent animate-pulse">
                        30,000
                      </p>
                      <p className="text-lg font-bold text-gold mt-1">كوينز</p>
                    </div>
                    <div className="flex items-center justify-center gap-2 pt-2">
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
                      <p className="text-sm font-bold text-yellow-300 px-3 py-1 rounded-full bg-gold/20 border border-gold/30">
                        + VIP 4 لمدة 5 أيام
                      </p>
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="إجمالي المتسابقين"
            value={totalAdmins}
            icon={Users}
            trend="نشط"
          />
          <StatsCard
            title="إجمالي النقاط"
            value={totalPoints}
            icon={TrendingUp}
            trend="موزعة"
          />
          <StatsCard
            title="الفترة النشطة"
            value={`${timeRemaining.days} أيام`}
            icon={Calendar}
            trend="متبقية"
          />
          <StatsCard
            title="الجائزة القادمة"
            value="30K"
            icon={Award}
            trend="كوينز"
          />
        </div>

        <div className="bg-gradient-to-b from-card via-primary/5 to-card rounded-2xl p-8 border-2 shadow-xl">
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-l from-gold via-primary to-gold bg-clip-text text-transparent" data-testid="text-section-podium">
            🏆 المراكز الثلاثة الأولى
          </h2>
          
          {topThree.length >= 3 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end max-w-5xl mx-auto">
              <div className="md:order-1 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
                <PodiumCard
                  rank={2}
                  name={topThree[1].name}
                  points={topThree[1].total_points}
                  initials={topThree[1].initials}
                  adminId={topThree[1].admin_id}
                  avatarUrl={topThree[1].avatar_url}
                />
              </div>
              <div className="md:order-2 animate-in fade-in slide-in-from-bottom-8 duration-500">
                <PodiumCard
                  rank={1}
                  name={topThree[0].name}
                  points={topThree[0].total_points}
                  initials={topThree[0].initials}
                  adminId={topThree[0].admin_id}
                  avatarUrl={topThree[0].avatar_url}
                />
              </div>
              <div className="md:order-3 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
                <PodiumCard
                  rank={3}
                  name={topThree[2].name}
                  points={topThree[2].total_points}
                  initials={topThree[2].initials}
                  adminId={topThree[2].admin_id}
                  avatarUrl={topThree[2].avatar_url}
                />
              </div>
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-12">
              لا يوجد عدد كافٍ من المتسابقين لعرض المنصة
            </div>
          )}
        </div>

        <RewardsSection />

        <div className="space-y-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-gold/5 to-primary/5 rounded-2xl blur-xl" />
            
            <div className="relative bg-card/80 backdrop-blur border-2 border-primary/20 rounded-2xl p-6 shadow-xl">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <h2 className="text-4xl font-bold bg-gradient-to-l from-primary via-gold to-primary bg-clip-text text-transparent mb-2" data-testid="text-section-leaderboard">
                    جدول الترتيب الكامل
                  </h2>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-primary" />
                    {filteredAdmins.length} متسابق في المنافسة
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <div className="relative flex-1 md:w-72">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      placeholder="ابحث عن متسابق..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pr-11 h-12 border-2 border-primary/20 focus:border-primary/50 bg-background/50 backdrop-blur font-medium"
                    />
                  </div>
                  <Select value={filterBy} onValueChange={setFilterBy}>
                    <SelectTrigger className="w-full sm:w-44 h-12 border-2 border-primary/20 bg-background/50 backdrop-blur font-medium">
                      <Filter className="h-4 w-4 ml-2" />
                      <SelectValue placeholder="تصفية" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">الكل ({admins.length})</SelectItem>
                      <SelectItem value="top3">أفضل 3 ⭐</SelectItem>
                      <SelectItem value="top10">أفضل 10 🏆</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-gold/20 to-primary/20 rounded-2xl blur-xl opacity-50" />
            
            <div className="relative border-3 border-primary/30 rounded-2xl overflow-hidden shadow-2xl bg-card" data-testid="table-leaderboard">
              <Table>
                <TableHeader className="bg-gradient-to-l from-primary/20 via-gold/15 to-primary/20 sticky top-0 z-10 backdrop-blur-md border-b-3 border-primary/30">
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="text-right w-24 font-bold text-base py-5">الترتيب</TableHead>
                    <TableHead className="text-right font-bold text-base py-5">المتسابق</TableHead>
                    <TableHead className="text-right font-bold text-base py-5">إجمالي النقاط</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAdmins.length > 0 ? (
                    filteredAdmins.map((admin, index) => {
                      const actualIndex = admins.indexOf(admin);
                      const maxPoints = Math.max(...admins.map(a => a.total_points), 1);
                      
                      const getRowClass = () => {
                        const base = "transition-all duration-300 group border-b";
                        if (actualIndex === 0) return `${base} bg-gradient-to-l from-gold/8 via-gold/15 to-transparent hover:from-gold/15 hover:via-gold/25 hover:to-gold/10 border-r-4 border-r-gold`;
                        if (actualIndex === 1) return `${base} bg-gradient-to-l from-slate-200/15 via-slate-200/25 to-transparent hover:from-slate-200/25 hover:via-slate-200/35 hover:to-slate-200/15 border-r-4 border-r-slate-300`;
                        if (actualIndex === 2) return `${base} bg-gradient-to-l from-orange-400/12 via-orange-400/20 to-transparent hover:from-orange-400/20 hover:via-orange-400/30 hover:to-orange-400/15 border-r-4 border-r-orange-400`;
                        return `${base} hover:bg-primary/8 hover:shadow-lg`;
                      };
                      
                      return (
                        <TableRow
                          key={admin.id}
                          className={getRowClass()}
                          data-testid={`row-admin-${admin.id}`}
                        >
                          <TableCell className="font-medium py-7">{getRankBadge(actualIndex)}</TableCell>
                          <TableCell className="py-7">
                            <div className="flex items-center gap-4">
                              <div className="relative">
                                {actualIndex < 3 && (
                                  <div className="absolute -inset-1 bg-gradient-to-r from-primary to-gold rounded-full blur opacity-50 group-hover:opacity-75 transition-opacity" />
                                )}
                                <Avatar className={`relative h-16 w-16 border-3 transition-all duration-300 group-hover:scale-110 ${
                                  actualIndex === 0 ? 'border-gold shadow-xl shadow-gold/50' :
                                  actualIndex === 1 ? 'border-slate-300 shadow-xl shadow-slate-300/50' :
                                  actualIndex === 2 ? 'border-orange-400 shadow-xl shadow-orange-400/50' :
                                  'border-primary/30 group-hover:border-primary/60'
                                }`}>
                                  {admin.avatar_url && <AvatarImage src={admin.avatar_url} alt={admin.name} />}
                                  <AvatarFallback className={`text-lg font-bold ${
                                    actualIndex === 0 ? 'bg-gradient-to-br from-gold/40 to-yellow-500/40 text-gold' :
                                    actualIndex === 1 ? 'bg-gradient-to-br from-slate-200/50 to-slate-300/50 text-slate-700' :
                                    actualIndex === 2 ? 'bg-gradient-to-br from-orange-400/40 to-amber-600/40 text-orange-700' :
                                    'bg-gradient-to-br from-primary/30 to-gold/15'
                                  }`}>
                                    {admin.initials}
                                  </AvatarFallback>
                                </Avatar>
                              </div>
                              <div className="flex flex-col gap-1">
                                <span className={`font-bold text-xl transition-all group-hover:text-primary ${
                                  actualIndex === 0 ? 'text-gold' :
                                  actualIndex === 1 ? 'text-slate-600' :
                                  actualIndex === 2 ? 'text-orange-600' :
                                  ''
                                }`} data-testid={`text-admin-name-${admin.id}`}>
                                  {admin.name}
                                </span>
                                {admin.admin_id && (
                                  <div className="flex items-center gap-2">
                                    <Badge variant="outline" className="font-mono text-xs bg-muted/50 border-primary/30">
                                      {admin.admin_id}
                                    </Badge>
                                  </div>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="py-7">
                            <div className="space-y-3">
                              <div className="flex items-baseline gap-3">
                                <span className={`text-4xl font-black transition-all ${
                                  actualIndex === 0 ? 'bg-gradient-to-l from-gold to-yellow-500 bg-clip-text text-transparent' :
                                  actualIndex === 1 ? 'text-slate-600' :
                                  actualIndex === 2 ? 'text-orange-600' :
                                  'bg-gradient-to-l from-primary to-gold bg-clip-text text-transparent'
                                }`} data-testid={`text-points-${admin.id}`}>
                                  {admin.total_points.toLocaleString()}
                                </span>
                                <span className="text-base text-muted-foreground font-semibold">نقطة</span>
                              </div>
                              <div className="w-full bg-muted/60 rounded-full h-2.5 overflow-hidden shadow-inner">
                                <div 
                                  className={`h-full rounded-full transition-all duration-700 ${
                                    actualIndex === 0 ? 'bg-gradient-to-r from-gold via-yellow-400 to-gold shadow-lg shadow-gold/50' :
                                    actualIndex === 1 ? 'bg-gradient-to-r from-slate-300 via-slate-200 to-slate-300 shadow-lg shadow-slate-300/50' :
                                    actualIndex === 2 ? 'bg-gradient-to-r from-orange-400 via-amber-500 to-orange-400 shadow-lg shadow-orange-400/50' :
                                    'bg-gradient-to-r from-primary via-primary/80 to-primary/60'
                                  }`}
                                  style={{ width: `${(admin.total_points / maxPoints) * 100}%` }}
                                />
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center py-16">
                        <div className="flex flex-col items-center gap-3">
                          <Search className="h-12 w-12 text-muted-foreground/50" />
                          <p className="text-lg font-semibold text-muted-foreground">لا توجد نتائج</p>
                          <p className="text-sm text-muted-foreground">جرب البحث بكلمات مختلفة</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-muted/50 to-primary/5 rounded-xl p-6 border-2 shadow-lg">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            ملاحظات هامة
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>يتم حساب النقاط تلقائياً بناءً على الحضور والالتزام والنشاط</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>المراكز الثلاثة الأولى يتم تحديثها فوراً عند تغيير النقاط</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>الجوائز توزع كل 10 أيام حسب الترتيب النهائي</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>الفائز لا يمكنه الترشح مرة أخرى إلا بعد مرور 20 يوم</span>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
