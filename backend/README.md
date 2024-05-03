# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

Lena's update: ++++ added`

## Resetting the development database

**Caution**: the schema/tables will stay unmodified, but all the inserted data inside the tables will be reset.

1. Change directory to ``reference-project\backend\prisma``:
```bash
cd reference-project\backend\
```
2. Reset the development database
```bash
npx prisma migrate reset
```
3. Confirm the reset: *(press 'y')*
```bash
√ Are you sure you want to reset your database? All data will be lost. ... yes

Applying migration `20240408113325_init`
Applying migration `20240415112420_add_user_tokens`
Applying migration `20240415115956_add_user_token_expire`
Applying migration `20240424111352_add_more_tables`
Applying migration `20240430115524_autoincrement_changes_to_id`

Database reset successful

The following migration(s) have been applied:

migrations/
  └─ 20240408113325_init/
    └─ migration.sql
  └─ 20240415112420_add_user_tokens/
    └─ migration.sql
  └─ 20240415115956_add_user_token_expire/
    └─ migration.sql
  └─ 20240424111352_add_more_tables/
    └─ migration.sql
  └─ 20240430115524_autoincrement_changes_to_id/
    └─ migration.sql

✔ Generated Prisma Client (v5.13.0) to .\node_modules\@prisma\client in 90ms
```


## Seeding the database

1. Change directory to ``reference-project\backend\prisma``:

```bash
cd reference-project\backend\prisma
```
2. Run the seed.ts file using ts-node:

```bash
npx ts-node seed.ts
```
After running the seed.ts -file, the terminal should return a log with the created data:

```json
Users created: {
  "id": 1,
  "username": "alice",
  "password": "$2b$10$08y0szTv/c9zVAddEQDIyeGJf4dg/9YaOf.bUsUTpB9bdRgUYWGsq",
  "role": "user",
  "token": null,
  "tokenExpire": null,
  "createdAt": "2024-05-03T09:32:32.787Z",
  "profileText": null,
  "profileImage": null,
  "posts": 0,
  "follows": 0
},
{
  "id": 2,
  "username": "bob",
  "password": "$2b$10$JAOWOlNmmFB6kQwH3bl5YOgzUQy31z3M8fhc1CJq/mb6bxKA1nYH6",
  "role": "user",
  "token": null,
  "tokenExpire": null,
  "createdAt": "2024-05-03T09:32:32.793Z",
  "profileText": null,
  "profileImage": null,
  "posts": 0,
  "follows": 0
}

Posts created: {
  "post_id": 1,
  "user_id": 1,
  "title": "First Post",
  "content": "This is the content of the first post.",
  "created_at": "2024-05-03T09:32:32.800Z",
  "upvotes": 0,
  "downvotes": 0
},
{
  "post_id": 2,
  "user_id": 2,
  "title": "Second Post",
  "content": "This is the content of the second post.",
  "created_at": "2024-05-03T09:32:32.803Z",
  "upvotes": 0,
  "downvotes": 0
}

Comments created: {
  "comment_id": 1,
  "user_id": 1,
  "post_id": 1,
  "content": "Comment on the first post by Alice.",
  "created_at": "2024-05-03T09:32:32.806Z"
},
{
  "comment_id": 2,
  "user_id": 2,
  "post_id": 2,
  "content": "Comment on the second post by Bob.",
  "created_at": "2024-05-03T09:32:32.810Z"
}

Follows created: {
  "follow_id": 1,
  "follower_id": 1,
  "followed_user_id": 2,
  "created_at": "2024-05-03T09:32:32.814Z"
}
```
## Other useful prisma commands

```bash
npx prisma generate
``` 
- Generates the Prisma Client based on your Prisma schema. This command creates a client library that you can use to interact with your database.

 - *May also help if you're having trouble accessing the database using environment variables (.env -file)*
```bash
npx prisma migrate status
```
- Displays the status of your migrations, showing which migrations have been applied and which are pending.