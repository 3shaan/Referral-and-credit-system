import { getAllUsers } from '@/action/users';

export default async function UsersPage() {
  const users = await getAllUsers();
  console.log('Users:', users);
  if (!users) {
    return <div>No users found</div>;
  }
  return (
    <main className="ms-10">
      <h1 className="text-2xl font-bold mt-10">Users List</h1>
      <table className="w-full">
        <thead>
          <tr>
            {/* <th className="px-4 py-2">ID</th> */}
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>

            <th className="px-4 py-2">Referred User</th>
            <th className="px-4 py-2">Converted User</th>
            <th className="px-4 py-2">Total Credit Earned</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              {/* <td className="px-4 py-2">{user._id}</td> */}
              <td className="px-4 py-2">{user.name}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{user.stats.totalReferred}</td>
              <td className="px-4 py-2">{user.stats.convertedReferred}</td>
              <td className="px-4 py-2">{user.credit}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </main>
  );
}
