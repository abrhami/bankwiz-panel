import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, Users, DollarSign } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
}

const StatCard = ({ title, value, change, isPositive, icon }: StatCardProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      <div className="text-muted-foreground">{icon}</div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className={`text-xs flex items-center gap-1 mt-2 ${isPositive ? 'text-success' : 'text-destructive'}`}>
        {isPositive ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
        {change} from last period
      </p>
    </CardContent>
  </Card>
);

export const DashboardStats = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Users"
        value="2,549"
        change="+12.5%"
        isPositive={true}
        icon={<Users className="h-4 w-4" />}
      />
      <StatCard
        title="Total Deposits"
        value="$542,890"
        change="+8.2%"
        isPositive={true}
        icon={<ArrowUpRight className="h-4 w-4" />}
      />
      <StatCard
        title="Total Withdrawals"
        value="$321,450"
        change="+3.1%"
        isPositive={false}
        icon={<ArrowDownRight className="h-4 w-4" />}
      />
      <StatCard
        title="Net Balance"
        value="$221,440"
        change="+18.7%"
        isPositive={true}
        icon={<DollarSign className="h-4 w-4" />}
      />
    </div>
  );
};
