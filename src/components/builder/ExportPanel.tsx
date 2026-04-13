import * as React from "react";
import { Copy, Download } from "lucide-react";

import { useBuilder } from "@/contexts/BuilderContext";
import type { TemplateElement } from "@/types/template";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function toKebabCase(key: string) {
  return key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
}

function styleToString(style: unknown) {
  if (!style || typeof style !== "object") return "";
  const entries = Object.entries(style as Record<string, unknown>).filter(([, v]) => v !== undefined && v !== null && v !== "");
  if (entries.length === 0) return "";

  const unitless = new Set([
    "fontWeight",
    "lineHeight",
    "opacity",
    "zIndex",
    "flex",
    "flexGrow",
    "flexShrink",
    "order",
  ]);

  return entries
    .map(([k, v]) => {
      if (typeof v === "number" && !unitless.has(k)) return `${toKebabCase(k)}:${v}px`;
      return `${toKebabCase(k)}:${String(v)}`;
    })
    .join(";");
}

function elementToHtml(el: TemplateElement) {
  const style = styleToString(el.style);
  const styleAttr = style ? ` style="${escapeHtml(style)}"` : "";

  switch (el.type) {
    case "heading":
      return `<h2${styleAttr}>${escapeHtml(el.content)}</h2>`;
    case "paragraph":
      return `<p${styleAttr}>${escapeHtml(el.content)}</p>`;
    case "button":
      return `<button${styleAttr}>${escapeHtml(el.content)}</button>`;
    case "image":
      return `<img src="${escapeHtml(el.content)}" alt="Image"${styleAttr} />`;
    case "input":
      return `<input type="text" placeholder="${escapeHtml(el.content)}"${styleAttr} />`;
    case "container":
      return `<div${styleAttr}>${escapeHtml(el.content)}</div>`;
    case "card":
      return `<div${styleAttr}>${escapeHtml(el.content)}</div>`;
    case "divider":
      return `<hr${styleAttr} />`;
    case "spacer":
      return `<div${styleAttr}></div>`;
    case "badge":
      return `<span${styleAttr}>${escapeHtml(el.content)}</span>`;
    default:
      return `<div${styleAttr}>${escapeHtml(el.content)}</div>`;
  }
}

function templateToHtml(elements: TemplateElement[]) {
  const body = elements.map(elementToHtml).join("\n");
  return [
    "<!doctype html>",
    "<html>",
    "  <head>",
    '    <meta charset="utf-8" />',
    '    <meta name="viewport" content="width=device-width,initial-scale=1" />',
    "    <title>Export</title>",
    "  </head>",
    "  <body>",
    body
      .split("\n")
      .map((line) => `    ${line}`)
      .join("\n"),
    "  </body>",
    "</html>",
  ].join("\n");
}

export const ExportPanel: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { currentTemplate } = useBuilder();
  const html = React.useMemo(() => templateToHtml(currentTemplate?.elements ?? []), [currentTemplate?.elements]);

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Export</DialogTitle>
          <DialogDescription>Copy the HTML output or download it as a file.</DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-end gap-2">
          <Button
            variant="outline"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(html);
                toast({ title: "Copied", description: "HTML copied to clipboard." });
              } catch {
                toast({ title: "Copy failed", description: "Clipboard permission was denied." });
              }
            }}
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy
          </Button>
          <Button
            onClick={() => {
              const blob = new Blob([html], { type: "text/html;charset=utf-8" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = `${currentTemplate?.name ?? "template"}.html`;
              a.click();
              URL.revokeObjectURL(url);
            }}
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </div>

        <Textarea value={html} readOnly className="font-mono text-xs min-h-[360px]" />
      </DialogContent>
    </Dialog>
  );
};
