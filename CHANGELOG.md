# Change Log

All notable changes to the "project-colorizer" extension will be documented in this file.

## [1.0.0] - 2024-08-04

### Added
- **Automatic workspace colorization**: Automatically generates and applies a unique color to each workspace
- **Customizable UI elements**: Choose which VS Code UI elements to colorize:
  - Activity Bar (default: enabled)
  - Status Bar (default: enabled) 
  - Title Bar (default: enabled)
  - Side Bar, Panel, Editor Group Headers, Menu Bar, Minimap, Breadcrumb, Notifications (default: disabled)
- **Color management commands**:
  - `Project Colorizer: Regenerate Color` - Generate a new random color
  - `Project Colorizer: Show Current Color` - Display the current workspace color
  - `Project Colorizer: Set Custom Color` - Set a custom hex color
  - `Project Colorizer: Toggle Colorization On/Off` - Enable/disable colorization
- **Smart color generation**: Uses HSL color space for visually pleasing colors with good contrast
- **Workspace-scoped settings**: Colors are saved per workspace and don't affect global VS Code settings
- **Color validation**: Input validation for custom hex colors (#RGB and #RRGGBB formats)
- **Automatic contrast**: Automatically calculates contrasting colors for text readability

### Features
- Persistent color storage per workspace
- Real-time configuration changes
- Clean modular code architecture
- Comprehensive error handling and user feedback
- No global VS Code configuration pollution