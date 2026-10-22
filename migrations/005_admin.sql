-- The admin panel (src/admin): what operators did, and the instance settings
-- they can change at run time.
create table admin_actions (
	id bigserial primary key,
	admin_id bigint references users on delete set null,
	action text not null,
	target text not null default '',
	detail text not null default '',
	created_at timestamptz not null default now()
);
create index admin_actions_recent on admin_actions (created_at desc);

create table instance_settings (
	key text primary key,
	value jsonb not null,
	updated_at timestamptz not null default now()
);
