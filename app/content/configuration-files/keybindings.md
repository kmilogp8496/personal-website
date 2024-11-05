---
title: Keybindings
description: Keybindings for VSCode / Cursor
---

```json
[
    {
        "key": "ctrl+enter",
        "command": "-github.copilot.generate",
        "when": "editorTextFocus && github.copilot.activated && !commentEditorFocused && !inInteractiveInput && !interactiveEditorFocused"
    },
    {
        "key": "shift+alt+down",
        "command": "editor.action.copyLinesDownAction",
        "when": "editorTextFocus && !editorReadonly"
    },
    {
        "key": "ctrl+shift+alt+down",
        "command": "-editor.action.copyLinesDownAction",
        "when": "editorTextFocus && !editorReadonly"
    },
    {
        "key": "shift+alt+up",
        "command": "editor.action.copyLinesUpAction",
        "when": "editorTextFocus && !editorReadonly"
    },
    {
        "key": "ctrl+shift+alt+up",
        "command": "-editor.action.copyLinesUpAction",
        "when": "editorTextFocus && !editorReadonly"
    },
    {
        "key": "shift+alt+f",
        "command": "editor.action.formatDocument",
        "when": "editorHasDocumentFormattingProvider && editorTextFocus && !editorReadonly && !inCompositeEditor"
    },
    {
        "key": "ctrl+shift+i",
        "command": "-editor.action.formatDocument",
        "when": "editorHasDocumentFormattingProvider && editorTextFocus && !editorReadonly && !inCompositeEditor"
    },
    {
        "key": "ctrl+n",
        "command": "explorer.newFile",
        "when": "filesExplorerFocus"
    },
    {
        "key": "ctrl+m ctrl+shift+l",
        "command": "addCursorsAtSearchResults",
        "when": "fileMatchOrMatchFocus && searchViewletVisible"
    },
    {
        "key": "ctrl+shift+l",
        "command": "-addCursorsAtSearchResults",
        "when": "fileMatchOrMatchFocus && searchViewletVisible"
    },
    {
        "key": "ctrl+m ctrl+shift+l",
        "command": "aichat.insertselectionintochat"
    },
    {
        "key": "ctrl+shift+l",
        "command": "-aichat.insertselectionintochat"
    },
    {
        "key": "ctrl+m `",
        "command": "extension.selectBackTick",
        "when": "editorFocus"
    },
    {
        "key": "ctrl+k `",
        "command": "-extension.selectBackTick",
        "when": "editorFocus"
    },
    {
        "key": "ctrl+m shift+[",
        "command": "extension.selectCurlyBrackets",
        "when": "editorFocus"
    },
    {
        "key": "ctrl+k shift+[",
        "command": "-extension.selectCurlyBrackets",
        "when": "editorFocus"
    },
    {
        "key": "ctrl+m shift+'",
        "command": "extension.selectDoubleQuote",
        "when": "editorFocus"
    },
    {
        "key": "ctrl+k shift+'",
        "command": "-extension.selectDoubleQuote",
        "when": "editorFocus"
    },
    {
        "key": "ctrl+m ;",
        "command": "extension.selectEitherQuote",
        "when": "editorFocus"
    },
    {
        "key": "ctrl+k ;",
        "command": "-extension.selectEitherQuote",
        "when": "editorFocus"
    },
    {
        "key": "ctrl+m shift+9",
        "command": "extension.selectParenthesis",
        "when": "editorFocus"
    },
    {
        "key": "ctrl+k shift+9",
        "command": "-extension.selectParenthesis",
        "when": "editorFocus"
    },
    {
        "key": "ctrl+m '",
        "command": "extension.selectSingleQuote",
        "when": "editorFocus"
    },
    {
        "key": "ctrl+k '",
        "command": "-extension.selectSingleQuote",
        "when": "editorFocus"
    },
    {
        "key": "ctrl+m [",
        "command": "extension.selectSquareBrackets",
        "when": "editorFocus"
    },
    {
        "key": "ctrl+k [",
        "command": "-extension.selectSquareBrackets",
        "when": "editorFocus"
    },
    {
        "key": "ctrl+m shift+,",
        "command": "extension.selectAngleBrackets",
        "when": "editorFocus"
    },
    {
        "key": "ctrl+k [IntlBackslash]",
        "command": "-extension.selectAngleBrackets",
        "when": "editorFocus"
    },
    {
        "key": "ctrl+m shift+]",
        "command": "extension.selectCurlyBracketsOuter",
        "when": "editorFocus"
    },
    {
        "key": "ctrl+k shift+]",
        "command": "-extension.selectCurlyBracketsOuter",
        "when": "editorFocus"
    },
    {
        "key": "ctrl+m shift+0",
        "command": "extension.selectParenthesisOuter",
        "when": "editorFocus"
    },
    {
        "key": "ctrl+k shift+0",
        "command": "-extension.selectParenthesisOuter",
        "when": "editorFocus"
    },
    {
        "key": "ctrl+m shift+]",
        "command": "extension.selectSquareBracketsOuter",
        "when": "editorFocus"
    },
    {
        "key": "ctrl+k ]",
        "command": "-extension.selectSquareBracketsOuter",
        "when": "editorFocus"
    }
]
```
