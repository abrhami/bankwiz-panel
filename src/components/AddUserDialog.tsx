import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Upload } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AddUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddUser: (userData: { name: string; savingAmount: number; savingFrequency: "daily" | "weekly" | "monthly"; registrationDate: Date; initialBalance: number }) => void;
}

export const AddUserDialog = ({ open, onOpenChange, onAddUser }: AddUserDialogProps) => {
  const [name, setName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [registrationDate, setRegistrationDate] = useState<Date>();
  const [savingAmount, setSavingAmount] = useState("");
  const [savingFrequency, setSavingFrequency] = useState<"daily" | "weekly" | "monthly">("daily");
  const [initialBalance, setInitialBalance] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !fatherName || !idNumber || !photo || !registrationDate || !savingAmount || !initialBalance) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    onAddUser({
      name,
      savingAmount: parseFloat(savingAmount),
      savingFrequency,
      registrationDate,
      initialBalance: parseFloat(initialBalance)
    });

    toast({
      title: "User Created",
      description: `Account created for ${name}`,
    });

    setName("");
    setFatherName("");
    setIdNumber("");
    setPhoto(null);
    setRegistrationDate(undefined);
    setSavingAmount("");
    setSavingFrequency("daily");
    setInitialBalance("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto px-1">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Abebe Kebede"
            />
          </div>
          <div>
            <Label htmlFor="fatherName">Father Name</Label>
            <Input
              id="fatherName"
              value={fatherName}
              onChange={(e) => setFatherName(e.target.value)}
              placeholder="Kebede Lemma"
            />
          </div>
          <div>
            <Label htmlFor="idNumber">ID Number</Label>
            <Input
              id="idNumber"
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
              placeholder="ID-123456"
            />
          </div>
          <div>
            <Label htmlFor="photo">Photo</Label>
            <div className="flex items-center gap-2">
              <Input
                id="photo"
                type="file"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files?.[0] || null)}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('photo')?.click()}
                className="w-full"
              >
                <Upload className="mr-2 h-4 w-4" />
                {photo ? photo.name : "Upload Photo"}
              </Button>
            </div>
          </div>
          <div>
            <Label>Registration Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !registrationDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {registrationDate ? format(registrationDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={registrationDate}
                  onSelect={setRegistrationDate}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <Label htmlFor="savingAmount">Saving Amount</Label>
            <Input
              id="savingAmount"
              type="number"
              step="0.01"
              value={savingAmount}
              onChange={(e) => setSavingAmount(e.target.value)}
              placeholder="0.00"
            />
          </div>
          <div>
            <Label htmlFor="frequency">Saving Frequency</Label>
            <Select value={savingFrequency} onValueChange={(value: any) => setSavingFrequency(value)}>
              <SelectTrigger id="frequency">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="balance">Initial Balance</Label>
            <Input
              id="balance"
              type="number"
              step="0.01"
              value={initialBalance}
              onChange={(e) => setInitialBalance(e.target.value)}
              placeholder="0.00"
            />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Account</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
