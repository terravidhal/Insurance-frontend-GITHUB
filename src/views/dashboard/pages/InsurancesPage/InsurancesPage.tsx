import { useInsurances } from "@/api/services";
import { DataTable } from "../../thisComponents/DataTable";
import { ColumnInsurances } from "./ColumnInsurances";
import FormInsurance from "./FormInsurance";
import { toast } from "sonner";





const InsurancesPage = () => {
  const {
    allInsurances,
    createInsuranceMutation,
    isOpenFormInsurance,
    setIsOpenFormInsurance,
    isLoadedInsurance,
  } = useInsurances();

  


  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const formData = new FormData(ev.currentTarget);
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const amountInsurances = formData.get("amount");
    const amount = Number(amountInsurances);
    if (!name || !description || !amount) {
      toast.error("please fill all required Insurances");
      return;
    }
    createInsuranceMutation({ name, description, amount});
  };

  return (
    <>
      <div className="flex items-center">
        <div className="ml-auto flex items-center gap-2">
            <FormInsurance
              isOpen={isOpenFormInsurance}
              setIsOpen={setIsOpenFormInsurance}
              dialogTitle={"Create Insurance"}
              buttonName={"Add Insurance"}
              handleSubmit={handleSubmit}
            />
        </div>
      </div>

      <div>
          <DataTable loading={isLoadedInsurance} columns={ColumnInsurances} data={allInsurances || []} />
      </div>
    </>
  );
};

export default InsurancesPage;
