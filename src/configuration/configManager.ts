import * as vscode from 'vscode';
import type { ColorService } from '../services/colorService';

export class ConfigurationManager {
	private colorService: ColorService;

	constructor(colorService: ColorService) {
		this.colorService = colorService;
	}

	public initializeConfiguration(): void {
		if (!vscode.workspace.workspaceFolders || vscode.workspace.workspaceFolders.length === 0) {
			vscode.window.showWarningMessage('Project Colorizer: No workspace folder detected. Open a folder to see colors!');
			return;
		}

		const config = vscode.workspace.getConfiguration();
		const isEnabled = config.get<boolean>('projectColorizer.enabled', true);
		const existingColor = config.get<string>('projectColorizer.workspaceColor');

		if (isEnabled) {
			if (existingColor) {
				this.colorService.applyWorkspaceColor(existingColor);
			} else {
				this.colorService.generateAndApplyNewColor();
			}
		}
	}

	public setupConfigurationListener(context: vscode.ExtensionContext): void {
		const configChangeListener = vscode.workspace.onDidChangeConfiguration(e => {
			if (e.affectsConfiguration('projectColorizer.enabled')) {
				this.handleEnabledChange();
			}
			
			if (e.affectsConfiguration('projectColorizer.enable')) {
				this.handleElementEnableChange();
			}
			
			if (e.affectsConfiguration('projectColorizer.workspaceColor')) {
				this.handleColorChange();
			}
		});

		context.subscriptions.push(configChangeListener);
	}

	private handleEnabledChange(): void {
		const config = vscode.workspace.getConfiguration();
		const isEnabled = config.get<boolean>('projectColorizer.enabled', true);
		const currentColor = config.get<string>('projectColorizer.workspaceColor');
		
		if (isEnabled && currentColor) {
			this.colorService.applyWorkspaceColor(currentColor);
		} else if (!isEnabled) {
			this.colorService.clearColors();
		}
	}

	private handleElementEnableChange(): void {
		const isMainEnabled = vscode.workspace.getConfiguration().get<boolean>('projectColorizer.enabled', true);
		const currentColor = vscode.workspace.getConfiguration().get<string>('projectColorizer.workspaceColor');
		if (isMainEnabled && currentColor) {
			this.colorService.applyWorkspaceColor(currentColor);
		}
	}

	private handleColorChange(): void {
		const newColor = vscode.workspace.getConfiguration().get<string>('projectColorizer.workspaceColor');
		if (newColor) {
			this.colorService.validateAndUpdateColor(newColor);
		}
	}
}