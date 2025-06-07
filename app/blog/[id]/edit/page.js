
import EditPage from "./_components/editPage";
// import { getPostById } from "@/lib/posts"

export default async function EditPostPage({ params }) {
  params = await params;

  return (
    <EditPage pid={params.id}/>
  );
}
