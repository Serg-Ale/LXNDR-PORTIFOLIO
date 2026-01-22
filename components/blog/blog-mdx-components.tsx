// @ts-nocheck
import { BlogCodeBlock } from "./blog-code-block"

export function getMdxComponents() {
  return {
    // Headings with scroll margin for TOC
    h1: ({ children, ...props }) => (
      <h1
        className="text-5xl md:text-7xl font-bebas font-black mb-8 mt-12 scroll-mt-24"
        {...props}
      >
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2
        className="text-4xl md:text-6xl font-bebas font-bold mb-6 mt-10 scroll-mt-24"
        {...props}
      >
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3
        className="text-3xl md:text-5xl font-bebas font-bold mb-4 mt-8 scroll-mt-24"
        {...props}
      >
        {children}
      </h3>
    ),
    h4: ({ children, ...props }) => (
      <h4
        className="text-2xl md:text-4xl font-bebas font-bold mb-3 mt-6 scroll-mt-24"
        {...props}
      >
        {children}
      </h4>
    ),

    // Paragraphs
    p: ({ children, ...props }) => (
      <p
        className="text-base md:text-lg mb-6 leading-relaxed blog-paragraph"
        {...props}
      >
        {children}
      </p>
    ),

    // Links
    a: ({ children, href, ...props }) => (
      <a
        href={href}
        className="text-foreground font-bold underline decoration-4 underline-offset-4 hover:text-foreground/70 transition-colors"
        {...props}
      >
        {children}
      </a>
    ),

    // Lists
    ul: ({ children, ...props }) => (
      <ul className="list-disc pl-6 mb-6 space-y-2" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="list-decimal pl-6 mb-6 space-y-2" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li className="text-base md:text-lg leading-relaxed" {...props}>
        {children}
      </li>
    ),

    // Blockquotes
    blockquote: ({ children, ...props }) => (
      <blockquote
        className="border-l-4 border-foreground pl-6 my-8 italic text-muted-foreground text-lg md:text-xl"
        {...props}
      >
        {children}
      </blockquote>
    ),

    // Inline code
    code: ({ children, ...props }) => (
      <code
        className="bg-foreground/10 px-2 py-1 rounded text-sm font-mono"
        {...props}
      >
        {children}
      </code>
    ),

    // Code blocks (pre + code)
    pre: ({ children, ...props }) => {
      // Extract code content and language from children
      const childrenArray = Array.isArray(children) ? children : [children]
      const codeElement = childrenArray.find(
        (child: any) => child?.type === "code"
      )

      if (codeElement) {
        const code = codeElement.props?.children || ""
        const className = codeElement.props?.className || ""
        const language = className.replace("language-", "")

        return (
          <BlogCodeBlock language={language}>
            {typeof code === "string" ? code : String(code)}
          </BlogCodeBlock>
        )
      }

      return <pre {...props}>{children}</pre>
    },

    // Images
    img: ({ src, alt, ...props }) => (
      <img
        src={src}
        alt={alt || ""}
        className="w-full rounded-md border-4 border-foreground my-8"
        {...props}
      />
    ),

    // Horizontal rule
    hr: (props) => (
      <hr className="border-t-4 border-foreground/20 my-12" {...props} />
    ),

    // Tables
    table: ({ children, ...props }) => (
      <div className="overflow-x-auto my-8">
        <table
          className="w-full border-4 border-foreground"
          {...props}
        >
          {children}
        </table>
      </div>
    ),
    thead: ({ children, ...props }) => (
      <thead className="bg-foreground/10" {...props}>
        {children}
      </thead>
    ),
    tbody: ({ children, ...props }) => <tbody {...props}>{children}</tbody>,
    tr: ({ children, ...props }) => (
      <tr className="border-b-2 border-foreground/20" {...props}>
        {children}
      </tr>
    ),
    th: ({ children, ...props }) => (
      <th
        className="px-4 py-3 text-left font-bold text-sm md:text-base"
        {...props}
      >
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td className="px-4 py-3 text-sm md:text-base" {...props}>
        {children}
      </td>
    ),

    // Strong/Bold
    strong: ({ children, ...props }) => (
      <strong className="font-bold" {...props}>
        {children}
      </strong>
    ),

    // Emphasis/Italic
    em: ({ children, ...props }) => (
      <em className="italic" {...props}>{children}</em>
    ),
  }
}
