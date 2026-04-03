# Codeus (local source)

This is a **development** checkout of Claude Code — it runs directly with [Bun](https://bun.sh), not the official Anthropic npm bundle.

## Prerequisites

- **[Bun](https://bun.sh)** installed and on your `PATH` (latest stable is recommended).
- API access: **Anthropic** (`claude login`) or **OpenRouter** (see below).

## Install / run the project

1. Clone the repo and `cd` into it:

   ```bash
   git clone https://github.com/Koki4a08/codeus.git
   cd codeus
   ```

2. Install dependencies:

   ```bash
   bun install
   ```

3. Start the CLI from source (from this directory, or via a global link):

   ```bash
   bun entrypoints/cli.tsx
   ```

   Optional: a global **`claude-local`** command (same CLI as `bun entrypoints/cli.tsx`, with a few extra env vars for parallel tool execution):

   ```bash
   bun link --global
   codeus
   ```

There is no separate production build for day-to-day use: the entrypoint is `entrypoints/cli.tsx`. The shipped product is a different package; here you run the repo directly.

---

## OpenRouter — set the API key from the CLI

The key is stored in Claude Code’s **global** config: `~/.claude.json` → `env`, together with the flag that routes traffic to OpenRouter.

### Save the API key (one-time)

Pick one approach (the binary is named `codeus` in `--help`; from source use `bun entrypoints/cli.tsx` or `codeus`):

```bash
# pass the key as an argument
bun entrypoints/cli.tsx auth openrouter set sk-or-v1-...

# or use OPENROUTER_API_KEY if it is already exported in your shell
bun entrypoints/cli.tsx auth openrouter set

# or pipe from stdin (handy for secrets)
echo "$OPENROUTER_API_KEY" | bun entrypoints/cli.tsx auth openrouter set --stdin
```

After a successful run, new sessions default to OpenRouter (`OPENROUTER_API_KEY` and `CLAUDE_CODE_USE_OPENROUTER=1` are written to config).

### Force Anthropic for a single session

```bash
bun entrypoints/cli.tsx --api-provider anthropic
```

### Remove the saved OpenRouter key from global config

```bash
bun entrypoints/cli.tsx auth openrouter clear
```

*(This only clears what is stored in `~/.claude.json` — not a key you export manually in the shell.)*

### Optional environment variables

| Variable | Purpose |
|----------|---------|
| `OPENROUTER_BASE_URL` | Defaults to `https://openrouter.ai/api` |
| `OPENROUTER_HTTP_REFERER` | HTTP `Referer` for OpenRouter |
| `OPENROUTER_APP_TITLE` | App title sent to OpenRouter |

---

## Choosing a model in the CLI: `/model`

In an **interactive** session:

- **`/model`** — opens the interactive model picker.
- **`/model sonnet`**, **`/model opus`**, **`/model haiku`**, etc. — set the model by **alias** when your account/org allows it.
- **`/model default`** — revert to the default from your settings.

You can also pass a **full model id** for the active provider — with OpenRouter, ids look like their catalog (`anthropic/claude-sonnet-4.6`, `openai/gpt-4o`, …). What actually works depends on OpenRouter and any org allowlist.

From the shell (before the REPL):

```bash
bun entrypoints/cli.tsx --api-provider openrouter --model anthropic/claude-sonnet-4.6
```

---

## Quick checklist

1. `bun install`
2. `bun entrypoints/cli.tsx auth openrouter set <key>` *(or `claude login` for Anthropic)*
3. `bun entrypoints/cli.tsx` → use **`/model`** inside the session to switch models

If something fails, confirm `bun --version` works and your key is valid for [OpenRouter](https://openrouter.ai/).
