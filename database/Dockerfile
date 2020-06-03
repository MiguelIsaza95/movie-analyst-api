FROM mysql
WORKDIR /scripts
COPY initialdb.sql /scripts
ENV MYSQL_ROOT_PASSWORD example
ENV MYSQL_USER prueba
ENV MYSQL_PASSWORD password
ENV MYSQL_DATABASE movie_db
RUN mv initialdb.sql /docker-entrypoint-initdb.d/
