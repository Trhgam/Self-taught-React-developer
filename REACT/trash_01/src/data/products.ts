import { Product, Category } from '../types';

export const products: Product[] = [
  {
    id: 1,
    name: 'Rayban Aviator Classic',
    brand: 'Ray-Ban',
    price: 3500000,
    originalPrice: 4200000,
    description: 'Kính mát Aviator kinh điển với gọng kim loại vàng và tròng kính màu xanh lá G-15. Thiết kế vượt thời gian, phù hợp mọi phong cách.',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500',
    category: 'sunglasses',
    gender: 'unisex',
    frameShape: 'Aviator',
    frameMaterial: 'Kim loại',
    color: 'Vàng',
    inStock: true,
    rating: 4.8,
    reviews: 256,
    isBestSeller: true
  },
  {
    id: 2,
    name: 'Gucci Square Frame',
    brand: 'Gucci',
    price: 8900000,
    description: 'Kính mát cao cấp từ Gucci với thiết kế vuông thời thượng. Gọng acetate đen bóng với logo GG ở hai bên.',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500',
    category: 'sunglasses',
    gender: 'women',
    frameShape: 'Vuông',
    frameMaterial: 'Acetate',
    color: 'Đen',
    inStock: true,
    rating: 4.9,
    reviews: 128,
    isNew: true
  },
  {
    id: 3,
    name: 'Oakley Holbrook',
    brand: 'Oakley',
    price: 4200000,
    description: 'Kính thể thao phong cách từ Oakley. Công nghệ Prizm cho tầm nhìn sắc nét, gọng O Matter bền bỉ.',
    image: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=500',
    category: 'sports',
    gender: 'men',
    frameShape: 'Vuông',
    frameMaterial: 'O Matter',
    color: 'Đen nhám',
    inStock: true,
    rating: 4.7,
    reviews: 312,
    isBestSeller: true
  },
  {
    id: 4,
    name: 'Tom Ford Jennifer',
    brand: 'Tom Ford',
    price: 9500000,
    description: 'Mẫu kính mát nữ thanh lịch với thiết kế mắt mèo tinh tế. Gọng acetate gradient từ đen sang havana.',
    image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=500',
    category: 'sunglasses',
    gender: 'women',
    frameShape: 'Cat Eye',
    frameMaterial: 'Acetate',
    color: 'Havana',
    inStock: true,
    rating: 4.9,
    reviews: 89
  },
  {
    id: 5,
    name: 'Warby Parker Durand',
    brand: 'Warby Parker',
    price: 2800000,
    description: 'Gọng kính cận thời trang với thiết kế tròn retro. Acetate cao cấp, nhẹ và thoải mái.',
    image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=500',
    category: 'eyeglasses',
    gender: 'unisex',
    frameShape: 'Tròn',
    frameMaterial: 'Acetate',
    color: 'Tortoise',
    inStock: true,
    rating: 4.6,
    reviews: 445
  },
  {
    id: 6,
    name: 'Persol PO3019S',
    brand: 'Persol',
    price: 6700000,
    description: 'Kính mát Ý với thiết kế typewriter iconic. Bản lề Meflecto linh hoạt, tròng kính crystal.',
    image: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=500',
    category: 'sunglasses',
    gender: 'men',
    frameShape: 'Vuông tròn',
    frameMaterial: 'Acetate',
    color: 'Xanh đậm',
    inStock: true,
    rating: 4.8,
    reviews: 167
  },
  {
    id: 7,
    name: 'Gentle Monster Jennie',
    brand: 'Gentle Monster',
    price: 7200000,
    originalPrice: 8500000,
    description: 'Bộ sưu tập hợp tác với Jennie BLACKPINK. Thiết kế oversized hiện đại, màu hồng pastel.',
    image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?w=500',
    category: 'sunglasses',
    gender: 'women',
    frameShape: 'Oversized',
    frameMaterial: 'Acetate',
    color: 'Hồng',
    inStock: true,
    rating: 4.9,
    reviews: 523,
    isNew: true,
    isBestSeller: true
  },
  {
    id: 8,
    name: 'Oliver Peoples Gregory',
    brand: 'Oliver Peoples',
    price: 5800000,
    description: 'Gọng kính cận sang trọng kiểu panto với gọng titanium siêu nhẹ. Phong cách học giả tinh tế.',
    image: 'https://images.unsplash.com/photo-1614715838608-dd527c46231d?w=500',
    category: 'eyeglasses',
    gender: 'men',
    frameShape: 'Panto',
    frameMaterial: 'Titanium',
    color: 'Bạc',
    inStock: true,
    rating: 4.7,
    reviews: 98
  },
  {
    id: 9,
    name: 'Celine Triomphe',
    brand: 'Celine',
    price: 10200000,
    description: 'Kính mát cao cấp với logo Triomphe đặc trưng. Thiết kế vuông lớn, acetate đen huyền bí.',
    image: 'https://images.unsplash.com/photo-1509695507497-903c140c43b0?w=500',
    category: 'sunglasses',
    gender: 'women',
    frameShape: 'Vuông',
    frameMaterial: 'Acetate',
    color: 'Đen',
    inStock: false,
    rating: 4.9,
    reviews: 76
  },
  {
    id: 10,
    name: 'Nike Vision Pro',
    brand: 'Nike',
    price: 3200000,
    description: 'Kính thể thao chuyên nghiệp với công nghệ chống sương mù và đệm mũi có thể điều chỉnh.',
    image: 'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=500',
    category: 'sports',
    gender: 'unisex',
    frameShape: 'Wrap',
    frameMaterial: 'Nylon',
    color: 'Đen/Đỏ',
    inStock: true,
    rating: 4.5,
    reviews: 234,
    isNew: true
  },
  {
    id: 11,
    name: 'Moscot Lemtosh',
    brand: 'Moscot',
    price: 4800000,
    description: 'Gọng kính cận biểu tượng từ New York. Thiết kế vintage với bản lề 7 barrel tuyệt đẹp.',
    image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=500',
    category: 'eyeglasses',
    gender: 'unisex',
    frameShape: 'Tròn',
    frameMaterial: 'Acetate',
    color: 'Blonde',
    inStock: true,
    rating: 4.8,
    reviews: 189
  },
  {
    id: 12,
    name: 'Reading Classic Plus',
    brand: 'EyeComfort',
    price: 890000,
    originalPrice: 1200000,
    description: 'Kính lão đọc sách với độ phóng đại +1.5. Thiết kế cổ điển, nhẹ nhàng và tiện dụng.',
    image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=500',
    category: 'reading',
    gender: 'unisex',
    frameShape: 'Oval',
    frameMaterial: 'Kim loại',
    color: 'Vàng hồng',
    inStock: true,
    rating: 4.3,
    reviews: 567
  }
];

export const categories: Category[] = [
  {
    id: 'sunglasses',
    name: 'Kính Mát',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500',
    productCount: 6
  },
  {
    id: 'eyeglasses',
    name: 'Kính Cận',
    image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=500',
    productCount: 3
  },
  {
    id: 'sports',
    name: 'Kính Thể Thao',
    image: 'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=500',
    productCount: 2
  },
  {
    id: 'reading',
    name: 'Kính Lão',
    image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=500',
    productCount: 1
  }
];

export const featuredProducts = products.filter(p => p.isBestSeller);
export const newArrivals = products.filter(p => p.isNew);

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(price);
};
