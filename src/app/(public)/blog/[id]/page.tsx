import Image from "next/image";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createClient } from "@/utils/supabase/server";
import { Key } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { formatDateReadble } from "@/utils/formatters";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import ReactMarkdown from "react-markdown";

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
          <h1 className="text-6xl font-bold mb-4">{post.title}</h1>
          <p className="text-4xl font-semibold my-10">{post.description}</p>

          <div className="flex justify-start items-center mb-8">
            {post.category.map((item: Key | null | undefined) => (
              <Badge variant="secondary" key={item}>
                {item}
              </Badge>
            ))}
            <time className="text-sm text-muted-foreground">
              {formatDateReadble(post.created_at)}
            </time>
            <div className="flex-1 flex gap-2 justify-end">
              <div className="flex items-center space-x-4 mb-6">
                <Avatar>
                  <AvatarImage src={post.author.image} alt={post.author.name} />
                  <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                </Avatar>
              </div>
              <div>
                <p className="font-semibold">{post.author.name}</p>
                <p className="text-sm text-muted-foreground">
                  {post.author.role}
                </p>
              </div>
            </div>
          </div>
          <Image
            src={post.cover_image || "/blog_placeholder.jpg"}
            alt={post.title}
            width={800}
            height={400}
            className="rounded-lg object-cover w-full h-[400px] mb-8"
          />
          <div className="prose prose-lg text-lg font-[400] dark:prose-invert max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              components={{
                h1: ({ ...props }) => (
                  <h1 className="mt-8 mb-4 font-semibold text-4xl" {...props} />
                ),
                h2: ({ ...props }) => (
                  <h2 className="mt-6 mb-3 font-semibold text-3xl" {...props} />
                ),
                h3: ({ ...props }) => (
                  <h3 className="mt-5 mb-2 font-medium text-2xl" {...props} />
                ),
                p: ({ ...props }) => (
                  <p className="mb-4 leading-relaxed text-lg" {...props} />
                ),
                ul: ({ ...props }) => (
                  <ul className="mb-4 list-disc list-inside" {...props} />
                ),
                ol: ({ ...props }) => (
                  <ol className="mb-4 list-decimal list-inside" {...props} />
                ),
                li: ({ ...props }) => <li className="mb-1" {...props} />,
                blockquote: ({ ...props }) => (
                  <blockquote
                    className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic text-gray-600 dark:text-gray-400"
                    {...props}
                  />
                ),
                code: ({
                  inline,
                  ...props
                }: React.HTMLAttributes<HTMLElement> & { inline?: boolean }) =>
                  inline ? (
                    <code
                      className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm"
                      {...props}
                    />
                  ) : (
                    <pre
                      className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-auto"
                      {...props}
                    />
                  ),
                strong: ({ ...props }) => (
                  <strong
                    className="font-bold text-gray-800 dark:text-gray-200"
                    {...props}
                  />
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </article>
      </main>
    </div>
  );
}
