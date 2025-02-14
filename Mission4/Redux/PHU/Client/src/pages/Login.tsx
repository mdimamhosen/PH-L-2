import { Button } from "antd";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/feature/auth/authAPI";
import { useAppDispathch } from "../redux/hooks/hook";
import { setUser } from "../redux/feature/auth/authSlice";
import { verifyToken } from "../utlis/verifyToken";

const Login = () => {
  const dispatch = useAppDispathch();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      id: "A-0001",
      password: "admin123",
    },
  });
  const [login, { data, error }] = useLoginMutation();

  console.log("data =>", data);
  console.log("error =>", error);

  const onSubmit = async (formData: { id: string; password: string }) => {
    console.log("FormData =>", formData);
    const response = await login(formData).unwrap();
    console.log("response =>", response);

    const user = verifyToken(response.data.accessToken);
    console.log("user =>", user);
    dispatch(
      setUser({
        user: user,
        token: response.data.accessToken,
      })
    );
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="id">ID</label>
        <input type="text" id="id" {...register("id")} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" {...register("password")} />
      </div>

      <Button type="dashed" htmlType="submit">
        Submit
      </Button>
    </form>
  );
};

export default Login;
