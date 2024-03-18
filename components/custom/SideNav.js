import Link from 'next/link';
import NavLinks from './NavLinks';
import AcmeLogo from './AcmeLogo';
import { PowerIcon } from '@heroicons/react/24/outline';
import Image from "next/image";
import logo from '@/public/assets/identidad.png';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 bg-gray-100">
      <div className="mb-2 flex h-auto items-center justify-start p-4 gap-4">
        <Link href="/">
          <Image src={logo} className='h-12 w-auto' alt="logo" />
        </Link>
        <div>
          <span className='text-[#186077] font-bold text-lg leading-1'>
            Identidad Digital
          </span>
        </div>
      </div>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        {/* <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div> */}
        <div className='w-4'/>
        <form>
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-2" />
            <div className="hidden md:block">Cerrar sesión</div>
          </button>
        </form>
      </div>
    </div>
  );
}
