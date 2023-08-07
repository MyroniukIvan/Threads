"use client"
import {sidebarLinks} from "@/consts";
import Link from "next/link";
import Image from 'next/image'
import {usePathname, useRouter} from "next/navigation";
import {SignedIn, SignOutButton} from "@clerk/nextjs";
import React from "react";

const LeftSidebar = () => {
    const router = useRouter();
    const pathname = usePathname()
    return (
        <section className={'custom-scrollbar leftsidebar'}>
            <div className={'flex w-full flex-1 flex-col gap-6 px-6'}>
                {sidebarLinks.map((link) => {
                    const isActive = (pathname.includes(link.route) && (link.route.length > 1) || pathname === link.route)

                    return (
                        <Link key={link.label} className={`bottombar_link ${isActive && 'bg-primary-500'}`} href={link.route}>
                            <Image src={link.imgURL} alt={link.label} width={24} height={24}/>
                            <p className={'text-subtle-medium text-light-1 max-sm:hidden'}>
                                {link.label.split(/\s+./)[0]}
                            </p>
                        </Link>
                    )
                })}
            </div>
            <div className={'mt-10 px-6'}>
                <SignedIn>
                    <SignOutButton signOutCallback={() => {
                        router.push('/sign-in')
                    }}>
                        <div className={'flex cursor-pointer gap-4 p-4'}>
                            <Image alt={'sign-out'} src={'/assets/logout.svg'} width={24}
                                   height={24}/>
                            <p className={'text-light-2 max-lg:hidden'}>Logout</p>
                        </div>
                    </SignOutButton>
                </SignedIn>
            </div>
        </section>
    );
};

export default LeftSidebar;
