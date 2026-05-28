const serviceCategories = [
  {
    description:
      "Thiết kế format, set quay và workflow phát sóng để mỗi buổi livestream giữ được nhịp xem và chuyển đổi rõ ràng.",
    image:
      "https://images.unsplash.com/photo-1707690614050-c0ff0b536ad3?auto=format&fit=crop&fm=jpg&q=80&w=1600",
    title: "Sản xuất phim",
    services: [
      "Phim doanh nghiệp",
      "Phim quảng cáo/TVC",
      "Phóng sự/Phim tài liệu ngắn",
      "Sản xuất chương trình/Livestream",
    ],
  },
  {
    description:
      "Xây dựng câu chuyện hình ảnh giúp thương hiệu xuất hiện chỉn chu, có chiều sâu và dễ ghi nhớ trên mọi điểm chạm số.",
    image:
      "https://images.unsplash.com/photo-1768471125958-78556538fadc?auto=format&fit=crop&fm=jpg&q=80&w=1600",
    title: "Viết Kịch bản",
    services: [
      "Xây kênh Tiktok",
      "Xây kênh Youtube",
      "Video Marketing",
      "Video giới thiệu sản phẩm",
      "Video Highlight sự kiện",
      "Sản xuất khoá học online",
      "Video Animation",
      "Video 2D",
    ],
  },
  {
    description:
      "Tối ưu dựng phim, màu sắc và motion để bản phát hành cuối cùng sắc nét, đồng nhất và sẵn sàng cho nhiều nền tảng.",
    image:
      "https://images.unsplash.com/photo-1773525911805-bebab1d3e0e4?auto=format&fit=crop&fm=jpg&q=80&w=1600",
    title: "Hậu kỳ & Kỹ thuật số",
    services: ["Edit video", "Video Animation/2D"],
  },
] as const;

export const serviceColumns = serviceCategories.map((category) => ({
  services: [...category.services],
  title: category.title,
})) as ReadonlyArray<{
  services: readonly string[];
  title: string;
}>;

export const focusServices = serviceCategories.flatMap((category) =>
  category.services.map((service) => ({
    description: category.description,
    eyebrow: category.title,
    image: category.image,
    title: service,
  })),
) as ReadonlyArray<{
  description: string;
  eyebrow: string;
  image: string;
  title: string;
}>;

export const featuredProjectImages = [
  "https://images.unsplash.com/photo-1707690614050-c0ff0b536ad3?auto=format&fit=crop&fm=jpg&q=80&w=1600",
  "https://images.unsplash.com/photo-1768471125958-78556538fadc?auto=format&fit=crop&fm=jpg&q=80&w=1600",
  "https://images.unsplash.com/photo-1773525911805-bebab1d3e0e4?auto=format&fit=crop&fm=jpg&q=80&w=1600",
  "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&fm=jpg&q=80&w=1600",
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&fm=jpg&q=80&w=1600",
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&fm=jpg&q=80&w=1600",
] as const;

export const insightCards = [
  {
    avatarColor: "linear-gradient(135deg, #1f2937 0%, #4b5563 100%)",
    avatarLabel: "HL",
    channel: "Hoa Linh Studio",
    duration: "08:24",
    href: "/projects",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&fm=jpg&q=80&w=1200",
    publishedAt: "2 tuần trước",
    title: "Behind The Scenes: Một video chuyên nghiệp được tạo ra như thế nào?",
    views: "12 N",
  },
  {
    avatarColor: "linear-gradient(135deg, #7c2d12 0%, #ea580c 100%)",
    avatarLabel: "MS",
    channel: "Marketing Series",
    duration: "05:16",
    href: "/projects",
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&fm=jpg&q=80&w=1200",
    publishedAt: "1 tháng trước",
    title: "5 sai lầm phổ biến khiến video marketing không tạo được chuyển đổi",
    views: "8,7 N",
  },
  {
    avatarColor: "linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)",
    avatarLabel: "ST",
    channel: "Storytelling Lab",
    duration: "06:42",
    href: "/projects",
    image:
      "https://images.unsplash.com/photo-1707690614050-c0ff0b536ad3?auto=format&fit=crop&fm=jpg&q=80&w=1200",
    publishedAt: "5 ngày trước",
    title: "Kể chuyện bằng hình ảnh: Cách xây dựng video chạm đến cảm xúc khách hàng",
    views: "15 N",
  },
  {
    avatarColor: "linear-gradient(135deg, #312e81 0%, #6366f1 100%)",
    avatarLabel: "PX",
    channel: "Production X",
    duration: "09:58",
    href: "/projects",
    image:
      "https://images.unsplash.com/photo-1768471125958-78556538fadc?auto=format&fit=crop&fm=jpg&q=80&w=1200",
    publishedAt: "3 tuần trước",
    title: "Từ ý tưởng đến thành phẩm: Quy trình sản xuất video hiệu quả cho doanh nghiệp",
    views: "10 N",
  },
  {
    avatarColor: "linear-gradient(135deg, #14532d 0%, #22c55e 100%)",
    avatarLabel: "ED",
    channel: "Editor Notes",
    duration: "07:11",
    href: "/projects",
    image:
      "https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&fm=jpg&q=80&w=1200",
    publishedAt: "6 ngày trước",
    title: "Dựng nhịp đúng cách: Bí quyết giữ người xem ở lại đến những giây cuối cùng",
    views: "9,4 N",
  },
  {
    avatarColor: "linear-gradient(135deg, #7f1d1d 0%, #ef4444 100%)",
    avatarLabel: "BR",
    channel: "Brand Room",
    duration: "04:39",
    href: "/projects",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&fm=jpg&q=80&w=1200",
    publishedAt: "4 tuần trước",
    title: "Một concept thương hiệu mạnh cần gì trước khi bước vào sản xuất video?",
    views: "11 N",
  },
] as const;
