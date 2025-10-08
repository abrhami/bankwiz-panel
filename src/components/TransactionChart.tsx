import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const weeklyData = [
  { name: "Mon", deposits: 4000, withdrawals: 2400 },
  { name: "Tue", deposits: 3000, withdrawals: 1398 },
  { name: "Wed", deposits: 2000, withdrawals: 9800 },
  { name: "Thu", deposits: 2780, withdrawals: 3908 },
  { name: "Fri", deposits: 1890, withdrawals: 4800 },
  { name: "Sat", deposits: 2390, withdrawals: 3800 },
  { name: "Sun", deposits: 3490, withdrawals: 4300 },
];

const monthlyData = [
  { name: "Week 1", deposits: 12000, withdrawals: 8400 },
  { name: "Week 2", deposits: 15000, withdrawals: 9398 },
  { name: "Week 3", deposits: 18000, withdrawals: 12800 },
  { name: "Week 4", deposits: 21000, withdrawals: 15908 },
];

const allTimeData = [
  { name: "Jan", deposits: 45000, withdrawals: 38400 },
  { name: "Feb", deposits: 52000, withdrawals: 42398 },
  { name: "Mar", deposits: 48000, withdrawals: 39800 },
  { name: "Apr", deposits: 61000, withdrawals: 45908 },
  { name: "May", deposits: 58000, withdrawals: 48800 },
  { name: "Jun", deposits: 67000, withdrawals: 52800 },
];

export const TransactionChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="week" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="all">All Time</TabsTrigger>
          </TabsList>
          
          <TabsContent value="week" className="mt-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="name" className="text-muted-foreground" />
                <YAxis className="text-muted-foreground" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: 'var(--radius)'
                  }}
                />
                <Legend />
                <Bar dataKey="deposits" fill="hsl(var(--success))" name="Deposits" radius={[8, 8, 0, 0]} />
                <Bar dataKey="withdrawals" fill="hsl(var(--destructive))" name="Withdrawals" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="month" className="mt-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="name" className="text-muted-foreground" />
                <YAxis className="text-muted-foreground" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: 'var(--radius)'
                  }}
                />
                <Legend />
                <Bar dataKey="deposits" fill="hsl(var(--success))" name="Deposits" radius={[8, 8, 0, 0]} />
                <Bar dataKey="withdrawals" fill="hsl(var(--destructive))" name="Withdrawals" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>

          <TabsContent value="all" className="mt-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={allTimeData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="name" className="text-muted-foreground" />
                <YAxis className="text-muted-foreground" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: 'var(--radius)'
                  }}
                />
                <Legend />
                <Bar dataKey="deposits" fill="hsl(var(--success))" name="Deposits" radius={[8, 8, 0, 0]} />
                <Bar dataKey="withdrawals" fill="hsl(var(--destructive))" name="Withdrawals" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
