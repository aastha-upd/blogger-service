To build this project run - npm build
then to start - npm start

the env variables needs db connection. Please ask for it.


PostgreSQL is used to create a db having table blog_posts which was craeted using these commands:

CREATE TABLE blog_posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    excerpt TEXT NOT NULL,
    author VARCHAR(100) NOT NULL,
    date TIMESTAMP NOT NULL,
    content TEXT NOT NULL,
    min_read INTEGER NOT NULL,
    tags VARCHAR(25) NOT NULL
);


//to enhance filtering performance
CREATE INDEX idx_blog_posts_id ON blog_posts (id);

Considerations for db:
json column can be used for content as it can have a large value of TEXT.
