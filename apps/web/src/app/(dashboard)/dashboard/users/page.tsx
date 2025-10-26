import { getAllUsers } from '@/action/users';
import UserMobileCardView from '@/features/users/user-mobile-card-view';
import UserStats from '@/features/users/user-stats';
import UserTable from '@/features/users/user-table';

export default async function UsersPage() {
  const users = await getAllUsers();
  if (!users) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-gray-500 text-lg">No users found</div>
        </div>
      </div>
    );
  }

  return (
    <main className="p-6 lg:p-10 pb-20">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Users List</h1>
        <p className="text-gray-600">Manage and view all registered users</p>
      </div>
      <UserMobileCardView users={users} />
      <UserTable users={users} />

      <UserStats users={users} />

    </main>
  );
}
