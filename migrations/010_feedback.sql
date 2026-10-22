-- What people send with the account menu's "Send feedback" (src/feedback.ts),
-- read by operators on the admin panel's Feedback page.
create table feedback (
	id bigserial primary key,
	user_id bigint references users on delete set null,
	page text,
	body text not null,
	user_agent text,
	created_at timestamptz not null default now(),
	resolved_at timestamptz
);
create index feedback_open on feedback (created_at desc) where resolved_at is null;
