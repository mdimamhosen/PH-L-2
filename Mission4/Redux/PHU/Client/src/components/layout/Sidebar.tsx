import { Button, Menu } from "antd";
import { adminPaths } from "../../routes/admin.routes";
import { sidebarItemsGenarator } from "../../utlis/sidebarItemsGenarator";
import Sider from "antd/es/layout/Sider";
import { studentPaths } from "../../routes/student.routes";
import { facultyPaths } from "../../routes/faculty.routes";
import { userRole } from "../../utlis/USER_ROLE";
import { useAppDispathch, useAppSelector } from "../../redux/hooks/hook";
import { logOut, selectCurrentUser } from "../../redux/feature/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Sidebar() {
  const dispatch = useAppDispathch();

  const user = useAppSelector(selectCurrentUser);

  const role = user?.role;
  let sidebarItems;

  switch (role) {
    case userRole.ADMIN:
      sidebarItems = sidebarItemsGenarator(adminPaths, role);
      break;
    case userRole.STUDENT:
      sidebarItems = sidebarItemsGenarator(studentPaths, role);
      break;
    case userRole.FACULTY:
      sidebarItems = sidebarItemsGenarator(facultyPaths, role);
      break;
    default:
      break;
  }

  const navigate = useNavigate();

  const handleLogOut = () => {
    const toastId = toast.loading("Logging out...");
    dispatch(logOut());
    toast.success("Logout Success", { id: toastId });
    navigate("/login");
  };

  return (
    <>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        style={{ height: "100vh", position: "sticky", top: 0, left: 0 }}
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div
          style={{
            color: "white",
            textAlign: "center",
            height: "4rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1>PH University</h1>
          <Button
            style={{
              position: "absolute",
              bottom: "1rem",

              padding: "1rem",
            }}
            onClick={handleLogOut}
            type="dashed"
          >
            Logout
          </Button>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={sidebarItems}
        />
      </Sider>
    </>
  );
}
