"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Color } from "@tiptap/extension-color";
import FontFamily from "@tiptap/extension-font-family";
import FontSize from "@tiptap/extension-font-size";
import Heading from "@tiptap/extension-heading";
import TextHighlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Highlighter,
  ImageIcon,
  Indent,
  Italic,
  Link2,
  List,
  ListOrdered,
  Minus,
  Outdent,
  Paintbrush,
  Plus,
  RotateCcw,
  RotateCw,
  Search,
  Strikethrough,
  UnderlineIcon,
  X,
} from "lucide-react";
import { useCallback, useState } from "react";

const fontFamilies = [
  { value: "Arial", label: "Arial" },
  { value: "Times New Roman", label: "Times New Roman" },
  { value: "Courier New", label: "Courier New" },
  { value: "Georgia", label: "Georgia" },
  { value: "Verdana", label: "Verdana" },
];

const fontSizes = [
  { value: "12px", label: "12" },
  { value: "14px", label: "14" },
  { value: "16px", label: "16" },
  { value: "18px", label: "18" },
  { value: "20px", label: "20" },
  { value: "24px", label: "24" },
  { value: "30px", label: "30" },
  { value: "36px", label: "36" },
  { value: "48px", label: "48" },
  { value: "60px", label: "60" },
  { value: "72px", label: "72" },
];

const headingLevels = [
  { value: "paragraph", label: "Normal text" },
  { value: "1", label: "Heading 1" },
  { value: "2", label: "Heading 2" },
  { value: "3", label: "Heading 3" },
  { value: "4", label: "Heading 4" },
  { value: "5", label: "Heading 5" },
  { value: "6", label: "Heading 6" },
];

const colors = [
  "#000000",
  "#434343",
  "#666666",
  "#999999",
  "#b7b7b7",
  "#cccccc",
  "#d9d9d9",
  "#efefef",
  "#f3f3f3",
  "#ffffff",
  "#980000",
  "#ff0000",
  "#ff9900",
  "#ffff00",
  "#00ff00",
  "#00ffff",
  "#4a86e8",
  "#0000ff",
  "#9900ff",
  "#ff00ff",
  "#e6b8af",
  "#f4cccc",
  "#fce5cd",
  "#fff2cc",
  "#d9ead3",
  "#d0e0e3",
  "#c9daf8",
  "#cfe2f3",
  "#d9d2e9",
  "#ead1dc",
  "#dd7e6b",
  "#ea9999",
  "#f9cb9c",
  "#ffe599",
  "#b6d7a8",
  "#a2c4c9",
  "#a4c2f4",
  "#9fc5e8",
  "#b4a7d6",
  "#d5a6bd",
];

interface TipTapEditorProps {
  onUpdate?: (html: string) => void;
  content?: string;
  editable?: boolean;
}

