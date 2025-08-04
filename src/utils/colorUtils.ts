export interface HSL {
	h: number;
	s: number;
	l: number;
}

export interface ColorVariations {
	primary: string;
	contrast: string;
	primaryLight: string;
	primaryDim: string;
	contrastDim: string;
	hover: string;
}

export function generateRandomHSLColor(): string {
	const hue = Math.floor(Math.random() * 360);
	const saturation = 45 + Math.floor(Math.random() * 31);
	const lightness = 40 + Math.floor(Math.random() * 21);
	return hslToHex(hue, saturation, lightness);
}

export function hslToHex(h: number, s: number, l: number): string {
	const sDec = s / 100;
	const lDec = l / 100;
	
	const c = (1 - Math.abs(2 * lDec - 1)) * sDec;
	const x = c * (1 - Math.abs((h / 60) % 2 - 1));
	const m = lDec - c / 2;
	
	let r = 0;
	let g = 0;
	let b = 0;
	
	if (h >= 0 && h < 60) {
		r = c; g = x; b = 0;
	} else if (h >= 60 && h < 120) {
		r = x; g = c; b = 0;
	} else if (h >= 120 && h < 180) {
		r = 0; g = c; b = x;
	} else if (h >= 180 && h < 240) {
		r = 0; g = x; b = c;
	} else if (h >= 240 && h < 300) {
		r = x; g = 0; b = c;
	} else if (h >= 300 && h < 360) {
		r = c; g = 0; b = x;
	}
	
	r = Math.round((r + m) * 255);
	g = Math.round((g + m) * 255);
	b = Math.round((b + m) * 255);
	
	const toHex = (n: number) => n.toString(16).padStart(2, '0');
	return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function rgbToHsl(r: number, g: number, b: number): HSL {
	const rNorm = r / 255;
	const gNorm = g / 255;
	const bNorm = b / 255;
	
	const max = Math.max(rNorm, gNorm, bNorm);
	const min = Math.min(rNorm, gNorm, bNorm);
	let h = 0;
	let s = 0;
	const l = (max + min) / 2;
	
	if (max !== min) {
		const d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		
		switch (max) {
			case rNorm: h = ((gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0)) / 6; break;
			case gNorm: h = ((bNorm - rNorm) / d + 2) / 6; break;
			case bNorm: h = ((rNorm - gNorm) / d + 4) / 6; break;
		}
	}
	
	return {
		h: Math.round(h * 360),
		s: Math.round(s * 100),
		l: Math.round(l * 100)
	};
}

export function getContrastColor(hexColor: string): string {
	const hex = hexColor.replace('#', '');
	
	const r = Number.parseInt(hex.substring(0, 2), 16);
	const g = Number.parseInt(hex.substring(2, 4), 16);
	const b = Number.parseInt(hex.substring(4, 6), 16);
	
	const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
	
	return luminance > 0.5 ? '#000000' : '#FFFFFF';
}

export function adjustAlpha(hexColor: string, alpha: number): string {
	const hex = hexColor.replace('#', '');
	const alphaHex = Math.round(alpha * 255).toString(16).padStart(2, '0');
	return `#${hex}${alphaHex}`;
}

export function generateColorVariations(baseColor: string): ColorVariations {
	const hex = baseColor.replace('#', '');
	const r = Number.parseInt(hex.substring(0, 2), 16);
	const g = Number.parseInt(hex.substring(2, 4), 16);
	const b = Number.parseInt(hex.substring(4, 6), 16);
	
	const hsl = rgbToHsl(r, g, b);
	
	return {
		'primary': baseColor,
		'contrast': getContrastColor(baseColor),
		'primaryLight': hslToHex(hsl.h, hsl.s * 0.7, Math.min(hsl.l * 1.2, 85)),
		'primaryDim': hslToHex(hsl.h, hsl.s * 0.8, hsl.l * 0.8),
		'contrastDim': adjustAlpha(getContrastColor(baseColor), 0.7),
		'hover': hslToHex(hsl.h, hsl.s, Math.min(hsl.l * 1.1, 70))
	};
}

export function validateAndNormalizeColor(color: string): string | null {
	const trimmedColor = color.trim();
	
	if (!trimmedColor.startsWith('#')) {
		return null;
	}
	
	const hex = trimmedColor.substring(1);
	
	if (!/^[0-9A-Fa-f]+$/.test(hex)) {
		return null;
	}
	
	if (hex.length === 3) {
		const r = hex[0];
		const g = hex[1];
		const b = hex[2];
		return `#${r}${r}${g}${g}${b}${b}`.toLowerCase();
	} 
	if (hex.length === 6) {
		return `#${hex}`.toLowerCase();
	} 
	return null;
}