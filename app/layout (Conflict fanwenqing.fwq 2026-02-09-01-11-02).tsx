import { RootProvider } from "fumadocs-ui/provider/next";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { source } from "@/lib/source";
import { baseOptions } from "@/lib/layout.shared";
import "./global.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
});

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>
          <DocsLayout
            tree={source.pageTree}
            {...baseOptions()}
            sidebar={{
              tabs: {
                transform(option, node) {
                  const colors: Record<string, string> = {
                    "/": "#818cf8",
                    "/plugins": "#f59e0b",
                  };
                  const color =
                    colors[option.url] ?? "var(--color-fd-foreground)";

                  return {
                    ...option,
                    icon: (
                      <div
                        className="[&_svg]:size-full rounded-lg size-full max-md:border max-md:p-1.5"
                        style={{ color, backgroundColor: `${color}1a` }}
                      >
                        {node.icon}
                      </div>
                    ),
                  };
                },
              },
            }}
          >
            {children}
          </DocsLayout>
        </RootProvider>
      </body>
    </html>
  );
}
