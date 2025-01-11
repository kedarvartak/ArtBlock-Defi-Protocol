export const sampleGallery = {
  _id: "gallery123",
  name: "Digital Dreams Gallery",
  description: "A cutting-edge space for digital art and NFTs, showcasing the best in contemporary digital creation.",
  coverImage: "https://images.unsplash.com/photo-1620121692029-d088224ddc74?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2832&q=80",
  theme: "modern",
  stats: {
    artistCount: 12,
    artworkCount: 45,
    visitorCount: 1200,
    likesCount: 856,
    totalSales: 23.5
  },
  featuredArtists: [
    {
      id: "artist1",
      name: "Elena Digital",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      artworksCount: 8
    },
    {
      id: "artist2",
      name: "Max Pixel",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      artworksCount: 12
    },
    {
      id: "artist3",
      name: "Sarah Canvas",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
      artworksCount: 6
    }
  ],
  recentActivity: [
    {
      id: 1,
      description: "New artwork added by Elena Digital",
      timeAgo: "2 hours ago",
      icon: "Image"
    },
    {
      id: 2,
      description: "Max Pixel's artwork sold for 2.5 ETH",
      timeAgo: "5 hours ago",
      icon: "DollarSign"
    },
    {
      id: 3,
      description: "New artist application received",
      timeAgo: "1 day ago",
      icon: "UserPlus"
    }
  ],
  artworks: [
    {
      id: "art1",
      title: "Digital Dreamscape #1",
      imageUrl: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4",
      artist: {
        name: "Elena Digital",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg"
      },
      price: 1.5,
      likes: 234
    },
    {
      id: "art2",
      title: "Cyber Evolution",
      imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe",
      artist: {
        name: "Max Pixel",
        avatar: "https://randomuser.me/api/portraits/men/2.jpg"
      },
      price: 2.8,
      likes: 187
    },
    {
      id: "art3",
      title: "Abstract Reality",
      imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe",
      artist: {
        name: "Sarah Canvas",
        avatar: "https://randomuser.me/api/portraits/women/3.jpg"
      },
      price: 1.2,
      likes: 156
    }
  ],
  artists: [
    {
      id: "artist1",
      name: "Elena Digital",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      bio: "Digital artist specializing in surreal landscapes",
      stats: {
        artworksCount: 8,
        salesCount: 15,
        likesCount: 456,
        viewsCount: 1200
      },
      social: {
        twitter: "https://twitter.com/elenadigital",
        instagram: "https://instagram.com/elenadigital",
        website: "https://elenadigital.art"
      },
      recentArtworks: [
        {
          id: "art1",
          imageUrl: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4",
          title: "Digital Dreamscape #1"
        },
        {
          id: "art2",
          imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe",
          title: "Cyber Evolution"
        }
      ]
    },
    // ... more artists
  ],
  applications: [
    {
      _id: "app1",
      status: "pending",
      createdAt: "2024-02-15T10:30:00Z",
      artist: {
        name: "Alex Future",
        avatar: "https://randomuser.me/api/portraits/men/4.jpg",
        bio: "NFT artist exploring the boundaries of digital expression"
      },
      message: "I would love to join this gallery and showcase my digital art collection.",
      portfolio: {
        artworks: [
          {
            imageUrl: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4",
            title: "Future Vision #1",
            description: "An exploration of cyberpunk aesthetics"
          },
          {
            imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe",
            title: "Digital Dreams",
            description: "Abstract digital composition"
          }
        ]
      },
      links: [
        {
          title: "Portfolio",
          url: "https://alexfuture.art"
        },
        {
          title: "Instagram",
          url: "https://instagram.com/alexfuture"
        }
      ]
    },
    // ... more applications
  ],
  submissionGuidelines: `
    # Submission Guidelines
    
    - All artworks must be original creations
    - Minimum resolution: 2000x2000px
    - Accepted formats: JPG, PNG, GIF
    - Each piece must include a detailed description
    - Artists must have rights to all content
    
    ## Review Process
    Your application will be reviewed within 5 business days.
  `,
  isPublic: true,
  requireApproval: true,
  maxArtists: 50,
  commissionRate: 2.5,
  allowedArtworkTypes: ["image", "video", "3d"]
}; 