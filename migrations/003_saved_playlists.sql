-- other people's playlists a user saved to their library ("Save playlist")
create table saved_playlists (
	user_id bigint not null references users on delete cascade,
	playlist_id text not null references playlists on delete cascade,
	saved_at timestamptz not null default now(),
	primary key (user_id, playlist_id)
);
