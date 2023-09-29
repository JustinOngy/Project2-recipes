CREATE TABLE recipes(
    id SERIAL PRIMARY KEY,
    title TEXT, 
    image_url TEXT,
    ingredients TEXT,
    instructions TEXT,
    cook_time TEXT,
    serves INTEGER,
    user_id INTEGER NOT NULL,
);

INSERT INTO recipes (title, image_url, ingredients, instructions,cook_time,serves ,user_id)
VALUES ('Spicy Thai Basil Chicken', 'https://j6e2i8c9.rocketcdn.me/wp-content/uploads/2020/07/Thai-basil-chicken-33.jpg','1 lb boneless chicken breast, thinly sliced
2 tablespoons vege',
'1. Heat the vegetable oil in a large pan over medium-high heat.','20 minutes',4,1);

INSERT INTO recipes (title, image_url, ingredients, instructions,cook_time,serves,user_id)
VALUES ('Creamy Garlic Parmesan Pasta','https://rasamalaysia.com/wp-content/uploads/2018/03/instant-pot-garlic-parmesan-pasta-thumb.jpg', '8 oz spaghetti
3 tablespoons butter
','Cook the spaghetti according to package instructions. Drain and set aside.
', '15 minutes', 2,1);

INSERT INTO recipes (title, image_url, ingredients, instructions,cook_time,serves,user_id)
VALUES ('Vegetarian Chickpea Curry', 'https://www.twopeasandtheirpod.com/wp-content/uploads/2020/12/Chickpea-Curry-4.jpg','2 tablespoons vegetable oil
1 onion, chopped
','Heat the vegetable oil in a large pot over medium heat. ','30 minutes',4,1);

INSERT INTO recipes (title, image_url, ingredients, instructions,cook_time,serves,user_id)
VALUES ('Classic Margherita Pizza','https://cookieandkate.com/images/2021/07/classic-margherita-pizza.jpg',
'Pizza dough','Preheat your oven ','12 minutes',2,1);


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email TEXT,
    password_digest TEXT
);


INSERT INTO users (email)
VALUES ('jo@gmail.com');