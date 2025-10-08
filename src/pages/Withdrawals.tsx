import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface Withdrawal {
  id: string;
  userId: string;
  userName: string;
  accountNumber: string;
  amount: number;
  description: string;
  bank: string;
  date: string;
}

const mockWithdrawals: Withdrawal[] = [
  { 
    id: "W001", 
    userId: "1", 
    userName: "John Doe", 
    accountNumber: "ACC001", 
    amount: 200.00, 
    description: "ATM withdrawal", 
    bank: "Commercial Bank of Ethiopia",
    date: "2025-10-05"
  },
  { 
    id: "W002", 
    userId: "2", 
    userName: "Jane Smith", 
    accountNumber: "ACC002", 
    amount: 500.00, 
    description: "Cash withdrawal", 
    bank: "Awash Bank",
    date: "2025-10-06"
  },
  { 
    id: "W003", 
    userId: "4", 
    userName: "Emily Davis", 
    accountNumber: "ACC004", 
    amount: 1000.00, 
    description: "Transfer to savings", 
    bank: "Dashen Bank",
    date: "2025-10-07"
  },
];

const Withdrawals = () => {
  const [withdrawals] = useState<Withdrawal[]>(mockWithdrawals);
  const [searchTerm, setSearchTerm] = useState("");
  const isMobile = useIsMobile();

  const filteredWithdrawals = withdrawals.filter(
    (withdrawal) =>
      withdrawal.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      withdrawal.accountNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      withdrawal.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      withdrawal.bank.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Withdrawal Transactions</h1>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, account, bank, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Withdrawals ({filteredWithdrawals.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {isMobile ? (
            <div className="space-y-4">
              {filteredWithdrawals.map((withdrawal) => (
                <Card key={withdrawal.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold">{withdrawal.userName}</h3>
                        <p className="text-sm text-muted-foreground">{withdrawal.accountNumber}</p>
                      </div>
                      <span className="text-lg font-semibold text-destructive">
                        -${withdrawal.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="space-y-1 text-sm">
                      <p><span className="text-muted-foreground">Bank:</span> {withdrawal.bank}</p>
                      <p><span className="text-muted-foreground">Description:</span> {withdrawal.description}</p>
                      <p><span className="text-muted-foreground">Date:</span> {withdrawal.date}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">ID</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Account</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Name</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Bank</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Description</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Amount</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredWithdrawals.map((withdrawal) => (
                    <tr key={withdrawal.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="py-4 px-4 font-mono text-sm">{withdrawal.id}</td>
                      <td className="py-4 px-4 font-mono text-sm">{withdrawal.accountNumber}</td>
                      <td className="py-4 px-4 font-medium">{withdrawal.userName}</td>
                      <td className="py-4 px-4 text-sm">{withdrawal.bank}</td>
                      <td className="py-4 px-4 text-sm text-muted-foreground">{withdrawal.description}</td>
                      <td className="py-4 px-4 text-right font-semibold text-destructive">
                        -${withdrawal.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-4 px-4 text-center text-sm">{withdrawal.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Withdrawals;
