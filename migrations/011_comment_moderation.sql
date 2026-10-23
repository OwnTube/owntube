-- Moderation by the channel a comment was left on (Studio's Comments page):
-- a creator heart, and comments the channel reported as spam, which leave the
-- public list until the channel approves them.
alter table comments add column hearted_at timestamptz;
alter table comments add column spam_at timestamptz;
