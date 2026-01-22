// @ts-nocheck
import { MDXRemote } from "next-mdx-remote/rsc"
import { getMdxComponents } from "./blog-mdx-components"

interface BlogPostContentProps {
  content: string
}

export async function BlogPostContent({ content }: BlogPostContentProps) {
  return (
    <article className="prose prose-lg max-w-none theme-transition-rgb">
      <MDXRemote source={content} components={getMdxComponents()} />
    </article>
  )
}
