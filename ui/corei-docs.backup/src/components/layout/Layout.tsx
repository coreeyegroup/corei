import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen ml-72">
        <Header />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
