insert into station(id, name) values (1, '강남역');
insert into station(id, name) values (2, '양재역');
insert into station(id, name) values (3, '판교역');
insert into station(id, name) values (4, '정자역');
insert into station(id, name) values (5, '미금역');
insert into station(id, name) values (6, '수지구청역');
insert into station(id, name) values (7, '성복역');
insert into station(id, name) values (8, '상현역');
insert into station(id, name) values (9, '광교중앙역');
insert into station(id, name) values (10, '성남역');
insert into station(id, name) values (11, '이매역');
insert into station(id, name) values (12, '광주역');
insert into station(id, name) values (13, '곤지암역');
insert into station(id, name) values (14, '이천역');
insert into station(id, name) values (15, '여주역');

insert into line(id, name, color) values (1, '신분당선', 'yellow');
insert into line(id, name, color) values (2, '경강선', 'blue');

insert into section(id, line_id, up_station_id, down_station_id, distance) values (1, 1, 1, 2, 10);
insert into section(id, line_id, up_station_id, down_station_id, distance) values (2, 1, 2, 3, 10);
insert into section(id, line_id, up_station_id, down_station_id, distance) values (3, 1, 3, 4, 10);
insert into section(id, line_id, up_station_id, down_station_id, distance) values (4, 1, 4, 5, 10);
insert into section(id, line_id, up_station_id, down_station_id, distance) values (5, 1, 5, 6, 10);
insert into section(id, line_id, up_station_id, down_station_id, distance) values (6, 1, 6, 7, 10);
insert into section(id, line_id, up_station_id, down_station_id, distance) values (7, 1, 7, 8, 10);
insert into section(id, line_id, up_station_id, down_station_id, distance) values (8, 1, 8, 9, 10);
insert into section(id, line_id, up_station_id, down_station_id, distance) values (9, 2, 3, 10, 10);
insert into section(id, line_id, up_station_id, down_station_id, distance) values (10, 2, 10, 11, 10);
insert into section(id, line_id, up_station_id, down_station_id, distance) values (11, 2, 11, 12, 10);
insert into section(id, line_id, up_station_id, down_station_id, distance) values (12, 2, 12, 13, 10);
insert into section(id, line_id, up_station_id, down_station_id, distance) values (13, 2, 13, 14, 10);
insert into section(id, line_id, up_station_id, down_station_id, distance) values (14, 2, 14, 15, 10);

insert into member(id, email, password, age) values (1, 'tasklet1579@next.co.kr', 'test1234', 30);
