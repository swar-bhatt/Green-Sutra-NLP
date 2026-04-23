"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home } from 'lucide-react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/icons/Logo';
import Header from './Header';
import Chatbot from '../dashboard/Chatbot';
import { useLanguage } from '@/context/LanguageContext';

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const { t } = useLanguage();
    
    return (
        <SidebarProvider open={isSidebarOpen} onOpenChange={setSidebarOpen}>
            <Sidebar>
                <SidebarHeader>
                    <Link href="/" className="flex items-center gap-2 font-semibold">
                        <Logo className="h-7 w-7 text-primary" />
                        <span className="font-headline text-xl">Green Sutra</span>
                    </Link>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarMenu>
                         <SidebarMenuItem>
                            <SidebarMenuButton
                                href="/"
                                isActive={pathname === '/'}
                                asChild
                                tooltip={{ children: t('dashboard') }}
                            >
                                <Link href="/">
                                    <Home />
                                    <span>{t('dashboard')}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarContent>
                <SidebarFooter>
                </SidebarFooter>
            </Sidebar>
            <SidebarInset>
                <Header />
                <main className="flex-1 p-4 md:p-6">{children}</main>
                <Chatbot />
            </SidebarInset>
        </SidebarProvider>
    );
}
