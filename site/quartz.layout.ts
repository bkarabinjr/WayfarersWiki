import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// Sidebar: sections in design order, and each section's overview page first.
const explorer = Component.Explorer({
  title: "Wiki",
  folderDefaultState: "collapsed",
  folderClickBehavior: "collapse",
  // Keep this function self-contained with no named inner functions: Quartz serializes it into the page.
  sortFn: (a, b) => {
    const order = [
      "Overview", "Roadmap", "Character-Creation", "Lineages", "Classes", "Subclasses",
      "Rules", "Magic", "Equipment", "Feats", "Running-the-Game", "Bestiary",
    ]
    if (a.isFolder && b.isFolder) {
      const ia = order.indexOf(a.slugSegment)
      const ib = order.indexOf(b.slugSegment)
      return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib) || a.displayName.localeCompare(b.displayName)
    }
    if (a.isFolder !== b.isFolder) return a.isFolder ? -1 : 1
    const pa = ((a.data && a.data.slug) || "").split("/")
    const pb = ((b.data && b.data.slug) || "").split("/")
    const la = pa.length > 1 && pa[pa.length - 1] === pa[pa.length - 2] ? 0 : 1
    const lb = pb.length > 1 && pb[pb.length - 1] === pb[pb.length - 2] ? 0 : 1
    return la - lb || a.displayName.localeCompare(b.displayName, undefined, { numeric: true })
  },
})

export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({ links: {} }),
}

export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [{ Component: Component.Search(), grow: true }, { Component: Component.Darkmode() }],
    }),
    explorer,
  ],
  right: [
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
    Component.Graph(),
  ],
}

export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [{ Component: Component.Search(), grow: true }, { Component: Component.Darkmode() }],
    }),
    explorer,
  ],
  right: [],
}
