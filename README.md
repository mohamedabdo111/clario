# Clario Dashboard

Admin console for Clario organizations: members, invitations, roles, permissions and organization settings.

React 19 · TypeScript · Vite · Tailwind CSS v4 · React Router · TanStack Query · Zod + React Hook Form · Radix primitives · Lucide icons.

## Getting started

```bash
npm install
npm run dev
```

The app runs against in-memory mock services by default (see `.env.example`). Mock accounts all use the password `Clario#2026`:

| Account | What it shows |
| --- | --- |
| `sarah.chen@acme.com` | Owner of Acme Inc, Member of Globex Corporation (switch organizations to see permissions change) |
| `elena.petrova@acme.com` | Viewer — limited navigation and "no access" states |

`/reset-password?token=expired` shows the expired-link error.

## Structure

```
src/
├── app/            Routing, layouts, route guards, providers, navigation config
│   └── routes/     Page components — thin compositions of feature components
├── components/
│   ├── ui/         Design-system primitives (Button, Field, Dialog, Table…)
│   ├── layout/     App shell, sidebar, header, breadcrumbs, page frame
│   └── permissions/ <Can> gate and the permission-denied state
├── features/<name>/ Domain code: types, schemas, services, hooks, components
├── services/       API client, token storage, browser storage
├── lib/            Permission catalog, route paths, config, utilities
├── hooks/          Cross-feature hooks (usePermissions)
├── mocks/          In-memory backend used while VITE_USE_MOCKS is on
└── styles/         Design tokens (index.css)
```

## Conventions

- **Tokens only.** The Tailwind palette is replaced by the tokens in `src/styles/index.css`; use `bg-surface`, `text-fg-muted`, `border-border`, etc.
- **Paths** come from `paths` in `src/lib/routes.ts`, never string literals.
- **Permissions** are defined once in `src/lib/permissions/catalog.ts`. UI checks go through `usePermissions().can("users.create")` or `<Can>`; route access is declared with `handle.permission` in `src/app/router.tsx`. Never check role names — roles are data. The API remains the source of truth for authorization.
- **Organization scope.** Components get the active organization from `useOrganization()`. Query keys start with `["organizations", orgId, …]` so switching organizations never shows another tenant's cached data.
- **Services** expose an interface with a mock and an HTTP implementation; `config.useMocks` picks one. Components never import services or mocks directly — they use feature hooks.
- **Forms** use a Zod schema from the feature's `schemas/` folder plus `<Field>`, which wires labels, hints and errors for assistive tech.
