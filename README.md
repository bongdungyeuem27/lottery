# Project Name

_A secure source to claim rewards on the EVM._

## 🛠 Tech Stack

- **Golang 1.23**
- **Bun** (JavaScript runtime)

## 🚀 Getting Started

### 1. Install dependencies

```bash
bun install --frozen-lockfile
```

### 2. Set up environment variables

Make sure to configure your environment variables properly. You can use `.env` or set them manually based on your project needs.

### 3. Generate Merkle tree

Place your `participants.csv` file inside the `./contracts` folder.

Then run:

```bash
bun run ./contracts/proof.ts
```

This will generate two files:

- `tree.json`
- `root.json`

### 4. Upload to MongoDB

After generating the Merkle tree, upload it using:

```bash
bun run ./contracts/upload.ts
```

### 5. Build the project

```bash
bun run build:production
```

### 6. Start the project

You can start the project in production mode using:

```bash
bun run start:production
```

Or customize the settings via:

```bash
./tools/ecosystem.config.cjs
```

---

## 🧪 Development Workflow

If you're actively developing:

### Install library

```bash
bun install
```

```bash
go mod download
```

### Chakra UI TypeScript typings

```bash
bun run theme
```

### Build env TypeScript files

```bash
bun run build:env
```

### Start server in development mode

```bash
bun run dev:turbo
```

---

---

## 📄 License

This project is private.  
**© 2025 Cavies. All rights reserved.**
