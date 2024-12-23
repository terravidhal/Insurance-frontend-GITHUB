import axios from "axios";
import { toast } from "sonner";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import baseUrl from "@/constants/baseUrl";
import {
  CreateUser,
  Insurance,
  Login,
  Register,
  Subscription,
  UpdateUser,
  createInsuranceSchema,
  createSubscriptionSchema,
  createUserSchema,
  loginSchema,
  registerschema,
  updateInsuranceSchema,
  updateSubscriptionSchema,
  updateUserSchema,
} from "@/interfaces";
import { useGeneralHook } from "@/hooks/generalHook";
import { getToken } from "@/utils/localStorage";







// register hook
export const useRegister = () => {
  const { isRegisterSuccess, setIsRegisterSuccess,
          RegisterError, 
          setRegisterError,
   } = useGeneralHook();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  
  const register = async (userInfos: Register) => {
    try {
      const result = registerschema.safeParse(userInfos);
      if (!result?.success) {
        Object.values(result.error)[0].map((elt: any) => {
          toast.error(elt?.message);
        });
        return;
      }
      await axios.post(baseUrl + "auth/register", userInfos);
      setIsRegisterSuccess(true);
      toast.success("register successfully!!");
      navigate(`/home`);
    } catch (err: any) {
      setRegisterError(true);
      toast.error(err.response?.data?.message || "Error register");
    }
  };

  const {
    mutate: registerMutation,
  } = useMutation({
    mutationFn: register,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["insurances"] });
    },
  });

  return {
    registerMutation,
    isRegisterSuccess,
    RegisterError,
  };
};


// login hook
export const useLogin = () => {
  const { isLogginSuccess, setIsLogginSuccess,
          logginError, 
          setLogginError,
   } = useGeneralHook();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  
  const login = async (userInfos: Login) => {
    try {
      const result = loginSchema.safeParse(userInfos);
      if (!result?.success) {
        Object.values(result.error)[0].map((elt: any) => {
          toast.error(elt?.message);
        });
        return;
      }
      const response = await axios.post(baseUrl + "auth/login", userInfos);
      setIsLogginSuccess(true);
      toast.success("login successfully!!");
      localStorage.setItem("USER_TOKEN", JSON.stringify(response.data));      
      navigate(`/dashboard`);
    } catch (err: any) {
      setLogginError(true);
      toast.error(err.response?.data?.message || "Error login");
    }
  };

  const {
    mutate: loginMutation,
  } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["insurances"] });
    },
  });

  return {
    loginMutation,
    isLogginSuccess,
    logginError,
  };
};

// logout hook
export const useLogout = () => {
  const token = getToken();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await axios.post(
        baseUrl + "auth/logout",
        {}, 
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      toast.success("logout successfully!!");
      localStorage.removeItem("USER_TOKEN");
      navigate(`/home`);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "logout failed !!");
    }
  };
  const {
    mutate: logoutMutation,
    isPending: isPendingLogout,
    isError: isErrorLogout,
    isSuccess: isSuccessLogout,
    error: errorLogout,
  } = useMutation({
    mutationFn: logout,
  });

  return {
    logoutMutation,
    isPendingLogout,
    isErrorLogout,
    isSuccessLogout,
    errorLogout,
  };
};



