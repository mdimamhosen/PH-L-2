import { Button, Row } from "antd";

import { useLoginMutation } from "../redux/feature/auth/authAPI";
import { useAppDispathch } from "../redux/hooks/hook";
import { IUSer, setUser } from "../redux/feature/auth/authSlice";
import { verifyToken } from "../utlis/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../components/Form/PHForm";
import PHFormInput from "../components/Form/PHFormInput";
import { FieldValues } from "react-hook-form";

const Login = () => {
  const dispatch = useAppDispathch();
  const navigate = useNavigate();

  const defaultValues = {
    id: "A-0001",
    password: "admin123",
  };

  const [login, { data, error }] = useLoginMutation();

  console.log("data =>", data);
  console.log("error =>", error);

  const onSubmit = async (formData: FieldValues) => {
    const { id, password } = formData as { id: string; password: string };
    console.log("FormData =>", formData);
    const toastId = toast.loading("Loging in...");
    try {
      console.log("FormData =>", formData);
      const response = await login({ id, password }).unwrap();
      console.log("response =>", response);

      const user = verifyToken(response.data.accessToken) as IUSer;
      console.log("user =>", user);
      dispatch(
        setUser({
          user: user,
          token: response.data.accessToken,
        })
      );

      toast.success("Login Success", { id: toastId });
      navigate(`/${user.role}/dashboard`);
    } catch (error) {
      console.log("error =>", error);
      toast.error("Invalid ID or Password", { id: toastId });
    }
  };
  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <PHFormInput type="text" name="id" label="ID:" />
        <PHFormInput type="password" name="password" label="Password:" />
        <Button type="dashed" htmlType="submit">
          Submit
        </Button>
      </PHForm>
    </Row>
  );
};

export default Login;
