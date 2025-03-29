import {cataasLogger} from '../../core/logger/setupLogger';

/**
 * Cat entity representing a cat from the CATAAS API
 */
export interface Cat {
  id: string;
  tags: string[];
  createdAt?: string; // camelCase format for cat list api response
  created_at?: string; // snake_case format for cat details api response
  url?: string;
}

export class CatModel implements Cat {
  id: string;
  tags: string[];
  createdAt: string;
  url?: string;

  constructor(cat: Cat) {
    this.id = cat.id;
    this.tags = cat.tags || [];
    this.createdAt = cat.createdAt || cat.created_at || '';
    this.url = cat.url;
  }

  /**
   * Get the full image URL for the detail view
   */
  get imageUrl(): string {
    return `https://cataas.com/cat?id=${this.id}`;
  }

  /**
   * Get a thumbnail URL for the list view
   */
  get thumbnailUrl(): string {
    return `https://cataas.com/cat?id=${this.id}&width=200&height=200`;
  }

  /**
   * Get formatted creation date for display
   * Example: "March 24, 2025"
   */
  get formattedCreationDate(): string {
    try {
      if (!this.isValidDate(this.createdAt)) {
        cataasLogger.error(`Invalid date format: ${this.createdAt}`);
        return 'Unknown date';
      }

      const date = new Date(this.createdAt);
      if (isNaN(date.getTime())) {
        cataasLogger.error(`Invalid date format: ${this.createdAt}`);
        return 'Invalid Date';
      }
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC',
      });
    } catch (error) {
      cataasLogger.error(`Error formatting creation date: ${error}`);
      return 'Error formatting date';
    }
  }

  /**
   * Get a comma-separated list of tags for display
   */
  get tagList(): string {
    return this.tags.join(', ');
  }

  private isValidDate(dateStr: string): boolean {
    const date = new Date(dateStr);
    return !isNaN(date.getTime());
  }
}
