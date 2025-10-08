import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Undo2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

interface Deposit {
  id: string;
  userId: string;
  userName: string;
  accountNumber: string;
  amount: number;
  description: string;
  bank: string;
  date: string;
  reversed: boolean;
}

const mockDeposits: Deposit[] = [
  { 
    id: "D001", 
    userId: "1", 
    userName: "John Doe", 
    accountNumber: "ACC001", 
    amount: 5000.00, 
    description: "Salary deposit", 
    bank: "Commercial Bank of Ethiopia",
    date: "2025-10-05",
    reversed: false
  },
  { 
    id: "D002", 
    userId: "2", 
    userName: "Jane Smith", 
    accountNumber: "ACC002", 
    amount: 10000.00, 
    description: "Business income", 
    bank: "Awash Bank",
    date: "2025-10-06",
    reversed: false
  },
  { 
    id: "D003", 
    userId: "3", 
    userName: "Robert Johnson", 
    accountNumber: "ACC003", 
    amount: 500.00, 
    description: "Transfer", 
    bank: "Dashen Bank",
    date: "2025-10-07",
    reversed: false
  },
];

const Deposits = () => {
  const [deposits, setDeposits] = useState<Deposit[]>(mockDeposits);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const filteredDeposits = deposits.filter(
    (deposit) =>
      deposit.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deposit.accountNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deposit.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deposit.bank.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleReverse = (depositId: string) => {
    setDeposits(deposits.map(d => 
      d.id === depositId ? { ...d, reversed: true } : d
    ));
    toast({
      title: "Deposit Reversed",
      description: "The deposit has been successfully reversed",
    });
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Deposit Transactions</h1>
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
          <CardTitle>All Deposits ({filteredDeposits.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {isMobile ? (
            <div className="space-y-4">
              {filteredDeposits.map((deposit) => (
                <Card key={deposit.id} className={deposit.reversed ? "opacity-50" : ""}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold">{deposit.userName}</h3>
                        <p className="text-sm text-muted-foreground">{deposit.accountNumber}</p>
                      </div>
                      <span className="text-lg font-semibold text-success">
                        +${deposit.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="space-y-1 text-sm">
                      <p><span className="text-muted-foreground">Bank:</span> {deposit.bank}</p>
                      <p><span className="text-muted-foreground">Description:</span> {deposit.description}</p>
                      <p><span className="text-muted-foreground">Date:</span> {deposit.date}</p>
                    </div>
                    {deposit.reversed ? (
                      <div className="mt-3 pt-3 border-t border-border">
                        <span className="text-xs text-destructive font-medium">REVERSED</span>
                      </div>
                    ) : (
                      <div className="mt-3 pt-3 border-t border-border">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleReverse(deposit.id)}
                          className="w-full gap-2"
                        >
                          <Undo2 className="h-4 w-4" />
                          Reverse
                        </Button>
                      </div>
                    )}
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
                    <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDeposits.map((deposit) => (
                    <tr 
                      key={deposit.id} 
                      className={`border-b border-border hover:bg-muted/50 transition-colors ${deposit.reversed ? 'opacity-50' : ''}`}
                    >
                      <td className="py-4 px-4 font-mono text-sm">{deposit.id}</td>
                      <td className="py-4 px-4 font-mono text-sm">{deposit.accountNumber}</td>
                      <td className="py-4 px-4 font-medium">{deposit.userName}</td>
                      <td className="py-4 px-4 text-sm">{deposit.bank}</td>
                      <td className="py-4 px-4 text-sm text-muted-foreground">{deposit.description}</td>
                      <td className="py-4 px-4 text-right font-semibold text-success">
                        +${deposit.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-4 px-4 text-center text-sm">{deposit.date}</td>
                      <td className="py-4 px-4 text-center">
                        {deposit.reversed ? (
                          <span className="text-xs text-destructive font-medium">REVERSED</span>
                        ) : (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleReverse(deposit.id)}
                            className="gap-2"
                          >
                            <Undo2 className="h-4 w-4" />
                            Reverse
                          </Button>
                        )}
                      </td>
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

export default Deposits;
