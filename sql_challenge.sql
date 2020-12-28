/* Schema creation, tested with mysql 5.6 */

create table Person (
  id int not null auto_increment,
  name varchar(255),
  primary key (id)
);

create table Address (
  id int not null auto_increment,
  address varchar(255),
  person_id int not null,
  primary key (id)
);


/* Solution 1 - using exists clause */

select a.id, a.name from Person a where not exists (
 select b.id from Address b where a.id = b.person_id  
);

/* Solution 2 - left join on Person */

select a.id, a.name from Person a
left join Address b on a.id = b.person_id
where b.person_id is null;