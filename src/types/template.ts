export type ElementType =
  | "heading"
  | "paragraph"
  | "button"
  | "image"
  | "input"
  | "container"
  | "card"
  | "divider"
  | "spacer"
  | "badge";

export type ElementStyle = Record<string, string | number>;

export type TemplateElement = {
  id: string;
  type: ElementType;
  label: string;
  content: string;
  style: ElementStyle;
};

export type Template = {
  id: string;
  name: string;
  description: string;
  elements: TemplateElement[];
  createdAt: Date;
  updatedAt: Date;
};

export type ComponentDefinition = {
  type: ElementType;
  label: string;
  defaultContent: string;
  defaultStyle: ElementStyle;
};

export const COMPONENT_LIBRARY: ComponentDefinition[] = [
  {
    type: "heading",
    label: "Heading",
    defaultContent: "Your Heading",
    defaultStyle: {
      fontSize: 28,
      fontWeight: 700,
      color: "hsl(var(--foreground))",
      margin: "0 0 12px 0",
    },
  },
  {
    type: "paragraph",
    label: "Paragraph",
    defaultContent: "Write something here…",
    defaultStyle: {
      fontSize: 14,
      lineHeight: 1.6,
      color: "hsl(var(--muted-foreground))",
      margin: "0 0 12px 0",
    },
  },
  {
    type: "button",
    label: "Button",
    defaultContent: "Click me",
    defaultStyle: {
      padding: "10px 14px",
      borderRadius: 10,
      backgroundColor: "hsl(var(--primary))",
      color: "hsl(var(--primary-foreground))",
      border: "1px solid hsl(var(--primary))",
      fontSize: 14,
      fontWeight: 600,
      cursor: "pointer",
    },
  },
  {
    type: "image",
    label: "Image",
    defaultContent: "https://picsum.photos/800/400",
    defaultStyle: {
      width: "100%",
      height: "auto",
      borderRadius: 12,
      display: "block",
    },
  },
  {
    type: "input",
    label: "Input",
    defaultContent: "Placeholder text",
    defaultStyle: {
      width: "100%",
      padding: "10px 12px",
      borderRadius: 10,
      border: "1px solid hsl(var(--border))",
      backgroundColor: "hsl(var(--background))",
      color: "hsl(var(--foreground))",
      fontSize: 14,
    },
  },
  {
    type: "container",
    label: "Container",
    defaultContent: "",
    defaultStyle: {
      padding: 16,
      borderRadius: 14,
      border: "1px dashed hsl(var(--border))",
      backgroundColor: "hsl(var(--card))",
      minHeight: 60,
    },
  },
  {
    type: "card",
    label: "Card",
    defaultContent: "Card content",
    defaultStyle: {
      padding: 16,
      borderRadius: 14,
      border: "1px solid hsl(var(--border))",
      backgroundColor: "hsl(var(--card))",
      color: "hsl(var(--foreground))",
    },
  },
  {
    type: "divider",
    label: "Divider",
    defaultContent: "",
    defaultStyle: {
      border: "none",
      borderTop: "1px solid hsl(var(--border))",
      margin: "16px 0",
    },
  },
  {
    type: "spacer",
    label: "Spacer",
    defaultContent: "",
    defaultStyle: {
      height: 16,
    },
  },
  {
    type: "badge",
    label: "Badge",
    defaultContent: "New",
    defaultStyle: {
      padding: "4px 10px",
      borderRadius: 9999,
      fontSize: 12,
      fontWeight: 600,
      backgroundColor: "hsl(var(--secondary))",
      color: "hsl(var(--secondary-foreground))",
    },
  },
];
