import * as React from "react";

import { useBuilder } from "@/contexts/BuilderContext";
import type { TemplateElement } from "@/types/template";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ElementRenderer: React.FC<{ element: TemplateElement }> = ({ element }) => {
  const style = element.style as React.CSSProperties;

  switch (element.type) {
    case "heading":
      return <h2 style={style}>{element.content}</h2>;
    case "paragraph":
      return <p style={style}>{element.content}</p>;
    case "button":
      return <button style={style}>{element.content}</button>;
    case "image":
      return <img src={element.content} alt="Template image" style={style} />;
    case "input":
      return <input type="text" placeholder={element.content} style={style} readOnly className="outline-none" />;
    case "container":
      return <div style={style}>{element.content}</div>;
    case "card":
      return <div style={style}>{element.content}</div>;
    case "divider":
      return <hr style={style} />;
    case "spacer":
      return <div style={style} />;
    case "badge":
      return <span style={{ ...style, display: "inline-block" }}>{element.content}</span>;
    default:
      return <div style={style}>{element.content}</div>;
  }
};

export const PreviewPanel: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { currentTemplate } = useBuilder();

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Preview</DialogTitle>
          <DialogDescription>Rendered view of the current template.</DialogDescription>
        </DialogHeader>

        <div className="rounded-lg border border-border bg-background p-6 max-h-[70vh] overflow-auto">
          {currentTemplate?.elements?.length ? (
            <div className="space-y-3">
              {currentTemplate.elements.map((el) => (
                <ElementRenderer key={el.id} element={el} />
              ))}
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">No elements to preview.</div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
