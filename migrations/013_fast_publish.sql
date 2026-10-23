-- Uploads become playable from a quick first format (a remux of an H.264/AAC
-- source, else a fast 360p encode) while the full ladder is built in the
-- background: playable says a video has formats it can be watched with,
-- whatever its status. Jobs come in two stages; publish jobs run first.
alter table videos add column playable boolean not null default false;
update videos v set playable = true where exists (select 1 from video_formats f where f.video_id = v.id);
drop index if exists videos_public;
create index videos_public on videos (published_at desc) where playable and visibility = 'public' and deleted_at is null;

alter table processing_jobs add column stage text not null default 'publish' check (stage in ('publish', 'ladder'));
drop index if exists processing_jobs_queue;
create index processing_jobs_queue on processing_jobs (stage, created_at) where state = 'queued';

-- the transfer's file has been handed to its video (once, by whichever of
-- the last chunk and upload/createvideo comes second, or by the recovery pass)
alter table upload_transfers add column attached_at timestamptz;
update upload_transfers t set attached_at = now() from videos v where v.id = t.video_id and v.source_path is not null;

-- a video's chosen thumbnail: a generated still (1-3) or a custom upload
alter table videos add column thumbnail_choice text not null default 'auto';

-- channel links saved as a JSON string holding the array (a text parameter
-- cast straight to jsonb) are unwrapped
update channels set links = (links #>> '{}')::jsonb where jsonb_typeof(links) = 'string';
update channels set links = (links #>> '{}')::jsonb where jsonb_typeof(links) = 'string';
