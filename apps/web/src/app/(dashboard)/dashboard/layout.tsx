import MobileSidebar from '@/features/dashboard/mobile-sidebar';
import SideBar from '@/features/dashboard/side-bar';
import TopBar from '@/features/dashboard/top-bar';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen  bg-gray-50">
      <SideBar />
      <MobileSidebar />

      <div className="flex flex-col flex-1 overflow-hidden">

        <TopBar />

        {children}

      </div>
    </div>

  );
}
