'use client';

import { File as FileIcon, Folder as FolderIcon, FolderOpen } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { cn } from '@/lib/cn';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

const itemVariants =
  'flex flex-row items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-fd-accent hover:text-fd-accent-foreground [&_svg]:size-4';

interface FilesProps {
  className?: string;
  children?: ReactNode;
}

interface FileProps {
  name: string;
  desc?: string;
  icon?: ReactNode;
  className?: string;
}

interface FolderProps {
  name: string;
  desc?: string;
  defaultOpen?: boolean;
  className?: string;
  children?: ReactNode;
}

export function Files({ className, children }: FilesProps) {
  return (
    <div className={cn('not-prose rounded-md border bg-fd-card p-2', className)}>
      {children}
    </div>
  );
}

export function File({ name, desc, icon = <FileIcon />, className }: FileProps) {
  return (
    <div className={cn(itemVariants, className)}>
      {icon}
      <span>{name}</span>
      {desc && (
        <span className="ml-auto text-xs text-fd-muted-foreground">{desc}</span>
      )}
    </div>
  );
}

export function Folder({ name, desc, defaultOpen = true, className, children }: FolderProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className={cn(itemVariants, 'w-full', className)}>
        {open ? <FolderOpen /> : <FolderIcon />}
        <span>{name}</span>
        {desc && (
          <span className="ml-auto text-xs text-fd-muted-foreground">{desc}</span>
        )}
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="ms-2 flex flex-col border-l ps-2">{children}</div>
      </CollapsibleContent>
    </Collapsible>
  );
}

