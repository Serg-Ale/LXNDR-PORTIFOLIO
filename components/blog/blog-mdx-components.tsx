// @ts-nocheck
import { BlogCodeBlock } from "./blog-code-block"
import { BrutalistInlineCode } from "./brutalist-inline-code"
import { BrutalistLine } from "@/components/brutalist-text"
import { CodeHighlighted } from "./code-highlighted"

export function getMdxComponents() {
  return {
    // Custom CodeHighlighted component for pre-highlighted code
    CodeHighlighted: CodeHighlighted,
    
    h1: ({ children, ...props }) => (
      <h1
        className="text-5xl md:text-7xl font-bebas font-black mb-8 mt-12 scroll-mt-24 theme-transition-rgb text-invert-magnetic hover-text-shimmer"
        {...props}
      >
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <BrutalistLine position="left" thickness={6}>
        <h2
          className="text-4xl md:text-6xl font-bebas font-bold mb-6 mt-10 scroll-mt-24 theme-transition-rgb hover:text-outlined-hover transition-all duration-300"
          {...props}
        >
          {children}
        </h2>
      </BrutalistLine>
    ),
    h3: ({ children, ...props }) => (
      <BrutalistLine position="left" thickness={4}>
        <h3
          className="text-3xl md:text-5xl font-bebas font-bold mb-4 mt-8 scroll-mt-24 theme-transition-rgb hover:text-outlined-hover transition-all duration-300"
          {...props}
        >
          {children}
        </h3>
      </BrutalistLine>
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
        className="border-l-[6px] border-foreground pl-6 py-4 my-8 italic text-muted-foreground text-lg md:text-xl theme-transition-rgb bg-accent/10"
        {...props}
      >
        {children}
      </blockquote>
    ),

    code: ({ children, ...props }) => {
      // Simplesmente usa BrutalistInlineCode para todos os casos
      // O handler pre: vai detectar e substituir quando necessário
      return (
        <BrutalistInlineCode {...props}>
          {children}
        </BrutalistInlineCode>
      )
    },

    pre: ({ children, ...props }) => {
      const childrenArray = Array.isArray(children) ? children : [children]
      const codeElement = childrenArray.find(
        (child: any) => child?.type === "code" || child?.type?.name === "code" || (child?.props && 'children' in child.props)
      )

      if (codeElement) {
        const code = codeElement.props?.children || ""
        const className = codeElement.props?.className || ""
        const language = className.replace("language-", "").replace(/^$/, "text")

        return (
          <BlogCodeBlock language={language} className="theme-transition-rgb !max-w-full w-full block">
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
        className="w-full border-[6px] border-foreground my-8 theme-transition-rgb shadow-brutalist-sm hover:shadow-brutalist transition-all duration-300"
        {...props}
      />
    ),

    hr: (props) => (
      <hr className="border-t-[6px] border-foreground/20 my-12 theme-transition-rgb" {...props} />
    ),

    table: ({ children, ...props }) => (
      <div className="overflow-x-auto my-8">
        <table
          className="w-full border-[6px] border-foreground theme-transition-rgb shadow-brutalist-sm"
          {...props}
        >
          {children}
        </table>
      </div>
    ),
    thead: ({ children, ...props }) => (
      <thead className="bg-foreground text-background theme-transition-rgb" {...props}>
        {children}
      </thead>
    ),
    tbody: ({ children, ...props }) => <tbody {...props}>{children}</tbody>,
    tr: ({ children, ...props }) => (
      <tr className="border-b-[3px] border-foreground/20 theme-transition-rgb hover:bg-accent/10 transition-colors" {...props}>
        {children}
      </tr>
    ),
    th: ({ children, ...props }) => (
      <th
        className="px-4 py-3 text-left font-bebas font-bold text-base md:text-lg uppercase theme-transition-rgb"
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
      <strong className="font-bold text-foreground theme-transition-rgb" {...props}>
        {children}
      </strong>
    ),

    em: ({ children, ...props }) => (
      <em className="italic theme-transition-rgb" {...props}>{children}</em>
    ),
  }
}
