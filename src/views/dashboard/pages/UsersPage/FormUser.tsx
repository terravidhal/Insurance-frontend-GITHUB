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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";

interface FormUserProps {
  buttonName?: string;
  dialogTitle?: string;
  handleSubmit?: (ev: React.FormEvent<HTMLFormElement>) => Promise<void>;
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  defaultName?: string;
  defaultPassword?: string;
  defaultRole?: string;
  children?: any;
}

export default function FormUser({
  buttonName,
  dialogTitle,
  handleSubmit,
  isOpen,
  setIsOpen,
  defaultName,
  defaultPassword,
  defaultRole,
  children,
}: FormUserProps) {
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
            Make changes to your User here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                userName
              </Label>
              <Input
                id="username"
                name="username"
                defaultValue={defaultName}
                placeholder="ex : marc"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                defaultValue={defaultPassword}
                className="col-span-3"
                placeholder="ex: tokenG&752"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Role
              </Label>
              <Select defaultValue={defaultRole} name="role">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Role</SelectLabel>
                    <SelectItem value="ROLE_ADMIN">ROLE_ADMIN</SelectItem>
                    <SelectItem value="ROLE_USER">ROLE_USER</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
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
