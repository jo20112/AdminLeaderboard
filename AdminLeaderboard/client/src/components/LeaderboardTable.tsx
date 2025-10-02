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
import { Button } from "@/components/ui/button";
import QuickActionButtons from "./QuickActionButtons";
import { Trophy, Edit2, TrendingUp, Crown, Medal, Star } from "lucide-react";

export interface Admin {
  id: string;
  admin_id?: string;
  name: string;
  initials: string;
  avatar_url?: string;
  total_points: number;
  attendance: number;
  delays: number;
  absences: number;
}

interface LeaderboardTableProps {
  admins: Admin[];
  onAction: (adminId: string, action: string, points: number) => void;
  onEdit?: (admin: Admin) => void;
}

export default function LeaderboardTable({ admins, onAction, onEdit }: LeaderboardTableProps) {
  const getRankBadge = (index: number) => {
    if (index === 0)
      return (
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-gold via-yellow-400 to-gold rounded-lg blur opacity-75 animate-pulse" />
          <Badge className="relative bg-gradient-to-br from-gold to-yellow-500 text-gold-foreground border-0 shadow-lg gap-1.5 px-3 py-1.5 font-bold text-base" data-testid="badge-rank-1">
            <Crown className="h-4 w-4" fill="currentColor" />
            1
          </Badge>
        </div>
      );
    if (index === 1)
      return (
        <div className="relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-slate-300 via-slate-100 to-slate-300 rounded-lg blur opacity-60" />
          <Badge className="relative bg-gradient-to-br from-slate-300 to-slate-400 text-slate-900 border-0 shadow-md gap-1.5 px-3 py-1.5 font-bold" data-testid="badge-rank-2">
            <Medal className="h-4 w-4" />
            2
          </Badge>
        </div>
      );
    if (index === 2)
      return (
        <div className="relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-400 via-amber-600 to-orange-400 rounded-lg blur opacity-50" />
          <Badge className="relative bg-gradient-to-br from-orange-400 to-amber-600 text-white border-0 shadow-md gap-1.5 px-3 py-1.5 font-bold" data-testid="badge-rank-3">
            <Medal className="h-4 w-4" />
            3
          </Badge>
        </div>
      );
    if (index < 10)
      return (
        <Badge variant="outline" className="bg-primary/10 border-primary/30 text-primary gap-1.5 px-2.5 py-1 font-semibold" data-testid={`badge-rank-${index + 1}`}>
          <Star className="h-3 w-3" />
          {index + 1}
        </Badge>
      );
    return (
      <span className="text-base font-semibold text-muted-foreground px-2" data-testid={`text-rank-${index + 1}`}>
        #{index + 1}
      </span>
    );
  };

  const getRowClassName = (index: number) => {
    const baseClasses = "transition-all duration-300 group";
    if (index === 0) return `${baseClasses} bg-gradient-to-l from-gold/5 via-gold/10 to-transparent hover:from-gold/10 hover:via-gold/20 hover:to-gold/5 border-r-4 border-r-gold`;
    if (index === 1) return `${baseClasses} bg-gradient-to-l from-slate-200/20 via-slate-200/30 to-transparent hover:from-slate-200/30 hover:via-slate-200/40 hover:to-slate-200/20 border-r-4 border-r-slate-300`;
    if (index === 2) return `${baseClasses} bg-gradient-to-l from-orange-400/10 via-orange-400/20 to-transparent hover:from-orange-400/20 hover:via-orange-400/30 hover:to-orange-400/10 border-r-4 border-r-orange-400`;
    return `${baseClasses} hover:bg-primary/5 hover:shadow-md`;
  };

  const maxPoints = Math.max(...admins.map(a => a.total_points), 1);

  return (
    <div className="border-2 border-primary/20 rounded-xl overflow-hidden shadow-2xl bg-card" data-testid="table-leaderboard">
      <Table>
        <TableHeader className="bg-gradient-to-l from-primary/15 via-gold/10 to-primary/15 sticky top-0 z-10 backdrop-blur-md border-b-2 border-primary/30">
          <TableRow className="hover:bg-transparent">
            <TableHead className="text-right w-20 font-bold text-base">الترتيب</TableHead>
            <TableHead className="text-right font-bold text-base">المتسابق</TableHead>
            <TableHead className="text-right w-32 font-bold text-base">الرقم التعريفي</TableHead>
            <TableHead className="text-right font-bold text-base">إجمالي النقاط</TableHead>
            <TableHead className="text-right w-28 font-bold text-base">الحضور</TableHead>
            <TableHead className="text-right w-28 font-bold text-base">التأخيرات</TableHead>
            <TableHead className="text-right w-28 font-bold text-base">الغيابات</TableHead>
            <TableHead className="text-right font-bold text-base">الإجراءات</TableHead>
            {onEdit && <TableHead className="text-right w-20 font-bold text-base">تعديل</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {admins.map((admin, index) => (
            <TableRow
              key={admin.id}
              className={getRowClassName(index)}
              data-testid={`row-admin-${admin.id}`}
            >
              <TableCell className="font-medium py-6">{getRankBadge(index)}</TableCell>
              <TableCell className="py-6">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    {index < 3 && (
                      <div className="absolute -inset-1 bg-gradient-to-r from-primary to-gold rounded-full blur opacity-40 group-hover:opacity-60 transition-opacity" />
                    )}
                    <Avatar className={`relative h-14 w-14 border-3 transition-all duration-300 group-hover:scale-110 ${
                      index === 0 ? 'border-gold shadow-lg shadow-gold/50' :
                      index === 1 ? 'border-slate-300 shadow-lg shadow-slate-300/50' :
                      index === 2 ? 'border-orange-400 shadow-lg shadow-orange-400/50' :
                      'border-primary/30 group-hover:border-primary'
                    }`}>
                      {admin.avatar_url && <AvatarImage src={admin.avatar_url} alt={admin.name} />}
                      <AvatarFallback className={`text-base font-bold ${
                        index === 0 ? 'bg-gradient-to-br from-gold/30 to-yellow-500/30 text-gold' :
                        index === 1 ? 'bg-gradient-to-br from-slate-200/40 to-slate-300/40 text-slate-700' :
                        index === 2 ? 'bg-gradient-to-br from-orange-400/30 to-amber-600/30 text-orange-700' :
                        'bg-gradient-to-br from-primary/20 to-gold/10'
                      }`}>
                        {admin.initials}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex flex-col">
                    <span className={`font-bold text-lg transition-all group-hover:text-primary ${
                      index === 0 ? 'text-gold' :
                      index === 1 ? 'text-slate-600' :
                      index === 2 ? 'text-orange-600' :
                      ''
                    }`} data-testid={`text-admin-name-${admin.id}`}>
                      {admin.name}
                    </span>
                    {index < 3 && (
                      <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        متصدر
                      </span>
                    )}
                  </div>
                </div>
              </TableCell>
              <TableCell className="py-6">
                {admin.admin_id ? (
                  <Badge variant="outline" className="font-mono font-semibold bg-muted/50 border-primary/30">
                    {admin.admin_id}
                  </Badge>
                ) : (
                  <span className="text-xs text-muted-foreground">-</span>
                )}
              </TableCell>
              <TableCell className="py-6">
                <div className="space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className={`text-3xl font-bold transition-all ${
                      index === 0 ? 'bg-gradient-to-l from-gold to-yellow-500 bg-clip-text text-transparent' :
                      index === 1 ? 'text-slate-600' :
                      index === 2 ? 'text-orange-600' :
                      'text-primary'
                    }`} data-testid={`text-points-${admin.id}`}>
                      {admin.total_points}
                    </span>
                    <span className="text-sm text-muted-foreground font-medium">نقطة</span>
                  </div>
                  <div className="w-full bg-muted/50 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        index === 0 ? 'bg-gradient-to-r from-gold to-yellow-500' :
                        index === 1 ? 'bg-gradient-to-r from-slate-300 to-slate-400' :
                        index === 2 ? 'bg-gradient-to-r from-orange-400 to-amber-600' :
                        'bg-gradient-to-r from-primary to-primary/60'
                      }`}
                      style={{ width: `${(admin.total_points / maxPoints) * 100}%` }}
                    />
                  </div>
                </div>
              </TableCell>
              <TableCell className="py-6">
                <Badge variant="outline" className="bg-success/15 text-success border-success/40 font-bold px-3 py-1.5 shadow-sm">
                  {admin.attendance}
                </Badge>
              </TableCell>
              <TableCell className="py-6">
                <Badge variant="outline" className="bg-warning/15 text-warning border-warning/40 font-bold px-3 py-1.5 shadow-sm">
                  {admin.delays}
                </Badge>
              </TableCell>
              <TableCell className="py-6">
                <Badge variant="outline" className="bg-destructive/15 text-destructive border-destructive/40 font-bold px-3 py-1.5 shadow-sm">
                  {admin.absences}
                </Badge>
              </TableCell>
              <TableCell className="py-6">
                <QuickActionButtons
                  onAction={(action, points) => onAction(admin.id, action, points)}
                />
              </TableCell>
              {onEdit && (
                <TableCell className="py-6">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(admin)}
                    className="h-10 w-10 p-0 hover:bg-primary/10 hover:text-primary transition-all hover:scale-110"
                    data-testid={`button-edit-${admin.id}`}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
