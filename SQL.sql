create table if not exists employee_resignations (
    id serial primary key,
    fullname varchar not null,
    email varchar not null,
    is_resigning boolean not null,
    reason text,
    created_at timestamp default current_timestamp
);