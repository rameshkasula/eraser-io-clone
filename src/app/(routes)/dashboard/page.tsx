"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import * as React from "react";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { Button } from "@/components/ui/button";
type Props = {};

const DashboardPage = (props: Props) => {
  const { user } = useKindeBrowserClient();

  React.useEffect(() => {
    console.log("user", user);
  }, [user]);

  return (
    <div>
      {" "}
      dashboard page
      <LogoutLink>
        <Button> Logout </Button>
      </LogoutLink>
    </div>
  );
};

export default DashboardPage;
