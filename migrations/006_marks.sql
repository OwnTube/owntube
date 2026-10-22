-- Marks an operator gives from the admin panel, shown with YouTube's own
-- graphics: a channel's verification badge (the checkmark, or the Official
-- Artist Channel note) and the YouTube Premium logo in an account's masthead.
alter table channels add column verification text not null default 'none' check (verification in ('none', 'verified', 'artist'));
alter table users add column premium boolean not null default false;
