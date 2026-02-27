import { Notice, Plugin, TFile, moment } from "obsidian";
import {
	DailyTasksSettings,
	DailyTasksSettingTab,
	DEFAULT_SETTINGS,
} from "./settings";

export default class DailyTasksPlugin extends Plugin {
	settings: DailyTasksSettings = DEFAULT_SETTINGS;

	async onload() {
		await this.loadSettings();

		// Icono en la barra lateral
		this.addRibbonIcon("check-square", "Abrir tareas de hoy", () => {
			this.openTodayTasks();
		});

		// Comando para el command palette
		this.addCommand({
			id: "open-today-tasks",
			name: "Abrir tareas de hoy",
			callback: () => this.openTodayTasks(),
		});

		// Comando para agregar una tarea rápida
		this.addCommand({
			id: "add-task",
			name: "Agregar tarea",
			callback: () => this.addTask(),
		});

		this.addSettingTab(new DailyTasksSettingTab(this.app, this));
	}

	async openTodayTasks(): Promise<TFile> {
		const file = await this.ensureTodayFile();
		const leaf = this.app.workspace.getLeaf(false);
		await leaf.openFile(file);

		// Mover cursor al final del archivo
		const editor = this.app.workspace.activeEditor?.editor;
		if (editor) {
			const lastLine = editor.lastLine();
			const lastCh = editor.getLine(lastLine).length;
			editor.setCursor({ line: lastLine, ch: lastCh });
		}

		return file;
	}

	async addTask(): Promise<void> {
		const file = await this.ensureTodayFile();
		const content = await this.app.vault.read(file);
		await this.app.vault.modify(file, content + "\n- [ ] ");

		// Abrir el archivo y mover al final
		const leaf = this.app.workspace.getLeaf(false);
		await leaf.openFile(file);

		const editor = this.app.workspace.activeEditor?.editor;
		if (editor) {
			const lastLine = editor.lastLine();
			const lastCh = editor.getLine(lastLine).length;
			editor.setCursor({ line: lastLine, ch: lastCh });
		}
	}

	private async ensureTodayFile(): Promise<TFile> {
		const today = moment();
		const fileName = today.format(this.settings.dateFormat);
		const path = `${this.settings.folder}/${fileName}.md`;

		const existing = this.app.vault.getAbstractFileByPath(path);
		if (existing instanceof TFile) {
			return existing;
		}

		// Crear carpeta si no existe
		const folderExists = this.app.vault.getAbstractFileByPath(
			this.settings.folder
		);
		if (!folderExists) {
			await this.app.vault.createFolder(this.settings.folder);
		}

		// Aplicar template
		const content = this.settings.template
			.replace(/\{\{date\}\}/g, fileName)
			.replace(
				/\{\{today\}\}/g,
				today.format("DD [de] MMMM [de] YYYY")
			);

		const file = await this.app.vault.create(path, content);
		new Notice(`Tareas creadas: ${fileName}`);
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
