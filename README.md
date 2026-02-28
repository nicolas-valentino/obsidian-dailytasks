<p align="center">
  <strong>Daily Tasks</strong><br>
  <sub>Plugin para Obsidian</sub>
</p>

<p align="center">
  <i>Tareas del día. Súper simples.</i>
</p>

<p align="center">
  <a href="#-la-idea">La idea</a> •
  <a href="#-instalación">Instalación</a> •
  <a href="#-configuración">Configuración</a> •
  <a href="#-comandos">Comandos</a>
</p>

---

<br>

## ✨ La idea

No es un gestor de tareas. No es un to-do complicado.

Es **Daily Tasks**: una nota por día donde vas anotando lo que **estás haciendo** y lo vas tachando. Sin listas infinitas, sin prioridades, sin fechas de vencimiento. Solo vos y lo que hiciste hoy.

> Inspirado en **Daily Notes**, pero pensado para tareas: todo queda agrupado por día. Un registro claro de cada jornada, dentro de tu vault.

<br>

| | |
|:---:|:---|
| **Un día = una nota** | Carpeta dedicada (por defecto `tasks/`) |
| **Checkboxes** | Marcás lo que ya hiciste |
| **Comandos rápidos** | Abrís las tareas de hoy o agregás una tarea al vuelo |

<br>

*Ideal si te gusta el flujo de Daily Notes pero querés algo enfocado solo en tareas.*

---

<br>

## 📦 Instalación

1. **Descargá** o cloná este repositorio.
2. En la carpeta del proyecto: `npm install` y luego `npm run build`.
3. **Copiá** `main.js` y `manifest.json` en tu vault:  
   `.obsidian/plugins/daily-tasks/`
4. **Reiniciá** Obsidian y activá el plugin en *Settings → Community plugins*.

---

<br>

## ⚙️ Configuración

En **Settings → Daily Tasks** podés ajustar:

| Opción | Descripción |
|--------|-------------|
| **Carpeta** | Dónde se guardan las notas (por defecto: `tasks`) |
| **Formato de fecha** | Nombre del archivo (por defecto: `YYYY-MM-DD`) |
| **Template** | Contenido inicial. Variables: `{{date}}`, `{{today}}` |

---

<br>

## ⌘ Comandos

| Comando | Descripción |
|---------|-------------|
| **Abrir tareas de hoy** | Abre o crea la nota del día |
| **Agregar tarea** | Añade un checkbox a las tareas de hoy |

---

<br>

## 🛠 Desarrollo

```bash
npm install
npm run dev   # Watch: recompila al guardar
```

Para probar en tu vault sin copiar archivos cada vez:

```bash
ln -s /ruta/a/este/repo /ruta/a/tu/vault/.obsidian/plugins/daily-tasks
```

---

<br>

<p align="center">
  <sub>Licencia MIT</sub>
</p>
