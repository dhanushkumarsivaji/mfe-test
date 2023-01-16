import React from "react";
import { useSelector } from "react-redux";

function User() {
  const user = useSelector((state) => state.user.value);

//   useEffect(() => {
//     console.log(user)
//   },[user])

  return (
    <div>
      <h1>User Page</h1>
      <p> Name: {user.name} </p>
      <p> Age: {user.age}</p>
      <p> Email: {user.email}</p>
    </div>
  );
}

export default User;