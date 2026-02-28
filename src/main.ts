import { Notice, Plugin, TFile, TFolder } from "obsidian";
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
		this.addRibbonIcon("checkbox-glyph", "Abrir tareas de hoy", () => {
			this.openTodayTasks().catch((err) => {
				console.error("Daily Tasks:", err);
				new Notice(`Error: ${err.message}`);
			});
		});

		// Comando para el command palette
		this.addCommand({
			id: "open-today-tasks",
			name: "Abrir tareas de hoy",
			callback: () => {
				this.openTodayTasks().catch((err) => {
					console.error("Daily Tasks:", err);
					new Notice(`Error: ${err.message}`);
				});
			},
		});

		// Comando para agregar una tarea rápida
		this.addCommand({
			id: "add-task",
			name: "Agregar tarea",
			callback: () => {
				this.addTask().catch((err) => {
					console.error("Daily Tasks:", err);
					new Notice(`Error: ${err.message}`);
				});
			},
		});

		this.addSettingTab(new DailyTasksSettingTab(this.app, this));
	}

	async openTodayTasks(): Promise<TFile> {
		const file = await this.ensureTodayFile();
		const leaf = this.app.workspace.getLeaf(false);
		await leaf.openFile(file);

		// Pequeño delay para que el editor se monte
		setTimeout(() => {
			const editor =
				this.app.workspace.activeEditor?.editor;
			if (editor) {
				const lastLine = editor.lastLine();
				const lastCh = editor.getLine(lastLine).length;
				editor.setCursor({ line: lastLine, ch: lastCh });
			}
		}, 100);

		return file;
	}

	async addTask(): Promise<void> {
		const file = await this.ensureTodayFile();
		const content = await this.app.vault.read(file);
		await this.app.vault.modify(file, content + "\n- [ ] ");

		// Abrir el archivo y mover al final
		const leaf = this.app.workspace.getLeaf(false);
		await leaf.openFile(file);

		setTimeout(() => {
			const editor =
				this.app.workspace.activeEditor?.editor;
			if (editor) {
				const lastLine = editor.lastLine();
				const lastCh = editor.getLine(lastLine).length;
				editor.setCursor({ line: lastLine, ch: lastCh });
			}
		}, 100);
	}

	private async ensureTodayFile(): Promise<TFile> {
		// moment está disponible globalmente en Obsidian
		const today = (window as any).moment();
		if (!today || !today.format) {
			throw new Error("moment() no disponible");
		}

		const fileName = today.format(this.settings.dateFormat);
		const folder = this.settings.folder.replace(/\/+$/, "");
		const path = `${folder}/${fileName}.md`;

		// Si ya existe, retornar
		const existing = this.app.vault.getAbstractFileByPath(path);
		if (existing instanceof TFile) {
			return existing;
		}

		// Crear carpeta si no existe (try/catch por si ya existe en disco pero no en cache)
		try {
			const folderNode =
				this.app.vault.getAbstractFileByPath(folder);
			if (!folderNode) {
				await this.app.vault.createFolder(folder);
			}
		} catch {
			// La carpeta ya existe, todo bien
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
