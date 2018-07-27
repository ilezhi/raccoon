declare class ToolbarItem {
  prefix: string;
  subfix: string;
  text: string;
}

declare class Toolbar {
  [key:string]: ToolbarItem
}

declare class SelectedText {
  start: number;
  end: number;
}

declare class Layout {
  preview: number;
  panel: number;
}

declare var prettyPrint;
