import { useInsurances } from "@/api/services";
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

interface DeleteInsuranceProps {
  InsuranceUpdtId: string;
}

const DeleteInsurance = ({ InsuranceUpdtId }: DeleteInsuranceProps) => {
  const { deleteInsuranceMutation, isOpenFormInsurance, setIsOpenFormInsurance } =
    useInsurances();

  const handleDelete = () => {
    const idInsuranceUpdt = Number(InsuranceUpdtId);
    deleteInsuranceMutation(idInsuranceUpdt);
  };

  const handleOpenChange = (open: boolean) => {
    if (setIsOpenFormInsurance) {
      setIsOpenFormInsurance(open);
    }
  };

  return (
    <AlertDialog open={isOpenFormInsurance} onOpenChange={handleOpenChange}>
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

export default DeleteInsurance;
