-- Hourly figures for Studio's dashboard and analytics (src/stats.ts).
-- Views count playback starts (one per viewer or playback session an hour,
-- as videos.view_count); watch time sums the played segments the player
-- reports in its watchtime pings. Hours are UTC, truncated.
create table video_stats_hourly (
	video_id text not null references videos on delete cascade,
	hour timestamptz not null,
	views integer not null default 0,
	watch_ms bigint not null default 0,
	primary key (video_id, hour)
);

create table channel_stats_hourly (
	channel_id text not null references channels on delete cascade,
	hour timestamptz not null,
	subscribers_gained integer not null default 0,
	subscribers_lost integer not null default 0,
	primary key (channel_id, hour)
);

-- earlier views and subscriptions, in the hour the video was published or
-- the subscription made, so totals match
insert into video_stats_hourly (video_id, hour, views)
	select id, date_trunc('hour', coalesce(published_at, created_at)), view_count from videos where view_count > 0;
insert into channel_stats_hourly (channel_id, hour, subscribers_gained)
	select channel_id, date_trunc('hour', created_at), count(*) from subscriptions group by 1, 2;
