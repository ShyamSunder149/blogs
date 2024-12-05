import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import BlogList from "@/components/app_components/Bloglist";

type Userinfo = {
    username: string | null | undefined
}

export default function BlogsForHome(props: Userinfo) {
    return (
        <div className="p-5">
            <div className="p-5">
                <span className="font-semibold text-2xl">Good Morning {props.username}, </span><br />
                Here are the list of available Blogs...
            </div>

            <div className='text-center p-5'>
                <Button onClick={() => redirect("/createBlog")}>Create your blog</Button>
            </div>
            <div className='text-xl font-semibold'>Blogs Published </div>
            <BlogList userAuthorId={null}/>
        </div>
    );
}