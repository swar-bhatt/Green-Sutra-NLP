import Link from 'next/link';
import { Logo } from '@/components/icons/Logo';
import { SidebarTrigger } from '@/components/ui/sidebar';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="md:hidden" />
        <Link href="/" className="flex items-center gap-2 font-semibold md:hidden">
          <Logo className="h-6 w-6 text-primary" />
          <span className="font-headline text-lg">Green Sutra</span>
        </Link>
      </div>
      <div className="ml-auto">
        <LanguageSwitcher />
      </div>
    </header>
  );
}
