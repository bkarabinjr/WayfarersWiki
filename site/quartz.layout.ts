import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// Sidebar: sections in design order, and each section's overview page first.
const explorer = Component.Explorer({
  title: "Wiki",
  folderDefaultState: "collapsed",
  folderClickBehavior: "collapse",
  sortFn: (a, b) => {
    const order = [
      "Overview", "Roadmap", "Character-Creation", "Lineages", "Classes", "Subclasses",
      "Rules", "Magic", "Equipment", "Feats", "Running-the-Game", "Bestiary",
    ]
    if (a.isFolder && b.isFolder) {
      const ia = order.indexOf(a.slugSegment), ib = order.indexOf(b.slugSegment)
      return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib) || a.displayName.localeCompare(b.displayName)
    }
    if (a.isFolder !== b.isFolder) return a.isFolder ? -1 : 1
    const lead = (n) => {
      const parts = ((n.data && n.data.slug) || "").split("/")
      return parts.length > 1 && parts[parts.length - 1] === parts[parts.length - 2] ? 0 : 1
    }
    return lead(a) - lead(b) || a.displayName.localeCompare(b.displayName, undefined, { numeric: true })
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
