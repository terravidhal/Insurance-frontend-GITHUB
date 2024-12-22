import { useUsers } from "@/api/services";
import { DataTable } from "../../thisComponents/DataTable";
import { ColumnUsers } from "./ColumnUsers";
import FormUser from "./FormUser";
import { toast } from "sonner";






const UsersPage = () => {
  const {
    allUsers,
    createUserMutation,
    isOpenFormUser,
    setIsOpenFormUser,
    isLoadedUser,
  } = useUsers();

  console.log("kkkkkkkkkkkkkkkkkkkkk", allUsers);
  


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
    if (!username || !password || !role) {
      toast.error("please fill all required Users");
      return;
    }
    createUserMutation({ username, password, role  });
  };

  return (
    <>

       

      <div className="flex items-center">
        <div className="ml-auto flex items-center gap-2">
            <FormUser
              isOpen={isOpenFormUser}
              setIsOpen={setIsOpenFormUser}
              dialogTitle={"Create User"}
              buttonName={"Add User"}
              handleSubmit={handleSubmit}
            />
        </div>
      </div>

      <div>
          <DataTable loading={isLoadedUser} columns={ColumnUsers} data={allUsers || []} />
      </div>
    </>
  );
};

export default UsersPage;
