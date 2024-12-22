import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";

interface FormInsuranceProps {
  buttonName?: string;
  dialogTitle?: string;
  handleSubmit?: (ev: React.FormEvent<HTMLFormElement>) => Promise<void>;
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  defaultName?: string;
  defaultDescription?: string;
  defaultAmount?: number;
  children?: any;
}

export default function FormInsurance({
  buttonName,
  dialogTitle,
  handleSubmit,
  isOpen,
  setIsOpen,
  defaultName,
  defaultDescription,
  defaultAmount,
  children,
}: FormInsuranceProps) {
  const handleOpenChange = (open: boolean) => {
    if (setIsOpen) {
      setIsOpen(open);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {buttonName ? (
        <DialogTrigger asChild>
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="text-white h-3.5 w-3.5" />
            <span className="sr-only text-white sm:not-sr-only sm:whitespace-nowrap">
              {buttonName}
            </span>
          </Button>
        </DialogTrigger>
      ) : null}

      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>
            Make changes to your Insurance here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
               Name
              </Label>
              <Input
                id="name"
                name="name"
                defaultValue={defaultName}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
               Description
              </Label>
              <Input
                id="description"
                name="description"
                defaultValue={defaultDescription}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount
              </Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                defaultValue={defaultAmount}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button className="text-white" type="submit">
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
