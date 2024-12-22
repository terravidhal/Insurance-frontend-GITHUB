import { useRegister } from "@/api/services";
import { Spinner } from "@/components/icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const Register = () => {
  const { registerMutation, isRegisterSuccess} = useRegister();

  const [statusConnexion, setStatusConnexion] = useState("initial");

  const handleSubmitRegister = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const formData = new FormData(ev.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    if (!username || !password) {
      toast.error("please fill all required fields");
      setStatusConnexion("initial");
      return;
    }
    registerMutation({ username, password, role:"ROLE_ADMIN" });
  };

  const returnLoad = () => {
    setStatusConnexion("send");
  };

  return (
    <>
      <section className="dark:bg-bg-color-dark relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[100px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="shadow-three mx-auto max-w-[500px] rounded bg-white px-6 py-10 dark:bg-dark sm:py-[30px] sm:px-[60px]">
                <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  Create your account
                </h3>
                <div className="mb-8 flex items-center justify-center">
                  <span className="hidden h-[1px] w-full max-w-[70px] bg-body-color/50 sm:block"></span>
                  <p className="w-full px-5 text-center text-base font-medium text-body-color">
                  Create an account with your username
                  </p>
                  <span className="hidden h-[1px] w-full max-w-[70px] bg-body-color/50 sm:block"></span>
                </div>
                <form onSubmit={handleSubmitRegister}>
                  <div className="mb-8">
                    <label
                      htmlFor="username"
                      className="mb-3 block text-sm text-dark dark:text-white"
                    >
                      Your UserName
                    </label>
                    <input
                      type="username"
                      name="username"
                      placeholder="Enter your UserName : ex mark"
                      className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                    />
                  </div>
                  <div className="mb-8">
                    <label
                      htmlFor="password"
                      className="mb-3 block text-sm text-dark dark:text-white"
                    >
                      Your Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter your Password"
                      className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                    />
                  </div>

                  <div className="mb-6">
                    <button
                      onClick={returnLoad}
                      className={`shadow-submit dark:shadow-submit-dark flex w-full items-center justify-center rounded-sm bg-primary  px-9 py-4 text-base font-medium text-white duration-300 hover:transparent`}
                    >
                      {statusConnexion === "initial" ? (
                        "Sign in"
                      ) : statusConnexion === "send" ? (
                        isRegisterSuccess === false  ? (
                          <Spinner color="bg-white" />
                        ) : isRegisterSuccess === true ? (
                          "success"
                        ) : "Sign in"
                      ) : null}
                    </button>
                  </div>
                  <p>Already have an account? Please <Link to="/"> <span className="text-cyan-800">sign in</span></Link>.</p>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute left-0 top-0 z-[-1]">
          <svg
            width="1440"
            height="969"
            viewBox="0 0 1440 969"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0_95:1005"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="1440"
              height="969"
            >
              <rect width="1440" height="969" fill="#090E34" />
            </mask>
            <g mask="url(#mask0_95:1005)">
              <path
                opacity="0.1"
                d="M1086.96 297.978L632.959 554.978L935.625 535.926L1086.96 297.978Z"
                fill="url(#paint0_linear_95:1005)"
              />
              <path
                opacity="0.1"
                d="M1324.5 755.5L1450 687V886.5L1324.5 967.5L-10 288L1324.5 755.5Z"
                fill="url(#paint1_linear_95:1005)"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_95:1005"
                x1="1178.4"
                y1="151.853"
                x2="780.959"
                y2="453.581"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_95:1005"
                x1="160.5"
                y1="220"
                x2="1099.45"
                y2="1192.04"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>
    </>
  );
};

export default Register;
