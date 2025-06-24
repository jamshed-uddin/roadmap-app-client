import ChangePassword from "@/components/ChangePassword";
import DeleteAccount from "@/components/DeleteAccount";
import UserInfo from "@/components/UserInfo";
import React from "react";

const Account = () => {
  return (
    <div className="lg:w-1/2 space-y-10">
      <div>
        <h2 className="text-lg font-medium">Public profile</h2>

        <UserInfo />
      </div>
      <div>
        <h2 className="text-lg font-medium">Change password</h2>
        <ChangePassword />
      </div>

      <div>
        <h2 className="text-lg text-red-500 font-medium">Delete account</h2>
        <DeleteAccount />
      </div>
    </div>
  );
};

export default Account;
