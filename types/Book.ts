export interface Book {
  id: string;
  title: string;
  author: {
    id: string;
    name: string;
  };
}