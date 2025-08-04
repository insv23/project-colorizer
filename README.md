# Project Colorizer

Instantly distinguish your projects with unique, randomly generated colors for each workspace. No more confusion when working with multiple VS Code windows!

## Features

- 🎨 **Automatic Color Assignment**: Each workspace gets a unique color automatically
- 🎲 **Smart Random Colors**: Uses HSL color space (H: 0-360°, S: 45-75%, L: 40-60%) for pleasant, readable colors
- 💾 **Persistent Colors**: Colors are saved in workspace settings and persist across sessions
- 🎯 **Customizable Elements**: Choose which UI elements to colorize
- 🔄 **Regenerate on Demand**: Change colors anytime with a simple command
- ⚡ **Real-time Updates**: Configuration changes apply immediately

## Supported UI Elements

You can enable/disable coloring for each UI element:

- **Activity Bar** - Left sidebar with icons (default: enabled)
- **Status Bar** - Bottom bar (default: enabled)
- **Title Bar** - Top window bar (default: enabled)
- **Side Bar** - File explorer, search, etc. (default: disabled)
- **Panel** - Terminal, output, problems (default: disabled)
- **Editor Group Headers** - Tab area (default: disabled)
- **Menu Bar** - File, Edit, View... (default: disabled)
- **Minimap** - Minimap border (default: disabled)
- **Breadcrumb** - Navigation bar (default: disabled)
- **Notifications** - Notification toasts (default: disabled)

## Commands

- `Project Colorizer: Regenerate Color` - Generate a new random color for the current workspace
- `Project Colorizer: Show Current Color` - Display the current workspace color
- `Project Colorizer: Set Custom Color` - Set a custom color using a hex value
- `Project Colorizer: Toggle Colorization On/Off` - Enable or disable all colorization for the current workspace

## Configuration

### Enable/Disable UI Elements

Go to Settings and search for "Project Colorizer" to customize which elements should be colored. Each element has its own checkbox in the settings UI:

- `projectColorizer.enable.activityBar` - Activity Bar (default: true)
- `projectColorizer.enable.statusBar` - Status Bar (default: true)
- `projectColorizer.enable.titleBar` - Title Bar (default: true)
- `projectColorizer.enable.sideBar` - Side Bar (default: false)
- `projectColorizer.enable.panel` - Panel (default: false)
- `projectColorizer.enable.editorGroupHeader` - Editor Tabs (default: false)
- `projectColorizer.enable.menuBar` - Menu Bar (default: false)
- `projectColorizer.enable.minimap` - Minimap (default: false)
- `projectColorizer.enable.breadcrumb` - Breadcrumb (default: false)
- `projectColorizer.enable.notifications` - Notifications (default: false)

### Workspace Color

The generated color is automatically saved in your workspace settings:

```json
{
  "projectColorizer.workspaceColor": "#4a7c9e"
}
```

## How It Works

1. When you open a workspace, Project Colorizer checks if a color is already assigned
2. If not, it generates a new random color using the HSL color space
3. The color is applied to the enabled UI elements with automatic contrast adjustments
4. The color is saved in `.vscode/settings.json` for persistence

## Color Variations

The extension automatically generates several color variations from your base color:

- **Primary**: The main generated color
- **Contrast**: Black or white, depending on luminance
- **Primary Light**: A lighter version for backgrounds
- **Primary Dim**: A dimmed version for inactive states
- **Hover**: A slightly brighter version for hover states

## Requirements

- VS Code version 1.74.0 or higher
- A workspace/folder must be open (not just individual files)

## Known Issues

- Colors only apply to workspace windows, not to windows with just individual files open
- Some UI elements may require a window reload if VS Code doesn't update them immediately

## Release Notes

### 1.0.0

- Initial release with automatic color generation
- Support for 10 customizable UI elements
- HSL-based color generation for better aesthetics
- Real-time configuration updates
- Persistent color storage in workspace settings

---

**Enjoy your colorful workspaces!** 🌈