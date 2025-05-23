"use client";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDateReadble } from "@/utils/formatters";
import Link from "next/link";

interface Post {
  id: string;
  cover_image: string;
  title: string;
  excerpt: string;
  author: {
    image: string;
    name: string;
    role: string;
  };
  category: string[];
  date: string;
  description: string;
  created_at: string;
}

export function BlogPosts({ posts }: { posts: Post[] }) {
  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <Link href={`/blog/${post.id}`} key={post.id}>
          <Card
            key={post.id}
            className="cursor-pointer transition-shadow hover:shadow-md"
          >
            <Image
              src={post.cover_image}
              alt={post.title}
              width={400}
              height={300}
              className="w-full h-60 object-fill rounded-t-lg"
            />
            <CardHeader>
              <CardTitle className="text-2xl font-[600]">
                {post.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4 text-xl">
                {post.description}
              </p>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={post.author.image} alt={post.author.name} />
                  <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold">{post.author.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {post.author.role}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <div className="flex gap-2">
                {post.category.map((item) => (
                  <Badge key={item} variant="secondary">
                    {item}
                  </Badge>
                ))}
              </div>

              <time className="text-sm text-muted-foreground">
                {formatDateReadble(post.created_at)}
              </time>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
}
