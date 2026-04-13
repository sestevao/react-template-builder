import { useState } from 'react';
import { useBuilder } from '@/contexts/BuilderContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Plus,
  Eye,
  Code2,
  Trash2,
  LayoutTemplate,
  ChevronLeft,
} from 'lucide-react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { ComponentPalette } from '@/components/builder/ComponentPalette';
import { BuilderCanvas } from '@/components/builder/BuilderCanvas';
import { PropertiesPanel } from '@/components/builder/PropertiesPanel';
import { ExportPanel } from '@/components/builder/ExportPanel';
import { PreviewPanel } from '@/components/builder/PreviewPanel';

const CreateTemplateDialog: React.FC<{
  open: boolean;
  onClose: () => void;
  onCreate: (name: string, desc: string) => void;
}> = ({ open, onClose, onCreate }) => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm flex items-center justify-center animate-fade-in" onClick={onClose}>
      <div className="bg-card border border-border rounded-xl shadow-2xl w-full max-w-md p-6 animate-scale-in" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-lg font-semibold mb-4">New Template</h2>
        <div className="space-y-3">
          <div>
            <label className="text-sm text-muted-foreground">Name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="My Template" className="mt-1" />
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Description</label>
            <Input value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="A brief description..." className="mt-1" />
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button
            onClick={() => {
              if (name.trim()) {
                onCreate(name.trim(), desc.trim());
                setName('');
                setDesc('');
                onClose();
              }
            }}
          >
            Create
          </Button>
        </div>
      </div>
    </div>
  );
};

const AppSidebar = () => {
  const { templates, currentTemplate, selectTemplate, deleteTemplate } = useBuilder();
  const [showCreate, setShowCreate] = useState(false);
  const { createTemplate } = useBuilder();

  return (
    <>
      <Sidebar collapsible="icon" className="border-r-0">
        <SidebarContent className="bg-sidebar">
          {/* Templates list */}
          <SidebarGroup>
            <SidebarGroupLabel className="flex items-center justify-between pr-2">
              <span>Templates</span>
              <button
                onClick={() => setShowCreate(true)}
                className="w-5 h-5 flex items-center justify-center rounded bg-sidebar-accent hover:bg-primary/20 transition-colors"
              >
                <Plus className="w-3 h-3" />
              </button>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {templates.length === 0 && (
                  <p className="text-xs text-muted-foreground px-4 py-2">No templates yet</p>
                )}
                {templates.map((t) => (
                  <SidebarMenuItem key={t.id}>
                    <SidebarMenuButton
                      onClick={() => selectTemplate(t.id)}
                      className={currentTemplate?.id === t.id ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''}
                    >
                      <LayoutTemplate className="w-4 h-4 mr-2 shrink-0" />
                      <span className="truncate flex-1">{t.name}</span>
                      <button
                        onClick={(e) => { e.stopPropagation(); deleteTemplate(t.id); }}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:text-destructive transition-all"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Component palette - only when a template is selected */}
          {currentTemplate && (
            <SidebarGroup>
              <ComponentPalette />
            </SidebarGroup>
          )}
        </SidebarContent>
      </Sidebar>

      <CreateTemplateDialog
        open={showCreate}
        onClose={() => setShowCreate(false)}
        onCreate={createTemplate}
      />
    </>
  );
};

const BuilderDashboard = () => {
  const { currentTemplate, selectedElement } = useBuilder();
  const [showExport, setShowExport] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />

        <div className="flex-1 flex flex-col min-w-0">
          {/* Top bar */}
          <header className="h-14 border-b border-border bg-toolbar flex items-center justify-between px-4 shrink-0">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <div className="h-5 w-px bg-border" />
              <h1 className="text-sm font-semibold text-foreground">
                {currentTemplate ? currentTemplate.name : 'Template Builder'}
              </h1>
              {currentTemplate && (
                <span className="text-xs text-muted-foreground">
                  {currentTemplate.elements.length} elements
                </span>
              )}
            </div>

            {currentTemplate && (
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setShowPreview(true)}>
                  <Eye className="w-4 h-4 mr-1.5" />
                  Preview
                </Button>
                <Button size="sm" onClick={() => setShowExport(true)}>
                  <Code2 className="w-4 h-4 mr-1.5" />
                  Export
                </Button>
              </div>
            )}
          </header>

          {/* Main content */}
          <div className="flex-1 flex min-h-0">
            <BuilderCanvas />
            {currentTemplate && selectedElement && <PropertiesPanel />}
          </div>
        </div>
      </div>

      {showExport && <ExportPanel onClose={() => setShowExport(false)} />}
      {showPreview && <PreviewPanel onClose={() => setShowPreview(false)} />}
    </SidebarProvider>
  );
};

export default BuilderDashboard;
