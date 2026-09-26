import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Wayfarers wiki site configuration (Quartz 4).
 * scripts/build-site.sh copies this file into the Quartz checkout before building.
 * baseUrl is replaced automatically in GitHub Actions.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Wayfarers",
    pageTitleSuffix: " · Wayfarers Wiki",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "en-US",
    baseUrl: "bkarabinjr.github.io/WayfarersWiki",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Alegreya",
        body: "Alegreya Sans",
        code: "JetBrains Mono",
      },
      colors: {
        lightMode: {
          light: "#F3F5F1",
          lightgray: "#D3DAD3",
          gray: "#98A39C",
          darkgray: "#36413C",
          dark: "#17201C",
          secondary: "#2A6B5E",
          tertiary: "#8E6A25",
          highlight: "rgba(42, 107, 94, 0.10)",
          textHighlight: "#f2d58a88",
        },
        darkMode: {
          light: "#111614",
          lightgray: "#2A3531",
          gray: "#6E7A74",
          darkgray: "#C9D2CC",
          dark: "#E6ECE7",
          secondary: "#72C2AC",
          tertiary: "#D6AE62",
          highlight: "rgba(114, 194, 172, 0.12)",
          textHighlight: "#8a6d2a88",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({ priority: ["frontmatter", "git", "filesystem"] }),
      Plugin.SyntaxHighlighting({
        theme: { light: "github-light", dark: "github-dark" },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({ enableSiteMap: true, enableRSS: true }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
