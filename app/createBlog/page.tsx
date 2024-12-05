"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from 'react';
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Appbar } from "@/components/app_components/Appbar";
import axios from 'axios';
import { Terminal } from "lucide-react"

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"

export default function CreateBlog() {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState<{ title: string, content: string, thumbnail: string }>({
        title: "",
        content: "",
        thumbnail: ""
    });
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();

        setIsLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await axios.post('/api/blogs', formData);
            console.log(response)
            if (response.status === 201) {
                setSuccess(true);
                router.push('/');
            }
        } catch (err) {
            setError('An error occurred while creating the blog.');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            <Appbar />
            <div className="p-5 grid gap-6">
                <h2>Create Blog</h2>

                {success && <Alert>
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>Blog Created Successfully</AlertTitle>
                </Alert>}
                {error && <Alert>
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>{error}</AlertTitle>
                </Alert>}

                <form onSubmit={onSubmit}>
                    <div className="grid gap-2">
                        <div className="grid gap-1">
                            <Label className="sr-only" htmlFor="title">
                                Blog Title
                            </Label>
                            <Input
                                id="title"
                                placeholder="Enter blog title"
                                type="text"
                                autoCapitalize="none"
                                autoCorrect="off"
                                disabled={isLoading}
                                onChange={handleChange}
                                name="title"
                                required
                                value={formData.title}
                            />
                        </div>

                        <div className="grid gap-1">
                            <Label className="sr-only" htmlFor="content">
                                Content
                            </Label>
                            <textarea
                                id="content"
                                placeholder="Type in your content here..."
                                autoCapitalize="none"
                                autoComplete="none"
                                autoCorrect="off"
                                disabled={isLoading}
                                onChange={handleChange}
                                name="content"
                                required
                                rows={5}
                                className="input"
                                value={formData.content}
                            />
                        </div>

                        <div className="grid gap-1">
                            <Label className="sr-only" htmlFor="thumbnail">
                                Thumbnail
                            </Label>
                            <Input
                                id="thumbnail"
                                placeholder="Image URL"
                                type="text"
                                autoCapitalize="none"
                                autoComplete="none"
                                autoCorrect="off"
                                disabled={isLoading}
                                onChange={handleChange}
                                name="thumbnail"
                                required
                                value={formData.thumbnail}
                            />
                        </div>

                        <Button disabled={isLoading}>
                            {isLoading ? "Creating..." : "Create Blog"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
