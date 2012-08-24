drop table if exists waypoints;
create table waypoints (
	id integer primary key autoincrement,
	name string not null,
	x integer not null,
	z integer not null,
	y integer not null,
	color string not null
);
