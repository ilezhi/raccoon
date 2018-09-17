declare interface Topic {
  id: number;
  title: string;
  content: string;
  tags: number[];
  view: number;
}

declare interface Tag {
  id: number;
  name: string;
  description?: string;
  authorID?: number;
  [key: string]: any;
}