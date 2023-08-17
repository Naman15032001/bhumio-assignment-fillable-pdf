# bhumio-assignment-fillable-pdf

# Steps to run Backend

```
cd pdf-backend
npm i
create .env in root context of that directory
 Edit env variables
    NODE_ENV=development
    FRONTEND_HOST=http://localhost:3001
    PDF_PATH=/home/naman/Desktop/pdf_project/pdf-backend/src/example.pdf
    PORT=3000
npm i
npm start:dev
```

# Steps to run Frontend

```
cd pdf-frontend
npm i
create .env in root context of that directory
Edit env variables
  REACT_APP_BACKEND_HOST=http://localhost:3000
npm start
 ( react server would start in 3001 default as 3000 already in use )
Go to http://localhost:3001 TO TEST
```
