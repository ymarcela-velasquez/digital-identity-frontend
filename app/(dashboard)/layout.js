import SideNav from "@/components/custom/SideNav";

export const metadata = {
  title: "Digital Identity App",
  description: "Generated by create next app",
}

export default function Layout({ children }) {
  return (
    <div className='flex h-screen flex-col md:flex-row
    md:oerflow-hidden'>
      <div className='w-full flex-none md:w-64'>
        <SideNav />
      </div>
      <div className='flex-grow p-6 md:oerflow-y-auto md:p-12'>
      {children}</div>
    </div>
    
  );
}
