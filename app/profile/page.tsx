"use client"

import { useState, useEffect } from 'react';
import { Blog } from "../types/Blog";
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { Appbar } from '@/components/app_components/Appbar';

type Blogs = {
    data : Array<Blog>
}

export default function ProfilePage() {

    const [blogs, setBlogs] = useState<Blogs>();
    const session = useSession();

    useEffect(() => {

        async function getBlogs() {
            const response = await axios.get('http://localhost:3000/api/blogs?authorId=3');
            setBlogs(response.data)
        }

        getBlogs();
    }, [])

    return (
        <div>
            <Appbar/>
            Profile <br />
            Email : {session.data?.user.email} <br />
            Name : {session.data?.user.name ? session.data?.user.name : "Name not set"} <button> Set Name </button><br />
            list all blogs <br/>
            {blogs?.data?.map(blog => { return (<div>{blog.title} - {blog.content} <br/></div>)})}
        </div>
    )
}