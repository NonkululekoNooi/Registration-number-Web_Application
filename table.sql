create table number_plates(
    id serial primary key,
    locations VARCHAR(10) NOT NULL,
    registration_number VARCHAR(10) NOT NULL
);

create table carregistration(
    id serial primary key,
    Reg_Numbers VARCHAR(10) NOT NULL,
    identity_id integer not null,
    foreign key (identity_id) references number_plates(id)
);


insert into number_plates (locations,registration_Number) values('SHOW ALL','CA,CN,CJ');
insert into number_plates (locations,registration_number) values ('CAPE TOWN','CA');
insert into number_plates(locations,registration_number) values ('Wellington','CN');
insert into number_plates(locations,registration_number) values ('PAARL','CJ');

