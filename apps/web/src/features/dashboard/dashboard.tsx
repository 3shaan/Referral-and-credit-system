import MobileSidebar from './mobile-sidebar';
import SideBar from './side-bar';
import TopBar from './top-bar';

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-50">
      <SideBar />
      <MobileSidebar />

      <div className="flex flex-col flex-1 overflow-hidden">

        <TopBar />

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900">Referral Dashboard</h2>
          </div>
        </main>
      </div>
    </div>
  );
}
