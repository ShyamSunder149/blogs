import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Blog } from "../../app/types/Blog";
import { useState, useEffect } from 'react';
import axios from 'axios';

type BlogArray = {
    data : Array<Blog>
}

type props = {
    userAuthorId : number | null 
}

export default function BlogList({userAuthorId} : props) {

    const [authorName, setAuthorName] = useState<String>("");
    const [authorId, setAuthorId] = useState<Number>();
    const [blogs, setBlogs] = useState<BlogArray>();

    useEffect(() => {
        async function getBlogs(author : Number | null) {
            
        }

        if(userAuthorId === null) {
            getBlogs(null)
        } else {
            getBlogs(userAuthorId)
        }
    }, [authorId])

    return (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {
                blogs?.data.map(blog => {
                    if (authorId !== blog.authorId) { 
                        setAuthorId(blog.authorId);
                    }
                    return (
                        <Card >
                            <CardHeader>
                                <CardTitle>{blog.title}</CardTitle>
                                <CardDescription>{authorName}, Last Modified At {blog.modifiedDate}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {blog.content}
                            </CardContent>
                        </Card>
                    )
                })
            }
        </div>)
}