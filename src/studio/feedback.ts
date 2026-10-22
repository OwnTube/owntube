// Studio's upload progress feed. A video still uploading or processing
// carries statusDetails.feedbackServiceContinuationToken (video.ts); Studio
// polls upload/feedback with those tokens and reads each item:
//
//   {uploadFeedbackItemContinuation: {
//      id: {videoId, frontendUploadId},
//      contents: [{transferProgressBar: {fractionCompleted}},
//                 {uploadStatus: {uploadStatus}},            SUCCESS / FAILED once settled
//                 {processingResolutionsStatusRenderer: {resolutionData360p: {status}, ...}},
//                 {thumbnailStatus: {thumbnailDetails}}],    once thumbnails exist
//      draftMediaUploadStatus,
//      continuations: [{timedContinuationData: {continuation, timeoutMs}}]}}   absent when done
//
// A settled upload status or new thumbnails make Studio refetch the video,
// which then reads as processed. This instance runs no copyright or
// guidelines checks, so the items carry no check results.

import { sql } from "../db";
import { isVideoId } from "../ids";
import { responseContext, videoThumbnails } from "../innertube/r";
import { ApiError, route } from "../innertube/router";

const PREFIX = "owntube-feedback:";
export const feedbackToken = (videoId: string) => Buffer.from(PREFIX + videoId).toString("base64url");
const tokenVideo = (token: unknown) => {
	const s = Buffer.from(String(token ?? ""), "base64url").toString();
	return s.startsWith(PREFIX) && isVideoId(s.slice(PREFIX.length)) ? s.slice(PREFIX.length) : undefined;
};

const RESOLUTIONS = [
	["resolutionData360p", 0],
	["resolutionData1080p", 1080],
	["resolutionData4k", 2160],
] as const;

route("upload/feedback", async (ctx) => {
	const viewer = ctx.viewer;
	if (!viewer) throw new ApiError(401, "Sign in to use Studio.", "authError");
	const ids = [...new Set((Array.isArray(ctx.body.continuations) ? ctx.body.continuations : []).map(tokenVideo).filter((v: string | undefined): v is string => !!v))].slice(0, 50);
	const rows = ids.length
		? await sql`select v.id, v.status,
				(select max(least(f.width, f.height)) from video_formats f where f.video_id = v.id and f.height is not null) as top,
				(select count(*)::int from video_thumbnails t where t.video_id = v.id) as thumbs,
				t.frontend_upload_id, t.received, t.size, t.complete
			from videos v left join lateral (select * from upload_transfers t where t.video_id = v.id order by t.created_at desc limit 1) t on true
			where v.id in ${sql(ids)} and v.channel_id = ${viewer.channelId} and v.deleted_at is null`
		: [];
	const continuationContents = rows.map((v: any) => {
		const ready = v.status === "ready";
		const failed = v.status === "failed";
		const transferred = v.complete || !v.size ? 1 : Math.min(1, Number(v.received) / Number(v.size));
		const resolution = (min: number) =>
			ready ? { status: (v.top ?? 0) >= min ? "PROCESSING_RESOLUTION_STATUS_AVAILABLE" : "PROCESSING_RESOLUTION_STATUS_UNAVAILABLE" } : { status: v.status === "processing" ? "PROCESSING_RESOLUTION_STATUS_PROCESSING" : "PROCESSING_RESOLUTION_STATUS_STARTING_SOON" };
		const contents: unknown[] = [{ transferProgressBar: { fractionCompleted: transferred } }];
		if (ready || failed) contents.push({ uploadStatus: { uploadStatus: ready ? "SUCCESS" : "FAILED" } });
		if (!failed && transferred >= 1) contents.push({ processingResolutionsStatusRenderer: Object.fromEntries(RESOLUTIONS.map(([key, min]) => [key, resolution(min)])) });
		if (ready && v.thumbs > 0) contents.push({ thumbnailStatus: { thumbnailDetails: videoThumbnails(v.id) } });
		return {
			uploadFeedbackItemContinuation: {
				id: { videoId: v.id, ...(v.frontend_upload_id ? { frontendUploadId: v.frontend_upload_id } : {}) },
				contents,
				...(ready ? { draftMediaUploadStatus: "DRAFT_MEDIA_UPLOAD_STATUS_SUCCESS" } : failed ? { draftMediaUploadStatus: "DRAFT_MEDIA_UPLOAD_STATUS_FAILED" } : {}),
				...(ready || failed ? {} : { continuations: [{ timedContinuationData: { continuation: feedbackToken(v.id), timeoutMs: 2000 } }] }),
			},
		};
	});
	return { responseContext: responseContext(viewer), continuationContents };
});
