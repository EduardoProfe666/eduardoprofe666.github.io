"use client";

import { useEffect } from "react";
import { installFeedback } from "@/lib/feedback";

/**
 * Mounts the one delegated listener that gives every link and button on the
 * page its hover and press cue. Renders nothing.
 */
export function FeedbackListener() {
  useEffect(() => installFeedback(), []);
  return null;
}
