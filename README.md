# The Social Network

**The Social Network** is a modern social networking web application built with Angular, Nx, and NgRx. It allows users to register, login, create posts, vote on posts, and interact with other users’ content in a streamlined and reactive environment.

## Table of Contents

1. [Project Overview](#project-overview)  
2. [Functionality](#functionality)  
3. [Tech Stack](#tech-stack)  
4. [Project Structure](#project-structure)  
5. [Setup Instructions](#setup-instructions)  
6. [NgRx State Management](#ngrx-state-management)  
7. [Authentication](#authentication)  
8. [Post Management](#post-management)  
9. [Styling](#styling)

## Project Overview

Postify is designed to simulate a social network platform where users can:

- Register and login
- Create posts
- Upvote and downvote posts
- Delete their own posts
- View a feed of posts from all users

The app leverages a **modular Nx workspace** structure with libraries for core functionality, authentication, post management, and reusable UI components.

## Functionality

- **User Registration & Login**: Users can register and login. Authenticated users receive a JWT token stored in the NgRx store.  
- **Posts Feed**: Display a feed of posts using `FeedPageComponent`.  
- **Post Creation**: Users can create posts with a title, content, and publish status.  
- **Voting System**: Upvote and downvote posts. The app handles already voted scenarios and shows per-post loading spinners.  
- **Post Deletion**: Users can delete only their own posts.  
- **Optimistic UI Updates**: Voting updates in the UI immediately while the backend request is processed.  

## Tech Stack

- **Frontend**: Angular 17 (Standalone Components)  
- **State Management**: NgRx (Store, Effects)  
- **Styling**: Tailwind CSS  
- **HTTP Client**: Angular HttpClient  
- **Workspace**: Nx Monorepo  
- **Routing**: Angular Router  
- **Language**: TypeScript  
- **Testing**: Jest (unit testing) / Cypress (optional e2e)

## Project Structure

```

postify/
├── apps/
│   └── postify-app/
│       ├── src/
│       │   ├── app/
│       │   │   ├── app.component.ts
│       │   │   ├── app.component.html
│       │   │   ├── app-routing.module.ts
│       │   │   └── app.module.ts
│       │   ├── assets/
│       │   ├── environments/
│       │   │   ├── environment.ts
│       │   │   └── environment.prod.ts
│       │   └── main.ts
│       └── project.json
│
├── libs/
│   ├── core/
│   │   ├── src/
│   │   │   ├── lib/
│   │   │   │   ├── api/
│   │   │   │   │   ├── auth.service.ts
│   │   │   │   │   ├── post.service.ts
│   │   │   │   │   └── http-interceptor.service.ts
│   │   │   │   ├── models/
│   │   │   │   │   ├── post.model.ts
│   │   │   │   │   └── user.model.ts
│   │   │   │   ├── guards/
│   │   │   │   │   └── auth.guard.ts
│   │   │   │   ├── utils/
│   │   │   │   │   └── helpers.ts
│   │   │   │   ├── state/
│   │   │   │   │   ├── auth.store.ts
│   │   │   │   │   └── posts.store.ts
│   │   │   │   └── core.module.ts
│   │   │   └── index.ts
│
│   ├── auth/
│   │   ├── src/
│   │   │   ├── lib/
│   │   │   │   ├── login/
│   │   │   │   │   ├── login.component.ts
│   │   │   │   │   ├── login.component.html
│   │   │   │   │   └── login.component.scss
│   │   │   │   ├── register/
│   │   │   │   │   ├── register.component.ts
│   │   │   │   │   ├── register.component.html
│   │   │   │   │   └── register.component.scss
│   │   │   │   └── auth.module.ts
│
│   ├── posts/
│   │   ├── src/
│   │   │   ├── lib/
│   │   │   │   ├── components/
│   │   │   │   │   ├── post-list/
│   │   │   │   │   ├── post-item/
│   │   │   │   │   └── create-post/
│   │   │   │   ├── pages/
│   │   │   │   │   ├── feed-page/
│   │   │   │   │   └── post-detail-page/
│   │   │   │   └── posts.module.ts
│
│   ├── ui/
│   │   ├── src/
│   │   │   ├── lib/
│   │   │   │   ├── components/
│   │   │   │   │   ├── navbar/
│   │   │   │   │   ├── button/
│   │   │   │   │   └── loader/
│   │   │   │   └── ui.module.ts
│
├── tools/
├── nx.json
├── angular.json
├── package.json
└── README.md

````

## Setup Instructions

1. **Install dependencies**:

```bash
npm install
````

2. **Run the application**:

```bash
nx serve social-app
```

3. **Build for production**:

```bash
nx build social-app --prod
```

4. **Lint & Test**:

```bash
nx lint
nx test
```

## NgRx State Management

* `auth.store.ts` manages user login, registration, and token.
* `posts.store.ts` manages posts, voting, and loading state.
* Effects handle async operations for HTTP requests.
* Selectors are used in components for reactive state updates.

## Authentication

* JWT-based authentication.
* Token stored in NgRx store and optionally localStorage.
* Routes are protected using `AuthGuard` (`libs/core/guards/auth.guard.ts`).

## Post Management

* Users can **create**, **delete**, **upvote**, and **downvote** posts.
* Optimistic UI updates for voting with per-post loading indicators.
* Voting prevents double voting and handles backend messages like `"Already voted"`.

## Styling

* Tailwind CSS used for rapid UI development.
* Components are responsive and use utility-first classes.
* Post cards, buttons, modals, and feed are fully styled.

## Issues

* Downvoting is not working because at the time of writing this app the API endpoint was not working.
* There is not much error handling and testing due to limited time.