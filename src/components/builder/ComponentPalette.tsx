import * as React from "react";

import { useBuilder } from "@/contexts/BuilderContext";
import { COMPONENT_LIBRARY } from "@/types/template";
import {
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export const ComponentPalette = () => {
  const { addElement } = useBuilder();

  return (
    <>
      <SidebarGroupLabel>Components</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {COMPONENT_LIBRARY.map((def) => (
            <SidebarMenuItem key={def.type}>
              <SidebarMenuButton
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData("elementType", def.type);
                  e.dataTransfer.effectAllowed = "copy";
                }}
                onClick={() => addElement(def.type)}
              >
                <span className="truncate">{def.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <div className="px-4 pt-2 text-[11px] text-muted-foreground">
          Drag into the canvas or click to add.
        </div>
      </SidebarGroupContent>
    </>
  );
};
