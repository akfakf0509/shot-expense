import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

export function formatCurrency(amount: number): string {
  return `₩${amount.toLocaleString('ko-KR')}`;
}

export function formatDate(dateString: string): string {
  return format(new Date(dateString), 'yyyy년 M월 d일', { locale: ko });
}

export function formatDateTime(dateString: string): string {
  return format(new Date(dateString), 'M월 d일 HH:mm', { locale: ko });
}
