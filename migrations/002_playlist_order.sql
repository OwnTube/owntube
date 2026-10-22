-- the order a playlist's owner picked from its sort menu: 0 manual,
-- 1 date added (newest), 2 date added (oldest), 3 most popular,
-- 4 date published (newest), 5 date published (oldest)
alter table playlists add column video_order smallint not null default 0 check (video_order between 0 and 5);
