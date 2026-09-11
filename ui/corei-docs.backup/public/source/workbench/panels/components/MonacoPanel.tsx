/**
 * Monaco Editor Panel
 */
import React, { useState } from 'react';
import { MonacoEditor } from '../../../foundation/editor/components/MonacoEditor';

export function MonacoPanel() {
    const [code] = useState('// Welcome to the COREI Editor\nconsole.log("Hello, world!");');
    const [language] = useState('javascript');

    return (
        <div style={{ width: '100%', height: '100%', background: '#1e1e1e' }}>
            <MonacoEditor value={code} language={language} />
        </div>
    );
}
