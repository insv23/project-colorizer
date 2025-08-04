import * as vscode from 'vscode';
import { COLOR_MAPPINGS } from '../constants/colorMappings';
import { generateColorVariations, generateRandomHSLColor, validateAndNormalizeColor } from '../utils/colorUtils';

export class ColorService {
	public generateAndApplyNewColor(): void {
		const newColor = generateRandomHSLColor();
		const config = vscode.workspace.getConfiguration();
		config.update('projectColorizer.workspaceColor', newColor, vscode.ConfigurationTarget.Workspace)
			.then(() => {
				this.applyWorkspaceColor(newColor);
				vscode.window.showInformationMessage(`🎨 New color generated: ${newColor}`);
			}, (error) => {
				vscode.window.showErrorMessage(`Failed to save color: ${error.message}`);
			});
	}

	public applyWorkspaceColor(color: string): void {
		const isEnabled = vscode.workspace.getConfiguration().get<boolean>('projectColorizer.enabled', true);
		if (!isEnabled) {
			return;
		}
		
		const config = vscode.workspace.getConfiguration('projectColorizer.enable');
		const colors = generateColorVariations(color);
		const colorCustomizations: Record<string, string> = {};
		
		for (const element of Object.keys(COLOR_MAPPINGS)) {
			const enabled = config.get<boolean>(element, false);
			if (enabled && COLOR_MAPPINGS[element]) {
				const mappings = COLOR_MAPPINGS[element];
				for (const [vscodeProperty, colorType] of Object.entries(mappings)) {
					colorCustomizations[vscodeProperty] = colors[colorType as keyof typeof colors];
				}
			}
		}
		
		const workbenchConfig = vscode.workspace.getConfiguration();
		workbenchConfig.update('workbench.colorCustomizations', colorCustomizations, vscode.ConfigurationTarget.Workspace)
			.then(() => {
				// Color applied successfully
			}, (error) => {
				vscode.window.showErrorMessage(`Failed to apply colors: ${error.message}`);
			});
	}

	public clearColors(): Thenable<void> {
		return vscode.workspace.getConfiguration().update('workbench.colorCustomizations', {}, vscode.ConfigurationTarget.Workspace);
	}

	public validateAndUpdateColor(newColor: string): void {
		const validatedColor = validateAndNormalizeColor(newColor);
		if (validatedColor) {
			this.applyWorkspaceColor(validatedColor);
			if (validatedColor !== newColor) {
				vscode.workspace.getConfiguration().update('projectColorizer.workspaceColor', validatedColor, vscode.ConfigurationTarget.Workspace);
			}
		} else {
			vscode.window.showErrorMessage(`Invalid color format: ${newColor}. Please use hex format (#RGB or #RRGGBB)`);
			const currentCustomizations = vscode.workspace.getConfiguration().get<Record<string, string>>('workbench.colorCustomizations');
			if (currentCustomizations?.['activityBar.background']) {
				const previousColor = currentCustomizations['activityBar.background'];
				vscode.workspace.getConfiguration().update('projectColorizer.workspaceColor', previousColor, vscode.ConfigurationTarget.Workspace);
			}
		}
	}
}