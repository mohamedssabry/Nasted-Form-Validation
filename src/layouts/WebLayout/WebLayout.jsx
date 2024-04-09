import React from "react";
// import { useGetAdminsQuery } from "../../features/adminSlice";

// const YourComponent = () => {
//   const {
//     data: admins,
//     error,
//     isLoading,
//   } = useGetAdminsQuery({ page: 1, limit: 10 });

//   console.log(admins);
//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }

//   return (
//     <div>
//       <h1>Admins</h1>
//       <ul>
//         {admins.map((admin) => (
//           <li key={admin.id}>{admin.title}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default YourComponent;

function WebLayout() {
  return (
    <div>
      <h1>WebLayout</h1>
    </div>
  );
}

export default WebLayout;
