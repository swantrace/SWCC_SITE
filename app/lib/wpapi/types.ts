type PagePostCommonFields =
  | "acf"
  | "date"
  | "date_gmt"
  | "guid"
  | "id"
  | "link"
  | "modified"
  | "modified_gmt"
  | "slug"
  | "status"
  | "type"
  | "title"
  | "content"
  | "author"
  | "excerpt"
  | "featured_media"
  | "comments_status"
  | "ping_status"
  | "meta"
  | "template"
  | "password";

type PagePostCommonOtherQueryOptions = {
  context?: "view" | "embed" | "edit";
  page?: number;
  per_page?: number;
  search?: string;
  before?: string | Date;
  after?: string | Date;
  author?: number[];
  author_exclude?: number[];
  exclude?: number[];
  include?: number[];
  offset?: number;
  order?: "desc" | "asc";
  orderby?:
    | "date"
    | "author"
    | "id"
    | "include"
    | "modified"
    | "parent"
    | "relevance"
    | "slug"
    | "include_slugs"
    | "title";
  slug?: string[];
  status?: string; // to do: get to know potential values
};

type PageEmbeddableLinks = "author" | "replies";
type PostFields =
  | PagePostCommonFields
  | "format"
  | "sticky"
  | "categories"
  | "tags";

type PostEmbeddableLinks = PageEmbeddableLinks | "wp:term";
type PostsQueryOptions = PagePostCommonOtherQueryOptions & {
  _fields: PostFields[];
  _embed?: PostEmbeddableLinks[] | boolean;
  tax_relation?: "AND" | "OR";
  categories?: string[];
  categories_exclude?: string[];
  tags?: string[];
  tags_exclude?: string[];
  sticky?: boolean;
};

type MenuFields =
  | "ID"
  | "attr_title"
  | "classes"
  | "comment_count"
  | "comment_status"
  | "db_id"
  | "description"
  | "filter"
  | "guid"
  | "menu_item_parent"
  | "menu_order"
  | "object"
  | "object_id"
  | "ping_status"
  | "pinged"
  | "post_author"
  | "post_content"
  | "post_content_filtered"
  | "post_date"
  | "post_date_gmt"
  | "post_excerpt"
  | "post_mime_type"
  | "post_modified"
  | "post_modified_gmt"
  | "post_name"
  | "post_parent"
  | "post_password"
  | "post_status"
  | "post_title"
  | "post_type"
  | "target"
  | "title"
  | "to_ping"
  | "type"
  | "type_label"
  | "url"
  | "xfn";

type MenusQueryOptions = {
  _fields: MenuFields[];
  id: number;
};

type PageFields = PagePostCommonFields | "parent" | "menu_order";

type PagesQueryOptions = PagePostCommonOtherQueryOptions & {
  _fields: PageFields[];
  _embed?: PageEmbeddableLinks | boolean;
  parent?: number[];
  parent_exlude?: number[];
  menu_order?: number;
};

type WidgetsQueryOptions = {
  _fields: ("id" | "id_base" | "rendered" | "sidebar")[];
  sidebar: string;
};

type QueryOptions = {
  posts: PostsQueryOptions;
  menus: MenusQueryOptions;
  pages: PagesQueryOptions;
  media: any;
  widgets: WidgetsQueryOptions;
};

export type { QueryOptions };
