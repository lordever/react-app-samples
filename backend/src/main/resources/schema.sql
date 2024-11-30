CREATE TABLE if NOT EXISTS product
(
    id   integer NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50),
    type VARCHAR(50)
);

CREATE TABLE if NOT EXISTS characteristic
(
    id         integer NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name       VARCHAR(50),
    value_text VARCHAR(255),
    product_id integer REFERENCES product (id)
);

CREATE TABLE if NOT EXISTS product_price
(
    id         integer NOT NULL PRIMARY KEY AUTO_INCREMENT,
    recurrent  integer,
    one_time   integer,
    upfront    integer,
    product_id integer REFERENCES product (id)
);

CREATE TABLE if NOT EXISTS quote
(
    id   integer NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50),
    type VARCHAR(50)
);

CREATE TABLE if NOT EXISTS quote_item
(
    id         integer NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name       VARCHAR(50),
    type       VARCHAR(50),
    quote_id   integer REFERENCES quote (id),
    product_id integer REFERENCES product (id)
);

CREATE TABLE if NOT EXISTS quote_item_characteristic
(
    id         integer NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name       VARCHAR(50),
    value_text VARCHAR(255),
    quote_item_id integer REFERENCES quote_item (id)
);

CREATE TABLE if NOT EXISTS quote_item_price
(
    id              integer NOT NULL PRIMARY KEY AUTO_INCREMENT,
    recurrent       integer,
    one_time        integer,
    upfront         integer,
    commitment      integer,
    quote_item_id   integer REFERENCES quote_item (id)
);