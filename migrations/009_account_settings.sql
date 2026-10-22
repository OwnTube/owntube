-- A viewer's choices on the settings pages (/account*, src/innertube/settings.ts),
-- keyed by the setting ids YouTube's pages send with account/set_setting
-- (settingItemId): a boolean, a string or an integer, as the page sent it.
create table account_settings (
	user_id bigint not null references users on delete cascade,
	item text not null,
	value jsonb not null,
	updated_at timestamptz not null default now(),
	primary key (user_id, item)
);
