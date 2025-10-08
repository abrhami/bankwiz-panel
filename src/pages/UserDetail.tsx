import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowUpRight, ArrowDownRight, Plus, Minus } from "lucide-react";
import { TransactionDialog } from "@/components/TransactionDialog";

interface Transaction {
  id: string;
  type: "deposit" | "withdrawal";
  amount: number;
  date: string;
  description: string;
}

const mockTransactions: Transaction[] = [
  { id: "1", type: "deposit", amount: 1000, date: "2025-10-07", description: "Salary deposit" },
  { id: "2", type: "withdrawal", amount: 250, date: "2025-10-06", description: "ATM withdrawal" },
  { id: "3", type: "deposit", amount: 500, date: "2025-10-05", description: "Transfer received" },
  { id: "4", type: "withdrawal", amount: 120.50, date: "2025-10-04", description: "Online purchase" },
];

const UserDetail = () => {
  const { id } = useParams();
  const [balance, setBalance] = useState(5420.50);
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [isTransactionOpen, setIsTransactionOpen] = useState(false);
  const [transactionType, setTransactionType] = useState<"deposit" | "withdrawal">("deposit");

  const user = {
    id: id || "1",
    name: "John Doe",
    email: "john@example.com",
    accountNumber: "ACC001",
    status: "active"
  };

  const totalDeposits = transactions
    .filter(t => t.type === "deposit")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalWithdrawals = transactions
    .filter(t => t.type === "withdrawal")
    .reduce((sum, t) => sum + t.amount, 0);

  const handleTransaction = (amount: number, description: string) => {
    const newTransaction: Transaction = {
      id: String(transactions.length + 1),
      type: transactionType,
      amount,
      date: new Date().toISOString().split('T')[0],
      description
    };

    setTransactions([newTransaction, ...transactions]);
    
    if (transactionType === "deposit") {
      setBalance(balance + amount);
    } else {
      setBalance(balance - amount);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <Link to="/users">
          <Button variant="ghost" className="gap-2 mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Users
          </Button>
        </Link>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{user.name}</h1>
            <p className="text-muted-foreground">{user.email}</p>
            <p className="text-sm text-muted-foreground mt-1">Account: {user.accountNumber}</p>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={() => { setTransactionType("deposit"); setIsTransactionOpen(true); }}
              className="gap-2"
              variant="default"
            >
              <Plus className="h-4 w-4" />
              Add Balance
            </Button>
            <Button 
              onClick={() => { setTransactionType("withdrawal"); setIsTransactionOpen(true); }}
              className="gap-2"
              variant="destructive"
            >
              <Minus className="h-4 w-4" />
              Withdraw
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Current Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Deposits</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              +${totalDeposits.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Withdrawals</CardTitle>
            <ArrowDownRight className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              -${totalWithdrawals.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-full ${
                    transaction.type === 'deposit' 
                      ? 'bg-success/10 text-success' 
                      : 'bg-destructive/10 text-destructive'
                  }`}>
                    {transaction.type === 'deposit' ? (
                      <ArrowUpRight className="h-4 w-4" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-muted-foreground">{transaction.date}</p>
                  </div>
                </div>
                <div className={`font-semibold ${
                  transaction.type === 'deposit' ? 'text-success' : 'text-destructive'
                }`}>
                  {transaction.type === 'deposit' ? '+' : '-'}$
                  {transaction.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <TransactionDialog
        open={isTransactionOpen}
        onOpenChange={setIsTransactionOpen}
        type={transactionType}
        onSubmit={handleTransaction}
      />
    </div>
  );
};

export default UserDetail;
