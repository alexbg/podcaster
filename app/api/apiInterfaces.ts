export interface ApiPodcast {
  feed: Feed;
}

interface Feed {
  author: Author;
  entry: Entry[];
  updated: Icon;
  rights: Icon;
  title: Icon;
  icon: Icon;
  link: Link[];
  id: Icon;
}

interface Author {
  name: Icon;
  uri: Icon;
}

interface Icon {
  label: string;
}

export interface Entry {
  "im:name": Icon;
  "im:image": IMImage[];
  summary: Summary;
  "im:price": IMPrice;
  "im:contentType": IMContentType;
  rights?: Icon;
  title: Icon;
  link: Link;
  id: ID;
  "im:artist": IMArtist;
  category: Category;
  "im:releaseDate": IMReleaseDate;
}

interface Summary {
  label: string;
}

interface Category {
  attributes: CategoryAttributes;
}

interface CategoryAttributes {
  "im:id": string;
  term: PurpleLabel;
  scheme: string;
  label: PurpleLabel;
}

type PurpleLabel =
  | "Music Interviews"
  | "Music"
  | "Music Commentary"
  | "Music History";

interface ID {
  label: string;
  attributes: IDAttributes;
}

interface IDAttributes {
  "im:id": string;
}

interface IMArtist {
  label: string;
  attributes?: IMArtistAttributes;
}

interface IMArtistAttributes {
  href: string;
}

interface IMContentType {
  attributes: IMContentTypeAttributes;
}

interface IMContentTypeAttributes {
  term: "Podcast";
  label: "Podcast";
}

interface IMImage {
  label: string;
  attributes: IMImageAttributes;
}

interface IMImageAttributes {
  height: string;
}

interface IMPrice {
  label: "Get";
  attributes: IMPriceAttributes;
}

interface IMPriceAttributes {
  amount: string;
  currency: "USD";
}

interface IMReleaseDate {
  label: Date;
  attributes: Icon;
}

interface Link {
  attributes: LinkAttributes;
}

interface LinkAttributes {
  rel: Rel;
  type?: "text/html";
  href: string;
}

type Rel = "alternate" | "self";
