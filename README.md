# Daily Tasks - Obsidian Plugin

Plugin para crear y abrir notas de tareas diarias en una carpeta dedicada, separada de Daily Notes.

## Qué hace

- Crea una carpeta `tasks/` (configurable) en tu vault
- Al hacer clic en el icono o usar el comando, abre/crea una nota con la fecha de hoy
- Cada nota es un archivo markdown con checklist (`- [ ] tarea`)
- Podés agregar tareas rápido con el comando "Agregar tarea"

## Instalación manual

1. Cloná o descargá este repo
2. `npm install`
3. `npm run build`
4. Copiá `main.js`, `manifest.json` a tu vault en `.obsidian/plugins/daily-tasks/`
5. Reiniciá Obsidian y activá el plugin en Settings > Community plugins

## Desarrollo

```bash
npm install
npm run dev   # Watch mode - rebuilds on changes
```

Para testear, hacé un symlink desde el build al vault:

```bash
ln -s /ruta/a/este/repo /ruta/a/tu/vault/.obsidian/plugins/daily-tasks
```

## Configuración

En Settings > Daily Tasks podés configurar:

- **Carpeta**: Nombre de la carpeta donde se guardan las tareas (default: `tasks`)
- **Formato de fecha**: Formato del nombre del archivo (default: `YYYY-MM-DD`)
- **Template**: Contenido inicial de cada nota. Variables disponibles:
  - `{{date}}` - Fecha formateada según el formato configurado
  - `{{today}}` - Fecha en formato legible (ej: "26 de febrero de 2026")

## Comandos

| Comando | Descripción |
|---------|-------------|
| Abrir tareas de hoy | Abre o crea la nota de tareas del día |
| Agregar tarea | Agrega un nuevo checkbox a las tareas de hoy |
