import React, { useState } from 'react';
import { useBuilder } from '@/contexts/BuilderContext';
import { TemplateElement, ElementType } from '@/types/template';
import { Trash2, Copy, GripVertical, ChevronUp, ChevronDown, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { STARTER_TEMPLATES } from '@/data/starterTemplates';

const ElementRenderer: React.FC<{ element: TemplateElement }> = ({ element }) => {
  const style = element.style as React.CSSProperties;

  switch (element.type) {
    case 'heading':
      return <h2 style={style}>{element.content}</h2>;
    case 'paragraph':
      return <p style={style}>{element.content}</p>;
    case 'button':
      return <button style={style}>{element.content}</button>;
    case 'image':
      return <img src={element.content} alt="Template image" style={style} className="pointer-events-none" />;
    case 'input':
      return <input type="text" placeholder={element.content} style={style} readOnly className="outline-none" />;
    case 'container':
      return <div style={style}>{element.content || <span className="text-muted-foreground text-xs">Empty container</span>}</div>;
    case 'card':
      return <div style={style}>{element.content}</div>;
    case 'divider':
      return <hr style={style} />;
    case 'spacer':
      return <div style={style} />;
    case 'badge':
      return <span style={{ ...style, display: 'inline-block' }}>{element.content}</span>;
    default:
      return <div style={style}>{element.content}</div>;
  }
};

export const BuilderCanvas = () => {
  const {
    currentTemplate,
    selectedElement,
    setSelectedElement,
    removeElement,
    duplicateElement,
    moveElement,
    addElement,
    createFromStarter,
  } = useBuilder();
  const [dragOver, setDragOver] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const type = e.dataTransfer.getData('elementType') as ElementType;
    if (type) addElement(type);
  };

  if (!currentTemplate) {
    return (
      <div className="flex-1 bg-canvas overflow-auto p-8">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Start with a Template</h2>
            <p className="text-muted-foreground text-sm">Pick a starter template or create a blank one from the sidebar</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {STARTER_TEMPLATES.map((starter, idx) => (
              <button
                key={idx}
                onClick={() => createFromStarter(starter)}
                className="group text-left bg-card border border-border rounded-xl p-5 hover:border-primary/50 hover:shadow-md transition-all"
              >
                <span className="inline-block text-[10px] font-semibold uppercase tracking-wider text-muted-foreground bg-muted px-2 py-0.5 rounded mb-3">
                  {starter.category}
                </span>
                <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {starter.name}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {starter.description}
                </p>
                <div className="mt-3 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Use this template →
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-canvas overflow-auto p-8">
      <div
        className={cn(
          'max-w-2xl mx-auto bg-card rounded-xl border border-border shadow-sm min-h-[500px] p-6 transition-all',
          dragOver && 'drag-over'
        )}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        {currentTemplate.elements.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-80 text-muted-foreground">
            <p className="text-sm mb-1">Drag components here or click them in the palette</p>
            <p className="text-xs">Build your template visually</p>
          </div>
        ) : (
          <div className="space-y-1">
            {currentTemplate.elements.map((el, idx) => (
              <div
                key={el.id}
                onClick={(e) => { e.stopPropagation(); setSelectedElement(el); }}
                className={cn(
                  'group relative rounded-lg transition-all cursor-pointer',
                  selectedElement?.id === el.id
                    ? 'ring-2 ring-primary ring-offset-2 ring-offset-card'
                    : 'hover:ring-1 hover:ring-border'
                )}
              >
                {/* Toolbar */}
                <div className={cn(
                  'absolute -top-3 right-2 flex items-center gap-0.5 bg-card border border-border rounded-md shadow-sm px-1 py-0.5 transition-opacity z-10',
                  selectedElement?.id === el.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                )}>
                  {idx > 0 && (
                    <button onClick={(e) => { e.stopPropagation(); moveElement(idx, idx - 1); }} className="p-1 hover:bg-muted rounded">
                      <ChevronUp className="w-3 h-3" />
                    </button>
                  )}
                  {idx < currentTemplate.elements.length - 1 && (
                    <button onClick={(e) => { e.stopPropagation(); moveElement(idx, idx + 1); }} className="p-1 hover:bg-muted rounded">
                      <ChevronDown className="w-3 h-3" />
                    </button>
                  )}
                  <button onClick={(e) => { e.stopPropagation(); duplicateElement(el.id); }} className="p-1 hover:bg-muted rounded">
                    <Copy className="w-3 h-3" />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); removeElement(el.id); }} className="p-1 hover:bg-destructive/10 text-destructive rounded">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>

                <div className="p-2">
                  <ElementRenderer element={el} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
