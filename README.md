<p align="center">
  <strong>Daily Tasks</strong><br>
  <sub>Obsidian Plugin</sub>
</p>

<p align="center">
  <i>Today's tasks. Dead simple.</i>
</p>

<p align="center">
  <a href="#-the-idea">The idea</a> •
  <a href="#-installation">Installation</a> •
  <a href="#-settings">Settings</a> •
  <a href="#-commands">Commands</a>
</p>

---

<br>

## ✨ The idea

Not a task manager. Not a complicated to-do app.

**Daily Tasks** gives you one note per day where you write down what you're **actually doing** and check things off as you go. No infinite lists, no priorities, no due dates. Just you and what you got done today.

> Inspired by **Daily Notes**, but built for tasks: everything grouped by day. A clean record of each workday, inside your vault.

<br>

| | |
|:---:|:---|
| **One day = one note** | Dedicated folder (default: `tasks/`) |
| **Checkboxes** | Check off what you've done |
| **Quick commands** | Open today's tasks or add a new one on the fly |

<br>

*Perfect if you like the Daily Notes workflow but want something focused purely on tasks.*

---

<br>

## 📦 Installation

1. **Download** or clone this repo.
2. Run `npm install` then `npm run build`.
3. **Copy** `main.js` and `manifest.json` into your vault:
   `.obsidian/plugins/daily-tasks/`
4. **Restart** Obsidian and enable the plugin in *Settings → Community plugins*.

---

<br>

## ⚙️ Settings

In **Settings → Daily Tasks** you can configure:

| Option | Description |
|--------|-------------|
| **Folder** | Where task notes are stored (default: `tasks`) |
| **Date format** | Filename format (default: `YYYY-MM-DD`) |
| **Template** | Initial note content. Variables: `{{date}}`, `{{today}}` |

---

<br>

## ⌘ Commands

| Command | Description |
|---------|-------------|
| **Open today's tasks** | Opens or creates today's task note |
| **Add task** | Appends a new checkbox to today's tasks |

---

<br>

## 🛠 Development

```bash
npm install
npm run dev   # Watch mode: rebuilds on save
```

To test in your vault without copying files every time:

```bash
ln -s /path/to/this/repo /path/to/your/vault/.obsidian/plugins/daily-tasks
```

---

<br>

<p align="center">
  <sub>MIT License</sub>
</p>
