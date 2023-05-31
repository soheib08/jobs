import ShortUniqueId from 'short-unique-id';

const uuid = new ShortUniqueId({ length: 12 });

export function generateId(): string {
  return uuid();
}
