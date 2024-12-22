import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";





export const useGeneralHook = () => {
  // Général
  const [isUploaded, setIsUploaded] = useState(false);

  // register
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);
  const [RegisterError, setRegisterError] = useState(false);

  // login
  const [isLogginSuccess, setIsLogginSuccess] = useState(false);
  const [logginError, setLogginError] = useState(false);

  // Gestion des utilisateurs
  const [isOpenFormUser, setIsOpenFormUser] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [isLoadedUser, setIsLoadedUser] = useState(false);
  const [isLoadedDetailsUser, setIsLoadedDetailsUser] = useState(false);

  // Gestion des assurances
  const [isOpenFormInsurance, setIsOpenFormInsurance] = useState(false);
  const [insuranceId, setInsuranceId] = useState<number | null>(null);
  const [isLoadedInsurance, setIsLoadedInsurance] = useState(false);
  const [isLoadedDetailsInsurance, setIsLoadedDetailsInsurance] = useState(false);

  // Gestion des abonnements
  const [isOpenFormSubscription, setIsOpenFormSubscription] = useState(false);
  const [subscriptionId, setSubscriptionId] = useState<number | null>(null);
  const [isLoadedSubscription, setIsLoadedSubscription] = useState(false);
  const [isLoadedDetailsSubscription, setIsLoadedDetailsSubscription] = useState(false);

  return {
    isUploaded,
    setIsUploaded,

    //register
    isRegisterSuccess, 
    setIsRegisterSuccess,
    RegisterError, 
    setRegisterError,

    //login
    isLogginSuccess, 
    setIsLogginSuccess,
    logginError, 
    setLogginError,

    // Utilisateurs
    isOpenFormUser,
    setIsOpenFormUser,
    userId,
    setUserId,
    isLoadedUser,
    setIsLoadedUser,
    isLoadedDetailsUser,
    setIsLoadedDetailsUser,

    // Assurances
    isOpenFormInsurance,
    setIsOpenFormInsurance,
    insuranceId,
    setInsuranceId,
    isLoadedInsurance,
    setIsLoadedInsurance,
    isLoadedDetailsInsurance,
    setIsLoadedDetailsInsurance,

    // Abonnements
    isOpenFormSubscription,
    setIsOpenFormSubscription,
    subscriptionId,
    setSubscriptionId,
    isLoadedSubscription,
    setIsLoadedSubscription,
    isLoadedDetailsSubscription,
    setIsLoadedDetailsSubscription,
  };
};

