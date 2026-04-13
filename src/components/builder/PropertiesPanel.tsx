import * as React from "react";
import { Trash2, X } from "lucide-react";

import { useBuilder } from "@/contexts/BuilderContext";
import type { ElementStyle, TemplateElement } from "@/types/template";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type StyleField = {
  key: keyof React.CSSProperties & string;
  label: string;
  placeholder?: string;
  kind: "text" | "number";
};

const STYLE_FIELDS: StyleField[] = [
  { key: "fontSize", label: "Font size", placeholder: "14", kind: "number" },
  { key: "fontWeight", label: "Font weight", placeholder: "400", kind: "number" },
  { key: "color", label: "Text color", placeholder: "hsl(var(--foreground))", kind: "text" },
  { key: "backgroundColor", label: "Background", placeholder: "transparent", kind: "text" },
  { key: "padding", label: "Padding", placeholder: "12px 16px", kind: "text" },
  { key: "margin", label: "Margin", placeholder: "0", kind: "text" },
  { key: "border", label: "Border", placeholder: "1px solid hsl(var(--border))", kind: "text" },
  { key: "borderRadius", label: "Radius", placeholder: "12", kind: "number" },
  { key: "width", label: "Width", placeholder: "100%", kind: "text" },
  { key: "height", label: "Height", placeholder: "auto", kind: "text" },
];

function parseStyleValue(kind: StyleField["kind"], raw: string): string | number {
  if (kind === "number") {
    const n = Number(raw);
    return Number.isFinite(n) ? n : raw;
  }
  return raw;
}

function elementContentLabel(el: TemplateElement) {
  if (el.type === "image") return "Image URL";
  if (el.type === "input") return "Placeholder";
  return "Content";
}

export const PropertiesPanel = () => {
  const { selectedElement, setSelectedElement, updateElement, removeElement } = useBuilder();
  const [localContent, setLocalContent] = React.useState("");

  React.useEffect(() => {
    setLocalContent(selectedElement?.content ?? "");
  }, [selectedElement?.id, selectedElement?.content]);

  if (!selectedElement) return null;

  const setStyle = (patch: Partial<ElementStyle>) => {
    updateElement(selectedElement.id, {
      style: { ...(selectedElement.style ?? {}), ...patch },
    });
  };

  return (
    <aside className="w-[340px] border-l border-border bg-panel shrink-0">
      <div className="h-14 border-b border-border flex items-center justify-between px-4">
        <div className="min-w-0">
          <div className="text-xs text-muted-foreground">Selected</div>
          <div className="text-sm font-semibold truncate">
            {selectedElement.label} <span className="text-muted-foreground font-normal">({selectedElement.type})</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => {
              setSelectedElement(null);
            }}
          >
            <X className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={cn("h-8 w-8", "hover:text-destructive")}
            onClick={() => {
              removeElement(selectedElement.id);
            }}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-5 overflow-auto max-h-[calc(100svh-3.5rem)]">
        <div className="space-y-2">
          <Label htmlFor="content">{elementContentLabel(selectedElement)}</Label>
          <Input
            id="content"
            value={localContent}
            onChange={(e) => setLocalContent(e.target.value)}
            onBlur={() => updateElement(selectedElement.id, { content: localContent })}
          />
        </div>

        <div className="space-y-3">
          <div className="text-sm font-semibold">Style</div>
          <div className="grid grid-cols-1 gap-3">
            {STYLE_FIELDS.map((field) => {
              const raw = (selectedElement.style as Record<string, unknown> | undefined)?.[field.key];
              const value = raw === undefined || raw === null ? "" : String(raw);
              return (
                <div key={field.key} className="space-y-1.5">
                  <Label htmlFor={`style-${field.key}`} className="text-xs text-muted-foreground">
                    {field.label}
                  </Label>
                  <Input
                    id={`style-${field.key}`}
                    value={value}
                    placeholder={field.placeholder}
                    onChange={(e) => {
                      const next = e.target.value;
                      if (next.trim() === "") {
                        const { [field.key]: _removed, ...rest } = (selectedElement.style ?? {}) as Record<string, unknown>;
                        updateElement(selectedElement.id, { style: rest as ElementStyle });
                        return;
                      }
                      setStyle({ [field.key]: parseStyleValue(field.kind, next) });
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
};
