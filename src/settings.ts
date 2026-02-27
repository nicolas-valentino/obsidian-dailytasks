import { App, PluginSettingTab, Setting } from "obsidian";
import type DailyTasksPlugin from "./main";

export interface DailyTasksSettings {
	folder: string;
	dateFormat: string;
	template: string;
}

export const DEFAULT_SETTINGS: DailyTasksSettings = {
	folder: "tasks",
	dateFormat: "YYYY-MM-DD",
	template: "# Tareas - {{date}}\n\n- [ ] ",
};

export class DailyTasksSettingTab extends PluginSettingTab {
	plugin: DailyTasksPlugin;

	constructor(app: App, plugin: DailyTasksPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		new Setting(containerEl)
			.setName("Carpeta de tareas")
			.setDesc("Carpeta donde se guardan las notas de tareas diarias.")
			.addText((text) =>
				text
					.setPlaceholder("tasks")
					.setValue(this.plugin.settings.folder)
					.onChange(async (value) => {
						this.plugin.settings.folder = value.trim() || "tasks";
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("Formato de fecha")
			.setDesc(
				"Formato para el nombre del archivo. Usa moment.js (ej: YYYY-MM-DD)."
			)
			.addText((text) =>
				text
					.setPlaceholder("YYYY-MM-DD")
					.setValue(this.plugin.settings.dateFormat)
					.onChange(async (value) => {
						this.plugin.settings.dateFormat =
							value.trim() || "YYYY-MM-DD";
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("Template")
			.setDesc(
				"Contenido inicial de la nota. Usa {{date}} para la fecha y {{today}} para la fecha formateada."
			)
			.addTextArea((text) => {
				text.inputEl.rows = 6;
				text.inputEl.cols = 40;
				text
					.setPlaceholder(DEFAULT_SETTINGS.template)
					.setValue(this.plugin.settings.template)
					.onChange(async (value) => {
						this.plugin.settings.template =
							value || DEFAULT_SETTINGS.template;
						await this.plugin.saveSettings();
					});
			});
	}
}