export function TipTapEditor({
  onUpdate,
  content = "",
  editable = true,
}: TipTapEditorProps) {
  const [activeTab, setActiveTab] = useState("write");
  const [showHtml, setShowHtml] = useState(false);
  const [zoom, setZoom] = useState(100);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
      }),
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
      }),
      Image.configure({
        HTMLAttributes: {
          class: "max-w-full h-auto",
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Color.configure({
        types: ["textStyle"],
      }),
      TextStyle,
      Underline,
      FontFamily.configure({
        types: ["textStyle"],
      }),
      FontSize.configure({
        types: ["textStyle"],
      }),
      TextHighlight.configure({
        multicolor: true,
      }),
    ],
    content,
    editable,
    onUpdate: ({ editor }) => {
      onUpdate?.(editor.getHTML());
    },
  });

  const setLink = useCallback(() => {
    const previousUrl = editor?.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    if (url === null) return;
    if (url === "") {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor
      ?.chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url })
      .run();
  }, [editor]);

  const addImage = useCallback(() => {
    const url = window.prompt("URL");
    if (url) editor?.chain().focus().setImage({ src: url }).run();
  }, [editor]);

  if (!editor) return null;

  return (
    <TooltipProvider>
      <div className="flex flex-col rounded-lg border bg-background shadow-sm">
        <div className="flex items-center justify-between border-b ">
          <Tabs
            defaultValue="write"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="flex items-center justify-between bg-muted px-3">
              <TabsList className="h-14">
                <TabsTrigger value="write" className="text-sm px-4">
                  Write
                </TabsTrigger>
                <TabsTrigger value="preview" className="text-sm px-4">
                  Preview
                </TabsTrigger>
              </TabsList>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowHtml(!showHtml)}
                className="text-sm font-medium hover:bg-muted px-4"
              >
                HTML
              </Button>
            </div>
          </Tabs>
        </div>

        {activeTab === "write" && !showHtml && (
          <div className="flex flex-wrap items-start gap-2 border-b p-4 overflow-x-auto">
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 hover:bg-muted"
                      onClick={() => editor.chain().focus().undo().run()}
                      disabled={!editor.can().undo()}
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Undo</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 hover:bg-muted"
                      onClick={() => editor.chain().focus().redo().run()}
                      disabled={!editor.can().redo()}
                    >
                      <RotateCw className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Redo</TooltipContent>
                </Tooltip>
              </div>

              <div className="flex items-center gap-1">
                <Select
                  value={
                    editor.isActive("heading")
                      ? editor.getAttributes("heading").level?.toString()
                      : "paragraph"
                  }
                  onValueChange={(value) => {
                    if (value === "paragraph") {
                      editor.chain().focus().setParagraph().run();
                    } else {
                      editor
                        .chain()
                        .focus()
                        .toggleHeading({
                          level: Number.parseInt(value) as
                            | 1
                            | 2
                            | 3
                            | 4
                            | 5
                            | 6,
                        })
                        .run();
                    }
                  }}
                >
                  <SelectTrigger className="h-8 w-[140px] text-sm">
                    <SelectValue placeholder="Normal text" />
                  </SelectTrigger>
                  <SelectContent>
                    {headingLevels.map((heading) => (
                      <SelectItem
                        key={heading.value}
                        value={heading.value}
                        className="text-sm"
                      >
                        {heading.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={
                    editor.getAttributes("textStyle").fontFamily || "default"
                  }
                  onValueChange={(value) =>
                    editor
                      .chain()
                      .focus()
                      .setFontFamily(value === "default" ? "" : value)
                      .run()
                  }
                >
                  <SelectTrigger className="h-8 w-[120px] text-sm">
                    <SelectValue placeholder="Font..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default" className="text-sm">
                      Default
                    </SelectItem>
                    {fontFamilies.map((font) => (
                      <SelectItem
                        key={font.value}
                        value={font.value}
                        className="text-sm"
                      >
                        {font.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={
                    editor.getAttributes("textStyle").fontSize || "default"
                  }
                  onValueChange={(value) =>
                    editor
                      .chain()
                      .focus()
                      .setFontSize(value === "default" ? "" : value)
                      .run()
                  }
                >
                  <SelectTrigger className="h-8 w-[90px] text-sm">
                    <SelectValue placeholder="Size..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default" className="text-sm">
                      Default
                    </SelectItem>
                    {fontSizes.map((size) => (
                      <SelectItem
                        key={size.value}
                        value={size.value}
                        className="text-sm"
                      >
                        {size.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "h-8 w-8 p-0 hover:bg-muted",
                        editor.isActive("bold") && "bg-muted"
                      )}
                      onClick={() => editor.chain().focus().toggleBold().run()}
                    >
                      <Bold className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Bold</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "h-8 w-8 p-0 hover:bg-muted",
                        editor.isActive("italic") && "bg-muted"
                      )}
                      onClick={() =>
                        editor.chain().focus().toggleItalic().run()
                      }
                    >
                      <Italic className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Italic</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "h-8 w-8 p-0 hover:bg-muted",
                        editor.isActive("underline") && "bg-muted"
                      )}
                      onClick={() =>
                        editor.chain().focus().toggleUnderline().run()
                      }
                    >
                      <UnderlineIcon className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Underline</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "h-8 w-8 p-0 hover:bg-muted",
                        editor.isActive("strike") && "bg-muted"
                      )}
                      onClick={() =>
                        editor.chain().focus().toggleStrike().run()
                      }
                    >
                      <Strikethrough className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Strikethrough</TooltipContent>
                </Tooltip>
              </div>

              <div className="flex items-center gap-1">
                <Select
                  value={editor.getAttributes("textStyle").color || "default"}
                  onValueChange={(value) =>
                    editor
                      .chain()
                      .focus()
                      .setColor(value === "default" ? "" : value)
                      .run()
                  }
                >
                  <SelectTrigger className="h-8 w-[100px] text-sm">
                    <div className="flex items-center gap-2">
                      <Paintbrush className="h-4 w-4" />
                      <span>Color</span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default" className="text-sm">
                      Default
                    </SelectItem>
                    <div className="grid grid-cols-10 gap-1 p-2">
                      {colors.map((color) => (
                        <Button
                          key={color}
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 hover:bg-muted"
                          style={{ backgroundColor: color }}
                          onClick={() =>
                            editor.chain().focus().setColor(color).run()
                          }
                        />
                      ))}
                    </div>
                  </SelectContent>
                </Select>

                <Select
                  value={editor.getAttributes("highlight").color || "default"}
                  onValueChange={(value) => {
                    if (value === "default") {
                      editor.chain().focus().unsetHighlight().run();
                    } else {
                      editor
                        .chain()
                        .focus()
                        .toggleHighlight({ color: value })
                        .run();
                    }
                  }}
                >
                  <SelectTrigger className="h-8 w-[120px] text-sm">
                    <div className="flex items-center gap-2">
                      <Highlighter className="h-4 w-4" />
                      <span>Highlight</span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default" className="text-sm">
                      Default
                    </SelectItem>
                    <div className="grid grid-cols-10 gap-1 p-2">
                      {colors.map((color) => (
                        <Button
                          key={color}
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 hover:bg-muted"
                          style={{ backgroundColor: color }}
                          onClick={() =>
                            editor
                              .chain()
                              .focus()
                              .toggleHighlight({ color })
                              .run()
                          }
                        />
                      ))}
                    </div>
                  </SelectContent>
                </Select>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 hover:bg-muted"
                      onClick={() =>
                        editor
                          .chain()
                          .focus()
                          .unsetAllMarks()
                          .clearNodes()
                          .run()
                      }
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Clear formatting</TooltipContent>
                </Tooltip>
              </div>

              <div className="flex items-center gap-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "h-8 w-8 p-0 hover:bg-muted",
                        editor.isActive({ textAlign: "left" }) && "bg-muted"
                      )}
                      onClick={() =>
                        editor.chain().focus().setTextAlign("left").run()
                      }
                    >
                      <AlignLeft className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Align left</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "h-8 w-8 p-0 hover:bg-muted",
                        editor.isActive({ textAlign: "center" }) && "bg-muted"
                      )}
                      onClick={() =>
                        editor.chain().focus().setTextAlign("center").run()
                      }
                    >
                      <AlignCenter className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Align center</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "h-8 w-8 p-0 hover:bg-muted",
                        editor.isActive({ textAlign: "right" }) && "bg-muted"
                      )}
                      onClick={() =>
                        editor.chain().focus().setTextAlign("right").run()
                      }
                    >
                      <AlignRight className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Align right</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "h-8 w-8 p-0 hover:bg-muted",
                        editor.isActive({ textAlign: "justify" }) && "bg-muted"
                      )}
                      onClick={() =>
                        editor.chain().focus().setTextAlign("justify").run()
                      }
                    >
                      <AlignJustify className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Justify</TooltipContent>
                </Tooltip>
              </div>

              <div className="flex items-center gap-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "h-8 w-8 p-0 hover:bg-muted",
                        editor.isActive("bulletList") && "bg-muted"
                      )}
                      onClick={() =>
                        editor.chain().focus().toggleBulletList().run()
                      }
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Bullet list</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "h-8 w-8 p-0 hover:bg-muted",
                        editor.isActive("orderedList") && "bg-muted"
                      )}
                      onClick={() =>
                        editor.chain().focus().toggleOrderedList().run()
                      }
                    >
                      <ListOrdered className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Numbered list</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 hover:bg-muted"
                      onClick={() =>
                        editor.chain().focus().sinkListItem("listItem").run()
                      }
                      disabled={!editor.can().sinkListItem("listItem")}
                    >
                      <Indent className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Indent</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 hover:bg-muted"
                      onClick={() =>
                        editor.chain().focus().liftListItem("listItem").run()
                      }
                      disabled={!editor.can().liftListItem("listItem")}
                    >
                      <Outdent className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Outdent</TooltipContent>
                </Tooltip>
              </div>

              <div className="flex items-center gap-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "h-8 w-8 p-0 hover:bg-muted",
                        editor.isActive("link") && "bg-muted"
                      )}
                      onClick={setLink}
                    >
                      <Link2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Insert link</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 hover:bg-muted"
                      onClick={addImage}
                    >
                      <ImageIcon className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Insert image</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "h-8 w-8 p-0 hover:bg-muted",
                        editor.isActive("codeBlock") && "bg-muted"
                      )}
                      onClick={() =>
                        editor.chain().focus().toggleCodeBlock().run()
                      }
                    >
                      <Code className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Code block</TooltipContent>
                </Tooltip>
              </div>
            </div>

            <div className="flex items-center gap-1 ml-auto">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-muted"
                    onClick={() => setZoom(Math.max(25, zoom - 25))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Zoom out</TooltipContent>
              </Tooltip>
              <div className="flex h-8 items-center gap-1 rounded-md border px-2 text-xs">
                <Search className="h-3 w-3" />
                <span>{zoom}%</span>
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-muted"
                    onClick={() => setZoom(Math.min(400, zoom + 25))}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Zoom in</TooltipContent>
              </Tooltip>
            </div>
          </div>
        )}

        <div className="flex-1">
          {showHtml ? (
            <textarea
              value={editor.getHTML()}
              onChange={(e) => editor.commands.setContent(e.target.value)}
              className="min-h-[300px] w-full resize-none border-0 bg-background p-4 font-mono text-sm focus:outline-none focus:ring-0 min-w-[-webkit-fill-available] "
              style={{ zoom: `${zoom}%` }}
            />
          ) : (
            <EditorContent
              editor={editor}
              className="min-h-[300px] min-w-[-webkit-fill-available]  w-full prose dark:prose-invert prose-sm sm:prose-base [&_.ProseMirror]:min-h-[300px] [&_.ProseMirror]:px-4 [&_.ProseMirror]:py-2 [&_.ProseMirror]:focus:outline-none [&_.ProseMirror]:focus:ring-0 [&_.ProseMirror]:border-0"
              style={{ zoom: `${zoom}%` }}
            />
          )}
        </div>

        <div className="flex items-center justify-between border-t px-4 py-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-file-code-2"
            >
              <path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4" />
              <polyline points="14 2 14 8 20 8" />
              <path d="m9 18 3-3-3-3" />
              <path d="m5 12-3 3 3 3" />
            </svg>
            <span>HTML supported</span>
          </div>
          <Button
            onClick={() => onUpdate?.(editor.getHTML())}
            className="bg-black text-white hover:bg-black/90"
          >
            Submit
          </Button>
        </div>
      </div>
    </TooltipProvider>
  );
}
