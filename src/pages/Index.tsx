import { DashboardStats } from "@/components/DashboardStats";
import { TransactionChart } from "@/components/TransactionChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface RecentActivity {
  id: string;
  user: string;
  type: "deposit" | "withdrawal";
  amount: number;
  time: string;
}

const recentActivities: RecentActivity[] = [
  { id: "1", user: "John Doe", type: "deposit", amount: 1000, time: "2 minutes ago" },
  { id: "2", user: "Jane Smith", type: "withdrawal", amount: 250, time: "15 minutes ago" },
  { id: "3", user: "Robert Johnson", type: "deposit", amount: 500, time: "1 hour ago" },
  { id: "4", user: "Emily Davis", type: "deposit", amount: 2000, time: "3 hours ago" },
  { id: "5", user: "Michael Brown", type: "withdrawal", amount: 750, time: "5 hours ago" },
];

const Index = () => {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening with your banking system today.</p>
      </div>

      <div className="space-y-6">
        <DashboardStats />

        <TransactionChart />

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-full ${
                      activity.type === 'deposit' 
                        ? 'bg-success/10 text-success' 
                        : 'bg-destructive/10 text-destructive'
                    }`}>
                      {activity.type === 'deposit' ? (
                        <ArrowUpRight className="h-4 w-4" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{activity.user}</p>
                      <p className="text-sm text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                  <div className={`font-semibold ${
                    activity.type === 'deposit' ? 'text-success' : 'text-destructive'
                  }`}>
                    {activity.type === 'deposit' ? '+' : '-'}$
                    {activity.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
