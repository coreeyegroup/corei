import Editor from "@monaco-editor/react";

import type { MonacoEditorContract } from "../contracts/editor-contract";
import { COREI_MONACO_THEME } from "../theme/editor-theme";

export function MonacoEditor(props: MonacoEditorContract) {
    return (
        <Editor
            height="100%"
            defaultLanguage={props.language}
            value={props.value}
            theme={COREI_MONACO_THEME}
            options={{
                readOnly: props.readOnly ?? false,
                minimap: {
                    enabled: false
                },
                automaticLayout: true
            }}
            onChange={(value) => {
                props.onChange?.(value ?? "");
            }}
        />
    );
}
