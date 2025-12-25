/**
 * Content Renderer Utility
 *
 * Renders content segments with semantic emphasis preserved.
 * Use this to maintain visual hierarchy from centralized content config.
 */

import React from 'react';
import { ContentSegment } from '../config/content';

/**
 * Renders an array of ContentSegments with proper styling
 *
 * @param segments - Array of content segments with type information
 * @returns JSX with proper semantic emphasis
 *
 * @example
 * import { renderContentSegments } from '@/utils/contentRenderer';
 * import { BRAND_CONTENT } from '@/config/content';
 *
 * <p className="text-base">
 *   {renderContentSegments(BRAND_CONTENT.hero.subheadline)}
 * </p>
 */
export const renderContentSegments = (segments: ContentSegment[]) => {
  return segments.map((segment, index) => {
    if (segment.type === "break") {
      return <br key={index} />;
    }

    if (segment.type === "emphasis") {
      return (
        <span key={index} className="text-foreground font-medium">
          {segment.text}
        </span>
      );
    }

    if (segment.type === "accent") {
      return (
        <span key={index} className="text-primary font-medium">
          {segment.text}
        </span>
      );
    }

    // type === "normal"
    return <span key={index}>{segment.text}</span>;
  });
};
