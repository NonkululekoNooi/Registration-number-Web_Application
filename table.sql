create table numberplates(
    id serial primary key,
    location VARCHAR(10) NOT NULL,
    registration_number VARCHAR(10) NOT NULL
)

create table carregistration(
    id serial primary key,
    Reg_Numbers VARCHAR(10) NOT NULL,
    identity_id integer not null,
    foreign key (identity_id) references numberplates(id)
)


insert into numberplates (location,registration_Number) values('SHOW ALL','CA,CN,CJ');
insert into numberplates (location,registration_number) values ('CAPE TOWN','CA');
insert into numberplates(location,registration_number) values ('Wellington','CN');
insert into numberPlates(location,registration_number) values ('PAARL','CJ');

