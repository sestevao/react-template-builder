import type { ElementStyle, TemplateElement } from "@/types/template";

export type StarterTemplate = {
  name: string;
  description: string;
  category: string;
  elements: Array<Omit<TemplateElement, "id">>;
};

const headingStyle: ElementStyle = {
  fontSize: 30,
  fontWeight: 800,
  margin: "0 0 12px 0",
  color: "hsl(var(--foreground))",
};

const paragraphStyle: ElementStyle = {
  fontSize: 14,
  lineHeight: 1.7,
  margin: "0 0 12px 0",
  color: "hsl(var(--muted-foreground))",
};

export const STARTER_TEMPLATES: StarterTemplate[] = [
  {
    name: "Hero Section",
    description: "A bold hero section with heading, subtitle and CTA",
    category: "Landing",
    elements: [
      {
        type: "container",
        label: "Container",
        content: "",
        style: { padding: "48px 32px", backgroundColor: "#6366f1", borderRadius: 16, textAlign: "center" },
      },
      {
        type: "badge",
        label: "Badge",
        content: "🚀 Now Available",
        style: { padding: "6px 14px", backgroundColor: "#eef2ff", color: "#6366f1", fontSize: 13, fontWeight: 600, borderRadius: 9999 },
      },
      {
        type: "heading",
        label: "Heading",
        content: "Build Beautiful Interfaces in Minutes",
        style: headingStyle,
      },
      {
        type: "paragraph",
        label: "Paragraph",
        content: "Create stunning, responsive templates with our drag-and-drop builder. No coding required — just design, preview, and export.",
        style: paragraphStyle,
      },
      {
        type: "button",
        label: "Button",
        content: "Get Started →",
        style: { padding: "10px 14px", fontSize: 14, fontWeight: 600, backgroundColor: "white", color: "#6366f1" },
      },
    ],
  },
  {
    name: "Pricing Card",
    description: "A clean pricing card with features list",
    category: "Commerce",
    elements: [
      {
        type: "card",
        label: "Card",
        content: "",
        style: {
          padding: 18,
          borderRadius: 16,
          backgroundColor: "hsl(var(--card))",
          border: "1px solid hsl(var(--border))",
          margin: "0 0 12px 0",
        },
      },  
      {
        type: "badge",
        label: "Badge",
        content: "Best Value",
        style: { 
          backgroundColor: "#fef3c7",
          color: "#92400e",
          padding: "4px 12px",
          borderRadius: 9999,
          fontSize: 12,
          fontWeight: 600,
          textAlign: "center",
        },
      },
      {
        type: "heading",
        label: "Heading",
        content: "Pro Plan",
        style: { ...headingStyle, fontSize: 26, margin: "0 0 6px 0" },
      },
      {
        type: "heading",
        label: "Heading",
        content: "£29 / month",
        style: { ...headingStyle, fontSize: 40, fontWeight: 800, padding: "4px 0", color: "#6366f1" },
      },
      {
        type: "paragraph",
        label: "Paragraph",
        content: "Everything you need to grow your business.",
        style: { ...paragraphStyle, margin: "0 0 16px 0" },
      },
      
      {
        type: "divider",
        label: "Divider",
        content: "",
        style: { margin: "6px 0 12px 0" },
      },
      {
        type: "paragraph",
        label: "Paragraph",
        content: `✓ Unlimited templates ✓ Priority support ✓ Custom branding ✓ Team collaboration ✓ API access`,
        style: { ...paragraphStyle, margin: "0 0 6px 0" },
      },
      {
        type: "button",
        label: "Button",
        content: "Start Free Trial",
        style: { padding: "12px 24px", borderRadius: 10, backgroundColor: "#6366f1", color: "white", width: "100%" },
      },
    ],
  },
  {
    name: "Contact Form",
    description: "A simple contact form with fields and submit button",
    category: "Forms",
    elements: [
      {
        type: "heading",
        label: "Heading",
        content: "Get in Touch",
        style: { ...headingStyle, fontSize: 26 },
      },
      {
        type: "paragraph",
        label: "Paragraph",
        content: "We'd love to hear from you. Fill out the form below and we'll get back to you shortly",
        style: paragraphStyle,
      },
      {
        type: "input",
        label: "Input",
        content: "Your name",
        style: { width: "100%", border: "1px solid #d1d5db", borderRadius: 8, padding: "10px 12px", margin: "0 0 12px" },
      },
      {
        type: "input",
        label: "Input",
        content: "Email address",
        style: { width: "100%", border: "1px solid #d1d5db", borderRadius: 8, padding: "10px 12px", margin: "0 0 12px" },
      },
      {
        type: "input",
        label: "Input",
        content: "Message",
        style: { width: "100%", border: "1px solid #d1d5db", borderRadius: 8, padding: "10px 14px", margin: "0 0 16px", height: "100px" },
      },
      {
        type: "button",
        label: "Button",
        content: "Send message",
        style: { padding: "12px 24px", borderRadius: 10, backgroundColor: "#6366f1", color: "white", width: "100%", fontSize: 14, fontWeight: 600 },
      },
    ],
  },
  {
    name: "Feature Grid",
    description: "Showcase features with icons and descriptions",
    category: "Landing",
    elements: [
      {
        type: "heading",
        label: "Heading",
        content: "Why Choose Us",
        style: { ...headingStyle, fontSize: 28 },
      },
      {
        type: "paragraph",
        label: "Paragraph",
        content: "Powerful features to help you build faster",
        style: paragraphStyle,
      },
      {
        type: "card",
        label: "Card",
        content: "⚡ Lightning FastOptimized for speed and performance. Your templates load instantly.",
        style: {
          padding: 16,
          borderRadius: 14,
          border: "1px solid hsl(var(--border))",
          backgroundColor: "hsl(var(--card))",
          margin: "0 0 10px 0",
        },
      },
      {
        type: "card",
        label: "Card",
        content: "🎨 Fully CustomizableEvery element is editable. Change colors, sizes, spacing — anything.",
        style: {
          padding: 16,
          borderRadius: 14,
          border: "1px solid hsl(var(--border))",
          backgroundColor: "hsl(var(--card))",
          margin: "0 0 10px 0",
        },
      },
      {
        type: "card",
        label: "Card",
        content: "📱 Responsive by DefaultTemplates that look great on any device, from mobile to desktop.",
        style: {
          padding: 16,
          borderRadius: 14,
          border: "1px solid hsl(var(--border))",
          backgroundColor: "hsl(var(--card))",
          margin: "0 0 10px 0",
        },
      },
      {
        type: "card",
        label: "Card",
        content: "📦 Export-ready — Copy or download clean HTML output.",
        style: {
          padding: 16,
          borderRadius: 14,
          border: "1px solid hsl(var(--border))",
          backgroundColor: "hsl(var(--card))",
        },
      },
    ],
  },
  {
    name: "Newsletter Signup",
    description: "Email capture section with input and CTA",
    category: "Marketing",
    elements: [
      {
        type: "heading",
        label: "Heading",
        content: "Stay in the loop",
        style: { ...headingStyle, fontSize: 26 },
      },
      {
        type: "paragraph",
        label: "Paragraph",
        content: "Get the latest updates, tips, and resources delivered straight to your inbox.",
        style: paragraphStyle,
      },
      {
        type: "input",
        label: "Input",
        content: "Enter your email",
        style: { width: "100%", border: "1px solid #d1d5db", borderRadius: 8, padding: "10px 14px", margin: "0 0 16px" },
      },
      {
        type: "button",
        label: "Button",
        content: "Subscribe",
        style: { padding: "12px 32px", width: "100%", borderRadius: 10, backgroundColor: "#818cf8", color: "white" },
      },
    ],
  },
];
