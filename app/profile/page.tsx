"use client"

import { Blog } from "../types/Blog";
import { useSession } from 'next-auth/react';
import { Appbar } from '@/components/app_components/Appbar';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import BlogList from '@/components/app_components/Bloglist';

export default function ProfilePage() {

    const session = useSession();

    return (
        <div>
            <Appbar />
            <div className='p-5'>
                <div className='flex flex-row gap-4 justify-center'>
                    <Avatar className='size-24'>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className='text-4xl font-semibold mt-6'>Profile</div>
                </div>
                <hr className='mt-5' />
                <br />
                <div className='flex flex-col gap-4 text-xl'>
                    <div>Email : {session.data?.user.email}</div>
                    <div className='flex flex-row gap-4'>Name : {session.data?.user.name ? session.data?.user.name : "Name not set"}
                        <button> Set Name </button>
                    </div>
                </div>
                <hr className='mt-5'/>
                <div className='flex flex-col'>
                    <div className='font-semibold text-2xl p-5'>Your Blogs</div>
                    <BlogList userAuthorId={3}/>
                </div>
            </div>
        </div>
    )
}