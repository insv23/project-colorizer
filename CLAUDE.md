# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Build and Compile
- `npm run compile` - Compile TypeScript to JavaScript
- `npm run watch` - Watch mode for continuous compilation during development

### Linting and Code Quality
- `npm run lint` - Run ESLint on all source files

### Testing
- `npm run test` - Run all extension tests
- `npm run pretest` - Compile and lint before testing

### Debugging
- Open VS Code and press `F5` to launch the extension in a new Extension Development Host window
- Set breakpoints in `src/extension.ts` or other TypeScript files
- The debugger will attach automatically due to source maps

## Architecture Overview

This is a VS Code extension that aims to colorize workspaces with unique colors. The extension follows the standard VS Code extension architecture:

### Entry Point
- `src/extension.ts` - Main extension file containing `activate()` and `deactivate()` functions
- The compiled output goes to `out/extension.js` which is the actual entry point defined in package.json

### Extension Manifest
- `package.json` - Defines extension metadata, commands, activation events, and dependencies
- Currently defines one command: `project-colorizer.helloWorld` (placeholder)

### Key Technical Details
- **TypeScript**: Target ES2022, Module Node16, strict mode enabled
- **VS Code API**: Minimum version 1.102.0
- **Testing**: Uses Mocha framework with VS Code test runner
- **Linting**: ESLint with TypeScript support, enforces semicolons and naming conventions

### Current State
The extension is in initial template state with a "Hello World" command. The core colorization functionality needs to be implemented.

## Implementation Notes

When implementing the workspace colorization feature:
1. The extension will likely need to use `vscode.workspace.getConfiguration()` to access workspace settings
2. Color customization should be done via `workbench.colorCustomizations` in workspace settings
3. Consider using the `onDidOpenTextDocument` or workspace activation events
4. Store color assignments persistently, possibly using VS Code's workspace state API

## Testing Strategy

Tests are located in `src/test/` and use the Mocha framework. When adding new functionality:
1. Create test files following the pattern `*.test.ts`
2. Use the VS Code test API for integration testing
3. Run tests with `npm run test` or through VS Code's test runner

## Publishing Preparation

Before publishing:
1. Update `README.md` with actual extension features and usage
2. Update `CHANGELOG.md` with release notes
3. Run `npm run vscode:prepublish` to ensure clean compilation
4. Update version in `package.json`
5. Remove the "Hello World" command and implement actual functionality