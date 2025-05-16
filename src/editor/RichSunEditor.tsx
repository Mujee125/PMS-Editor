

import React, { useRef, useState, useEffect, useCallback } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";
import plugins from "suneditor/src/plugins";
import SunEditor from "suneditor-react";
import SunEditorCore from "suneditor/src/lib/core";
import "suneditor/dist/css/suneditor.min.css";
import { EditorContentEntity } from "../subMenus/types";
import SaveModal from "./SaveModal";

interface RichSunEditorProps {
  content?: string; // Content for editing
  contentName?: string; // Name of the content for editing
  saveContentToDatabase: (contents: EditorContentEntity) => Promise<void>;
  onCancel: () => void;
}

const RichSunEditor: React.FC<RichSunEditorProps> = ({
  content = "",
  contentName = "",
  saveContentToDatabase,
  onCancel,
}) => {
  const editor = useRef<SunEditorCore>();
  const [showModal, setShowModal] = useState(false);
  const [editorContent, setEditorContent] = useState(content);

  // Update editor content when the `content` prop changes
  useEffect(() => {
    setEditorContent(content);
  }, [content]);

  // Get the SunEditor instance
  const getSunEditorInstance = useCallback((sunEditor: SunEditorCore) => {
    editor.current = sunEditor;
  }, []);

  // Handle save button click
  const handleSave = useCallback(
    async (contents: string, isChanged: boolean) => {
      setShowModal(true);
    },
    []
  );

  // Handle saving content with a name
  const handleSaveWithName = useCallback(
    (name: string) => {
      const editorContent = editor.current?.getContents(true);
      if (name) {
        saveContentToDatabase({
          contentName: name,
          editorContent: editorContent || "",
        } as EditorContentEntity);
      } else {
        console.log("Save cancelled. No name provided.");
      }
    },
    [saveContentToDatabase]
  );

  // Fetch existing content name for editing
  const fetchExistingName = useCallback(async () => {
    return contentName || "";
  }, [contentName]);

  return (
    <div className="entityDiv">
      <div className="entitySubDiv max-w-full">
        <SunEditor
          autoFocus={true}
          getSunEditorInstance={getSunEditorInstance}
          setOptions={{
            plugins: plugins,
            buttonList: [
              ["undo", "redo"],
              ["font", "fontSize", "formatBlock"],
              ["paragraphStyle", "blockquote"],
              [
                "bold",
                "underline",
                "italic",
                "strike",
                "subscript",
                "superscript",
              ],
              ["fontColor", "hiliteColor", "textStyle"],
              ["removeFormat"],
              ["outdent", "indent"],
              ["align", "horizontalRule", "list", "lineHeight"],
              ["table", "link", "image", "math"],
              ["fullScreen", "preview", "save"],
            ],
            katex: katex,
            callBackSave: handleSave,
          }}
          setDefaultStyle="height:62vh; font-family: Arial; font-size: 16px; color: black;"
          setContents={editorContent}
        />

        {showModal && (
          <SaveModal
            onSave={handleSaveWithName}
            onClose={() => setShowModal(false)}
            fetchExistingName={fetchExistingName}
            onCancel={onCancel}
          />
        )}
      </div>
    </div>
  );
};

export default React.memo(RichSunEditor);