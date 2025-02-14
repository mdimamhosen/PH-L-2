import { Menu } from "antd";
import { adminPaths } from "../../routes/admin.routes";
import { sidebarItemsGenarator } from "../../utlis/sidebarItemsGenarator";
import Sider from "antd/es/layout/Sider";
import { studentPaths } from "../../routes/student.routes";
import { facultyPaths } from "../../routes/faculty.routes";
import { userRole } from "../../utlis/USER_ROLE";

export default function Sidebar() {
  const role = userRole.FACULTY;
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

  return (
    <>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
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
