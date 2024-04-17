"use client";

import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getInfo } from "../processes/user.process";
import { useRouter } from "next/router";

const ProtectedRoute = Component => {
  return function IsProtected(props) {
    const dispatch = useDispatch();
    const router = useRouter();

    const getUserInfo = useCallback(async () => {
      const { payload: user } = await dispatch(getInfo());

      if (!user?.id || !user?.name || !user?.email) {
        router.push("/login");
      }
    }, [dispatch, router]);

    useEffect(() => {
      getUserInfo();
    }, [getUserInfo]);

    return <Component {...props} />;
  };
};

export default ProtectedRoute;
