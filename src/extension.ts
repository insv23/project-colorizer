import type * as vscode from 'vscode';
import { ColorService } from './services/colorService';
import { CommandManager } from './commands';
import { ConfigurationManager } from './configuration/configManager';

export function activate(context: vscode.ExtensionContext) {
	const colorService = new ColorService();
	const commandManager = new CommandManager(colorService);
	const configManager = new ConfigurationManager(colorService);

	configManager.initializeConfiguration();
	commandManager.registerCommands(context);
	configManager.setupConfigurationListener(context);
}

export function deactivate() {}