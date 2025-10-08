import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserPlus, Search, Eye, ArrowUpDown } from "lucide-react";
import { AddUserDialog } from "@/components/AddUserDialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useIsMobile } from "@/hooks/use-mobile";

interface User {
  id: string;
  name: string;
  email: string;
  balance: number;
  accountNumber: string;
  status: "active" | "suspended";
}

const mockUsers: User[] = [
  { id: "1", name: "John Doe", email: "john@example.com", balance: 5420.50, accountNumber: "ACC001", status: "active" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", balance: 12340.75, accountNumber: "ACC002", status: "active" },
  { id: "3", name: "Robert Johnson", email: "robert@example.com", balance: 890.25, accountNumber: "ACC003", status: "active" },
  { id: "4", name: "Emily Davis", email: "emily@example.com", balance: 23450.00, accountNumber: "ACC004", status: "active" },
];

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [sortBy, setSortBy] = useState<"name" | "balance" | "account">("name");
  const isMobile = useIsMobile();

  const filteredUsers = users
    .filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.accountNumber.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "balance") return b.balance - a.balance;
      if (sortBy === "account") return a.accountNumber.localeCompare(b.accountNumber);
      return 0;
    });

  const handleAddUser = (userData: { name: string; email: string; initialBalance: number }) => {
    const newUser: User = {
      id: String(users.length + 1),
      name: userData.name,
      email: userData.email,
      balance: userData.initialBalance,
      accountNumber: `ACC${String(users.length + 1).padStart(3, '0')}`,
      status: "active"
    };
    setUsers([...users, newUser]);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-foreground">User Accounts</h1>
        <Button onClick={() => setIsAddUserOpen(true)} className="gap-2">
          <UserPlus className="h-4 w-4" />
          Add User
        </Button>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or account number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
              <SelectTrigger className="w-full md:w-[200px]">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Sort by Name</SelectItem>
                <SelectItem value="balance">Sort by Balance</SelectItem>
                <SelectItem value="account">Sort by Account</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {isMobile ? (
            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <Card key={user.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{user.name}</h3>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <p className="text-xs font-mono text-muted-foreground mt-1">{user.accountNumber}</p>
                      </div>
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        user.status === 'active' 
                          ? 'bg-success/10 text-success' 
                          : 'bg-destructive/10 text-destructive'
                      }`}>
                        {user.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-border">
                      <div>
                        <p className="text-xs text-muted-foreground">Balance</p>
                        <p className="text-lg font-semibold">
                          ${user.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                      <Link to={`/users/${user.id}`}>
                        <Button variant="ghost" size="sm" className="gap-2">
                          <Eye className="h-4 w-4" />
                          View
                        </Button>
                      </Link>
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
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Account</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Name</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Email</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Balance</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="py-4 px-4 font-mono text-sm">{user.accountNumber}</td>
                      <td className="py-4 px-4 font-medium">{user.name}</td>
                      <td className="py-4 px-4 text-muted-foreground">{user.email}</td>
                      <td className="py-4 px-4 text-right font-semibold">
                        ${user.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          user.status === 'active' 
                            ? 'bg-success/10 text-success' 
                            : 'bg-destructive/10 text-destructive'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <Link to={`/users/${user.id}`}>
                          <Button variant="ghost" size="sm" className="gap-2">
                            <Eye className="h-4 w-4" />
                            View
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <AddUserDialog 
        open={isAddUserOpen} 
        onOpenChange={setIsAddUserOpen}
        onAddUser={handleAddUser}
      />
    </div>
  );
};

export default Users;
