import { createClient } from "@/utils/supabase/server";
import { BlogPosts } from "./components/blog-posts";
import { BlogSidebar } from "./components/blog-sidebar";

export default async function BlogPage() {
  const supabase = await createClient();
  const { data: posts, error } = await supabase.from("blogs").select();
  if (error || !posts) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <BlogPosts posts={posts} />
          </div>
          <div className="md:col-span-1">
            <BlogSidebar />
          </div>
        </div>
      </main>
    </div>
  );
}
