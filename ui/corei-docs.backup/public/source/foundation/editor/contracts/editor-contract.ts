export interface MonacoEditorContract {
    value: string;
    language: string;
    readOnly?: boolean;
    onChange?(value: string): void;
}
