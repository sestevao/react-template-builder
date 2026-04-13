import React, { createContext, useCallback, useContext, useState } from "react";

import { COMPONENT_LIBRARY, type ElementType, type Template, type TemplateElement } from "@/types/template";
import type { StarterTemplate } from "@/data/starterTemplates";

interface BuilderContextType {
  templates: Template[];
  currentTemplate: Template | null;
  selectedElement: TemplateElement | null;
  setSelectedElement: (el: TemplateElement | null) => void;
  createTemplate: (name: string, description: string) => Template;
  createFromStarter: (starter: StarterTemplate) => Template;
  selectTemplate: (id: string) => void;
  deleteTemplate: (id: string) => void;
  addElement: (type: ElementType) => void;
  updateElement: (id: string, updates: Partial<TemplateElement>) => void;
  removeElement: (id: string) => void;
  moveElement: (fromIndex: number, toIndex: number) => void;
  duplicateElement: (id: string) => void;
}

const BuilderContext = createContext<BuilderContextType | null>(null);

export const useBuilder = () => {
  const ctx = useContext(BuilderContext);
  if (!ctx) throw new Error("useBuilder must be used within BuilderProvider");
  return ctx;
};

let idCounter = 0;
const genId = () => `el_${++idCounter}_${Date.now()}`;

export const BuilderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [currentTemplate, setCurrentTemplate] = useState<Template | null>(null);
  const [selectedElement, setSelectedElement] = useState<TemplateElement | null>(null);

  const createTemplate = useCallback((name: string, description: string) => {
    const t: Template = {
      id: genId(),
      name,
      description,
      elements: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTemplates((prev) => [...prev, t]);
    setCurrentTemplate(t);
    setSelectedElement(null);
    return t;
  }, []);

  const createFromStarter = useCallback((starter: StarterTemplate) => {
    const elements = starter.elements.map((el) => ({
      ...el,
      id: genId(),
      style: { ...el.style },
    }));
    const t: Template = {
      id: genId(),
      name: starter.name,
      description: starter.description,
      elements,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTemplates((prev) => [...prev, t]);
    setCurrentTemplate(t);
    setSelectedElement(null);
    return t;
  }, []);

  const selectTemplate = useCallback((id: string) => {
    setTemplates((prev) => {
      const t = prev.find((t) => t.id === id) || null;
      setCurrentTemplate(t);
      setSelectedElement(null);
      return prev;
    });
  }, []);

  const deleteTemplate = useCallback((id: string) => {
    setTemplates((prev) => prev.filter((t) => t.id !== id));
    setCurrentTemplate((prev) => (prev?.id === id ? null : prev));
  }, []);

  const updateCurrentTemplate = useCallback((updater: (els: TemplateElement[]) => TemplateElement[]) => {
    setCurrentTemplate((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, elements: updater(prev.elements), updatedAt: new Date() };
      setTemplates((ts) => ts.map((t) => (t.id === updated.id ? updated : t)));
      return updated;
    });
  }, []);

  const addElement = useCallback(
    (type: ElementType) => {
      const comp = COMPONENT_LIBRARY.find((c) => c.type === type);
      if (!comp) return;
      const el: TemplateElement = {
        id: genId(),
        type,
        label: comp.label,
        content: comp.defaultContent,
        style: { ...comp.defaultStyle },
      };
      updateCurrentTemplate((els) => [...els, el]);
    },
    [updateCurrentTemplate]
  );

  const updateElement = useCallback(
    (id: string, updates: Partial<TemplateElement>) => {
      updateCurrentTemplate((els) => els.map((el) => (el.id === id ? { ...el, ...updates } : el)));
      setSelectedElement((prev) => (prev?.id === id ? { ...prev, ...updates } : prev));
    },
    [updateCurrentTemplate]
  );

  const removeElement = useCallback(
    (id: string) => {
      updateCurrentTemplate((els) => els.filter((el) => el.id !== id));
      setSelectedElement((prev) => (prev?.id === id ? null : prev));
    },
    [updateCurrentTemplate]
  );

  const moveElement = useCallback(
    (fromIndex: number, toIndex: number) => {
      updateCurrentTemplate((els) => {
        const arr = [...els];
        const [moved] = arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, moved);
        return arr;
      });
    },
    [updateCurrentTemplate]
  );

  const duplicateElement = useCallback(
    (id: string) => {
      updateCurrentTemplate((els) => {
        const idx = els.findIndex((el) => el.id === id);
        if (idx === -1) return els;
        const dup = { ...els[idx], id: genId() };
        const arr = [...els];
        arr.splice(idx + 1, 0, dup);
        return arr;
      });
    },
    [updateCurrentTemplate]
  );

  return (
    <BuilderContext.Provider
      value={{
        templates,
        currentTemplate,
        selectedElement,
        setSelectedElement,
        createTemplate,
        createFromStarter,
        selectTemplate,
        deleteTemplate,
        addElement,
        updateElement,
        removeElement,
        moveElement,
        duplicateElement,
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
};
