-- Accounts are local to this instance. Every account owns exactly one channel,
-- as on YouTube, created at registration.
create table users (
	id bigserial primary key,
	login text not null unique,
	email text,
	password_hash text not null,
	is_admin boolean not null default false,
	created_at timestamptz not null default now(),
	disabled_at timestamptz
);

create table sessions (
	id text primary key,
	user_id bigint not null references users on delete cascade,
	-- readable by page script; the client signs mutations with it (SAPISIDHASH)
	api_secret text not null,
	created_at timestamptz not null default now(),
	last_seen_at timestamptz not null default now(),
	expires_at timestamptz not null,
	user_agent text
);
create index sessions_user on sessions (user_id);

create table channels (
	id text primary key check (id ~ '^UC[A-Za-z0-9_-]{22}$'),
	user_id bigint not null unique references users on delete cascade,
	handle text not null unique check (handle ~ '^[A-Za-z0-9._-]{3,30}$'),
	title text not null,
	description text not null default '',
	avatar_path text,
	banner_path text,
	created_at timestamptz not null default now()
);
create unique index channels_handle_lower on channels (lower(handle));

create table videos (
	id text primary key check (id ~ '^[A-Za-z0-9_-]{11}$'),
	channel_id text not null references channels on delete cascade,
	title text not null,
	description text not null default '',
	visibility text not null default 'public' check (visibility in ('public', 'unlisted', 'private')),
	-- uploaded -> queued -> processing -> ready | failed
	status text not null default 'uploaded' check (status in ('uploaded', 'queued', 'processing', 'ready', 'failed')),
	error text,
	source_path text,
	duration_ms integer,
	width integer,
	height integer,
	fps real,
	view_count bigint not null default 0,
	like_count integer not null default 0,
	comment_count integer not null default 0,
	created_at timestamptz not null default now(),
	published_at timestamptz,
	deleted_at timestamptz,
	search tsvector generated always as (to_tsvector('simple', coalesce(title, '') || ' ' || coalesce(description, ''))) stored
);
create index videos_channel on videos (channel_id, published_at desc);
create index videos_public on videos (published_at desc) where status = 'ready' and visibility = 'public' and deleted_at is null;
create index videos_search on videos using gin (search);

-- one row per playable stream the player can choose
create table video_formats (
	video_id text not null references videos on delete cascade,
	itag integer not null,
	kind text not null check (kind in ('muxed', 'video', 'audio')),
	mime_type text not null,
	path text not null,
	size bigint not null,
	bitrate integer not null,
	average_bitrate integer,
	width integer,
	height integer,
	fps integer,
	quality text,
	quality_label text,
	init_start integer,
	init_end integer,
	index_start integer,
	index_end integer,
	audio_sample_rate integer,
	audio_channels integer,
	duration_ms integer not null,
	primary key (video_id, itag)
);

create table video_thumbnails (
	video_id text not null references videos on delete cascade,
	name text not null,
	path text not null,
	width integer not null,
	height integer not null,
	primary key (video_id, name)
);

create table processing_jobs (
	id bigserial primary key,
	video_id text not null references videos on delete cascade,
	state text not null default 'queued' check (state in ('queued', 'running', 'done', 'failed')),
	attempts integer not null default 0,
	error text,
	created_at timestamptz not null default now(),
	started_at timestamptz,
	finished_at timestamptz
);
create index processing_jobs_queue on processing_jobs (created_at) where state = 'queued';

create table subscriptions (
	user_id bigint not null references users on delete cascade,
	channel_id text not null references channels on delete cascade,
	created_at timestamptz not null default now(),
	primary key (user_id, channel_id)
);
create index subscriptions_channel on subscriptions (channel_id);

create table video_reactions (
	user_id bigint not null references users on delete cascade,
	video_id text not null references videos on delete cascade,
	kind text not null check (kind in ('like', 'dislike')),
	created_at timestamptz not null default now(),
	primary key (user_id, video_id)
);

create table comments (
	id text primary key,
	video_id text not null references videos on delete cascade,
	author_channel_id text not null references channels on delete cascade,
	parent_id text references comments on delete cascade,
	text text not null,
	like_count integer not null default 0,
	reply_count integer not null default 0,
	created_at timestamptz not null default now(),
	edited_at timestamptz,
	deleted_at timestamptz
);
create index comments_video on comments (video_id, created_at desc) where parent_id is null;
create index comments_parent on comments (parent_id, created_at);

create table comment_reactions (
	user_id bigint not null references users on delete cascade,
	comment_id text not null references comments on delete cascade,
	kind text not null check (kind in ('like', 'dislike')),
	primary key (user_id, comment_id)
);

create table playlists (
	id text primary key,
	user_id bigint not null references users on delete cascade,
	title text not null,
	description text not null default '',
	visibility text not null default 'private' check (visibility in ('public', 'unlisted', 'private')),
	-- 'watch_later' is the per-account WL list; 'user' are created lists
	kind text not null default 'user' check (kind in ('user', 'watch_later')),
	created_at timestamptz not null default now(),
	updated_at timestamptz not null default now()
);
create unique index playlists_one_watch_later on playlists (user_id) where kind = 'watch_later';

create table playlist_items (
	-- setVideoId: identifies this entry (a video can appear twice)
	id text primary key,
	playlist_id text not null references playlists on delete cascade,
	video_id text not null references videos on delete cascade,
	position double precision not null,
	added_at timestamptz not null default now()
);
create index playlist_items_order on playlist_items (playlist_id, position);

create table watch_history (
	user_id bigint not null references users on delete cascade,
	video_id text not null references videos on delete cascade,
	watched_at timestamptz not null default now(),
	position_ms integer not null default 0,
	primary key (user_id, video_id)
);
create index watch_history_recent on watch_history (user_id, watched_at desc);

-- requests the compatibility layer did not handle, for the operator view
create table compat_misses (
	key text primary key,
	count bigint not null default 0,
	first_seen timestamptz not null default now(),
	last_seen timestamptz not null default now(),
	sample text
);

create table rate_limits (
	key text primary key,
	window_start timestamptz not null,
	count integer not null
);
