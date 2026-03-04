import { Notice, Plugin, TFile } from "obsidian";
import {
	DailyTasksSettings,
	DailyTasksSettingTab,
	DEFAULT_SETTINGS,
} from "./settings";

export default class DailyTasksPlugin extends Plugin {
	settings: DailyTasksSettings = DEFAULT_SETTINGS;

	async onload() {
		try {
			await this.loadSettings();

			// Icono en la barra lateral (list-checks es un icono Lucide universal)
			this.addRibbonIcon(
				"list-checks",
				"Open today's tasks",
				() => {
					this.openTodayTasks().catch((err) => {
						console.error("Daily Tasks:", err);
						new Notice("Error: " + err.message);
					});
				}
			);

			// Comando para el command palette
			this.addCommand({
				id: "open-today-tasks",
				name: "Open today's tasks",
				callback: () => {
					this.openTodayTasks().catch((err) => {
						console.error("Daily Tasks:", err);
						new Notice("Error: " + err.message);
					});
				},
			});

			// Comando para agregar una tarea rápida
			this.addCommand({
				id: "add-task",
				name: "Add task",
				callback: () => {
					this.addTask().catch((err) => {
						console.error("Daily Tasks:", err);
						new Notice("Error: " + err.message);
					});
				},
			});

			this.addSettingTab(new DailyTasksSettingTab(this.app, this));
		} catch (err) {
			console.error("Daily Tasks failed to load:", err);
		}
	}

	async openTodayTasks(): Promise<TFile> {
		const file = await this.ensureTodayFile();
		var leaf = this.app.workspace.getLeaf(false);
		await leaf.openFile(file);
		return file;
	}

	async addTask(): Promise<void> {
		const file = await this.ensureTodayFile();
		var content = await this.app.vault.read(file);
		await this.app.vault.modify(file, content + "\n- [ ] ");

		var leaf = this.app.workspace.getLeaf(false);
		await leaf.openFile(file);
	}

	private async ensureTodayFile(): Promise<TFile> {
		var m = (window as any).moment;
		if (!m) {
			throw new Error("moment not available");
		}
		var today = m();
		var fileName = today.format(this.settings.dateFormat);
		var folder = this.settings.folder.replace(/\/+$/, "");
		var path = folder + "/" + fileName + ".md";

		// If file exists, return it
		var existing = this.app.vault.getAbstractFileByPath(path);
		if (existing instanceof TFile) {
			return existing;
		}

		// Create folder if needed
		try {
			var folderNode =
				this.app.vault.getAbstractFileByPath(folder);
			if (!folderNode) {
				await this.app.vault.createFolder(folder);
			}
		} catch (_e) {
			// Folder already exists
		}

		// Apply template
		var templateContent = this.settings.template
			.replace(/\{\{date\}\}/g, fileName)
			.replace(
				/\{\{today\}\}/g,
				today.format("DD [de] MMMM [de] YYYY")
			);

		var file = await this.app.vault.create(path, templateContent);
		new Notice("Tasks created: " + fileName);
		return file;
	}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
