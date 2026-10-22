-- A GIF attached to a comment (src/gifs.ts): {"provider": "klipy", "id", "title", "width", "height", "src"}.
-- A comment may then have no text.
alter table comments add column gif jsonb;

-- GIFs a viewer starred in the picker, newest first
create table gif_favorites (
	user_id bigint not null references users on delete cascade,
	gif_id text not null,
	gif jsonb not null,
	added_at timestamptz not null default now(),
	primary key (user_id, gif_id)
);
