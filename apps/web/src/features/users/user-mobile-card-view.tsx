import type { IUser } from '@repo/validation';

export default function UserMobileCardView({ users}: { users: IUser[] }) {
  return (
    <div className="block lg:hidden space-y-4">
      {users.map(user => (
        <div key={user._id} className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-semibold text-gray-900">{user.name}</h3>
              <p className="text-sm text-gray-500">
                @
                {user.userName}
              </p>
            </div>
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
              {user.credit}
              {' '}
              credits
            </span>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Email:</span>
              <span className="text-gray-900 truncate ml-2">{user.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Referred:</span>
              <span className="text-gray-900">{user.stats.totalReferred}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Converted:</span>
              <span className="text-gray-900">{user.stats.convertedReferred}</span>
            </div>
            {user.referredBy && (
              <div className="flex justify-between">
                <span className="text-gray-600">Referred by:</span>
                <span className="text-gray-900 truncate ml-2">{user.referredBy}</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
