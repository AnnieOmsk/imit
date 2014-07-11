CREATE DATABASE `imit` CHARACTER SET utf8 COLLATE utf8_general_ci;
GRANT USAGE ON *.* to imit@localhost identified by 'imitpass';
GRANT ALL PRIVILEGES ON imit.* TO imit@localhost;