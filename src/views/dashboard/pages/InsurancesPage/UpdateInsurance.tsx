import { useInsurances } from "@/api/services";
import FormInsurance from "./FormInsurance";
import { SquarePen } from "lucide-react";
import { toast } from "sonner";

interface UpdateInsuranceProps {
  defaultName?: string;
  defaultDescription?: string;
  defaultAmount?: number;
  InsuranceUpdtId: string;
}

const UpdateInsurance = ({
  defaultName,
  defaultAmount,
  defaultDescription,
  InsuranceUpdtId,
}: UpdateInsuranceProps) => {
  const { updateInsuranceMutation, isOpenFormInsurance, setIsOpenFormInsurance } =
    useInsurances();

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const formData = new FormData(ev.currentTarget);
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const amountInsurances = formData.get("amount");
    const amount = Number(amountInsurances);
    const idInsuranceUpdt = Number(InsuranceUpdtId);
    if (!name || !description || !amount) {
      toast.error("please fill all required Insurances");
      return;
    }
    updateInsuranceMutation({ name, description, amount , id:idInsuranceUpdt });
  };

  return (
    <FormInsurance
      isOpen={isOpenFormInsurance}
      setIsOpen={setIsOpenFormInsurance}
      dialogTitle={"Update Insurance"}
      handleSubmit={handleSubmit}
      defaultName={defaultName}
      defaultAmount={defaultAmount}
      defaultDescription={defaultDescription}
    >
      <div className="cursor-pointer">
        <SquarePen className="h-5 w-5" />
      </div>
    </FormInsurance>
  );
};

export default UpdateInsurance;
