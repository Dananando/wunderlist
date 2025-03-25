# Wunderlist-like

It is an imitation of a todo list / wunderlist / task management app built in TypeScript

# Backend

Built using NestJS, TypeORM, PostgreSQL

To run:

1. `cd backend`
2. Run `npm i`
3. Check the `.env` config
4. Run the migrations `npm run typeorm migration:run -- -d src/data-source.ts`
5. Run the seeding script `npm run seed`
6. Run `npm run start:dev`

# Frontend

Built using VueJS, Vuetify

1. Run `cd frontend && npm i && npm run dev`
2. You can login using the username "batman@libheros.com" and the password "password"

# Caveat

Not all the backend is linked to the frontend. The Lists and Tasks entities cannot be retrieved on the frontend yet.
