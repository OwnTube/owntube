-- Resumable uploads from YouTube Studio's uploader (the Scotty protocol, see
-- src/studio/upload.ts). A transfer may exist before its video does: Studio
-- creates the video (upload/createvideo) as soon as the transfer starts.
create table upload_transfers (
	id text primary key,
	resource_id text not null unique,
	user_id bigint not null references users on delete cascade,
	frontend_upload_id text,
	file_name text not null default '',
	size bigint,
	received bigint not null default 0,
	complete boolean not null default false,
	video_id text references videos on delete set null,
	created_at timestamptz not null default now()
);
create index upload_transfers_user on upload_transfers (user_id, created_at desc);

-- Studio's per-video state: an upload stays a draft (private, unlisted in
-- Studio as "Draft") until its details are saved; made_for_kids is the
-- audience answer the upload dialog requires (null: not answered yet)
alter table videos add column draft boolean not null default false;
alter table videos add column made_for_kids boolean;
alter table videos add column original_filename text not null default '';
