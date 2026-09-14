import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

export const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'New':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'Contacted':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'Completed':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'Closed':
      return 'bg-gray-100 text-gray-800 border-gray-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};
