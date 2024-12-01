import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { getUserInfo } from "@/app/API/userInfo";
import { StudentHeaderProps } from "@/app/ui/StudentHeader";

export function useUserSession() {
  const [userInfo, setUserInfo] = useState<StudentHeaderProps | null>(null);
  const [loggedIn, setLoggedIn] = useState(true);

  useEffect(() => {
    const initializeSession = async () => {
      try {
        const data = await getUserInfo();
        if (!data) {
          setLoggedIn(false);
          return;
        }
        setUserInfo(data);
      } catch (error) {
        setLoggedIn(false);
      }
    };
    initializeSession();
  }, []);

  useEffect(() => {
    if (!loggedIn) {
      redirect("/signin");
    }
  }, [loggedIn]);

  return { userInfo, loggedIn };
}
