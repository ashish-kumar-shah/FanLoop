import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import serviceContext from "../Context/ServicesContext";
const DummyAccount = () => {
  const { authDispatch } = useContext(AppContext);
  const { dummyAccount } = useContext(serviceContext);

  const handleDummyAccount = () => {
    dummyAccount()
      .then((res) => {
        authDispatch({ type: "REGISTER_SUCCESS", payload: res.user });
      })
      .catch((err) => {
        console.log(err);
        authDispatch({ type: "REGISTER_FAILED" });
      });
  };
  return (
    <button
      onClick={handleDummyAccount}
      type="button"
      className="w-full mt-2 border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-2 rounded-lg transition duration-200"
    >
      Use Dummy Account
    </button>
  );
};

export default DummyAccount;
