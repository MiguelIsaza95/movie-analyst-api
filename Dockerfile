FROM node:alpine
COPY . /movie-analyst-api
WORKDIR /movie-analyst-api
ENV DB_HOST movie-analyst-db
ENV DB_USER prueba
ENV DB_PASS password
ENV DB_NAME movie_db
ENV PORT 3000
RUN npm install
EXPOSE 3000
ENTRYPOINT npm start
