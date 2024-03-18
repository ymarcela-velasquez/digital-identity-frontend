// "use client"

import {
  HomeIcon,
  DocumentDuplicateIcon,
  ArrowsRightLeftIcon,
  Cog8ToothIcon,
  TrophyIcon
} from '@heroicons/react/24/outline';
import Link from "next/link"

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Services', href: '/services',icon: Cog8ToothIcon },
  { name: 'Documents', href: '/documents', icon: DocumentDuplicateIcon },
  { name: 'Transfers', href: '/transfers', icon: ArrowsRightLeftIcon },
  { name: 'Contests', href: '/contests', icon: TrophyIcon },
]

export default function NavLinks() {
  return (
    <div>
      <ul>
        {links.map((link, idx) => {
          const LinkIcon = link?.icon;
          return (
            <li key={`nav-link-${idx}`}>
              <Link
                href={link.href}
                className="flex grow items-center justify-center gap-2 rounded-md bg-gray-50 px-4 py-6 text-sm font-medium hover:bg-[#65c6b6]/30 hover:text-[#] md:flex-none md:justify-start md:p-2 md:px-3"
              >
                <LinkIcon className="w-4 h-4" />
                <span className="hidden md:block">{link?.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
