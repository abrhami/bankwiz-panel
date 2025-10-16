import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, ArrowUpRight, ArrowDownRight, Plus, Minus } from "lucide-react";
import { TransactionDialog } from "@/components/TransactionDialog";
import { differenceInDays } from "date-fns";
import { getUserById, addTransaction, type User, type Transaction } from "@/lib/users";
import { useToast } from "@/hooks/use-toast";

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [isTransactionOpen, setIsTransactionOpen] = useState(false);
  const [transactionType, setTransactionType] = useState<"deposit" | "withdrawal">("deposit");

  useEffect(() => {
    if (id) {
      const userData = getUserById(id);
      if (userData) {
        setUser(userData);
      } else {
        toast({
          title: "User not found",
          description: "The requested user could not be found.",
          variant: "destructive",
        });
        navigate("/users");
      }
    }
  }, [id, navigate, toast]);

  if (!user) {
    return null;
  }

  const transactions = user.transactions || [];

  const totalDeposits = transactions
    .filter(t => t.type === "deposit")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalWithdrawals = transactions
    .filter(t => t.type === "withdrawal")
    .reduce((sum, t) => sum + t.amount, 0);

  const calculateRemainingPayment = () => {
    const today = new Date();
    const daysDiff = differenceInDays(today, user.registrationDate);
    
    let divisor = 1;
    if (user.savingFrequency === "weekly") divisor = 7;
    if (user.savingFrequency === "monthly") divisor = 30;
    
    const expectedSavings = (daysDiff / divisor) * user.savingAmount;
    const remaining = expectedSavings - totalDeposits;
    
    return remaining;
  };

  const remainingPayment = calculateRemainingPayment();

  const handleTransaction = (amount: number, description: string) => {
    if (user) {
      addTransaction(user.id, {
        type: transactionType,
        amount,
        date: new Date().toISOString().split('T')[0],
        description,
      });

      const updatedUser = getUserById(user.id);
      if (updatedUser) {
        setUser(updatedUser);
      }

      toast({
        title: `${transactionType === "deposit" ? "Deposit" : "Withdrawal"} successful`,
        description: `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })} has been ${transactionType === "deposit" ? "added to" : "withdrawn from"} the account.`,
      });
    }
  };

  return (
    <div className="p-4 md:p-8">
      <div className="mb-4 md:mb-6">
        <Link to="/users">
          <Button variant="ghost" className="gap-2 mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Users
          </Button>
        </Link>
        <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-start">
          <div className="flex items-center gap-3 md:gap-4">
            <Avatar className="h-16 w-16 md:h-20 md:w-20">
              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt={user.name} />
              <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">{user.name}</h1>
              <p className="text-sm md:text-base text-muted-foreground">{user.email}</p>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">Account: {user.accountNumber}</p>
            </div>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Button 
              onClick={() => { setTransactionType("deposit"); setIsTransactionOpen(true); }}
              className="gap-2 flex-1 md:flex-none"
              variant="default"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Balance</span>
              <span className="sm:hidden">Deposit</span>
            </Button>
            <Button 
              onClick={() => { setTransactionType("withdrawal"); setIsTransactionOpen(true); }}
              className="gap-2 flex-1 md:flex-none"
              variant="destructive"
            >
              <Minus className="h-4 w-4" />
              <span className="hidden sm:inline">Withdraw</span>
              <span className="sm:hidden">Withdraw</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-3 md:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-4 md:mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Current Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl md:text-3xl font-bold">${user.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
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

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Remaining Payment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${remainingPayment > 0 ? 'text-destructive' : 'text-success'}`}>
              {remainingPayment > 0 ? '-' : '+'}${Math.abs(remainingPayment).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {user.savingAmount.toLocaleString()} {user.savingFrequency}
            </p>
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
                className="flex items-center justify-between p-3 md:p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-2 md:gap-4 flex-1 min-w-0">
                  <div className={`p-2 rounded-full flex-shrink-0 ${
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
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm md:text-base truncate">{transaction.description}</p>
                    <p className="text-xs md:text-sm text-muted-foreground">{transaction.date}</p>
                  </div>
                </div>
                <div className={`font-semibold text-sm md:text-base flex-shrink-0 ml-2 ${
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
