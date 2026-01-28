import { Link } from "@/i18n/routing"
import { useTranslations } from "next-intl"
import type { Post } from "@/lib/blog"

interface BlogRelatedPostsProps {
  posts: Post[]
  locale: "en" | "pt-BR"
}

function formatDate(dateString: string, locale: "en" | "pt-BR"): string {
  const date = new Date(dateString)
  
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)
}

export function BlogRelatedPosts({ posts, locale }: BlogRelatedPostsProps) {
  const t = useTranslations("blog")

  if (posts.length === 0) {
    return null
  }

  return (
    <section className="mt-20 pt-12 border-t-4 border-foreground/20">
      <h2 className="text-4xl md:text-6xl font-bebas font-black mb-8">
        {t("relatedPosts")}
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block group"
            data-magnetic
          >
            <article className="border-4 border-foreground bg-background p-6 transition-all duration-300 hover:shadow-brutalist hover:-translate-y-2 hover:scale-[1.02] hover:rotate-[0.5deg]">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-bold uppercase px-3 py-1 border-2 border-border bg-accent text-accent-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-bebas font-bold mb-2 group-hover:text-foreground/70 transition-colors">
                {post.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {post.description}
              </p>

              {/* Meta */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <time dateTime={post.date}>
                  {formatDate(post.date, locale)}
                </time>
                <span className="text-foreground">•</span>
                <span>{post.readingTime} min read</span>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  )
}
