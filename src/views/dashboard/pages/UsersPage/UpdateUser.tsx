import { useUsers } from "@/api/services";
import FormUser from "./FormUser";
import { SquarePen } from "lucide-react";
import { toast } from "sonner";

interface UpdateUserProps {
  defaultName?: string;
  defaultPassword?: string;
  defaultRole?: string;
  UserUpdtId: string;
}

const UpdateUser = ({
  defaultName,
  defaultPassword,
  defaultRole,
  UserUpdtId,
}: UpdateUserProps) => {
  const { updateUserMutation, isOpenFormUser, setIsOpenFormUser } =
    useUsers();

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const formData = new FormData(ev.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const role = formData.get("role") as string;
    if (role !== "ROLE_USER" && role !== "ROLE_ADMIN") {
      toast.error("Invalid role selected");
      return;
    }
    const idUserUpdt = Number(UserUpdtId)
    if (!username || !password || !role) {
      toast.error("please fill all required Users");
      return;
    }
    updateUserMutation({ username, password, role , id:idUserUpdt });
  };

  return (
    <FormUser
      isOpen={isOpenFormUser}
      setIsOpen={setIsOpenFormUser}
      dialogTitle={"Update User"}
      handleSubmit={handleSubmit}
      defaultName={defaultName}
      defaultPassword={defaultPassword}
      defaultRole={defaultRole}
    >
      <div className="cursor-pointer">
        <SquarePen className="h-5 w-5" />
      </div>
    </FormUser>
  );
};

export default UpdateUser;
