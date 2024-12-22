import { useUsers } from "@/api/services";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";

interface DeleteUserProps {
  UserUpdtId: string;
}

const DeleteUser = ({ UserUpdtId }: DeleteUserProps) => {
  const { deleteUserMutation, isOpenFormUser, setIsOpenFormUser } =
    useUsers();

  const handleDelete = () => {
    const idUserUpdt = Number(UserUpdtId);
    deleteUserMutation(idUserUpdt);
  };

  const handleOpenChange = (open: boolean) => {
    if (setIsOpenFormUser) {
      setIsOpenFormUser(open);
    }
  };

  return (
    <AlertDialog open={isOpenFormUser} onOpenChange={handleOpenChange}>
      <AlertDialogTrigger asChild>
        <div className="cursor-pointer">
          <Trash2 className="h-5 w-5" />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone..
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="text-white bg-red-600 hover:bg-red-500"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteUser;
