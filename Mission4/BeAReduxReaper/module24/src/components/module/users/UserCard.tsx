import { Button } from "@/components/ui/button";
import { removeUser } from "@/redux/features/user/userSlice";
import { useAppDispatch } from "@/redux/Hooks/hook";
import { IUser } from "@/redux/features/user/userSlice"; // Corrected import path
import { Trash2 } from "lucide-react";

interface IProps {
  user: IUser;
}

const UserCard = ({ user }: IProps) => {
  const dispatch = useAppDispatch();

  return (
    <div>
      <div className="rounded p-4 w-80 border border-neutral-500 shadow-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-bold">{user.name}</h1>
          <Button
            onClick={() => dispatch(removeUser(user.id))}
            className="px-2 py-1 rounded"
          >
            <Trash2 />
          </Button>
        </div>
        <p className="text-gray-500 mt-2">{user.email}</p>
      </div>
    </div>
  );
};

export default UserCard;
