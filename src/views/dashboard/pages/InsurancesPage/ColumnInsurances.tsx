import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { Insurance } from "@/interfaces";
import { Link } from "react-router-dom";
import UpdateInsurance from "./UpdateInsurance";
import DeleteInsurance from "./DeleteInsurance";

export const ColumnInsurances: ColumnDef<Insurance>[] = [
  {
    id: "select",
    header: () => <>{"  "}</>,
    cell: () => <>{"  "}</>,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => <div className="capitalize">{row.getValue("description")}</div>,
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("amount")}</div>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const insuranceObj: Insurance = row.original;

      return (
        <div className="flex gap-4 text-black">
          <Link to={insuranceObj?.id?.toString()}>
            <div className="cursor-pointer">
              <Eye className="h-5 w-5" />
            </div>
          </Link>

          <UpdateInsurance
            InsuranceUpdtId={insuranceObj?.id?.toString()}
            defaultName={insuranceObj?.name}
            defaultDescription={insuranceObj?.description}
            defaultAmount={insuranceObj?.amount}
          />

          <DeleteInsurance InsuranceUpdtId={insuranceObj?.id?.toString()} />
        </div>
      );
    },
  },
];
