import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { redirect } from 'next/navigation';

type Userinfo = {
    username: string | null | undefined
}

export default function BlogList(props: Userinfo) {
    return (
        <div className="p-5">
            <div className="p-5">
                <span className="font-semibold text-2xl">Good Morning {props.username}, </span><br />
                Here are the list of available Blogs...
            </div>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <Card >
                    <CardHeader>
                        <CardTitle>Blog Title</CardTitle>
                        <CardDescription>Author Name, Last Modified Date.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        Some Content
                        Read more button
                    </CardContent>
                </Card>
                <Card >
                    <CardHeader>
                        <CardTitle>Blog Title</CardTitle>
                        <CardDescription>Author Name, Last Modified Date.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        Some Content
                        Read more button
                    </CardContent>
                </Card>
                <Card >
                    <CardHeader>
                        <CardTitle>Blog Title</CardTitle>
                        <CardDescription>Author Name, Last Modified Date.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        Some Content
                        Read more button
                    </CardContent>
                </Card>
                <div>
                    <button onClick={() => redirect("/createBlog")}>Create your blog</button>
                </div>
            </div>
        </div>
    );
}