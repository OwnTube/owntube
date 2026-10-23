-- Studio's Customization: the channel's links (shown on its page and About
-- panel) and contact email, and a history of name and handle changes (each
-- may change twice in 14 days; a released handle is held for 14 days)
alter table channels add column links jsonb not null default '[]'::jsonb;
alter table channels add column business_email text;
create table channel_identity_changes (
	id bigserial primary key,
	channel_id text not null references channels(id) on delete cascade,
	kind text not null check (kind in ('title', 'handle')),
	old_value text not null,
	new_value text not null,
	changed_at timestamptz not null default now()
);
create index channel_identity_changes_recent on channel_identity_changes (channel_id, kind, changed_at);
create index channel_identity_changes_held on channel_identity_changes (lower(old_value)) where kind = 'handle';
