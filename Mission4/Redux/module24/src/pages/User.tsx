import React from "react";

const User: React.FC = () => {
  //   const users = useAppSelector(selectUsers);

  return (
    <div>
      <h1 className="my-3 text-lg font-bold">Users</h1>
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-4">
        {/* {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))} */}
      </div>
    </div>
  );
};

export default User;