// user hook
export const useUsers = () => {
  const queryClient = useQueryClient();
  const token = getToken();

  const {
    isOpenFormUser,
    setIsOpenFormUser,
    userId,
    isLoadedUser,
    setIsLoadedUser,
    isLoadedDetailsUser,
    setIsLoadedDetailsUser,
  } = useGeneralHook();

 
  const createUser = async (userInfos: CreateUser) => {
    try {
      const result = createUserSchema.safeParse(userInfos);
      if (!result?.success) {
        Object.values(result.error)[0].map((elt: any) => {
          toast.error(elt?.message);
        });
        return;
      }
      await axios.post(`${baseUrl}users`, userInfos, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      toast.success('User created successfully!');
      setIsOpenFormUser(false);
    } catch (err: any) {
      //toast.error(err.response?.data?.message || 'Error creating user');
      console.log(err.response?.data?.message || 'Error creating user');
    }
  };

  const { mutate: createUserMutation } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  
  const updateUser = async (userInfos: UpdateUser) => {
    try {
      const result = updateUserSchema.safeParse(userInfos);
      if (!result?.success) {
        Object.values(result.error)[0].map((elt: any) => {
          toast.error(elt?.message);
        });
        return;
      }
      await axios.put(`${baseUrl}users/${userInfos.id}`, userInfos, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('User updated successfully!');
      setIsOpenFormUser(false);
    } catch (err: any) {
      //toast.error(err.response?.data?.message || 'Error updating user');
      console.log(err.response?.data?.message || 'Error updating user');
    }
  };

  const { mutate: updateUserMutation } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  
  const deleteUser = async (userId: number) => {
    try {
      await axios.delete(`${baseUrl}users/${userId}`,
        {
        headers: {
          Authorization: `Bearer ${token}`,
        },
       }
    );
      toast.success('User deleted successfully!');
      setIsOpenFormUser(false);
    } catch (err: any) {
     // toast.error(err.response?.data?.message || 'Error deleting user');
      console.log(err.response?.data?.message || 'Error deleting user');
    }
  };

  const { mutate: deleteUserMutation } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });



  // get All
  const { data: allUsers, isError, error } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data } = await axios.get(`${baseUrl}users`, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
     );
      setIsLoadedUser(false);      
      return data;
    },
  });

  if (isError) {    
   // toast.error(error?.message || 'Error fetching users');
    console.log(error?.message || 'Error fetching users');
  }


  // get Id
  const { 
    error: errorGetSingleUser,
    data: singleUser,
    isError: isErrorGetSingleUser,
   } = useQuery({
    queryKey: ["dataOneUser"],
    queryFn: async () => {
      const { data } = await axios.get(`${baseUrl}users/${userId}`, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
    );

      setIsLoadedDetailsUser(false);
      return data;
    },
  });

  //if (isErrorGetSingleUser) toast.error(errorGetSingleUser.message || "Error");
  if (isErrorGetSingleUser) console.log(errorGetSingleUser.message || "Error");
 
  
  return {
    allUsers,
    singleUser,
    createUserMutation,
    updateUserMutation,
    deleteUserMutation,
    isOpenFormUser,
    setIsOpenFormUser,
    isLoadedUser,
    setIsLoadedUser,
    isLoadedDetailsUser,
    setIsLoadedDetailsUser,
  };
};

// insurances hook
export const useInsurances = () => {
  const queryClient = useQueryClient();
  const token = getToken();

  const {
    isOpenFormInsurance,
    setIsOpenFormInsurance,
    insuranceId,
    isLoadedInsurance,
    setIsLoadedInsurance,
    isLoadedDetailsInsurance,
    setIsLoadedDetailsInsurance,
  } = useGeneralHook();

  // Create Insurance Product
  const createInsurance = async (insuranceInfos: any) => {
    try {
      const result = createInsuranceSchema.safeParse(insuranceInfos);
      if (!result?.success) {
        Object.values(result.error)[0].map((elt: any) => {
          toast.error(elt?.message);
        });
        return;
      }
      await axios.post(`${baseUrl}insurances`, insuranceInfos, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Insurance product created successfully!');
      setIsOpenFormInsurance(false);
    } catch (err: any) {
     // toast.error(err.response?.data?.message || 'Error creating insurance product');
      console.log(err.response?.data?.message || 'Error creating insurance product');
    }
  };

  const { mutate: createInsuranceMutation } = useMutation({
    mutationFn: createInsurance,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['insurances'] });
    },
  });

  // Update Insurance Product
  const updateInsurance = async (insuranceInfos: Insurance) => {
    try {
      const result = updateInsuranceSchema.safeParse(insuranceInfos);
      if (!result?.success) {
        Object.values(result.error)[0].map((elt: any) => {
          toast.error(elt?.message);
        });
        return;
      }

      await axios.put(`${baseUrl}insurances/${insuranceInfos.id}`, insuranceInfos, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Insurance product updated successfully!');
      setIsOpenFormInsurance(false);
    } catch (err: any) {
     // toast.error(err.response?.data?.message || 'Error updating insurance product');
      console.log(err.response?.data?.message || 'Error updating insurance product');
    }
  };

  const { mutate: updateInsuranceMutation } = useMutation({
    mutationFn: updateInsurance,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['insurances'] });
    },
  });

  // Delete Insurance Product
  const deleteInsurance = async (insuranceId: number) => {
    try {
      await axios.delete(`${baseUrl}insurances/${insuranceId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Insurance product deleted successfully!');
      setIsOpenFormInsurance(false);
    } catch (err: any) {
     // toast.error(err.response?.data?.message || 'Error deleting insurance product');
     console.log(err.response?.data?.message || 'Error deleting insurance product');
    }
  };

  const { mutate: deleteInsuranceMutation } = useMutation({
    mutationFn: deleteInsurance,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['insurances'] });
    },
  });

  // Get All Insurance Products
  const { data: allInsurances, isError, error } = useQuery({
    queryKey: ['insurances'],
    queryFn: async () => {
      const { data } = await axios.get(`${baseUrl}insurances`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsLoadedInsurance(false);
      return data;
    },
  });

  if (isError) {
    //toast.error(error?.message || 'Error fetching insurance products');
    console.log(error?.message || 'Error fetching insurance products');
  }

  

  // Get Insurance Product by ID
  const { error: errorGetSingleInsurance, 
    data: singleInsurance, 
    isError: isErrorGetSingleInsurance } = useQuery({
    queryKey: ['dataOneInsurance'],
    queryFn: async () => {
      const { data } = await axios.get(`${baseUrl}insurances/${insuranceId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsLoadedDetailsInsurance(false);
      return data;
    },
  });

  //if (isErrorGetSingleInsurance) toast.error(errorGetSingleInsurance?.message || 'Error fetching insurance product by ID');
  if (isErrorGetSingleInsurance) console.log(errorGetSingleInsurance?.message || 'Error fetching insurance product by ID');

  return {
    allInsurances,
    singleInsurance,
    createInsuranceMutation,
    updateInsuranceMutation,
    deleteInsuranceMutation,
    isOpenFormInsurance,
    setIsOpenFormInsurance,
    isLoadedInsurance,
    setIsLoadedInsurance,
    isLoadedDetailsInsurance,
    setIsLoadedDetailsInsurance,
  };
};

