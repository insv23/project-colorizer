export interface ColorMapping {
	[key: string]: string;
}

export interface ElementColorMappings {
	[element: string]: ColorMapping;
}

export const COLOR_MAPPINGS: ElementColorMappings = {
	activityBar: {
		'activityBar.background': 'primary',
		'activityBar.foreground': 'contrast',
		'activityBarBadge.background': 'contrast',
		'activityBarBadge.foreground': 'primary'
	},
	statusBar: {
		'statusBar.background': 'primary',
		'statusBar.foreground': 'contrast',
		'statusBarItem.hoverBackground': 'hover'
	},
	titleBar: {
		'titleBar.activeBackground': 'primary',
		'titleBar.activeForeground': 'contrast',
		'titleBar.inactiveBackground': 'primaryDim',
		'titleBar.inactiveForeground': 'contrastDim'
	},
	sideBar: {
		'sideBar.background': 'primaryLight',
		'sideBarTitle.foreground': 'contrast',
		'sideBarSectionHeader.background': 'primary'
	},
	panel: {
		'panel.background': 'primaryLight',
		'panel.border': 'primary',
		'panelTitle.activeForeground': 'contrast',
		'panelTitle.activeBorder': 'primary'
	},
	editorGroupHeader: {
		'editorGroupHeader.tabsBackground': 'primaryLight',
		'tab.activeBackground': 'primary',
		'tab.activeForeground': 'contrast',
		'tab.activeBorderTop': 'contrast'
	},
	menuBar: {
		'menubar.selectionBackground': 'primary',
		'menubar.selectionForeground': 'contrast',
		'menu.background': 'primaryLight'
	},
	minimap: {
		'minimap.background': 'primaryLight',
		'minimapGutter.addedBackground': 'primary',
		'minimapGutter.modifiedBackground': 'primary'
	},
	breadcrumb: {
		'breadcrumb.background': 'primaryLight',
		'breadcrumb.foreground': 'contrast',
		'breadcrumb.focusForeground': 'primary'
	},
	notifications: {
		'notificationToast.border': 'primary',
		'notifications.background': 'primaryLight',
		'notifications.foreground': 'contrast'
	}
};