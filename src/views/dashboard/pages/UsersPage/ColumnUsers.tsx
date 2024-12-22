import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { User } from "@/interfaces";
import { Link } from "react-router-dom";
import UpdateUser from "./UpdateUser";
import DeleteUser from "./DeleteUser";

export const ColumnUsers: ColumnDef<User>[] = [
  {
    id: "select",
    header: () => <>{"  "}</>,
    cell: () => <>{"  "}</>,
  },
  {
    accessorKey: "username",
    header: "userName",
    cell: ({ row }) => <div className="capitalize">{row.getValue("username")}</div>,
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("role")}</div>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const userObj: User = row.original;

      return (
        <div className="flex gap-4 text-black">
          <Link to={userObj?.id?.toString()}>
            <div className="cursor-pointer">
              <Eye className="h-5 w-5" />
            </div>
          </Link>

          <UpdateUser
            UserUpdtId={userObj?.id?.toString()}
            defaultName={userObj?.username}
            defaultPassword={userObj?.password}
            defaultRole={userObj?.role}
          />

          <DeleteUser UserUpdtId={userObj?.id?.toString()} />
        </div>
      );
    },
  },
];