// subscriptions hook
export const useSubscriptions = () => {
  const queryClient = useQueryClient();
  const token = getToken();

  const {
    isOpenFormSubscription,
    setIsOpenFormSubscription,
    subscriptionId,
    isLoadedSubscription,
    setIsLoadedSubscription,
    isLoadedDetailsSubscription,
    setIsLoadedDetailsSubscription,
  } = useGeneralHook();

  // Create Subscription
  const createSubscription = async (subscriptionInfos: Subscription) => {
    try {
      const result = createSubscriptionSchema.safeParse(subscriptionInfos);
      if (!result?.success) {
        Object.values(result.error)[0].map((elt: any) => {
          toast.error(elt?.message);
        });
        return;
      }
      await axios.post(`${baseUrl}subscriptions`, subscriptionInfos, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Subscription created successfully!');
      setIsOpenFormSubscription(false);
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Error creating subscription');
    }
  };

  const { mutate: createSubscriptionMutation } = useMutation({
    mutationFn: createSubscription,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
    },
  });

  // Update Subscription
  const updateSubscription = async (subscriptionInfos: Subscription) => {
    try {
      const result = updateSubscriptionSchema.safeParse(subscriptionInfos);
      if (!result?.success) {
        Object.values(result.error)[0].map((elt: any) => {
          toast.error(elt?.message);
        });
        return;
      }
   
      await axios.put(`${baseUrl}subscriptions/${subscriptionInfos.id}`, subscriptionInfos, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Subscription updated successfully!');
      setIsOpenFormSubscription(false);
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Error updating subscription');
    }
  };

  const { mutate: updateSubscriptionMutation } = useMutation({
    mutationFn: updateSubscription,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
    },
  });

  // Delete Subscription
  const deleteSubscription = async (subscriptionId: number) => {
    try {

      await axios.delete(`${baseUrl}subscriptions/${subscriptionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Subscription deleted successfully!');
      setIsOpenFormSubscription(false);
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Error deleting subscription');
    }
  };

  const { mutate: deleteSubscriptionMutation } = useMutation({
    mutationFn: deleteSubscription,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
    },
  });

  // Get All Subscriptions
  const { data: allSubscriptions, isError, error } = useQuery({
    queryKey: ['subscriptions'],
    queryFn: async () => {
      const { data } = await axios.get(`${baseUrl}subscriptions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsLoadedSubscription(false);
      return data;
    },
  });

  if (isError) {
    toast.error(error?.message || 'Error fetching subscriptions');
  }

  // Get Subscription by ID
  const { error: errorGetSingleSubscription, 
    data: singleSubscription, 
    isError: isErrorGetSingleSubscription } = useQuery({
    queryKey: ['dataOneSubscription'],
    queryFn: async () => {

      const { data } = await axios.get(`${baseUrl}subscriptions/${subscriptionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsLoadedDetailsSubscription(false);
      return data;
    },
  });

  if (isErrorGetSingleSubscription) toast.error(errorGetSingleSubscription?.message || 'Error fetching subscription by ID');

  return {
    allSubscriptions,
    singleSubscription,
    createSubscriptionMutation,
    updateSubscriptionMutation,
    deleteSubscriptionMutation,
    isOpenFormSubscription,
    setIsOpenFormSubscription,
    isLoadedSubscription,
    setIsLoadedSubscription,
    isLoadedDetailsSubscription,
    setIsLoadedDetailsSubscription,
  };
};
