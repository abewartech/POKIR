<p align="center">
  <img src="https://i.imgur.com/a9QWW0v.png" alt="Project Logo">
</p>

<h1 align="center">Nextron Tailwind Starter</h1>

<p align="center">
  <a href="https://github.com/saltyshiomix/nextron">
    <img src="https://img.shields.io/badge/template-nextron-blue?style=flat-square" alt="Nextron">
  </a>
  <img src="https://img.shields.io/badge/status-active-success?style=flat-square" alt="Status">
  <img src="https://img.shields.io/badge/build-pnpm%20%7C%20npm%20%7C%20yarn-informational?style=flat-square" alt="Build">
  <img src="https://img.shields.io/badge/license-MIT-brightgreen?style=flat-square" alt="License">
</p>

---

## Overview

This repository is a starter template for building cross‑platform desktop applications using **Electron**, **Next.js**, and **Tailwind CSS** via **Nextron**. It provides a ready‑to‑use development environment with sensible defaults so you can focus on building your app instead of wiring up the tooling.

Use this project as a base for rapid prototyping or as the foundation for production‑ready Electron applications with a modern React UI.

---

## Features

- ⚡ **Electron + Next.js**: Modern React front‑end with a desktop shell.
- 🎨 **Tailwind CSS**: Utility‑first styling with hot‑reload.
- 📦 **Bundled Builds**: Production packaging via `electron-builder`.
- 🔁 **Live Reload / HMR**: Fast feedback in development.
- 🧱 **Structured Project Layout**: Clear separation between main and renderer processes.
- 🧪 **TypeScript‑ready**: Configured with `tsconfig.json` for type‑safe development.

---

## Screenshots

> Replace the image paths and captions below with real screenshots from your application.

| ![Screenshot 1](screenshots/screen1.png) | ![Screenshot 2](screenshots/screen2.png) | ![Screenshot 3](screenshots/screen3.png) |
|:---:|:---:|:---:|
| *Caption 1* | *Caption 2* | *Caption 3* |

---

## Installation

### 1. Clone the repository

```bash
git clone <your-repo-url> my-app
cd my-app
```

### 2. Install dependencies

Using **pnpm** (recommended):

```bash
pnpm install --shamefully-hoist
```

Using **yarn**:

```bash
yarn
```

Using **npm**:

```bash
npm install
```

---

## Usage

### Development

Run the app in development mode with hot reload:

```bash
# with pnpm
pnpm dev

# with yarn
yarn dev

# with npm
npm run dev
```

### Production build

Create a production build of the Electron app:

```bash
# with pnpm
pnpm build

# with yarn
yarn build

# with npm
npm run build
```

The packaged application will be generated according to the configuration in `electron-builder.yml`.

---

## Project Structure

High‑level overview of the most important files and directories:

```text
.
├─ main/                 # Electron main process (app lifecycle, windows, menus)
├─ renderer/             # Next.js / React front‑end (pages, components)
├─ resources/            # Static assets (icons, images, etc.)
├─ DOCS/                 # Additional documentation
├─ electron-builder.yml  # Electron Builder configuration
├─ tsconfig.json         # TypeScript configuration
├─ package.json          # Scripts and dependencies
└─ README.md             # Project documentation (this file)
```

---

## Technologies

Key technologies used in this template:

- ![Electron](https://img.shields.io/badge/Electron-47848F?logo=electron&logoColor=white&style=for-the-badge)
- ![Next.js](https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white&style=for-the-badge)
- ![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB&style=for-the-badge)
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white&style=for-the-badge)
- ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white&style=for-the-badge)
- ![pnpm](https://img.shields.io/badge/pnpm-4a4a4a?logo=pnpm&logoColor=f69220&style=for-the-badge)
- ![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white&style=for-the-badge)

---

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or fix:
   ```bash
   git checkout -b feature/my-feature
   ```
3. Make your changes and ensure everything builds:
   ```bash
   pnpm build   # or `yarn build` / `npm run build`
   ```
4. Commit your changes with a clear message:
   ```bash
   git commit -m "feat: add my feature"
   ```
5. Push your branch and open a Pull Request describing your changes.

Please keep your commits focused and include tests or updates to documentation where appropriate.

---

## License

This project is licensed under the **MIT License**. See the [`LICENSE`](LICENSE) file for full license text (or add one if it does not yet exist).
