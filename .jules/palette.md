# Palette's Journal - Critical UX/Accessibility Learnings

## 2026-11-07 - Site Search Empty State Feedback

**Learning:** When live search regions report "0 results" without inline suggestions, users on mobile and assistive tech are left without immediate guidance on search syntax or available keywords. Replacing the bare count with actionable keyword hints in the `role="status"` element provides seamless screen-reader announcements and clearer next steps without redundant text.
**Action:** When designing instant-filter or live-search modals, integrate empty-state guidance directly into the live status announcer instead of stacking separate static error paragraphs.
