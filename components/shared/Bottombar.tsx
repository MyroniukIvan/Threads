"use client"
import {sidebarLinks} from "@/consts";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import {usePathname, useRouter} from "next/navigation";

const Bottombar = () => {
    const router = useRouter();
    const pathname = usePathname()
    return (
        <section className={'bottombar'}>
            <div className={'bottombar_container'}>
                {sidebarLinks.map((link) => {
                    const isActive = (pathname.includes(link.route) && (link.route.length > 1) || pathname === link.route)

                    return (
                        <Link key={link.label} className={`leftsidebar_link ${isActive && 'bg-primary-500'}`} href={link.route}>
                            <Image src={link.imgURL} alt={link.label} width={24} height={24}/>
                            <p className={'text-light-1 max-lg:hidden'}>
                                {link.label}
                            </p>
                        </Link>
                    )
                })}
            </div>
        </section>
    );
};

export default Bottombar;
