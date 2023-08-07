import Link from "next/link";
import Image from "next/image";
import React from "react";
import {SignedIn, SignOutButton, OrganizationSwitcher} from "@clerk/nextjs";
import {dark} from '@clerk/themes'
const Topbar = () => {
    return (
        <nav className={'topbar'}>
            <Link className={'flex items-center gap-4'} href={'/'}>
                <Image src={'/assets/logo.svg'} alt={'logo'} width={28} height={28}/>
                <p className={'text-heading3-bold text-light-1 max-xs:hidden'}>Threads</p>
            </Link>

            <div className={'flex items-center gap-1'}>
                <OrganizationSwitcher appearance={{
                    baseTheme: dark,
                    elements: {
                        organisationSwitcherTrigger: "py-2 px-4"
                    }
                }}/>
            </div>
        </nav>
    );
};

export default Topbar;
