/**
 * formatDate - Relative Date Formatting Utility
 *
 * Converts an ISO date string to a human-readable relative format.
 *
 * Output formats:
 * - "Just now" - less than 1 minute ago
 * - "X minutes ago" - less than 1 hour ago
 * - "X hours ago" - same day
 * - "Yesterday" - previous day
 * - "X days ago" - within the last week
 * - "DD-MM-YYYY" - older than 7 days
 *
 * @param dateString - ISO date string (e.g., from API createdAt)
 * @returns Formatted relative date string
 *
 * Used in: TodoCard.tsx to display todo creation dates
 */
export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
        const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
        if (diffHours === 0) {
            const diffMinutes = Math.floor(diffTime / (1000 * 60));
            return diffMinutes <= 1 ? 'Just now' : `${diffMinutes} minutes ago`;
        }
        return diffHours === 1 ? '1 hour ago' : `${diffHours} hours ago`;
    } else if (diffDays === 1) {
        return 'Yesterday';
    } else if (diffDays < 7) {
        return `${diffDays} days ago`;
    } else {
       const day = String(date.getDate()).padStart(2, '0');
         const month = String(date.getMonth() + 1).padStart(2, '0');
         const year = date.getFullYear();

         return `${day}-${month}-${year}`;
    }
}