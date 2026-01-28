// @ts-nocheck
import { BlogCodeBlock } from "./blog-code-block"

export function getMdxComponents() {
  return {
    h1: ({ children, ...props }) => (
      <h1
        className="text-5xl md:text-7xl font-bebas font-black mb-8 mt-12 scroll-mt-24 theme-transition-rgb text-invert-magnetic hover-text-shimmer"
        {...props}
      >
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2
        className="text-4xl md:text-6xl font-bebas font-bold mb-6 mt-10 scroll-mt-24 theme-transition-rgb text-invert-magnetic hover-text-shimmer"
        {...props}
      >
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3
        className="text-3xl md:text-5xl font-bebas font-bold mb-4 mt-8 scroll-mt-24 theme-transition-rgb text-invert-magnetic hover-text-shimmer"
        {...props}
      >
        {children}
      </h3>
    ),
    h4: ({ children, ...props }) => (
      <h4
        className="text-2xl md:text-4xl font-bebas font-bold mb-3 mt-6 scroll-mt-24 theme-transition-rgb text-invert-magnetic hover-text-shimmer"
        {...props}
      >
        {children}
      </h4>
    ),

    p: ({ children, ...props }) => (
      <p
        className="text-base md:text-lg mb-6 leading-relaxed blog-paragraph theme-transition-rgb text-invert-magnetic"
        {...props}
      >
        {children}
      </p>
    ),

    a: ({ children, href, ...props }) => (
      <a
        href={href}
        className="text-foreground font-bold underline decoration-4 underline-offset-4 hover:text-primary transition-all duration-300 hover-glow text-invert-hover data-magnetic relative group"
        {...props}
      >
        <span className="relative z-10">{children}</span>
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></span>
      </a>
    ),

    ul: ({ children, ...props }) => (
      <ul className="list-disc pl-6 mb-6 space-y-2 theme-transition-rgb" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="list-decimal pl-6 mb-6 space-y-2 theme-transition-rgb" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li className="text-base md:text-lg leading-relaxed theme-transition-rgb" {...props}>
        {children}
      </li>
    ),

    blockquote: ({ children, ...props }) => (
      <blockquote
        className="border-l-4 border-border pl-6 my-8 italic text-muted-foreground text-lg md:text-xl theme-transition-rgb"
        {...props}
      >
        {children}
      </blockquote>
    ),

    code: ({ children, ...props }) => (
      <code
        className="bg-accent px-2 py-1 rounded text-sm font-mono theme-transition-rgb"
        {...props}
      >
        {children}
      </code>
    ),

    pre: ({ children, ...props }) => {
      const childrenArray = Array.isArray(children) ? children : [children]
      const codeElement = childrenArray.find(
        (child: any) => child?.type === "code"
      )

      if (codeElement) {
        const code = codeElement.props?.children || ""
        const className = codeElement.props?.className || ""
        const language = className.replace("language-", "")

        return (
          <BlogCodeBlock language={language} className="theme-transition-rgb">
            {typeof code === "string" ? code : String(code)}
          </BlogCodeBlock>
        )
      }

      return <pre {...props}>{children}</pre>
    },

    img: ({ src, alt, ...props }) => (
      <img
        src={src}
        alt={alt || ""}
        className="w-full rounded-md border-4 border-border my-8 theme-transition-rgb"
        {...props}
      />
    ),

    hr: (props) => (
      <hr className="border-t-4 border-border/20 my-12 theme-transition-rgb" {...props} />
    ),

    table: ({ children, ...props }) => (
      <div className="overflow-x-auto my-8">
        <table
          className="w-full border-4 border-border theme-transition-rgb"
          {...props}
        >
          {children}
        </table>
      </div>
    ),
    thead: ({ children, ...props }) => (
      <thead className="bg-accent theme-transition-rgb" {...props}>
        {children}
      </thead>
    ),
    tbody: ({ children, ...props }) => <tbody {...props}>{children}</tbody>,
    tr: ({ children, ...props }) => (
      <tr className="border-b-2 border-border/20 theme-transition-rgb" {...props}>
        {children}
      </tr>
    ),
    th: ({ children, ...props }) => (
      <th
        className="px-4 py-3 text-left font-bold text-sm md:text-base theme-transition-rgb"
        {...props}
      >
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td className="px-4 py-3 text-sm md:text-base theme-transition-rgb" {...props}>
        {children}
      </td>
    ),

    strong: ({ children, ...props }) => (
      <strong className="font-bold theme-transition-rgb" {...props}>
        {children}
      </strong>
    ),

    em: ({ children, ...props }) => (
      <em className="italic theme-transition-rgb" {...props}>{children}</em>
    ),
  }
}
