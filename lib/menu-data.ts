export type MenuItem = {
    id: string;
    nameKo: string;
    nameEn: string;
    price: number;
    description?: string;
    setting: string[];
    tags: ('Vegetarian' | 'Gluten-Free' | 'Spicy' | 'Contains Nuts')[];
    imageUrl: string;
};

// Available settings:
// "큰 불판", "작은 불판", "집게", "국자", "숟가락", "가위", "뼈버리는 통", "국그릇"

export const MENU_ITEMS: MenuItem[] = [
    {
        id: '1',
        nameKo: '삼겹살',
        nameEn: 'Pork Belly',
        price: 18000,
        description: 'Thick slices of premium pork belly grilled at the table.',
        setting: ['큰 불판', '집게', '가위', '뼈버리는 통', '숟가락', '국그릇'],
        tags: [],
        imageUrl: 'https://images.unsplash.com/photo-1596796929662-3c22b9bba04f?auto=format&fit=crop&w=800&q=80',
    },
    {
        id: '2',
        nameKo: '된장찌개',
        nameEn: 'Soybean Stew',
        price: 9000,
        description: 'Rich soybean paste stew with vegetables and tofu.',
        setting: ['작은 불판', '국자', '숟가락', '국그릇'],
        tags: ['Vegetarian', 'Spicy'],
        imageUrl: 'https://images.unsplash.com/photo-1583558117961-d14aee8413b5?auto=format&fit=crop&w=800&q=80',
    },
    {
        id: '3',
        nameKo: '양념갈비',
        nameEn: 'Marinated Ribs',
        price: 32000,
        description: 'Beef ribs marinated in sweet soy sauce.',
        setting: ['큰 불판', '집게', '가위', '뼈버리는 통'],
        tags: [],
        imageUrl: 'https://images.unsplash.com/photo-1628268909376-e8c44bb3153f?auto=format&fit=crop&w=800&q=80',
    },
];
