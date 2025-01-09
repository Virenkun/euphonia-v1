import Image from "next/image";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createClient } from "@/utils/supabase/server";
import { Key } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default async function BlogPost({
  params,
}: {
  params: Promise<{ readonly id: string }>;
}) {
  const supabase = await createClient();
  const { data: post, error } = await supabase
    .from("blogs")
    .select()
    .eq("id", (await params).id)
    .single();
  if (error || !post) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <div className="fixed p-4 rounded-full">
        <Link href="/blog" className="text-white hover:text-white/80">
          <Button
            variant="ghost"
            size="icon"
            className="text-white bg-black bg-opacity-20 font-bold hover:bg-black/10 hover:text-white rounded-full m-4"
          >
            <ChevronLeft
              strokeWidth={5}
              size={100}
              className="font-bold text-xl"
            />
          </Button>
        </Link>
      </div>
      <main className="container mx-auto px-4 py-8">
        <article className="max-w-3xl mx-auto">
          <Image
            src={"/blog_placeholder.jpg"}
            alt={post.title}
            width={800}
            height={400}
            className="rounded-lg object-cover w-full h-[400px] mb-8"
          />
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center space-x-4 mb-6">
            <Avatar>
              <AvatarImage src={post.author.image} alt={post.author.name} />
              <AvatarFallback>{post.author.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{post.author.name}</p>
              <p className="text-sm text-muted-foreground">
                {post.author.role}
              </p>
            </div>
          </div>
          <div className="flex justify-start items-center mb-8">
            {post.category.map((item: Key | null | undefined) => (
              <Badge variant="secondary" key={item}>
                {item}
              </Badge>
            ))}
            <time className="text-sm text-muted-foreground">{post.date}</time>
          </div>
          <div className="prose prose-lg text-lg font-[400] dark:prose-invert max-w-none">
            <p>{post.content}</p>
          </div>
        </article>
      </main>
    </div>
  );
}
