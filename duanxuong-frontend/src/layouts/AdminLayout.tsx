import { Stack } from "@mui/material";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Loading from "src/components/Loading";
import Sidebar from "src/components/Sidebar";
import { useLoading } from "src/contexts/loading";

function AdminLayout() {
  const { loading } = useLoading();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Kiểm tra token mỗi khi component được render lại
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);
  return (
    <>
      <Loading isShow={loading} />
      <Stack direction={"row"} gap={2}>
        <Sidebar />
        <Outlet />
      </Stack>
    </>
  );
}

export default AdminLayout;
