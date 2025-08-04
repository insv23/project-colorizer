import * as vscode from 'vscode';
import type { ColorService } from '../services/colorService';
import { validateAndNormalizeColor } from '../utils/colorUtils';

export class CommandManager {
	private colorService: ColorService;

	constructor(colorService: ColorService) {
		this.colorService = colorService;
	}

	public registerCommands(context: vscode.ExtensionContext): void {
		context.subscriptions.push(
			vscode.commands.registerCommand('project-colorizer.regenerateColor', () => this.regenerateColor()),
			vscode.commands.registerCommand('project-colorizer.showColor', () => this.showColor()),
			vscode.commands.registerCommand('project-colorizer.setColor', () => this.setColor()),
			vscode.commands.registerCommand('project-colorizer.toggleColorization', () => this.toggleColorization())
		);
	}

	private regenerateColor(): void {
		const isEnabled = vscode.workspace.getConfiguration().get<boolean>('projectColorizer.enabled', true);
		if (!isEnabled) {
			vscode.window.showWarningMessage('Project Colorizer is currently disabled for this workspace. Enable it first.');
			return;
		}
		this.colorService.generateAndApplyNewColor();
	}

	private showColor(): void {
		const currentColor = vscode.workspace.getConfiguration().get<string>('projectColorizer.workspaceColor');
		vscode.window.showInformationMessage(`Current workspace color: ${currentColor || 'Not set'}`);
	}

	private async setColor(): Promise<void> {
		const currentColor = vscode.workspace.getConfiguration().get<string>('projectColorizer.workspaceColor') || '#000000';
		
		const input = await vscode.window.showInputBox({
			prompt: 'Enter a hex color (e.g., #ff6b6b or #f66)',
			placeHolder: '#RRGGBB or #RGB',
			value: currentColor,
			validateInput: (value) => {
				const trimmed = value.trim();
				if (!trimmed) {
					return 'Please enter a color value';
				}
				const validated = validateAndNormalizeColor(trimmed);
				if (!validated) {
					return 'Invalid color format. Use #RGB or #RRGGBB';
				}
				return null;
			}
		});

		if (input) {
			const normalizedColor = validateAndNormalizeColor(input);
			if (normalizedColor) {
				const config = vscode.workspace.getConfiguration();
				config.update('projectColorizer.workspaceColor', normalizedColor, vscode.ConfigurationTarget.Workspace)
					.then(() => {
						this.colorService.applyWorkspaceColor(normalizedColor);
						vscode.window.showInformationMessage(`🎨 Color set to: ${normalizedColor}`);
					}, (error) => {
						vscode.window.showErrorMessage(`Failed to set color: ${error.message}`);
					});
			}
		}
	}

	private async toggleColorization(): Promise<void> {
		const config = vscode.workspace.getConfiguration();
		const currentEnabled = config.get<boolean>('projectColorizer.enabled', true);
		const newEnabled = !currentEnabled;
		
		await config.update('projectColorizer.enabled', newEnabled, vscode.ConfigurationTarget.Workspace);
		
		if (newEnabled) {
			const currentColor = config.get<string>('projectColorizer.workspaceColor');
			if (currentColor) {
				this.colorService.applyWorkspaceColor(currentColor);
			} else {
				this.colorService.generateAndApplyNewColor();
			}
			vscode.window.showInformationMessage('🎨 Project Colorizer enabled for this workspace');
		} else {
			await this.colorService.clearColors();
			vscode.window.showInformationMessage('⚪ Project Colorizer disabled for this workspace');
		}
	}
}