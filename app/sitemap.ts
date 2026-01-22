import { MetadataRoute } from "next"
import { getAllPosts } from "@/lib/blog/server"
import { routing } from "@/i18n/routing"
import { BASE_URL } from "@/lib/constants"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = routing.locales.flatMap((locale) => [
    {
      url: `${BASE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    {
      url: `${BASE_URL}/${locale}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
  ])

  const blogPostsPromises = routing.locales.map(async (locale) => {
    const posts = await getAllPosts(locale, false)
    return posts.map((post) => ({
      url: `${BASE_URL}/${locale}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "never" as const,
      priority: 0.7,
    }))
  })

  const blogPosts = (await Promise.all(blogPostsPromises)).flat()

  return [...staticPages, ...blogPosts]
}
