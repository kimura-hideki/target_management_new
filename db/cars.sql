drop table cars;
create table cars(
  carId int(20) primary key not null auto_increment,
  maker varchar(50) not null,
  model varchar(100) not null,
  grade varchar(100) not null,
  bodyColor varchar(100) not null,
  price int(10) not null,
  navi char(1) default null,
  kawa char(1) default null,
  sr char(1) default null
);

insert into cars values(0, 'トヨタ', 'ヤリス', 'X　Bパッケージ', 'アイスピンクメタリック', 1000000, '', '', '');
