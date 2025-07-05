### UpTrack - Structured roadmap app

- server repository: [https://github.com/jamshed-uddin/roadmap-app-server](https://github.com/jamshed-uddin/roadmap-app-server)
- live demo: [https://uptrack-nine.vercel.app/](https://uptrack-nine.vercel.app/)

## Tech stack

- Next js
- Redux toolkit + RTK Query
- Tailwind CSS

## Core features

- #### Authentication and account management

  - Custom email/password based authentication
  - JWT token generation on login and registration.
  - User name update option.
  - Change password with current password verification.
  - Delete account after password verification.

- #### Roadmap

  - Roadmaps and their contents exposed to public.
  - Roadmap contents are open to view and further interaction like upvote, comment requires authentication.
  - Filter option: filter by popularity.
  - Logged in user can filter by status(inProgress, complete)

- #### Upvote

  - Registered users can upvote on roadmap contents.
  - Users can upvote only once on an item.

- #### Comment

  - Registered users can comment on roadmap contents.
  - Users can reply on other comments.
  - Users can edit or delete their own comments and replies.

- #### Progress tracking
  - Registered users can mark a roadmap item as In progress or Complete and Pending to delete the content from progress record.
  - Strikethrough to indicate complete item in roadmap item list

## Enhancements

- Next js for fast, file-based routing, SEO friendly web pages.
- Tailwind CSS for fast and consistent styling.
- RTK Query for centralized and efficient data fetching and mutation.
- React hook form for form validation and proper error message.
- Enhanced error boundaries and fallback UIs.
- Loading skeleton UI for data loading state.

## Run Locally

**Clone the repository**

```bash
git clone https://github.com/jamshed-uddin/roadmap-app-client.git

```

**Change directory**

```bash
cd roadmap-app-client
```

**Install packages**

```bash
npm install
```

**Set environment variables**

```env
NEXT_PUBLIC_SERVER_URL=your-locally-running-server/api
```

**Start the app**

```bash
npm run dev
```

## Dependencies

```json
"dependencies": {
    "@heroicons/react": "^2.2.0",
    "@reduxjs/toolkit": "^2.8.2",
    "clsx": "^2.1.1",
    "js-cookie": "^3.0.5",
    "next": "15.3.3",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-hook-form": "^7.58.1",
    "react-hot-toast": "^2.5.2",
    "react-redux": "^9.2.0",
    "tailwind-merge": "^3.3.1"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3",
    "@tailwindcss/postcss": "^4",
    "@types/js-cookie": "^3.0.6",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "15.3.3",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
```
